# Markdown File Reader

Welcome to the **Markdown File Reader** application! This is a simple yet powerful tool that allows you to read and display markdown files directly in your web browser.

## Features

- 📁 Reads markdown files from the `src` folder using a manifest
- 🔗 Creates clickable hyperlinks for each markdown file
- 📖 Displays markdown content formatted as HTML
- 🎨 Beautiful, responsive design with dark mode
- 🌙 Dark/light theme toggle
- � Table of contents generation
- �🚀 No server required - works with static files

## How It Works

1. The application reads a `manifest.json` file to know which markdown files are available
2. Each file listed in the manifest appears as a clickable link in the navigation
3. When clicked, the markdown content is loaded and rendered as formatted HTML
4. A table of contents is automatically generated from headers

## Why a Manifest File?

Due to browser security restrictions, web applications cannot directly scan folder contents. The `manifest.json` file serves as an index that tells the application which markdown files exist in the `src` folder. This approach:

- ✅ Works in all browsers without special permissions
- ✅ Allows you to control which files are displayed
- ✅ Enables custom ordering of files
- ✅ Works with static file hosting (GitHub Pages, Netlify, etc.)

## Supported Markdown Features

- Headers (H1-H6)
- **Bold** and *italic* text
- Lists (ordered and unordered)
- Links and images
- Code blocks and inline `code`
- Blockquotes
- Tables
- And much more!

## Getting Started

### 1. Add Your Markdown Files
Place your `.md` files in the `src` folder alongside this README.

### 2. Create a Manifest File
Create a `manifest.json` file in the `src` folder that lists your markdown files:

```json
{
  "files": [
    "README.md",
    "getting-started.md",
    "features.md",
    "changelog.md"
  ]
}
```

### 3. Open the Application
Open `index.html` in your web browser. The application will read the manifest and display your files in the navigation sidebar.

### Manifest File Format
- **files**: Array of markdown filenames (relative to the `src` folder)
- Files will appear in the navigation in the order listed
- Only files listed in the manifest will be accessible through the UI

*Happy reading!* 📚
