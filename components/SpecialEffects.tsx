"use client";

import Vector from "@/util/Vector";
import { useEffect, useState } from "react";

export default function SpecialEffects({canvasRef}: {canvasRef: React.RefObject<HTMLCanvasElement | null>}) {

    const [screenSize, setScreenSize] = useState<Vector>(Vector.zero());
  
    useEffect(() => {
      if(window !== undefined) {
        setScreenSize(new Vector(window.innerWidth, window.innerHeight));
      }
    }, [])

    return (
    <canvas width={screenSize.x} height={screenSize.y} ref={canvasRef} className='pointer-events-none z-50 bg-transparent w-screen h-screen fixed top-0' />
  )
}
