# DevKit - Essential Developer Tools

A modern, elegant collection of developer utilities built with vanilla JavaScript, HTML, and CSS. No frameworks, no build process - just open and use.

![DevKit](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

## ✨ Features

DevKit provides a comprehensive suite of tools for developers, all wrapped in a beautiful dark-themed interface with smooth animations and intuitive navigation.

### 📝 Text Tools

- **Character Counter** - Real-time statistics for characters, words, lines, and paragraphs
- **Diff Checker** - Compare two text inputs with highlighted additions and deletions
- **Case Converter** - Convert text between 8 different formats:
  - UPPERCASE
  - lowercase
  - Title Case
  - Sentence case
  - camelCase
  - PascalCase
  - snake_case
  - kebab-case

### 💻 Code Tools

- **JSON Formatter** - Format, minify, and validate JSON with syntax highlighting
- **Markdown Preview** - Live markdown editor with real-time side-by-side preview
- **Base64 Encoder/Decoder** - Encode and decode Base64 strings
- **Bcrypt Hasher** - Generate and verify bcrypt password hashes with configurable rounds

### 🛠️ Utilities

- **Color Picker** - Pick colors and convert between HEX, RGB, HSL, and CMYK formats
- **UUID Generator** - Generate random UUIDs (v4), single or in batches of 10
- **Timestamp Converter** - Convert between Unix timestamps and human-readable dates
- **Lorem Ipsum Generator** - Generate placeholder text (paragraphs, sentences, or words)
- **QR Code Generator** - Create QR codes from text, URLs, or any content with customizable size and error correction

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge)
- No server required - runs entirely in the browser

### Installation

1. Download all three files:
   - `index.html`
   - `styles.css`
   - `app.js`

2. Place them in the same directory

3. Open `index.html` in your web browser

That's it! No build process, no dependencies to install.

## 📁 Project Structure

```
devkit/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── app.js             # JavaScript functionality
└── README.md          # This file
```

## 🎨 Design Philosophy

DevKit features a **refined dark theme** with careful attention to:

- **Typography** - Uses Lexend for UI and JetBrains Mono for code
- **Color Palette** - Indigo and purple gradients with thoughtful accent colors
- **Animations** - Smooth transitions and micro-interactions throughout
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Accessibility** - Proper contrast ratios and keyboard navigation

## 🔧 Technical Details

### Dependencies (CDN)

- **Marked.js** (v11.0.0+) - For markdown rendering
- **bcrypt.js** (v2.4.3) - For password hashing
- **QRCode.js** (v1.0.0) - For QR code generation

### Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Code Architecture

The application uses a modular JavaScript approach with separate objects for each tool:

```javascript
const characterCounter = { ... }
const diffChecker = { ... }
const caseConverter = { ... }
const jsonFormatter = { ... }
const markdownPreview = { ... }
const base64Tool = { ... }
const colorPicker = { ... }
const uuidGenerator = { ... }
const timestampConverter = { ... }
const bcryptHasher = { ... }
const loremIpsumGenerator = { ... }
const qrGenerator = { ... }
```

All tools are exposed through a global `tools` object for easy access.

## 📖 Usage Examples

### Character Counter
Simply type or paste text into the editor and watch the statistics update in real-time.

### JSON Formatter
```json
{"name":"DevKit","version":"1.0.0"}
```
Paste your JSON, click "Format" to beautify, or "Minify" to compress.

### Bcrypt Hasher
1. Enter a password
2. Choose rounds (10 recommended)
3. Click "Generate Hash"
4. Copy the hash for secure storage

To verify:
1. Enter the password
2. Paste the hash
3. Click "Verify Password"

### UUID Generator
- Click "Generate UUID" for a single UUID
- Click "Generate 10 UUIDs" for a batch
- Click the copy icon to copy to clipboard

### Color Picker
- Use the color picker or enter a HEX value
- All formats (RGB, HSL, CMYK) update automatically
- Perfect for design work and CSS development

### Lorem Ipsum Generator
1. Choose type (paragraphs, sentences, or words)
2. Set the count
3. Optionally start with "Lorem ipsum dolor sit amet"
4. Click "Generate" to create placeholder text
5. Copy to clipboard for use in your designs

### QR Code Generator
1. Enter your content (URL, text, phone number, etc.)
2. Choose size and error correction level
3. Click "Generate QR Code"
4. Download as PNG for use anywhere

## 🎯 Use Cases

- **Web Development** - Format JSON APIs, convert timestamps, generate UUIDs
- **Content Writing** - Count words and characters for content requirements
- **Security** - Hash passwords securely with bcrypt
- **Design** - Pick and convert colors between formats
- **Documentation** - Preview markdown before publishing
- **Data Processing** - Compare text differences, convert cases

## 🔐 Security Notes

- **Bcrypt Hasher** - All hashing happens client-side in your browser
- **No Data Transmission** - Nothing is sent to any server
- **Privacy First** - Your data never leaves your machine
- **Recommended Rounds** - Use 10-12 rounds for production password hashing

## 🎨 Customization

### Changing the Theme

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary: #6366f1;          /* Primary color */
    --secondary: #a855f7;        /* Secondary color */
    --bg-primary: #0f0f13;       /* Main background */
    --bg-secondary: #18181f;     /* Card background */
    --text-primary: #f8f9fa;     /* Primary text */
    /* ... more variables ... */
}
```

### Adding New Tools

1. Add navigation item in `index.html`
2. Create tool container with unique ID
3. Add tool object in `app.js`
4. Initialize in `DOMContentLoaded` event if needed

## 🐛 Known Issues

None currently. Please report any issues you encounter!

## 🤝 Contributing

Contributions are welcome! Since this is a simple vanilla JS project:

1. Fork the repository
2. Make your changes
3. Test in multiple browsers
4. Submit a pull request

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- **Marked.js** - For excellent markdown parsing
- **bcrypt.js** - For client-side bcrypt implementation
- **Google Fonts** - For Lexend and JetBrains Mono fonts

## 📞 Support

If you encounter any issues or have questions:
- Check the browser console for errors
- Ensure you have an active internet connection (for CDN resources)
- Try a different browser
- Clear your browser cache

## 🚦 Performance

DevKit is optimized for performance:
- **Lightweight** - Total size < 100KB (excluding CDN resources)
- **Fast Loading** - No build step, loads instantly
- **Efficient** - Uses CSS animations and transitions for smooth 60fps performance
- **Memory Conscious** - Cleans up resources and uses efficient algorithms

## 🔮 Future Enhancements

Potential features for future versions:
- [ ] Hash calculator (MD5, SHA-256, etc.)
- [ ] Image optimizer
- [ ] RegEx tester
- [ ] URL encoder/decoder
- [ ] CSS beautifier
- [ ] SQL formatter
- [ ] YAML/TOML converter
- [ ] Dark/Light theme toggle
- [ ] Code syntax highlighter
- [ ] HTML entity encoder/decoder

## 📊 Version History

### v1.0.0 (Current)
- Initial release
- 11 essential developer tools
- Modern dark theme
- Fully responsive design
- Zero build configuration

---

**Built with ❤️ using vanilla JavaScript, HTML, and CSS**

*No frameworks were harmed in the making of this application.*