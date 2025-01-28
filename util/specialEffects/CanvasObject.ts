import { v4 } from 'uuid';
import Color from '../Color';
import Vector from '../Vector';

export interface CanvasObjectProps {
    coordinates: Vector;
    width: number;
    height: number;
    color: Color;
    context: CanvasRenderingContext2D;
}

abstract class CanvasObject {
    protected coordinates: Vector;
    protected width: number;
    protected height: number;
    protected color: Color;
    protected context: CanvasRenderingContext2D;
    public id: string = v4();

    constructor({ coordinates, width, height, color, context }: CanvasObjectProps) {
        this.coordinates = coordinates;
        this.width = width;
        this.height = height;
        this.color = color;
        this.context = context;
    }

    public abstract draw(): void;

    public abstract update(): void;
}

export default CanvasObject;