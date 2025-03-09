import Vector from "./Vector";

export const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const randomFloat = (min: number, max: number) => {
    return Math.random() * (max - min) + min;
}

export const randomBool = () => {
    return Math.random() > 0.5;
}

export const randomElement = <T>(arr: T[]) => {
    return arr[randomInt(0, arr.length - 1)];
}

export const randomOffset = (value: number, offset: number) => {
    return randomInt(value - offset, value + offset);
}

export const randomOffsetVector = (vector: Vector, offset: number) => {
    return new Vector(randomOffset(vector.x, offset), randomOffset(vector.y, offset));
}