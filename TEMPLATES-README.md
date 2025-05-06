# Paint Visualizer with Style Templates and AI Integration

This is an enhanced version of the Paint Visualizer that includes predefined style templates using Sherwin Williams colors and AI-powered features.

## Features

- Upload an image of your room or house
- Select from predefined style templates (interior and exterior)
- View the selected color palette with accurate Sherwin Williams colors
- Get detailed information about each color
- **AI Color Analysis**: Upload a photo of a house to analyze its current colors using GPT-4o
- **AI Visualization**: Generate a transformed image of your space with the selected color palette using GPT-Image-1

## How to Run

1. Make sure you have Bun installed on your system
2. Run the following command to start the server:

```bash
./run-templates.js
```

Or alternatively:

```bash
bun --hot template-server.js
```

3. Open your browser and navigate to http://localhost:3001

## Style Templates

The application includes several predefined style templates:

### Interior Templates

- Timeless Whites
- Warm & Welcoming
- Pottery Barn
- 2024 Blues & Greens

### Exterior Templates

- Traditional
- Modern
- Craftsman
- Spanish

Each template includes a selection of Sherwin Williams colors that work well together.

## Color Data

The application uses the complete Sherwin Williams color database from `sw_colors.json`. This ensures that all color information is accurate and up-to-date.

## Development

This version of the Paint Visualizer uses:

- HTML, CSS, and JavaScript (no framework)
- Bun for serving the application and handling API requests
- The Sherwin Williams color database
- Mock API endpoints for AI features (ready to be connected to real OpenAI APIs)

To modify the style templates, edit the `palettes` array in the `paint-visualizer-templates.html` file.

## AI Integration

The application includes two AI-powered features:

1. **Color Analysis with GPT-4o**

   - Upload a photo of a house
   - AI analyzes the image and identifies the prominent colors
   - Results show Sherwin Williams color matches
   - Click on a detected color to find matching palettes

2. **Image Generation with DALL-E 3**
   - Upload a photo of your space
   - Select a color palette
   - Add custom instructions (optional)
   - Generate a visualization of your space with the new colors

The application is now fully integrated with OpenAI's APIs:

1. **GPT-4o** for color analysis - Analyzes house photos and identifies Sherwin Williams color matches
2. **GPT-4o + GPT-Image-1** for image generation - Creates a two-step process:
   - First, GPT-4o analyzes the uploaded image and creates a detailed description
   - Then, GPT-Image-1 generates a new image based on that description with the selected colors

The OpenAI API key is loaded from the `.env` file in the project root.

## Next Steps

Future enhancements could include:

- Adding more style templates
- Adding the ability to create custom palettes
- Implementing color visualization directly on the uploaded image (without requiring DALL-E)
- Saving and sharing generated visualizations
- Adding user accounts to save favorite palettes and visualizations
- Optimizing API usage to reduce costs
