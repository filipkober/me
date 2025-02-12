import CanvasObject, { CanvasObjectProps } from "./CanvasObject";
import Star from "./Star";
import Vector from "../Vector";

interface ShootingStarProps extends CanvasObjectProps {
    speed: number;
    length: number;
    fade: number;
    deleteFn: () => void;
    angle: number;
    addObjectFn: (object: CanvasObject) => void;
}

export class ShootingStar extends CanvasObject {
    private angle: number;
    private speed: number;
    private length: number;
    private fade: number;
    private deleteFn: () => void;
    private addObjectFn: (object: CanvasObject) => void;

    constructor({ coordinates, width, height, color, context, speed, length, fade, deleteFn, angle, addObjectFn }: ShootingStarProps) {
        super({ coordinates, width, height, color, context });
        this.speed = speed;
        this.length = length;
        this.fade = fade;
        this.deleteFn = deleteFn;
        this.angle = angle;
        this.addObjectFn = addObjectFn;
    }

    public draw() {
        this.context.save();
        this.context.translate(this.coordinates.x, this.coordinates.y);
        this.context.rotate(this.angle);

        // draw a ball with a trail that gets smaller and more transparent
        this.drawHead();
        this.drawTrail();

        this.context.restore();
    }

    private drawHead() {
        this.context.beginPath();
        this.context.arc(0, 0, this.width, 0, Math.PI * 2);
        this.context.fillStyle = this.color.toRGBA(this.fade);
        this.context.fill();
    }

    private drawTrail() {
        this.context.rotate(Math.PI);
        
        // Create gradient for the cone
        const gradient = this.context.createLinearGradient(0, 0, this.length, 0);
        gradient.addColorStop(0, this.color.toRGBA(this.fade));
        gradient.addColorStop(1, this.color.toRGBA(0));

        // Draw the cone with smaller proportions
        this.context.beginPath();
        this.context.moveTo(0, -this.width);
        this.context.lineTo(this.length, -this.width/4);
        this.context.arc(this.length, 0, this.width/4, -Math.PI/2, Math.PI/2);
        this.context.lineTo(0, this.width);
        this.context.closePath();

        this.context.fillStyle = gradient;
        this.context.fill();

        this.length -= .5;
    }

    private shootSmallStar() {
        const oppositeAngle = this.angle + Math.PI;
        const spawnPosition = new Vector(this.coordinates.x, this.coordinates.y);
        
        const star = new Star({
            coordinates: spawnPosition,
            context: this.context,
            height: 3,
            width: 3,
            points: 5,
            velocity: new Vector(Math.cos(oppositeAngle), Math.sin(oppositeAngle)).mult(2),
            deleteFn: () => {},
            rainbow: false,
            color: this.color,
            fallThrough: true
        });

        setTimeout(() => star.startDeletion(), 1000);
        this.addObjectFn(star);
    }

    public update() {
        this.coordinates.x += Math.cos(this.angle) * this.speed;
        this.coordinates.y += Math.sin(this.angle) * this.speed;

        if (this.length <= 0) {
            this.deleteFn();
        }

        if (Math.random() < 0.01) {
            this.shootSmallStar();
        }

        this.draw();
    }
}