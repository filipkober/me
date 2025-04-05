import { useCallback, useEffect, useRef } from "react";
import CanvasObject from "../specialEffects/CanvasObject";
// import Ball from "../specialEffects/Ball";
import Star from "../specialEffects/Star";
import Text from "../specialEffects/Text";
import Vector from "../Vector";
import { FloatingCoin } from "../specialEffects/FloatingCoin";
import Color from "../Color";
import { ShootingStar } from "../specialEffects/ShootingStar";
import { randomInt } from "../randomUtils";
// import Color from "../Color";

export type ShootStarProps = {
    x: number;
    y: number;
    size?: number;
}

export type DrawTextProps = {
    coordinates: Vector;
    text: string;
    size: number;
    color: Color;
    lifespan?: number;
    outline?: {
        color: Color;
        width: number;
    };
    animate?: boolean;
}

export const useSpecialEffects = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const objectsRef = useRef<CanvasObject[]>([]);
    const stopShootingStars = useRef<() => void>(null);
    const activeShootingStars = useRef<Vector[]>([]);
    const MIN_STAR_DISTANCE = 100; // minimum pixels between stars

    const getContext = useCallback(() => {
        if (!canvasRef.current) {
            return null;
        }
        return canvasRef.current.getContext("2d");
    }, [canvasRef]);

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

    const drawCoin = useCallback((x: number, y: number, size: number) => {
        const ctx = getContext();
        if (!ctx || !canvasRef.current) return;

        const coin = new FloatingCoin({
            coordinates: new Vector(x, y),
            context: ctx,
            height: size,
            width: size,
            lifespan: 100,
            color: Color.yellow(),
            deleteFn: () => removeObject(coin.id)
        });

        addObject(coin);
    }, [addObject, getContext, removeObject]);

    const isPositionValid = (pos: Vector) => {
        return !activeShootingStars.current.some(starPos => 
            Math.hypot(starPos.x - pos.x, starPos.y - pos.y) < MIN_STAR_DISTANCE
        );
    };

    const removeStarPosition = (pos: Vector) => {
        activeShootingStars.current = activeShootingStars.current.filter(
            starPos => starPos !== pos
        );
    };

    const startStarShower = useCallback(() => {
        const ctx = getContext();
        if (!ctx || !canvasRef.current) return;

        const starShower = setInterval(() => {
            const attempts = 10; // Max attempts to find valid position
            const starsToSpawn = randomInt(3, 8)
            
            for(let i = 0; i < starsToSpawn; i++) {
                let validPosition: Vector | null = null;
                
                // Try to find valid position
                for(let attempt = 0; attempt < attempts; attempt++) {
                    const isTopEdge = Math.random() > 0.5;
                    const x = isTopEdge ? Math.random() * window.innerWidth : 0;
                    const y = isTopEdge ? 0 : Math.random() * window.innerHeight;
                    const testPos = new Vector(x, y);
                    
                    if (isPositionValid(testPos)) {
                        validPosition = testPos;
                        break;
                    }
                }

                if (validPosition) {
                    const size = randomInt(3, 5);
                    activeShootingStars.current.push(validPosition);

                    const shootingStar: ShootingStar = new ShootingStar({
                        coordinates: validPosition,
                        context: ctx,
                        height: size,
                        width: size,
                        speed: 1/(size*0.1),
                        length: randomInt(150, 200),
                        fade: 0.3,
                        deleteFn: () => {
                            removeObject(shootingStar.id);
                            removeStarPosition(validPosition);
                        },
                        angle: Math.PI / 4,
                        color: Color.white(),
                        addObjectFn: addObject
                    });
                    setTimeout(() => addObject(shootingStar), randomInt(0, 400));
                }
            }
        }, randomInt(800, 1400));

        stopShootingStars.current = () => {
            clearInterval(starShower);
            activeShootingStars.current = [];
        };

        return () => {
            clearInterval(starShower);
            activeShootingStars.current = [];
        };
    }, [getContext, removeObject, addObject]);

    const drawText = useCallback(({ text, coordinates, size, color, lifespan, outline, animate }: DrawTextProps) => {
        const ctx = getContext();
        if (!ctx || !canvasRef.current) return;

        const textObject = new Text({
            coordinates,
            context: ctx,
            height: size,
            width: size,
            text,
            textSize: size,
            color,
            remove: lifespan ? {
                lifespan,
                deleteFn: () => removeObject(textObject.id)
            } : undefined,
            outline,
            animate

        });

        addObject(textObject);
        
    }, [addObject, getContext, removeObject]);

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

    return { canvasRef, clearCanvas, shootStar, addObject, removeObject, drawCoin, startStarShower, stopShootingStars, drawText };
}

export type UseSpecialEffectsReturnType = ReturnType<typeof useSpecialEffects>;