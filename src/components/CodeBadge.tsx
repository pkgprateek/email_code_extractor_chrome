
import React, { useState } from 'react';

interface CodeBadgeProps {
    code: string;
}

export const CodeBadge: React.FC<CodeBadgeProps> = ({ code }) => {
    const [copied, setCopied] = useState(false);

    const [isHovered, setIsHovered] = useState(false);

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
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            title="Click to copy code"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                marginRight: '8px',
                backgroundColor: isHovered ? '#E6F4EA' : '#FFF0E6',
                borderRadius: '4px',
                padding: '0px 6px', // Reduced padding to fit height
                height: '22px', // Fixed height to match typical line height
                cursor: 'pointer',
                border: isHovered ? '1px solid #34A853' : '1px solid #FFDbb5',
                fontSize: '13px', // Slightly smaller to fit
                color: '#003366',
                fontWeight: 700,
                zIndex: 999,
                position: 'relative',
                transition: 'all 0.2s ease',
                boxShadow: isHovered ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                whiteSpace: 'nowrap'
            }}
        >
            <span style={{ marginRight: isHovered ? '4px' : '0' }}>{displayCode}</span>

            {/* Copy Label/Icon Container */}
            <span style={{
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                maxWidth: isHovered ? '50px' : '0px', // Slide in effect
                opacity: isHovered ? 1 : 0,
                transition: 'all 0.2s ease'
            }}>
                <span style={{
                    fontSize: '10px',
                    marginRight: '4px',
                    color: '#34A853',
                    fontWeight: 600
                }}>
                    {copied ? 'Copied' : 'Copy'}
                </span>
                {copied ? (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="green" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                ) : (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#34A853" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                )}
            </span>
        </div>
    );
};
