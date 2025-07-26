# ADIF Log Manager Pro

A modern, web-based amateur radio log manager for ADIF files with advanced filtering, duplicate detection, and export capabilities.

**⚠️ Early Development Notice:** This application is currently in early development. If you encounter any problems or have suggestions, please contact me via GitHub Issues.

## Features

- 📁 **Multi-file Upload**: Upload and merge multiple ADIF files
- 📊 **Statistics Dashboard**: View comprehensive log statistics
- 🔍 **Advanced Filtering**: Filter by date, time, callsign, band, and mode
- 📅 **Timeline Slider**: Interactive timeline for date range selection
- ⚠️ **Duplicate Detection**: Automatically detect and manage duplicate QSOs
- 💾 **Multiple Export Formats**: Export as ADIF, CSV, or text reports
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- No installation required - runs entirely in the browser

### Online Version

Visit the live demo at: `https://MishoMish.github.io/adif-log-manager-pro` (replace with your GitHub username)

### Local Usage

1. Download or clone this repository
2. Open `index.html` in your web browser
3. Upload one or more ADIF files using the file upload section
4. Click "Merge All Files" to process the files
5. Use the various filters to refine your view
6. Export your filtered data in your preferred format

### GitHub Pages Setup

**IMPORTANT**: You must enable GitHub Pages first before the workflow will work:

1. **Create a new repository on GitHub** and push your code:

   ```bash
   git remote add origin https://github.com/MishoMish/adif-log-manager-pro.git
   git push -u origin main
   ```

2. **Enable GitHub Pages**:

   - Go to your repository on GitHub
   - Click on **Settings** (top menu)
   - Scroll down to **Pages** (left sidebar)
   - Under **Source**, select **"GitHub Actions"**
   - Click **Save**

3. **Manual first deployment** (if the workflow fails):

   - Go to the **Actions** tab in your repository
   - Click on the failed workflow run
   - Click **"Re-run all jobs"**

4. **Your site will be available at**: `https://MishoMish.github.io/adif-log-manager-pro`

The workflow will automatically deploy your site whenever you push changes to the main branch.

## Project Structure

```
├── index.html              # Main HTML file
├── src/
│   ├── css/
│   │   └── styles.css      # Custom CSS styles
│   └── js/
│       ├── globals.js      # Global variables
│       ├── adifParser.js   # ADIF file parsing logic
│       ├── fileManager.js  # File upload and management
│       ├── timeline.js     # Timeline slider functionality
│       ├── filters.js      # Filtering and search logic
│       ├── duplicates.js   # Duplicate detection and removal
│       ├── statistics.js   # Statistics calculation
│       ├── export.js       # Export functionality
│       ├── ui.js          # UI utility functions
│       └── app.js         # Main application initialization
└── README.md              # This file
```

## Supported ADIF Fields

The application supports the following ADIF fields:

- QSO_DATE - Date of the QSO
- TIME_ON - Time the QSO started
- CALL - Callsign of the contacted station
- FREQ - Frequency in MHz
- BAND - Amateur radio band
- MODE - Transmission mode
- RST_SENT - Signal report sent
- RST_RCVD - Signal report received
- COMMENT - QSO comments
- COUNTRY - Country of the contacted station
- GRIDSQUARE - Grid square locator

## Browser Compatibility

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

Created by **LZ1MBO** for amateur radio operators worldwide.

## Support & Feedback

**This application is in early development.** For issues, questions, suggestions, or bug reports, please:

1. **Open a GitHub Issue** (recommended): [Create New Issue](https://github.com/MishoMish/adif-log-manager-pro/issues/new)
2. **Start a Discussion**: [GitHub Discussions](https://github.com/MishoMish/adif-log-manager-pro/discussions)

When reporting issues, please include:
- Browser type and version
- Steps to reproduce the problem
- Sample ADIF file (if the issue is file-specific)
- Screenshots if applicable

Your feedback helps improve this tool for the entire amateur radio community! 73!
