// Check background theme accent
function isBackgroundDark() {
  const aoElement = document.querySelector(".bkK>.nH");
  if (!aoElement) return false;

  const bgColor = window.getComputedStyle(aoElement).backgroundColor;
  if (!bgColor) return false;

  const rgb = bgColor.match(/\d+/g);
  if (!rgb || rgb.length !== 3) return false;

  const [r, g, b] = rgb.map(Number);
  const brightness = (r * 0.299 + g * 0.587 + b * 0.114) / 255;

  // console.log(bgColor, [r,g,b], brightness);
  return brightness < 0.5;
}

// Function to add Secret buttons
function addSecretSection() {
  const emailRows = document.querySelectorAll("tr.zA");
  emailRows.forEach((row) => {
    if (!row.querySelector(".secret-container")) {
      try {
        // const contentElements = row.querySelectorAll(
        //   ".y2, .bog, .afn, .g2, .bqe, .btb",
        // );
        const contentElements = row.querySelectorAll(".y2, .bog");
        let emailBody = Array.from(contentElements)
          .map((el) => el.textContent)
          .join(" ");
        const secretCode = findSecret(emailBody);
        if (secretCode) {
          addSecretCodeContainer(row, secretCode);
        }
      } catch (error) {
        console.error(error);
      }
    }
  });
}

// Function to create and add the Secret Code container
function addSecretCodeContainer(row, secretCode) {
  const secretCodeContainer = document.createElement("div");
  secretCodeContainer.className = "secret-container";
  secretCodeContainer.style.cssText = `
    display: inline-flex;
    align-items: center;
    margin-right: 6px;
    color: black;
    position: relative;
  `;

  const codeSpan = document.createElement("span");
  codeSpan.textContent = secretCode;
  codeSpan.style.cssText = `
    background-color: #FFF0E6;
    border-radius: 3px;
    padding: 1px 4px;
    font-size: 0.95em;
    line-height: 1.4;
    font-weight: inherit;
  `;

  const button = createCopyButton();
  const hoverText = createHoverText();

  secretCodeContainer.appendChild(codeSpan);
  secretCodeContainer.appendChild(button);
  secretCodeContainer.appendChild(hoverText);

  addContainerBehavior(secretCodeContainer, button, hoverText, secretCode);

  // Find the correct insertion point
  const emailRow = row.querySelector(".xT");
  if (emailRow) {
    // Insert at the beginning of the email row, before any labels
    emailRow.insertBefore(secretCodeContainer, emailRow.firstChild);
  }

  // Set bold if the email is unread
  if (row.classList.contains("zE")) {
    codeSpan.style.fontWeight = "bold";
  }
}

// Function to create the copy button
function createCopyButton() {
  const button = document.createElement("button");
  button.className = "secret-copy-btn";
  button.innerHTML = `<img src="${chrome.runtime.getURL(
    iconUrl
  )}" width="16" height="16">`;

  button.style.cssText = `
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    vertical-align: middle;
    opacity: 0.7;
    transition: opacity 0.2s ease, filter 0.2s ease;
    margin-left: 2px;
  `;

  return button;
}

// Function to create the hover text
function createHoverText() {
  const hoverText = document.createElement("span");
  hoverText.textContent = "Copy Code";
  hoverText.style.cssText = `
      position: absolute;
      left: 100%;
      top: 50%;
      transform: translateY(-50%);
      background-color: #333;
      color: white;
      padding: 2px 4px;
      border-radius: 8px;
      font-size: 0.9em;
      white-space: nowrap;
      display: none;
      margin-left: 4px;
    `;
  return hoverText;
}

// Function to add behavior to the Secret container
function addContainerBehavior(container, button, hoverText, secretCode) {
  const copyCode = () => {
    copySecret(secretCode);
    hoverText.textContent = "Copied!";
    hoverText.style.backgroundColor = "#4E9252";
    hoverText.style.transition = "background-color 0.3s ease";
    setTimeout(() => {
      hoverText.textContent = "Copy Code";
      hoverText.style.backgroundColor = "#333";
    }, 1000);
  };

  container.onmouseover = () => {
    button.style.opacity = "1";
    button.querySelector("img").style.filter =
      "invert(40%) sepia(96%) saturate(1000%) hue-rotate(200deg) brightness(100%) contrast(105%)";
    hoverText.style.display = "block";
  };

  container.onmouseout = () => {
    button.style.opacity = "0.7";
    button.querySelector("img").style.filter = "none";
    hoverText.style.display = "none";
  };

  container.onclick = function (e) {
    e.stopPropagation();
    copyCode();
  };
}

function findSecret(emailBody, isBogContent = false) {
  // Normalize the email body
  const normalizedBody = emailBody.toLowerCase();

  // Define Secret-related keywords
  const secretKeywords = [
    "verification",
    "security",
    "access",
    "login",
    "one-time",
    "one time",
    "otp",
    "pin",
    "passcode",
    "password",
    "code",
    "authentication",
    "authenticate",
    "authorization",
    "confirm",
    "authorize",
    "verify",
    "validation",
    "coupon",
    "promo",
    "offer",
    "confirmation",
    "two-step",
    "number",
    "receipt",
    "promotion",
  ];

  // Find potential Secret codes based on the content type
  const potentialCodes =
    emailBody.match(/\b(?=.*\d)[-*A-Za-z0-9]{4,25}\b/g) || [];
  if (potentialCodes.length > 0) {
    console.log(potentialCodes);
  }

  // Define patterns to exclude
  const excludePatterns = [
    /\d+px/, // CSS pixel values
    /\d+em/, // CSS em values
    /\d+rem/, // CSS rem values
    /\d+%/, // Percentage values
    /head.*/,
    /rgb\(\d+,\s*\d+,\s*\d+\)/, // RGB color values
    /#[0-9A-Fa-f]{3,6}/, // Hex color values
    /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/, // IP addresses
    /\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{1,2}\b/, // Date patterns
    /\b\d{1,2}:\d{2}\b/, // Time patterns
    /\bhead\b|\bbody\b|\bhtml\b|\bscript\b|\bstyle\b/, // Common HTML tags
  ];

  // Score each potential code
  const scoredCodes = potentialCodes.map((code) => {
    let score = 0;
    const codeIndex = emailBody.indexOf(code);

    // Penalize codes that are only alphabets
    if (!/\d/.test(code) || excludePatterns.some(pattern => pattern.test(code))) {
      score -= 20;
    }

    // Check for nearby keywords
    secretKeywords.forEach((keyword) => {
      const keywordIndex = normalizedBody.indexOf(keyword);
      if (keywordIndex !== -1 && Math.abs(keywordIndex - codeIndex) < 200) {
        score += 10 - Math.floor(Math.abs(keywordIndex - codeIndex) / 20);
      }
    });

    // Prefer codes with more digits
    score += (code.match(/\d/g) || []).length * 2;

    // Prefer codes of typical special lengths (4 or 6 digits)
    // const codeLength = code.replace(/[\D-*]/g, "").length;
    // if (codeLength == 4 && codeLength == 6) {
    //   score += 10;
    // }

    // Reduce preference for codes that are part of phone numbers
    const surroundingText = emailBody.substring(
      Math.max(0, codeIndex - 10),
      codeIndex + code.length + 10
    );
    const isPhoneNumber = /\d{1,3}[-.\s]?\d{3}[-.\s]?\d{3,4}[-.\s]?\d{4}/.test(
      surroundingText
    );
    if (isPhoneNumber) {
      score -= 10;
    }

    // Penalize likely dates/years
    if (/^(19|20)\d{2}$/.test(code)) score -= 20;

    // Boost score for codes that appear after specific phrases
    const precedingText = emailBody
      .substring(Math.max(0, codeIndex - 50), codeIndex)
      .toLowerCase();
    if (
      precedingText.includes("your code is") ||
      precedingText.includes("verification code:")
    ) {
      score += 20;
    }

    return { code, score };
  });

  // Sort codes by score and get the highest scoring one
  scoredCodes.sort((a, b) => b.score - a.score);
  const bestMatch = scoredCodes[0];

  // Only return the code if it has a minimum score
  return bestMatch && bestMatch.score > 20 ? bestMatch.code : null;
}

function copySecret(code) {
  navigator.clipboard
    .writeText(code)
    .then(() => {
      console.log("Code copied to clipboard!");
    })
    .catch(() => {
      console.error("Failed to copy code. Please try again.");
    });
}

function observeEmailList() {
  const targetNode = document.querySelector(".AO");
  if (!targetNode) return;

  const config = { childList: true, subtree: true };
  const callback = function (mutationsList, observer) {
    addSecretSection();
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

// Initial run
const iconUrl = isBackgroundDark()
  ? "img/copy_icon_dark.svg"
  : "img/copy_icon_light.svg";

// Set up observer for dynamic content
observeEmailList();
