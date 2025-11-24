# Chrome Web Store Submission Guide

## Store Listing Information

### Extension Name
CodeSnap for Gmail

### Short Description (132 characters max)
Instantly copy OTPs and verification codes from Gmail without opening emails. Privacy-focused and secure.

### Detailed Description

CodeSnap for Gmail is a privacy-focused Chrome extension that automatically detects and extracts verification codes (OTPs, 2FA codes, promo codes) from your Gmail inbox. Copy codes instantly without opening emails.

**Key Features:**
- Instant code detection next to email subjects
- One-click copy to clipboard
- Smart filtering to avoid false positives
- Works with Gmail's dark and light themes
- 100% local processing - no data leaves your browser

**Privacy & Security:**
- No data collection or transmission
- Minimal permissions (activeTab only)
- Open source code
- Manifest V3 compliant

**How It Works:**
The extension scans the visible text in your Gmail list view (subject lines and snippets) and uses intelligent pattern matching to identify verification codes. When a code is detected, a small badge appears next to the email subject. Click the badge to copy the code instantly.

Perfect for users who frequently receive OTPs, 2FA codes, or promotional codes and want a faster, more secure way to access them.

### Category
Productivity

### Language
English

### Privacy Policy URL
https://github.com/pkgprateek/codesnap-for-gmail/blob/main/PRIVACY.md

## Required Assets

### Icons
- ✅ 16x16: `public/img/icon16.png`
- ✅ 32x32: `public/img/icon32.png`
- ✅ 48x48: `public/img/icon48.png`
- ✅ 96x96: `public/img/icon96.png`
- ✅ 128x128: `public/img/icon128.png`

### Screenshots (1280x800 or 640x400)
You need to create 3-5 screenshots showing:
1. Extension in action - code badge visible next to email
2. Hover state showing "Copy" label
3. After clicking - "Copied" confirmation
4. Multiple codes in inbox view
5. (Optional) Dark mode support

### Promotional Images (Optional but Recommended)
- Small tile: 440x280
- Large tile: 920x680
- Marquee: 1400x560

## Pre-Submission Checklist

- [x] Manifest V3 compliant
- [x] Privacy policy created
- [x] README updated
- [x] All permissions justified
- [x] No external network requests
- [x] Code minified and optimized
- [ ] Screenshots created
- [ ] Store listing description finalized
- [ ] Test in multiple Gmail accounts
- [ ] Test in incognito mode

## Submission Steps

1. **Create Developer Account**
   - Go to https://chrome.google.com/webstore/devconsole
   - Pay one-time $5 registration fee

2. **Prepare Build**
   - Run `pnpm build`
   - Zip the `dist` folder: `cd dist && zip -r ../extension.zip .`

3. **Upload Extension**
   - Click "New Item" in Chrome Web Store Developer Dashboard
   - Upload `extension.zip`
   - Fill in store listing information
   - Upload screenshots and icons

4. **Submit for Review**
   - Review all information
   - Submit for review (typically takes 1-3 days)

## Post-Publication

- Monitor reviews and respond to user feedback
- Track installation metrics
- Plan future updates based on user needs
