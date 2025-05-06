// Bun server to serve the Paint Visualizer with Style Templates and handle API requests
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import OpenAI from 'openai';

// Load environment variables from .env file
// Bun automatically loads environment variables from .env files

const __dirname = dirname(fileURLToPath(import.meta.url));

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Check if OpenAI API key is available
if (!process.env.OPENAI_API_KEY) {
  console.warn('Warning: OPENAI_API_KEY not found in environment variables. AI features will not work properly.');
}

// CORS headers for API requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
};

// Base64 decode function (similar to atob)
function base64Decode(str) {
  return Buffer.from(str, 'base64').toString('binary');
}

// Load Sherwin Williams colors data
let swColorsData = {};
try {
  // Try to find the SW colors JSON file in different locations
  const possiblePaths = [
    join(__dirname, 'src/data/sw_colors.json'),
    join(__dirname, 'supabase/functions/analyze-colors/sw_colors.json')
  ];

  for (const path of possiblePaths) {
    if (fs.existsSync(path)) {
      const data = fs.readFileSync(path, 'utf-8');
      swColorsData = JSON.parse(data);
      console.log(`Loaded SW colors data from ${path}`);
      break;
    }
  }
} catch (error) {
  console.error('Error loading SW colors data:', error);
}

// Create a server with the handler function
export default {
  port: 3001,
  hostname: '0.0.0.0',
  development: true,
  async fetch(req) {
    const url = new URL(req.url);
    console.log(`Received request: ${req.method} ${url.pathname}`);

    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    // Serve the main HTML file
    if ((url.pathname === '/' || url.pathname === '') && req.method === 'GET') {
      const filePath = join(__dirname, 'paint-visualizer-templates.html');
      const file = Bun.file(filePath);
      return new Response(file, {
        headers: {
          'Content-Type': 'text/html'
        }
      });
    }

    // Serve the Sherwin Williams colors JSON file
    if (url.pathname === '/src/data/sw_colors.json' && req.method === 'GET') {
      return new Response(JSON.stringify(swColorsData), {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      });
    }

    // API endpoint for color analysis
    if (url.pathname === '/api/analyze' && req.method === 'POST') {
      try {
        const data = await req.json();

        if (!data.image) {
          return new Response(
            JSON.stringify({ error: 'Image data is required' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }

        // Call OpenAI API to analyze the image
        console.log('Calling OpenAI API for color analysis...');
        try {
          const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
              {
                role: 'system',
                content: `You are a color analysis expert specializing in Sherwin-Williams paint colors for house exteriors and interiors.
                You have extensive knowledge of the entire Sherwin-Williams color palette, including their
                exact RGB values, undertones, and how they appear in different lighting conditions.

                CRITICAL INSTRUCTION: You must ONLY analyze colors of the house/building structure itself.
                DO NOT include or mention ANY colors for:
                - Lawns or grass
                - Trees or landscaping
                - Sky or clouds
                - Driveways or sidewalks
                - Any other non-house elements

                If you include ANY non-house elements in your analysis, your response will be considered incorrect.

                For each house element (siding, trim, door, shutters, etc.), suggest the most accurate matching Sherwin-Williams paint color.

                Format your response as follows:

                Color Matches:
                - SW [number] [color name] - [brief description] ([location])
                - SW [number] [color name] - [brief description] ([location])
                - SW [number] [color name] - [brief description] ([location])

                Paint Plan:
                [2-3 sentences describing how these colors work together and recommendations]

                IMPORTANT: In the Paint Plan section, ALWAYS use the FULL Sherwin-Williams color names (never abbreviate or truncate them) and always include the SW number in parentheses after each color name, for example: "Roycroft Bottle Green (SW2847)" or "Pure White (SW7005)".`
              },
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: 'Analyze ONLY the colors used on the house/building structure in this image. DO NOT include any colors for lawn, landscaping, sky, driveways, or any non-house elements. For each house element (siding, trim, door, shutters, etc.), suggest the most accurate matching Sherwin-Williams paint color. Be extremely precise with your color matching and consider the lighting conditions.'
                  },
                  {
                    type: 'image_url',
                    image_url: {
                      url: data.image,
                    }
                  }
                ]
              }
            ],
            max_tokens: 1000,
            temperature: 0.2, // Lower temperature for more consistent outputs
          });

          const analysis = response.choices[0].message.content;

          console.log('Analysis received from OpenAI');

          // Extract color matches from the analysis
          const colors = extractColorsFromAnalysis(analysis, swColorsData);

          return new Response(
            JSON.stringify({
              analysis: analysis,
              colors: colors
            }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        } catch (error) {
          console.error('OpenAI API error:', error);
          return new Response(
            JSON.stringify({ error: error.message || 'Failed to analyze image' }),
            {
              status: 500,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }
      } catch (error) {
        console.error('Error analyzing image:', error);
        return new Response(
          JSON.stringify({ error: error.message || 'Failed to analyze image' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // API endpoint for image generation
    if (url.pathname === '/api/generate' && req.method === 'POST') {
      try {
        const data = await req.json();

        if (!data.image || !data.prompt) {
          return new Response(
            JSON.stringify({ error: 'Image data and prompt are required' }),
            {
              status: 400,
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }

        console.log('Calling OpenAI API for image generation...');

        try {
          // Extract base64 data from the data URL
          let base64Data;
          let mimeType;

          if (data.image.startsWith('data:image')) {
            const parts = data.image.split(',');
            if (parts.length !== 2 || !parts[0].includes(';base64')) {
              throw new Error("Invalid data URL format");
            }
            const metaPart = parts[0].split(':')[1];
            mimeType = metaPart?.split(';')[0];
            base64Data = parts[1];
            console.log("Image data URL parsed successfully");
          } else {
            throw new Error("Invalid image data format: Expected data URL starting with 'data:image'.");
          }

          // Convert base64 to binary
          const binaryString = base64Decode(base64Data);
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }

          // Create a file from the binary data
          const imageFile = new File([bytes], "image.png", { type: mimeType });
          console.log("Image file created successfully");

          // Create FormData for the API request
          const formData = new FormData();
          formData.append("image", imageFile);
          formData.append("prompt", `Transform this space using the following color palette: ${data.prompt}. Make it photorealistic and maintain architectural integrity.`);
          formData.append("model", "gpt-image-1");
          formData.append("n", "1");
          formData.append("size", "1024x1024");
          formData.append("quality", "high");

          // Call the OpenAI API
          console.log("Sending request to OpenAI API...");
          const apiResponse = await fetch("https://api.openai.com/v1/images/edits", {
            method: "POST",
            headers: {
              'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: formData,
          });

          console.log("OpenAI API response status:", apiResponse.status);

          if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            console.error("OpenAI API Error Response:", errorData);
            throw new Error(`OpenAI API Error: ${errorData?.error?.message || apiResponse.statusText}`);
          }

          const successData = await apiResponse.json();
          console.log("OpenAI API call successful");

          // Get the base64 image data from the response
          const b64Json = successData.data?.[0]?.b64_json;
          if (!b64Json) {
            console.error("OpenAI success response missing b64_json data:", successData);
            throw new Error("Failed to get image data from OpenAI response structure");
          }

          // Create a data URL from the base64 data
          const imageUrl = `data:image/png;base64,${b64Json}`;
          console.log("Image URL created successfully");

          return new Response(
            JSON.stringify({
              image: imageUrl,
              prompt: data.prompt
            }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        } catch (error) {
          console.error('OpenAI API error:', error);

          // If the API call fails, fall back to returning the original image
          console.log('Falling back to original image due to API error');
          return new Response(
            JSON.stringify({
              image: data.image,
              prompt: data.prompt,
              message: `API Error: ${error.message}. Using original image as fallback.`
            }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            }
          );
        }
      } catch (error) {
        console.error('Error generating image:', error);
        return new Response(
          JSON.stringify({ error: error.message || 'Failed to generate image' }),
          {
            status: 500,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          }
        );
      }
    }

    // Handle 404 for all other routes
    return new Response('Not Found', {
      status: 404,
      headers: corsHeaders
    });
  }
};

// Function to extract color matches from the analysis text
function extractColorsFromAnalysis(analysis, swColors) {
  const colors = [];
  const lines = analysis.split('\n');
  let inColorMatches = false;

  console.log('Extracting colors from analysis...');

  lines.forEach(line => {
    if (line.toLowerCase().includes('color matches')) {
      inColorMatches = true;
      return;
    }

    if (line.toLowerCase().includes('paint plan')) {
      inColorMatches = false;
      return;
    }

    if (inColorMatches && line.trim().startsWith('- SW')) {
      // Try different regex patterns to match various formats
      let match = line.match(/- SW (\d+) ([^-]+)- ([^(]+)\(([^)]+)\)/);

      // If the first pattern doesn't match, try a simpler pattern
      if (!match) {
        match = line.match(/- SW (\d+) ([^-]+)(?:- ([^(]*))?(?:\(([^)]+)\))?/);
      }

      // If still no match, try an even more flexible pattern
      if (!match) {
        match = line.match(/SW (\d+) ([^(]+)(?:\(([^)]+)\))?/);
      }

      if (match) {
        const code = match[1].trim();
        const name = match[2].trim();
        const description = match[3] ? match[3].trim() : '';
        const location = match[4] ? match[4].trim() : '';

        // Look up the hex color from our SW colors database
        const swColorKey = `SW${code}`;
        const swColor = swColors[swColorKey];

        if (swColor) {
          console.log(`Found color in database: ${swColorKey} - ${name} - ${swColor.hex}`);
        } else {
          console.log(`Color not found in database: ${swColorKey} - ${name}`);

          // Try to find the color by name if code doesn't match
          const colorByName = Object.values(swColors).find(
            color => color.name.toLowerCase() === name.toLowerCase()
          );

          if (colorByName) {
            console.log(`Found color by name: ${colorByName.id} - ${colorByName.name} - ${colorByName.hex}`);
          }
        }

        // Try to find the color by name if code doesn't match
        let colorByName;
        if (!swColor) {
          colorByName = Object.values(swColors).find(
            color => color.name && name && color.name.toLowerCase() === name.toLowerCase()
          );
        }

        // Use the color from the database if found, otherwise use the color by name, or fallback to gray
        const finalColor = swColor || colorByName || { hex: '#CCCCCC' };

        colors.push({
          code,
          name,
          description,
          location,
          hex: finalColor.hex || (finalColor.rgb ? `#${finalColor.rgb}` : '#CCCCCC'),
          // Include the source of the color for debugging
          source: swColor ? 'database_by_code' : (colorByName ? 'database_by_name' : 'fallback')
        });
      }
    }
  });

  // Log the extracted colors for debugging
  console.log('Extracted colors:', JSON.stringify(colors, null, 2));

  return colors;
}

console.log('Server running at http://localhost:3001');
console.log('Open your browser to view the Paint Visualizer with Style Templates');
