import Color from "../Color";
import CanvasObject from "./CanvasObject";

export interface PhysicsObjectProps {
    x: number;
    y: number;
    width: number;
    height: number;
    color: Color;
    context: CanvasRenderingContext2D;
    xVelocity?: number;
    yVelocity?: number;
    hasGravity?: boolean;
    weight?: number;
    friction?: number;
}

const STOP_MOVEMENT_THRESHOLD = 0.5;
const STOP_BOUNCE_THRESHOLD = 1;

type CallbackName = 'afterMove' | 'afterGravity' | 'afterBounce' | 'afterFriction';

abstract class PhysicsObject extends CanvasObject {
    protected xVelocity: number;
    protected yVelocity: number;
    protected hasGravity: boolean;
    protected weight: number;
    protected friction: number;
    private afterMove: Array<() => void> = [];
    private afterGravity: Array<() => void> = [];
    private afterBounce: Array<() => void> = [];
    private afterFriction: Array<() => void> = [];

    constructor({ x, y, width, height, color, context, xVelocity = 0, yVelocity = 0, hasGravity = true, weight = 0.1, friction = 1 }: PhysicsObjectProps) {
        super({ x, y, width, height, color, context });
        this.xVelocity = xVelocity;
        this.yVelocity = yVelocity;
        this.hasGravity = hasGravity;
        this.weight = weight;
        this.friction = friction;
    }

    public update() {
        this.move();
        this.gravity();
        this.bounceOffEdges();
        this.applyFriction();
        this.draw();
    }

    public registerCallback(callbackName: CallbackName, callback: () => void) {
        this[callbackName].push(callback);
    }

    private bounceOffEdges() {
        // Horizontal collisions
        if (this.x + this.width > this.context.canvas.width) {
            this.x = this.context.canvas.width - this.width;
            this.xVelocity *= -1;
        } else if (this.x < 0) {
            this.x = 0;
            this.xVelocity *= -1;
        }
    
        // Vertical collisions
        // Bottom edge
        if (this.y + this.height > this.context.canvas.height) {
            this.y = this.context.canvas.height - this.height; // Correct position
            if (Math.abs(this.yVelocity) < STOP_BOUNCE_THRESHOLD) {
                this.yVelocity = 0;
            } else {
                this.yVelocity *= -1; // Bounce
            }
        }
        // Top edge
        else if (this.y < 0) {
            this.y = 0; // Correct position
            this.yVelocity *= -1;
        }

        // Call afterBounce callbacks
        this.afterBounce.forEach(callback => callback());
    }

    private move() {
        this.x += this.xVelocity;
        this.y += this.yVelocity;

        // Call afterMove callbacks
        this.afterMove.forEach(callback => callback());
    }

    private gravity() {
        if (this.hasGravity) {
            this.yVelocity += this.weight;
        }

        // Call afterGravity callbacks
        this.afterGravity.forEach(callback => callback());
    }

    private applyFriction() {
        // Check if the object is on the ground (touching the bottom of the canvas)
        const isOnGround = this.y + this.height >= this.context.canvas.height;
    
        // Apply friction to horizontal movement (x-axis) when on the ground
        if (isOnGround) {
            if (Math.abs(this.xVelocity) > STOP_MOVEMENT_THRESHOLD * 0.25) {
                // Reduce xVelocity by friction (dampen horizontal movement)
                this.xVelocity -= this.friction * Math.sign(this.xVelocity) * 0.25;
            } else {
                // Stop horizontal movement if velocity is below the threshold
                this.xVelocity = 0;
            }
        }
    
        // Optionally, apply friction to vertical movement (y-axis) when on the ground
        if (isOnGround && Math.abs(this.yVelocity) > STOP_MOVEMENT_THRESHOLD) {
            // Reduce yVelocity by friction (dampen vertical movement)
            this.yVelocity -= this.friction * Math.sign(this.yVelocity);
        } else if (isOnGround) {
            // Stop vertical movement if velocity is below the threshold
            this.yVelocity = 0;
        }

        // Call afterFriction callbacks
        this.afterFriction.forEach(callback => callback());
    }
    
}

export default PhysicsObject;