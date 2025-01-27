import { v4 } from 'uuid';
import Color from '../Color';

export interface CanvasObjectProps {
    x: number;
    y: number;
    width: number;
    height: number;
    color: Color;
    context: CanvasRenderingContext2D;
}

abstract class CanvasObject {
    protected x: number;
    protected y: number;
    protected width: number;
    protected height: number;
    protected color: Color;
    protected context: CanvasRenderingContext2D;
    public id: string = v4();

    constructor({ x, y, width, height, color, context }: CanvasObjectProps) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.context = context;
    }

    public abstract draw(): void;

    public abstract update(): void;
}

export default CanvasObject;