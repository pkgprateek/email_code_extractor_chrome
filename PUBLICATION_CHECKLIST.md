# Publication Checklist for CodeSnap for Gmail

## ✅ Pre-Publication (COMPLETED)
- [x] Unpublished old extension
- [x] Archived old extension
- [x] Renamed to "CodeSnap for Gmail"
- [x] Updated all project files
- [x] Created release build: `codesnap-for-gmail-v2.0.0.zip`

## 📝 Next Steps

### 1. Commit and Push to GitHub
```bash
git add .
git commit -m "rebrand: rename to CodeSnap for Gmail

- Update extension name from Email Code Extractor to CodeSnap for Gmail
- Update all documentation and configuration files
- Rebuild release package v2.0.0
- Prepare for Chrome Web Store submission"

git push origin main
```

### 2. Rename GitHub Repository
1. Go to https://github.com/pkgprateek/email_code_extractor_chrome
2. Click "Settings" tab
3. Scroll to "Repository name"
4. Change to: `codesnap-for-gmail`
5. Click "Rename"

### 3. Create Screenshots (REQUIRED)
You need 3-5 screenshots (1280x800 or 640x400):

**Screenshot Ideas:**
1. **Main View**: Gmail inbox with code badges visible
2. **Hover State**: Badge showing "Copy" label on hover
3. **Copied State**: Badge showing "Copied!" confirmation
4. **Multiple Codes**: Inbox with several code badges
5. **Dark Mode** (optional): Same view in dark theme

**How to Create:**
- Open Gmail in Chrome
- Load the extension
- Use browser screenshot tools or Snipping Tool
- Crop to 1280x800 or 640x400

### 4. Submit to Chrome Web Store

#### A. Go to Developer Dashboard
https://chrome.google.com/webstore/devconsole

#### B. Click "New Item"

#### C. Upload Package
- Upload: `codesnap-for-gmail-v2.0.0.zip`

#### D. Fill Store Listing

**Name:**
```
CodeSnap for Gmail
```

**Short Description (132 char max):**
```
Instantly copy OTPs and verification codes from Gmail without opening emails. Privacy-focused and secure.
```

**Detailed Description:**
```
CodeSnap for Gmail is a privacy-focused Chrome extension that automatically detects and extracts verification codes (OTPs, 2FA codes, promo codes) from your Gmail inbox. Copy codes instantly without opening emails.

Key Features:
• Instant code detection next to email subjects
• One-click copy to clipboard
• Smart filtering to avoid false positives
• Works with Gmail's dark and light themes
• 100% local processing - no data leaves your browser

Privacy & Security:
• No data collection or transmission
• Minimal permissions (activeTab only)
• Open source code
• Manifest V3 compliant

How It Works:
The extension scans the visible text in your Gmail list view (subject lines and snippets) and uses intelligent pattern matching to identify verification codes. When a code is detected, a small badge appears next to the email subject. Click the badge to copy the code instantly.

Perfect for users who frequently receive OTPs, 2FA codes, or promotional codes and want a faster, more secure way to access them.
```

**Category:**
```
Productivity
```

**Language:**
```
English
```

**Privacy Policy URL:**
```
https://github.com/pkgprateek/codesnap-for-gmail/blob/main/PRIVACY.md
```

#### E. Upload Assets
- **Icon**: Already in package (128x128)
- **Screenshots**: Upload your 3-5 screenshots
- **Promotional Images** (optional):
  - Small tile: 440x280
  - Large tile: 920x680

#### F. Submit for Review
- Review all information
- Click "Submit for Review"
- Wait 1-3 business days

## 🎯 Post-Publication

### Monitor Reviews
- Respond to user feedback promptly
- Address any issues quickly
- Build positive reputation

### Marketing (Optional)
- Share on Twitter/LinkedIn
- Post on Product Hunt
- Share in relevant Reddit communities (r/chrome, r/productivity)

### Track Metrics
- Monitor installation count
- Watch for 1000+ downloads milestone
- Plan premium features when ready

## 📞 Support

If submission is rejected:
- Read rejection reason carefully
- Fix the issue
- Resubmit

Common rejection reasons:
- Missing privacy policy
- Unclear permissions justification
- Poor quality screenshots
- Misleading description

## ✨ You're Ready!

Everything is prepared. Just create screenshots and submit!
