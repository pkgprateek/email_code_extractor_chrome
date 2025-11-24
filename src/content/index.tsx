
import React from 'react';
import { createRoot } from 'react-dom/client';
import { findSecret } from '../utils/extractor';
import { CodeBadge } from '../components/CodeBadge';

// Gmail selectors
const ROW_SELECTOR = "tr.zA";
const CONTENT_SELECTORS = ".y2, .bog"; // Subject and snippet
const CONTAINER_CLASS = "email-code-extractor-container";

function processRow(row: Element) {
    // Avoid re-processing
    if (row.querySelector(`.${CONTAINER_CLASS}`)) return;

    // Extract text
    const contentElements = row.querySelectorAll(CONTENT_SELECTORS);
    const emailBody = Array.from(contentElements)
        .map((el) => el.textContent)
        .join(" ");

    const secretCode = findSecret(emailBody);

    if (secretCode) {
        injectBadge(row, secretCode);
    }
}

function injectBadge(row: Element, code: string) {
    // Find insertion point - usually before the subject
    const targetContainer = row.querySelector(".xT");
    if (!targetContainer) return;

    const container = document.createElement("div");
    container.className = CONTAINER_CLASS;
    container.style.display = "inline-block";
    container.style.verticalAlign = "middle";

    // Insert before the first child of the target container
    targetContainer.insertBefore(container, targetContainer.firstChild);

    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <CodeBadge code={code} />
        </React.StrictMode>
    );
}

function observeEmailList() {
    const observer = new MutationObserver((mutations) => {
        let shouldScan = false;
        for (const mutation of mutations) {
            if (mutation.addedNodes.length > 0) {
                shouldScan = true;
                break;
            }
        }

        if (shouldScan) {
            const rows = document.querySelectorAll(ROW_SELECTOR);
            rows.forEach(processRow);
        }
    });

    const targetNode = document.querySelector("body");
    if (targetNode) {
        observer.observe(targetNode, { childList: true, subtree: true });
    }
}

// Initial scan
setTimeout(() => {
    const rows = document.querySelectorAll(ROW_SELECTOR);
    rows.forEach(processRow);
    observeEmailList();
}, 1000);
