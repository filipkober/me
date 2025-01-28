import Color from "../Color";
import Vector from "../Vector";
import CanvasObject from "./CanvasObject";

export interface PhysicsObjectProps {
    coordinates: Vector;
    width: number;
    height: number;
    color: Color;
    context: CanvasRenderingContext2D;
    velocity?: Vector;
    hasGravity?: boolean;
    weight?: number;
    friction?: number;
};

const STOP_MOVEMENT_THRESHOLD = 0.5;
const STOP_BOUNCE_THRESHOLD = 1;

type CallbackName = 'afterMove' | 'afterGravity' | 'afterBounce' | 'afterFriction';

abstract class PhysicsObject extends CanvasObject {
    protected velocity: Vector;
    protected hasGravity: boolean;
    protected weight: number;
    protected friction: number;
    private afterMove: Array<() => void> = [];
    private afterGravity: Array<() => void> = [];
    private afterBounce: Array<() => void> = [];
    private afterFriction: Array<() => void> = [];

    constructor({coordinates, width, height, color, context, velocity = Vector.zero(), hasGravity = true, weight = 0.1, friction = 1 }: PhysicsObjectProps) {
        super({ coordinates, width, height, color, context });
        this.velocity = velocity;
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
        if (this.coordinates.x + this.width > this.context.canvas.width) {
            this.coordinates.x = this.context.canvas.width - this.width;
            this.velocity.x *= -1;
        } else if (this.coordinates.x < 0) {
            this.coordinates.x = 0;
            this.velocity.x *= -1;
        }
    
        // Vertical collisions
        // Bottom edge
        if (this.coordinates.y + this.height > this.context.canvas.height) {
            this.coordinates.y = this.context.canvas.height - this.height; // Correct position
            if (Math.abs(this.velocity.y) < STOP_BOUNCE_THRESHOLD) {
                this.velocity.y = 0;
            } else {
                this.velocity.y *= -1; // Bounce
            }
        }
        // Top edge
        else if (this.coordinates.y < 0) {
            this.coordinates.y = 0; // Correct position
            this.velocity.y *= -1;
        }

        // Call afterBounce callbacks
        this.afterBounce.forEach(callback => callback());
    }

    private move() {
        this.coordinates.x += this.velocity.x;
        this.coordinates.y += this.velocity.y;

        // Call afterMove callbacks
        this.afterMove.forEach(callback => callback());
    }

    private gravity() {
        if (this.hasGravity) {
            this.velocity.y += this.weight;
        }

        // Call afterGravity callbacks
        this.afterGravity.forEach(callback => callback());
    }

    private applyFriction() {
        // Check if the object is on the ground (touching the bottom of the canvas)
        const isOnGround = this.coordinates.y + this.height >= this.context.canvas.height;
    
        // Apply friction to horizontal movement (x-axis) when on the ground
        if (isOnGround) {
            if (Math.abs(this.velocity.x) > STOP_MOVEMENT_THRESHOLD * 0.25) {
                // Reduce xVelocity by friction (dampen horizontal movement)
                this.velocity.x -= this.friction * Math.sign(this.velocity.x) * 0.25;
            } else {
                // Stop horizontal movement if velocity is below the threshold
                this.velocity.x = 0;
            }
        }
    
        // Optionally, apply friction to vertical movement (y-axis) when on the ground
        if (isOnGround && Math.abs(this.velocity.y) > STOP_MOVEMENT_THRESHOLD) {
            // Reduce yVelocity by friction (dampen vertical movement)
            this.velocity.y -= this.friction * Math.sign(this.velocity.y);
        } else if (isOnGround) {
            // Stop vertical movement if velocity is below the threshold
            this.velocity.y = 0;
        }

        // Call afterFriction callbacks
        this.afterFriction.forEach(callback => callback());
    }
    
}

export default PhysicsObject;