import CanvasObject, {CanvasObjectProps} from "./CanvasObject";

interface FloatingCoinProps extends CanvasObjectProps {
    lifespan: number;
    deleteFn: () => void;
}

export class FloatingCoin extends CanvasObject {
    private lifespan: number;
    private angle: number = 0;
    private scale: number = 1;
    private scaleDirection: number = 1;
    private deleteFn: () => void;

    constructor({ coordinates, width, height, color, context, lifespan, deleteFn }: FloatingCoinProps) {
        super({ coordinates, width, height, color, context });
        this.lifespan = lifespan;
        this.deleteFn = deleteFn;
    }

    public draw() {
        this.context.save();
        this.context.translate(this.coordinates.x, this.coordinates.y);
        
        const apparentWidth = Math.abs(Math.cos(this.angle) * this.width);
        
        // Base gradient (darker in middle)
        const baseGradient = this.context.createRadialGradient(0, 0, this.width * 0.3, 0, 0, this.width);
        baseGradient.addColorStop(0, this.color.darker(0.2).toRGB());
        baseGradient.addColorStop(0.7, this.color.toRGB());
        baseGradient.addColorStop(1, this.color.darker(0.1).toRGB());

        // Draw main coin shape
        this.context.scale(this.scale, this.scale);
        this.context.beginPath();
        this.context.fillStyle = baseGradient;
        this.context.ellipse(0, 0, apparentWidth, this.height * 1.2, 0, 0, Math.PI * 2);
        this.context.fill();

        // Add shine effect that moves with rotation
        const shineWidth = this.width * 0.8;
        const shineGradient = this.context.createLinearGradient(
            -shineWidth/2, -shineWidth/2,
            shineWidth/2, shineWidth/2
        );
        const shimmerPos = (Math.sin(this.angle) + 1) / 2; // Convert angle to 0-1 range
        shineGradient.addColorStop(Math.max(0, shimmerPos - 0.1), 'rgba(255,255,255,0)');
        shineGradient.addColorStop(shimmerPos, 'rgba(255,255,255,0.3)');
        shineGradient.addColorStop(Math.min(1, shimmerPos + 0.1), 'rgba(255,255,255,0)');

        // Apply shine
        this.context.fillStyle = shineGradient;
        this.context.fill();

        // Add edge shadow
        if (Math.cos(this.angle) < 0) {
            this.context.strokeStyle = 'rgba(0,0,0,0.3)';
            this.context.lineWidth = 2;
            this.context.stroke();
        }

        this.context.restore();
        this.lifespan--;

        if (this.lifespan <= 0) {
            this.deleteFn();
        }
    }

    public update() {
        this.coordinates.y -= 2;
        this.angle += 0.08; // Slower spin
        this.scale += this.scaleDirection * 0.01;

        if (this.scale >= 1.2 || this.scale <= 0.8) {
            this.scaleDirection *= -1;
        }

        this.draw();
    }
}