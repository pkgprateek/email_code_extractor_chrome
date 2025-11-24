
<img src="./public/img/preview.png" alt="CodeSnap for Gmail" style="display: block; margin: 0 auto;" width="200">

# CodeSnap for Gmail

Instantly copy OTPs and verification codes from Gmail without opening emails. A secure, privacy-focused Chrome extension that saves you time.

## Features

- **Instant Extraction**: Automatically finds and displays verification codes (OTP, 2FA) and discount codes next to the email subject.
- **One-Click Copy**: Copy codes to your clipboard with a single click.
- **Privacy First**: All processing happens locally on your device. No data is ever sent to external servers.
- **Smart Detection**: Uses advanced heuristics to distinguish between real codes and false positives (like phone numbers, dates, or email addresses).
- **Seamless Integration**: Works with Gmail's dark and light themes.

## Tech Stack

Built with modern industry-standard tools for performance, security, and maintainability:

- **React**: Declarative and robust UI components
- **TypeScript**: Type safety and code reliability
- **Vite**: Fast build pipeline
- **Vitest**: Unit testing for extraction logic
- **PNPM**: Efficient package management

## Installation

### From Chrome Web Store
Coming Soon

### Manual Installation (Developer Mode)

1.  Clone the repository
    ```bash
    git clone https://github.com/pkgprateek/codesnap-for-gmail.git
    cd codesnap-for-gmail
    ```

2.  Install dependencies
    ```bash
    pnpm install
    ```

3.  Build the project
    ```bash
    pnpm build
    ```

4.  Load into Chrome
    - Open Chrome and navigate to `chrome://extensions/`
    - Enable "Developer mode" in the top right corner
    - Click "Load unpacked"
    - Select the `dist` folder from the project directory

## Development

To start developing with live reload:

```bash
pnpm build --watch
```

### Running Tests

To verify the extraction logic:

```bash
pnpm test
```

## Privacy Policy

This extension operates entirely within your browser. It scans the DOM of the Gmail list view to identify potential codes. No email content is stored, transmitted, or shared with any external servers.

## Security

- **Manifest V3**: Uses the latest Chrome extension manifest for enhanced security
- **Minimal Permissions**: Only requests `activeTab` permission
- **No Network Requests**: All code execution happens locally
- **Content Security Policy**: Strict CSP prevents unauthorized script execution

## License

[MIT](LICENSE)
