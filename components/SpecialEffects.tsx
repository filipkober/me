"use client";

import { useSpecialEffects } from '@/util/hooks/useSpecialEffects';
import React, { useEffect } from 'react'

export default function SpecialEffects() {

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    const { canvasRef, shootStar } = useSpecialEffects();

    useEffect(() => {
        window.onclick = (e) => {
            shootStar({x: e.clientX, y: e.clientY});
            shootStar({x: e.clientX, y: e.clientY});
            shootStar({x: e.clientX, y: e.clientY});
            shootStar({x: e.clientX, y: e.clientY});
            shootStar({x: e.clientX, y: e.clientY});
            shootStar({x: e.clientX, y: e.clientY});
        };

        return () => {
            window.onclick = null;
        }
    }, [shootStar])
  
    return (
    <canvas width={screenW} height={screenH} ref={canvasRef} className='pointer-events-none z-50 bg-transparent w-screen h-screen fixed top-0' />
  )
}
