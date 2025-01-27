import Color from "../Color";
import Vector from "../Vector";

export default class Boid {

    position: Vector;
    velocity: Vector;
    acceleration: Vector;
    width: number;
    height: number;
    rainbow: boolean = false;
    color: Color = Color.white();
    spinAngle: number = 0;
    spinSpeed: number = 0.01;

    constructor(width: number, height: number, rainbow: boolean = false) {
        this.width = width;
        this.height = height;
        this.position = new Vector(Math.random() * width, Math.random() * height);
        this.velocity = new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1);
        this.velocity.setMag(Math.random() * 2 + 1);
        this.acceleration = new Vector(0, 0);
        this.rainbow = rainbow;
        if (this.rainbow) {
            this.color = Color.rainbowStart();
        }
    }

    update(boids: Boid[]) {
        this.acceleration = this.flock(boids);
        this.velocity = this.velocity.add(this.acceleration).limit(2);
        this.position = this.position.add(this.velocity);
        this.spinAngle += this.spinSpeed;
        this.bounceOffEdges();
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'white';

        if(this.rainbow) {
            this.color = this.color.shiftHue(1);
            ctx.fillStyle = this.color.toRGB();
        }
        
        ctx.beginPath();
        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.velocity.heading() + this.spinAngle);
        ctx.moveTo(0, -5);
        ctx.lineTo(-5, 5);
        ctx.lineTo(5, 5);
        ctx.closePath();
        ctx.restore();
        ctx.fill();
    }

    bounceOffEdges() {
        const center = new Vector(this.width / 2, this.height / 2);
        const radius = Math.min(this.width, this.height) / 2;
        const distanceFromCenter = this.position.distance(center);
        
        // Check if boid is outside the circular boundary
        if (distanceFromCenter > radius) {
            // Calculate the normal vector at the point of collision
            const normal = this.position.sub(center).normalize();
            
            // Reflect velocity around the normal vector
            // v' = v - 2(v·n)n where n is the normalized normal vector
            const dotProduct = this.velocity.dot(normal);
            const reflection = normal.mult(2 * dotProduct);
            this.velocity = this.velocity.sub(reflection);
            
            // Move boid back inside the boundary
            this.position = center.add(normal.mult(radius));
        }
    }

    flock(boids: Boid[]): Vector {
        const alignment = this.align(boids);
        const cohesion = this.cohere(boids);
        const separation = this.separate(boids);
        return alignment.add(cohesion).add(separation);
    }

    align(boids: Boid[]): Vector {
        const perceptionRadius = 50;
        const steering = new Vector(0, 0);
        let total = 0;
        for(const other of boids) {
            const distance = this.position.distance(other.position);
            if(other != this && distance < perceptionRadius) {
                steering.add(other.velocity);
                total++;
            }
        }
        if(total > 0) {
            steering.div(total);
            steering.setMag(2);
            steering.sub(this.velocity);
            steering.limit(0.1);
        }
        return steering;
    }

    cohere(boids: Boid[]): Vector {
        const perceptionRadius = 50;
        const steering = new Vector(0, 0);
        let total = 0;
        for(const other of boids) {
            const distance = this.position.distance(other.position);
            if(other != this && distance < perceptionRadius) {
                steering.add(other.position);
                total++;
            }
        }
        if(total > 0) {
            steering.div(total);
            steering.sub(this.position);
            steering.setMag(2);
            steering.sub(this.velocity);
            steering.limit(0.1);
        }
        return steering;
    }

    separate(boids: Boid[]): Vector {
        const perceptionRadius = 24;
        const steering = new Vector(0, 0);
        let total = 0;
        for(const other of boids) {
            const distance = this.position.distance(other.position);
            if(other != this && distance < perceptionRadius) {
                const diff = this.position.sub(other.position);
                diff.div(distance);
                steering.add(diff);
                total++;
            }
        }
        if(total > 0) {
            steering.div(total);
            steering.setMag(2);
            steering.sub(this.velocity);
            steering.limit(0.1);
        }
        return steering;
    }
}