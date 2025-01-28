"use client";

export default function SpecialEffects({canvasRef}: {canvasRef: React.RefObject<HTMLCanvasElement | null>}) {

    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
  
    return (
    <canvas width={screenW} height={screenH} ref={canvasRef} className='pointer-events-none z-50 bg-transparent w-screen h-screen fixed top-0' />
  )
}
