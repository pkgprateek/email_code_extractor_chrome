
import { describe, it, expect } from 'vitest';
import { findSecret } from './extractor';

describe('findSecret', () => {
    it('extracts simple 6-digit OTP', () => {
        const text = "Your verification code is 123456";
        expect(findSecret(text)).toBe("123456");
    });

    it('extracts 4-digit PIN', () => {
        const text = "Your PIN is 9876. Do not share it.";
        expect(findSecret(text)).toBe("9876");
    });

    it('extracts alphanumeric code', () => {
        const text = "Use promo code SAVE20 for discount";
        expect(findSecret(text)).toBe("SAVE20");
    });

    it('ignores phone numbers', () => {
        const text = "Call us at 123-456-7890 for support";
        expect(findSecret(text)).toBe(null);
    });

    it('ignores dates', () => {
        const text = "Meeting on 2023-10-12";
        expect(findSecret(text)).toBe(null);
    });

    it('prioritizes code near keywords', () => {
        const text = "Order #55555. Your verification code is 999999.";
        // 999999 is near "verification code", 55555 is near "Order" (not in keyword list or less weight)
        expect(findSecret(text)).toBe("999999");
    });

    it('handles long codes', () => {
        const text = "Your access token is ABC123XYZ789";
        expect(findSecret(text)).toBe("ABC123XYZ789");
    });

    it('ignores CSS values', () => {
        const text = "width: 100px; height: 200px;";
        expect(findSecret(text)).toBe(null);
    });
});
