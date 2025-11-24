
import React, { useState } from 'react';

interface CodeBadgeProps {
    code: string;
}

export const CodeBadge: React.FC<CodeBadgeProps> = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent opening email
        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const displayCode = code.length > 6 ? `${code.substring(0, 6)}...` : code;

    return (
        <div
            className="email-code-extractor-badge"
            onClick={handleCopy}
            title="Click to copy code"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginRight: '8px',
                backgroundColor: '#FFF0E6',
                borderRadius: '4px',
                padding: '2px 6px',
                cursor: 'pointer',
                border: '1px solid #FFDbb5',
                fontSize: '12px',
                color: '#333',
                fontWeight: 500,
                zIndex: 999,
                position: 'relative',
                transition: 'all 0.2s ease'
            }}
        >
            <span style={{ marginRight: '4px' }}>{displayCode}</span>
            <span style={{
                display: 'flex',
                alignItems: 'center',
                opacity: 0.7
            }}>
                {copied ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                )}
            </span>
        </div>
    );
};
