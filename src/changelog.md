# Changelog

All notable changes to the Markdown File Reader project will be documented in this file.

## [1.0.0] - 2025-08-14

### 🎉 Initial Release

This is the first version of the Markdown File Reader!

### Added
- **Core functionality** to read and display markdown files
- **Automatic file discovery** from the `src` folder
- **Manifest support** for explicit file listing
- **Beautiful responsive design** with modern CSS
- **Full markdown rendering** using marked.js library
- **Navigation system** with clickable file links
- **Error handling** for missing files and network issues

### Features Included
- Support for all standard markdown syntax
- Responsive design for mobile and desktop
- Clean, professional styling
- No server requirements - works with static files
- Browser compatibility with modern browsers

### Technical Implementation
- **HTML5** semantic structure
- **CSS3** with flexbox and grid layouts
- **Vanilla JavaScript** ES6+ with async/await
- **marked.js** for markdown parsing
- **Local file system** integration

## Roadmap

### Planned for v1.1.0
- [ ] Search functionality across files
- [ ] Dark mode theme toggle
- [ ] File favorites/bookmarking
- [ ] Print-friendly styles

### Planned for v1.2.0
- [ ] Table of contents generation
- [ ] File editing capabilities
- [ ] Export to PDF/HTML
- [ ] Custom themes support

### Planned for v2.0.0
- [ ] Folder structure navigation
- [ ] Multi-language support
- [ ] Plugin system
- [ ] Advanced search with filters

## Technical Notes

### Dependencies
- [marked.js](https://marked.js.org/) - Markdown parser and compiler
- No other external dependencies

### Browser Support
- Chrome/Chromium 60+
- Firefox 60+
- Safari 12+
- Microsoft Edge 79+

### File Structure
```
project/
├── index.html          # Main application file
├── styles.css          # Styling and layout
├── script.js           # Application logic
└── src/               # Markdown files directory
    ├── manifest.json   # Optional file list
    └── *.md           # Your markdown files
```

---

*Stay tuned for more updates and features!* 🚀
