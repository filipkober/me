import Color from "../Color";
import Vector from "../Vector";
import PhysicsObject from "./PhysicsObject";

type StarProps = {
    coordinates: Vector;
    width: number;
    height: number;
    color?: Color;
    context: CanvasRenderingContext2D;
    velocity: Vector;
    weight?: number;
    hasGravity?: boolean;
    points: number;
    deleteFn?: () => void;
    rainbow?: boolean;
    fallThrough?: boolean;
}

const threshold = 0.2;
const speed_threshold = 2;

class Star extends PhysicsObject {
    private points: number;
    private rotation: number = 0;
    private opacity: number = 1;
    private deletion_started: boolean = false;
    private rainbow: boolean;

    constructor({ coordinates, width, height, color = Color.rainbowStart(), context, velocity, weight, hasGravity, points, deleteFn, rainbow = false, fallThrough = false }: StarProps) {
        super({ coordinates, width, height, color, context, velocity, hasGravity, weight, fallThrough });
        this.points = points;
        this.rainbow = rainbow;
        this.registerCallback('afterMove', this.rotateAccordingToVelocity.bind(this));

        if (deleteFn) {
            this.registerCallback('afterFriction', this.deleteIfTooSlow.bind(this, deleteFn));
        }
    }

    private rotateAccordingToVelocity() {
        // Adjust rotation based on velocity
        if (Math.abs(this.velocity.x) > threshold || Math.abs(this.velocity.y) > threshold) {
            this.rotation += Math.atan2(this.velocity.y, this.velocity.x) * 0.01 * Math.sign(this.velocity.x);
            this.rotation += 0.05 * Math.sign(this.velocity.x);
        }
        this.rotation %= Math.PI * 2;
    }

    public startDeletion() {
        this.deletion_started = true
    };

    private deleteIfTooSlow(deleteFn: () => void) {
        const magnitude = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
        if (magnitude < speed_threshold && this.velocity.y < 0) {
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
        this.context.translate(this.coordinates.x, this.coordinates.y);
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

        if(this.rainbow) {
            this.color = this.color.shiftHue(this.velocity.mag());
        }
    }
}

export default Star;