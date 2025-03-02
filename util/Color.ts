import { RefObject } from 'react';
import { Color as ThreeColor } from 'three'

export default class Color {
    red: number;
    green: number;
    blue: number;

    constructor(red: number, green: number, blue: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
    }

    static random(): Color {
        return new Color(Math.random() * 255, Math.random() * 255, Math.random() * 255);
    }

    static fromHex(hex: string): Color {
        const red = parseInt(hex.substring(1, 3), 16);
        const green = parseInt(hex.substring(3, 5), 16);
        const blue = parseInt(hex.substring(5, 7), 16);
        return new Color(red, green, blue);
    }

    static fromRGB(red: number, green: number, blue: number): Color {
        return new Color(red, green, blue);
    }

    toHex(): string {
        const r = Math.round(this.red);
        const g = Math.round(this.green);
        const b = Math.round(this.blue);
    
        return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
    }

    toRGB(): string {
        return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }

    toRGBA(alpha: number): string {
        return `rgba(${this.red}, ${this.green}, ${this.blue}, ${alpha})`;
    }

    static white(): Color {
        return new Color(255, 255, 255);
    }
    static black(): Color {
        return new Color(0, 0, 0);
    }
    static red(): Color {
        return new Color(255, 0, 0);
    }
    static green(): Color {
        return new Color(0, 255, 0);
    }
    static blue(): Color {
        return new Color(0, 0, 255);
    }
    static yellow(): Color {
        return new Color(255, 255, 0);
    }
    static cyan(): Color {
        return new Color(0, 255, 255);
    }
    static magenta(): Color {
        return new Color(255, 0, 255);
    }
    static orange(): Color {
        return new Color(255, 165, 0);
    }

    private toHSL(): { h: number, s: number, l: number } {
        const r = this.red / 255;
        const g = this.green / 255;
        const b = this.blue / 255;

        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h = 0, s;
        const l = (max + min) / 2;

        if (max === min) {
            h = s = 0; // achromatic
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        return { h: h * 360, s: s * 100, l: l * 100 };
    }

    // Convert HSL to RGB
    private static fromHSL(h: number, s: number, l: number): Color {
        h = h / 360;
        s = s / 100;
        l = l / 100;

        let r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = (p: number, q: number, t: number) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }

        return new Color(
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        );
    }

    // Shift the color to the next rainbow color
    shiftHue(amount: number = 30): Color {
        const hsl = this.toHSL();
        
        // Shift the hue by the specified amount
        hsl.h = (hsl.h + amount) % 360;
        
        // Keep saturation and lightness high for vibrant rainbow colors
        hsl.s = Math.max(hsl.s, 70);  // Maintain high saturation
        hsl.l = Math.max(Math.min(hsl.l, 60), 40);  // Keep lightness in sweet spot
        
        return Color.fromHSL(hsl.h, hsl.s, hsl.l);
    }

    // Helper method to start a rainbow sequence
    static rainbowStart(): Color {
        return Color.fromHSL(0, 100, 50);  // Start with pure red
    }

    darker(amount: number): Color {
        const factor = 1 - amount;
        return new Color(
            Math.max(0, Math.min(255, this.red * factor)),
            Math.max(0, Math.min(255, this.green * factor)),
            Math.max(0, Math.min(255, this.blue * factor))
        );
    }

    lighten(amount: number): Color {
        const factor = 1 + amount;
        return new Color(
            Math.max(0, Math.min(255, this.red * factor)),
            Math.max(0, Math.min(255, this.green * factor)),
            Math.max(0, Math.min(255, this.blue * factor))
        );
    }

    static fromThreeColor(color: ThreeColor): Color {
        return new Color(color.r * 255, color.g * 255, color.b * 255);
    }

    toThreeColor(): ThreeColor {
        return new ThreeColor(this.red / 255, this.green / 255, this.blue / 255);
    }

    static fromColorInputRef(ref: RefObject<HTMLInputElement | null>): Color {
        if (ref.current) {
            return Color.fromHex(ref.current.value);
        }
        return Color.black();
    }

}