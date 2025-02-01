import Color from "../Color";
import Vector from "../Vector";
import PhysicsObject from "./PhysicsObject";

interface BallProps {
    coordinates: Vector;
    width: number;
    height: number;
    color: Color;
    context: CanvasRenderingContext2D;
    velocity: Vector;
    weight?: number;
    hasGravity?: boolean
}

class Ball extends PhysicsObject {
    constructor({ coordinates, width, height, color, context, velocity, weight, hasGravity }: BallProps) {
        super({ coordinates, width, height, color, context, velocity, hasGravity, weight });
    }

    public draw() {
        this.context.fillStyle = this.color.toRGB();
        this.context.beginPath();
        this.context.arc(this.coordinates.x, this.coordinates.y, this.width, 0, Math.PI * 2);
        this.context.fill();
    }
}

export default Ball;