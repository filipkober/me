import Color from "../Color";
import PhysicsObject from "./PhysicsObject";

type StarProps = {
    x: number;
    y: number;
    width: number;
    height: number;
    color: Color;
    context: CanvasRenderingContext2D;
    xVelocity?: number;
    yVelocity?: number;
    weight?: number;
    hasGravity?: boolean;
    points: number;
    deleteFn?: () => void;
}

const threshold = 0.2;
const speed_threshold = 2;

class Star extends PhysicsObject {
    private points: number;
    private rotation: number = 0;
    private opacity: number = 1;
    private deletion_started: boolean = false;

    constructor({ x, y, width, height, color, context, xVelocity, yVelocity, weight, hasGravity, points, deleteFn }: StarProps) {
        super({ x, y, width, height, color, context, xVelocity, yVelocity, hasGravity, weight });
        this.points = points;
        this.registerCallback('afterMove', this.rotateAccordingToVelocity.bind(this));

        if (deleteFn) {
            this.registerCallback('afterFriction', this.deleteIfTooSlow.bind(this, deleteFn));
        }
    }

    private rotateAccordingToVelocity() {
        // Adjust rotation based on velocity
        if (Math.abs(this.xVelocity) > threshold || Math.abs(this.yVelocity) > threshold) {
            this.rotation += Math.atan2(this.yVelocity, this.xVelocity) * 0.01 * Math.sign(this.xVelocity);
            this.rotation += 0.05 * Math.sign(this.xVelocity);
        }
        this.rotation %= Math.PI * 2;
    }

    public startDeletion() {
        this.deletion_started = true
    };

    private deleteIfTooSlow(deleteFn: () => void) {
        const magnitude = Math.sqrt(this.xVelocity ** 2 + this.yVelocity ** 2);
        if (magnitude < speed_threshold && this.yVelocity < 0) {
            this.deletion_started = true;
        }
        if (this.deletion_started && this.opacity > 0) {
            this.opacity -= 0.025;
        } else if (this.deletion_started && this.opacity <= 0) {
            deleteFn();
        }
    }

    public draw() {
        this.context.save();
        this.context.translate(this.x, this.y);
        this.context.rotate(this.rotation);
        this.context.fillStyle = this.color.toRGBA(this.opacity);
        this.context.globalAlpha = this.opacity;
        this.context.beginPath();
        this.context.moveTo(0, -this.height / 2);
        for (let i = 1; i < this.points * 2; i++) {
            const angle = Math.PI / this.points * i;
            const r = i % 2 === 0 ? this.width / 2 : this.width;
            this.context.lineTo(r * Math.sin(angle), -r * Math.cos(angle));
        }
        this.context.closePath();
        this.context.fill();
        this.context.restore();
    }
}

export default Star;