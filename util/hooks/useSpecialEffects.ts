import { useCallback, useEffect, useRef } from "react";
import CanvasObject from "../specialEffects/CanvasObject";
// import Ball from "../specialEffects/Ball";
import Star from "../specialEffects/Star";
import Vector from "../Vector";
// import Color from "../Color";

export type ShootStarProps = {
    x: number;
    y: number;
    size?: number;
}

export const useSpecialEffects = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const objectsRef = useRef<CanvasObject[]>([])

    const getContext = useCallback(() => {
        if (!canvasRef.current) {
            console.error("Canvas not found");
            return null;
        }
        return canvasRef.current.getContext("2d");
    }, []);

    const addObject = useCallback((object: CanvasObject) => {
        objectsRef.current.push(object);
    }, [])

    const removeObject = useCallback((toDelete: string) => {
        objectsRef.current = objectsRef.current.filter(obj => obj.id !== toDelete)
    }, [])

    const clearCanvas = useCallback(() => {
        const ctx = getContext();
        if (ctx && canvasRef.current) {
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        }
    }, [getContext]);

    const shootStar = useCallback(({x, y, size = 10}: ShootStarProps) => {
        const ctx = getContext();
        if (!ctx || !canvasRef.current) return;

        const randomVector = Vector.random2D();

        const star = new Star({
            coordinates: new Vector(x, y),
            context: ctx,
            height: size,
            width: size,
            points: 5,
            velocity: randomVector.mult(4),
            deleteFn: () => removeObject(star.id),
            rainbow: true
        });

        setTimeout(() => {
            if(star) {
                star.startDeletion();
            }
        }, 1000)

        addObject(star);
    }, [addObject, getContext, removeObject])

    // loop
    useEffect(() => {
        const ctx = getContext();
        if (!ctx || !canvasRef.current) return;

        let animationFrameId: number;

        const loop = () => {
            clearCanvas();

            objectsRef.current.forEach(object => {
                object.update();
            });

            animationFrameId = requestAnimationFrame(loop);
        };

        loop();

        return () => {
            if(animationFrameId) {
                cancelAnimationFrame(animationFrameId)
            }
        }
    }, [clearCanvas, getContext]);

    return { canvasRef, clearCanvas, shootStar, addObject, removeObject };
}