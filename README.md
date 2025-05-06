# Color Analyzer & Paint Visualizer

A powerful tool for analyzing images, finding matching Sherwin-Williams paint colors, and visualizing paint colors on spaces using advanced color matching algorithms and AI.

## Features

### Color Analyzer

- Upload images to analyze colors
- AI-powered color identification using OpenAI's GPT-4o
- Advanced color matching using perceptually uniform color spaces
- Complete Sherwin-Williams color database with 1,526 colors
- Responsive user interface for desktop and mobile

### Paint Visualizer with Style Templates

- Browse through curated interior and exterior Sherwin Williams color palettes
- Analyze house photos to identify current colors using GPT-4o
- Generate transformed images with selected color palettes using GPT-Image-1
- Create visualizations with custom prompts without selecting a palette
- Stacked layout for easy browsing of interior and exterior palettes

## Technologies

- **Bun**: Fast JavaScript runtime for server and build processes
- **TypeScript**: Type-safe code for better development experience
- **OpenAI API**:
  - GPT-4o for image analysis and color detection
  - GPT-Image-1 for generating visualizations
- **CIEDE2000**: Perceptually uniform color matching algorithm
- **HTML/CSS/JavaScript**: Frontend for the Paint Visualizer with Style Templates

## Getting Started

### Prerequisites

- Bun 1.0.0 or higher
- OpenAI API key

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/color-analyzer.git
   cd color-analyzer
   ```

2. Install dependencies:

   ```bash
   bun install
   ```

3. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key
   ```

### Running the Application

#### Color Analyzer

Start the development server:

```bash
bun dev
```

The Color Analyzer will be available at http://localhost:3000.

#### Paint Visualizer with Style Templates

Run the Paint Visualizer:

```bash
./run-templates.js
```

The Paint Visualizer will be available at http://localhost:3001.

### Building for Production

Build the Color Analyzer:

```bash
bun build
```

Start the production server:

```bash
bun start
```

## Usage

### Color Analyzer

1. Open the Color Analyzer in your browser (http://localhost:3000)
2. Upload an image by dragging and dropping or clicking the upload area
3. Click "Analyze Colors" to process the image
4. View the matching Sherwin-Williams colors and paint plan

### Paint Visualizer with Style Templates

1. Open the Paint Visualizer in your browser (http://localhost:3001)
2. Upload a room photo in the first section
3. Optionally, enter a custom prompt and click "Generate Custom Visualization"
4. Or, upload a house photo in the second section to analyze its colors
5. Select a color palette from the interior or exterior options
6. Click "Apply Selected Palette" to see the color swatches
7. Click "Generate Visualization" to create an AI-generated visualization

## How It Works

### Color Analyzer

1. The user uploads an image to the application
2. The image is sent to OpenAI's GPT-4o API for analysis
3. The API identifies colors in the image and suggests matching Sherwin-Williams colors
4. The application processes the results and displays them to the user
5. For colors not found in the database, the application uses advanced color matching algorithms to find the closest match

### Paint Visualizer

1. For color analysis, the application sends the image to GPT-4o to identify colors
2. The detected colors are matched with the Sherwin Williams database
3. For visualization, the application uses GPT-Image-1 to generate a new image
4. The visualization is based on either a selected palette or a custom prompt

## License

This project is licensed under the MIT License - see the LICENSE file for details.
