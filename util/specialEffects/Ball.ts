import Color from "../Color";
import PhysicsObject from "./PhysicsObject";

interface BallProps {
    x: number;
    y: number;
    width: number;
    height: number;
    color: Color;
    context: CanvasRenderingContext2D;
    xVelocity?: number;
    yVelocity?: number;
    weight?: number;
    hasGravity?: boolean
}

class Ball extends PhysicsObject {
    constructor({ x, y, width, height, color, context, xVelocity, yVelocity, weight, hasGravity }: BallProps) {
        super({ x, y, width, height, color, context, xVelocity, yVelocity, hasGravity, weight });
    }

    public draw() {
        this.context.fillStyle = this.color.toRGB();
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        this.context.fill();
    }
}

export default Ball;