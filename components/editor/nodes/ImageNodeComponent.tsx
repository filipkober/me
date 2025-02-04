"use client";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { CircleX, Minus, Plus, Scaling } from "lucide-react";
import Image from "next/image";
import { useRef, useState, useEffect, Suspense } from "react";
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface Props {
    src: string;
    alt: string;
    initialWidth: number;
    initialHeight: number;
    remove: () => void;
    setDimensions: (width: number, height: number) => void;
}

enum ResizeDirection {
    Top = "top",
    Right = "right",
    Bottom = "bottom",
    Left = "left",
    TopRight = "top-right",
    BottomRight = "bottom-right",
    BottomLeft = "bottom-left",
    TopLeft = "top-left"
}

export default function ImageNodeComponent({ src, alt, initialWidth, initialHeight, remove, setDimensions }: Props) {
    const [editor] = useLexicalComposerContext();
    const [resizing, setResizing] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);
    
    const isResizing = useRef(false);
    const currentResizeDirection = useRef<ResizeDirection | null>(null);
    const startPos = useRef({ x: 0, y: 0 });
    const startDimensions = useRef({ width: 0, height: 0 });

    const [parentRef, enableAnimations] = useAutoAnimate({duration: 150});

    const removeNode = () => {
        editor.update(() => {
            remove();
        });
    };

    const handleMouseDown = (e: React.MouseEvent, direction: ResizeDirection) => {
        e.preventDefault();
        isResizing.current = true;
        currentResizeDirection.current = direction;
        startPos.current = { x: e.clientX, y: e.clientY };
        startDimensions.current = { width, height };
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isResizing.current || !currentResizeDirection.current) return;

        const deltaX = e.clientX - startPos.current.x;
        const deltaY = e.clientY - startPos.current.y;

        switch (currentResizeDirection.current) {
            case ResizeDirection.Top:
                setHeight(startDimensions.current.height - deltaY);
                break;
            case ResizeDirection.Right:
                setWidth(startDimensions.current.width + deltaX);
                break;
            case ResizeDirection.Bottom:
                setHeight(startDimensions.current.height + deltaY);
                break;
            case ResizeDirection.Left:
                setWidth(startDimensions.current.width - deltaX);
                break;
            case ResizeDirection.TopRight:
                setWidth(startDimensions.current.width + deltaX);
                setHeight(startDimensions.current.height - deltaY);
                break;
            case ResizeDirection.BottomRight:
                setWidth(startDimensions.current.width + deltaX);
                setHeight(startDimensions.current.height + deltaY);
                break;
            case ResizeDirection.BottomLeft:
                setWidth(startDimensions.current.width - deltaX);
                setHeight(startDimensions.current.height + deltaY);
                break;
            case ResizeDirection.TopLeft:
                setWidth(startDimensions.current.width - deltaX);
                setHeight(startDimensions.current.height - deltaY);
                break;
        }
    };

    const handleMouseUp = () => {
        isResizing.current = false;
        currentResizeDirection.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        editor.update(() => {
            setDimensions(width, height);
        });
    }

    // Cleanup event listeners
    useEffect(() => {
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Suspense fallback={<div style={{ width, height }} className="flex justify-center items-center">
            <div className="animate-pulse bg-[hsl(var(--background)] rounded-lg" style={{ width: '50%', height: '50%' }}></div>
        </div>}>
        <div className="relative" 
            style={{ width, height }}
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => {
                setIsHovered(false);
                setResizing(false);
                enableAnimations(true);
            }}
            ref={parentRef}
            >
            {isHovered && <div className="absolute top-2 right-2 bg-[hsl(var(--background))] flex justify-center gap-2 p-2 z-10">
                <button 
                    className="bg-transparent aspect-square rounded-full p-[2px] my-auto" 
                    onClick={() => setResizing(isResizing => {
                        if (isResizing){
                            enableAnimations(true);
                            return false;
                        }
                        enableAnimations(false);
                        return true;
                    })}
                >
                    <Scaling className="hover:text-[hsl(var(--primary))] duration-200" />
                </button>
                <button 
                    className="bg-transparent aspect-square rounded-full p-[2px] my-auto" 
                    onClick={removeNode}
                >
                    <CircleX className="hover:text-[hsl(var(--destructive))] duration-200" />
                </button>
            </div>}
            <Image src={src} alt={alt} fill sizes={
                `(min-width: 640px) 640px, (min-width: 768px) 768px, (min-width: 1024px) 1024px, (min-width: 1280px) 1280px, 100vw`
            } />
            {resizing && (
                <div 
                    className="absolute top-0 left-0 flex justify-center items-center"
                    style={{ width, height }}
                >
                    <div 
                        className="absolute top-[-.75rem] left-[-.75rem] cursor-nw-resize" 
                        onMouseDown={(e) => handleMouseDown(e, ResizeDirection.TopLeft)}
                    >
                        <Plus />
                    </div>
                    <div 
                        className="absolute top-[-.75rem] cursor-n-resize"
                        onMouseDown={(e) => handleMouseDown(e, ResizeDirection.Top)}
                    >
                        <Minus />
                    </div>
                    <div 
                        className="absolute top-[-.75rem] right-[-.75rem] cursor-ne-resize"
                        onMouseDown={(e) => handleMouseDown(e, ResizeDirection.TopRight)}
                    >
                        <Plus />
                    </div>
                    <div 
                        className="absolute right-[-.75rem] rotate-90 cursor-e-resize"
                        onMouseDown={(e) => handleMouseDown(e, ResizeDirection.Right)}
                    >
                        <Minus />
                    </div>
                    <div 
                        className="absolute bottom-[-.75rem] right-[-.75rem] cursor-se-resize"
                        onMouseDown={(e) => handleMouseDown(e, ResizeDirection.BottomRight)}
                    >
                        <Plus />
                    </div>
                    <div 
                        className="absolute bottom-[-.75rem] cursor-s-resize"
                        onMouseDown={(e) => handleMouseDown(e, ResizeDirection.Bottom)}
                    >
                        <Minus />
                    </div>
                    <div 
                        className="absolute bottom-[-.75rem] left-[-.75rem] cursor-sw-resize"
                        onMouseDown={(e) => handleMouseDown(e, ResizeDirection.BottomLeft)}
                    >
                        <Plus />
                    </div>
                    <div 
                        className="absolute left-[-.75rem] rotate-90 cursor-w-resize"
                        onMouseDown={(e) => handleMouseDown(e, ResizeDirection.Left)}
                    >
                        <Minus />
                    </div>
                </div>
            )}
        </div>
        </Suspense>
    );
}