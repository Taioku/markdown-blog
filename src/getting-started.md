# Getting Started

Follow these simple steps to set up and use the Markdown File Reader.

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- Your markdown files

## Setup Instructions

### Step 1: Prepare Your Files

Place all your `.md` files in the `src` folder of this project.

### Step 2: Create a Manifest (Optional)

Create a `src/manifest.json` file to explicitly list your markdown files:

```json
{
  "files": [
    "README.md",
    "tutorial.md",
    "api-reference.md"
  ]
}
```

### Step 3: Open the Application

Simply open `index.html` in your web browser. No server setup required!

## File Organization Tips

- Use descriptive filenames
- Consider organizing by topics
- Common file names like `README.md`, `getting-started.md` are automatically detected

## Troubleshooting

### No Files Showing?

1. Make sure your `.md` files are in the `src` folder
2. Check that filenames are correct in `manifest.json`
3. Try using common filenames like `README.md`

### Content Not Loading?

- Ensure your browser supports modern JavaScript
- Check the browser console for error messages
- Verify file permissions

## Next Steps

Once everything is working, you can:

- Customize the CSS styling
- Add more markdown files
- Share the folder with others

Ready to start reading your markdown files! 🚀
