# Email Code Extractor

A Chrome extension that automatically detects and extracts secret codes (like OTPs, verification codes, etc.) from your email messages, making it easier to copy and use them.

## Features

- Automatically scans email content for potential secret codes
- Displays detected codes prominently next to email subjects
- One-click copy functionality for easy code usage
- Works with various email formats and code types
- Adapts to light and dark email themes
- Prioritizes user privacy and security

## Installation

1. Clone this repository or download the ZIP file.
2. Open Chrome and go to `chrome://extensions`.
3. Enable "Developer mode" in the top right corner.
4. Click "Load unpacked" and select the extension directory.

## Usage

1. Once installed, navigate to your email client in Chrome and once hit hard refresh [Ctrl/Cmd + Shift + R] or restart chrome.
2. The extension will automatically scan your emails for secret codes.
3. If a code is detected, it will appear next to the email subject.
4. Click on the code or the copy icon to copy it to your clipboard.

## Privacy and Security
 
This extension prioritizes your privacy and security:

- It does not store or transmit any of your email data.
- All code detection and processing happens locally in your browser.
- No third-party libraries or services are used.
- Extension does not open or read the full content of your emails; it only scans - the visible email snippets on the page.
- No data is collected or stored beyond the current browser session.

## How It Works

The extension uses a sophisticated algorithm to detect potential secret codes:

1. It scans the visible text of email snippets on the page.
2. It looks for patterns that match common secret code formats (e.g., sequences of numbers and letters).
3. It uses context clues, like nearby keywords related to verification or authentication, to score the potential codes and improve accuracy.
4. It filters out common non-code patterns like CSS measurements, color codes, and dates.

## Contributing

Contributions to improve the extension are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Submit a pull request with a clear description of your changes.

## License

This project is licensed under the terms of the license file in the root directory of this project. See the LICENSE file for details.

## Support

If you encounter any issues or have questions, please open an issue on this GitHub repository.

## Disclaimer

This extension is not affiliated with or endorsed by any email service provider. Use it at your own discretion. Always verify the authenticity of any codes or links in your emails.
