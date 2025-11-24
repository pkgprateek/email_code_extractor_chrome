
export interface ExtractedCode {
  code: string;
  score: number;
}

const SECRET_KEYWORDS = [
  "verification", "security", "access", "login", "one-time", "one time", "otp",
  "pin", "passcode", "password", "code", "authentication", "authenticate",
  "authorization", "confirm", "authorize", "verify", "validation", "coupon",
  "promo", "offer", "confirmation", "two-step", "number", "receipt", "promotion"
];

const EXCLUDE_PATTERNS = [
  /\d+px/i, // CSS pixel values
  /\d+em/i, // CSS em values
  /\d+rem/i, // CSS rem values
  /\d+%/i, // Percentage values
  /head.*/i,
  /rgb\(\d+,\s*\d+,\s*\d+\)/i, // RGB color values
  /#[0-9A-Fa-f]{3,6}/, // Hex color values
  /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, // IP addresses
  /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}\b/i, // Date patterns
  /\b\d{1,2}:\d{2}\b/, // Time patterns
  /\b\d{1,2}(?::\d{2})?\s*(?:am|pm)\b/i, // Time with AM/PM (e.g., 8am, 8:30pm)
  /\b\d+(?:\.\d+)?\s*[kKmMbB]\b/, // Currency/Number suffixes (e.g., 100M, 10k)
  /gmt[-+]\d+/i, // Timezones (e.g., GMT-5)
  /\b\d+-\d+\b/, // Number ranges (e.g., 25-26)
  /\b\d+-(?:month|year|day|week|hour|minute)s?\b/i, // Duration patterns (e.g., 1-month, 3-days)
  /\b\d+(?:st|nd|rd|th)\b/i, // Ordinal numbers (e.g., 21st, 2nd, 3rd)
  /^time$/i, // Standalone "Time" word
  /\bhead\b|\bbody\b|\bhtml\b|\bscript\b|\bstyle\b/i, // Common HTML tags
  /^\d{4}-\d{2}-\d{2}$/, // ISO Date
  /^\d{1,2}\/\d{1,2}\/\d{2,4}$/, // Date with slashes
];

export function findSecret(text: string): string | null {
  if (!text) return null;

  const normalizedText = text.toLowerCase();

  // Regex to find potential codes: 4-25 chars, must contain at least one digit
  // Improved to avoid matching common words by ensuring mixed case or digits
  const potentialCodes = text.match(/\b(?=.*\d)[-*A-Za-z0-9]{4,25}\b/g) || [];

  if (potentialCodes.length === 0) return null;

  const scoredCodes: ExtractedCode[] = potentialCodes.map((code) => {
    let score = 0;
    const codeIndex = text.indexOf(code);

    // 1. Basic Validation
    // Penalize if it matches exclude patterns
    if (EXCLUDE_PATTERNS.some(pattern => pattern.test(code))) {
      score -= 50;
    }

    // Penalize if purely alphabetic (should be caught by regex but double check)
    if (!/\d/.test(code)) {
      score -= 20;
    }

    // 2. Context Analysis (Keywords)
    // Check for nearby keywords within a window
    const windowSize = 100;
    const start = Math.max(0, codeIndex - windowSize);
    const end = Math.min(text.length, codeIndex + code.length + windowSize);
    const context = normalizedText.substring(start, end);

    SECRET_KEYWORDS.forEach((keyword) => {
      if (context.includes(keyword)) {
        // Higher score if keyword is closer
        score += 10;
      }
    });

    // 3. Code Structure
    const digitCount = (code.match(/\d/g) || []).length;
    score += digitCount * 2; // More digits is usually better for OTPs

    // Boost specific lengths common for OTPs
    const cleanLength = code.replace(/[^a-zA-Z0-9]/g, "").length;
    if (cleanLength === 4 || cleanLength === 6 || cleanLength === 8) {
      score += 15;
    }

    // 4. Negative Heuristics
    // Phone number detection (simple heuristic)
    const surroundingText = text.substring(
      Math.max(0, codeIndex - 10),
      codeIndex + code.length + 10
    );
    if (/\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(surroundingText)) {
      score -= 20;
    }

    // Email address detection: check if followed immediately by @
    if (text[codeIndex + code.length] === '@') {
      score -= 50;
    }

    // Year detection (19xx or 20xx)
    if (/^(19|20)\d{2}$/.test(code)) {
      score -= 30;
    }

    // 5. Strong Signals
    const precedingText = text.substring(Math.max(0, codeIndex - 50), codeIndex).toLowerCase();
    if (precedingText.includes("code is") || precedingText.includes("verification code") || precedingText.includes("otp")) {
      score += 30;
    }

    // Boost purely numeric codes (common for OTPs)
    if (/^\d+$/.test(code)) {
      score += 10;
    }

    return { code, score };
  });

  // Sort codes by score descending
  scoredCodes.sort((a, b) => b.score - a.score);

  const bestMatch = scoredCodes[0];

  // Higher threshold to reduce false positives
  if (bestMatch && bestMatch.score > 20) {
    return bestMatch.code;
  }

  return null;
}
