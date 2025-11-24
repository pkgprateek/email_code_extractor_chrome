
<img src="public/img/preview.png" alt="Email Code Extractor Preview" style="display: block; margin: 0 auto; max-width:200px">


# Email Code Extractor

**Email Code Extractor** is a secure, privacy-focused Chrome extension that automatically detects and extracts OTPs, 2FA codes, and promo codes from your email list. Copy codes instantly without ever opening the email.


## 🚀 Features

- **Instant Extraction**: Automatically finds and displays verification codes (OTP, 2FA) and discount codes next to the email subject.
- **One-Click Copy**: Copy codes to your clipboard with a single click.
- **Privacy First**: All processing happens locally on your device. No data is ever sent to external servers.
- **Smart Detection**: Uses advanced heuristics to distinguish between real codes and false positives (like phone numbers or dates).
- **Dark Mode Support**: Seamlessly integrates with Gmail's dark and light themes.

## 🛠️ Tech Stack

Built with modern industry-standard tools for performance, security, and maintainability:

- **[React](https://react.dev/)**: For a declarative and robust UI.
- **[TypeScript](https://www.typescriptlang.org/)**: For type safety and code reliability.
- **[Vite](https://vitejs.dev/)**: For a blazing fast build pipeline.
- **[Vitest](https://vitest.dev/)**: For unit testing extraction logic.
- **[PNPM](https://pnpm.io/)**: Fast, disk-space efficient package manager.

## 📦 Installation

### From Chrome Web Store
*(Coming Soon)*

### Manual Installation (Developer Mode)

1.  **Clone the repository**
    ```bash
    git clone https://github.com/pkgprateek/email_code_extractor_chrome.git
    cd email_code_extractor_chrome
    ```

2.  **Install dependencies**
    ```bash
    pnpm install
    ```

3.  **Build the project**
    ```bash
    pnpm build
    ```

4.  **Load into Chrome**
    - Open Chrome and navigate to `chrome://extensions/`
    - Enable **"Developer mode"** in the top right corner.
    - Click **"Load unpacked"**.
    - Select the `dist` folder generated in the project directory.

## 💻 Development

To start developing and watch for changes:

```bash
pnpm build --watch
```

### Running Tests

To verify the extraction logic:

```bash
pnpm test
```

## 🔒 Privacy Policy

This extension operates entirely within your browser. It scans the DOM of the Gmail list view to identify potential codes. **No email content is stored, transmitted, or shared.**

## 📄 License

[MIT](LICENSE)
