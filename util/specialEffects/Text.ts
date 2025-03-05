import Color from "../Color";
import CanvasObject, { CanvasObjectProps } from "./CanvasObject";

interface TextProps extends CanvasObjectProps {
    text: string;
    textSize: number;
    outline?: {
        color: Color,
        width: number
    };
    remove?: {
        lifespan: number;
        deleteFn: () => void
    };
    rotate?: number;
    animate?: boolean;
}

export default class Text extends CanvasObject {
    text: string;
    textSize: number;
    outline?: {
        color: Color,
        width: number
    }
    remove?: {
        lifespan: number;
        deleteFn: () => void
    }
    rotate?: number;
    animate?: boolean;

    constructor({ text, textSize, outline, remove, rotate, animate = false, ...rest }: TextProps) {
        super(rest);
        this.text = text;
        this.textSize = textSize;
        this.outline = outline;
        this.remove = remove;
        this.rotate = rotate;
        this.animate = animate;
    }

    draw() {
        const { context, coordinates, color, text, textSize, outline, animate, rotate } = this;
        
        // Save the current context state
        context.save();
        
        if (animate) {
            // Calculate pulse and sway effects using time - increased animation speed (4x faster)
            const time = performance.now() / 250; // Changed from 1000 to 250 for faster animation
            
            // Pulse effect: vary size between 0.9x and 1.1x of original size
            const pulseScale = 0.1 * Math.sin(time * 2) + 1;
            const animatedSize = textSize * pulseScale;
            
            // Sway effect: rotate text slightly left and right (±0.05 radians)
            const swayAngle = 0.05 * Math.sin(time);
            
            // Set text properties to measure its dimensions
            context.font = `${animatedSize}px Arial`;
            
            // Measure text width to find the center
            const textMetrics = context.measureText(text);
            const textWidth = textMetrics.width;
            
            // Approximate text height (not perfect but works well enough)
            const textHeight = animatedSize * 0.7;
            
            // Move to text position, translate to center, then apply transformations
            context.translate(
                coordinates.x + textWidth / 2, 
                coordinates.y - textHeight / 2
            );
            context.rotate(swayAngle + (rotate || 0));
            
            // Draw text centered at origin
            context.fillStyle = color.toRGB();
            context.fillText(text, -textWidth / 2, textHeight / 2);
            
            // Apply outline if specified
            if (outline) {
                context.strokeStyle = outline.color.toRGB();
                context.lineWidth = outline.width;
                context.strokeText(text, -textWidth / 2, textHeight / 2);
            }
        } else {
            // Regular non-animated drawing
            context.font = `${textSize}px Arial`;
            context.fillStyle = color.toRGB();
            
            // Apply rotation if specified
            if (rotate) {
                // Measure text width to find the center
                const textMetrics = context.measureText(text);
                const textWidth = textMetrics.width;
                const textHeight = textSize * 0.7;
                
                context.translate(
                    coordinates.x + textWidth / 2, 
                    coordinates.y - textHeight / 2
                );
                context.rotate(rotate);
                context.fillText(text, -textWidth / 2, textHeight / 2);
                
                if (outline) {
                    context.strokeStyle = outline.color.toRGB();
                    context.lineWidth = outline.width;
                    context.strokeText(text, -textWidth / 2, textHeight / 2);
                }
            } else {
                context.fillText(text, coordinates.x, coordinates.y);
                
                if (outline) {
                    context.strokeStyle = outline.color.toRGB();
                    context.lineWidth = outline.width;
                    context.strokeText(text, coordinates.x, coordinates.y);
                }
            }
        }
        
        // Restore the context state to prevent side effects
        context.restore();
    }

    update() {
        this.draw();
        if (this.remove) {
            this.remove.lifespan--;
            if (this.remove.lifespan <= 0) {
                this.remove.deleteFn();
            }
        }
    }
}