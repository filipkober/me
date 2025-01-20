"use client";
import Boid from '@/util/boids/Boid';
import React, { useEffect, useRef } from 'react';

const Boids = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions after component mounts
    const canvasDims = window.innerWidth * 0.35;
    canvas.width = canvasDims
    canvas.height = canvasDims
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const boids: Boid[] = [];
    for (let i = 0; i < 100; i++) {
      boids.push(new Boid(canvas.width, canvas.height, i === 31));
    }

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (const boid of boids) {
        boid.update(boids);
        boid.draw(ctx);
      }
      requestAnimationFrame(draw);
    }

    // Start animation
    draw();

    // Cleanup function to cancel animation when component unmounts
    return () => {
      cancelAnimationFrame(requestAnimationFrame(draw));
    };
  }, []); // Remove canvasRef from dependencies as it's stable

  return (
    <canvas 
      ref={canvasRef}
      className='rounded-full shadow-[0px_0px_40px_0px_rgba(138,_43,_226,_0.4),_inset_0px_0px_40px_0px_rgba(138,_43,_226,_0.4)]'
    />
  );
};

export default Boids;