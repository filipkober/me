export default class Vector {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(v: Vector): Vector {
        return new Vector(this.x + v.x, this.y + v.y);
    }

    sub(v: Vector): Vector {
        return new Vector(this.x - v.x, this.y - v.y);
    }

    mult(n: number): Vector {
        return new Vector(this.x * n, this.y * n);
    }

    div(n: number): Vector {
        return new Vector(this.x / n, this.y / n);
    }

    mag(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    setMag(n: number): Vector {
        return this.normalize().mult(n);
    }

    normalize(): Vector {
        return this.div(this.mag());
    }

    limit(max: number): Vector {
        if (this.mag() > max) {
            return this.setMag(max);
        }
        return this;
    }

    distance(v: Vector): number {
        return Math.sqrt((this.x - v.x) * (this.x - v.x) + (this.y - v.y) * (this.y - v.y));
    }

    copy(): Vector {
        return new Vector(this.x, this.y);
    }

    static random2D(): Vector {
        const angle = Math.random() * Math.PI * 2;
        return new Vector(Math.cos(angle), Math.sin(angle));
    }

    heading(): number {
        return Math.atan2(this.y, this.x);
    }

    dot(v: Vector): number {
        return this.x * v.x + this.y * v.y;
    }
}