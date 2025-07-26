# ADIF Log Manager Pro

A modern, web-based amateur radio log manager for ADIF files with advanced filtering, duplicate detection, and export capabilities.

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

To enable GitHub Pages for your repository:

1. Go to your repository settings on GitHub
2. Navigate to the "Pages" section
3. Under "Source", select "GitHub Actions"
4. The site will automatically deploy when you push to the main branch

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

Created for amateur radio operators worldwide.

## Support

For issues, questions, or suggestions, please open an issue on GitHub.
