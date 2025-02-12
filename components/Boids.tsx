"use client";
import Boid from '@/util/boids/Boid';
import useAchievements from '@/util/hooks/useAchievements';
import React, { useEffect, useRef } from 'react';

const Boids = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rainbowBoidRef = useRef<Boid | null>(null);
  const {awardAchievement} = useAchievements();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas dimensions after component mounts
    const canvasDims = window.innerWidth * 0.35;
    canvas.width = canvasDims;
    canvas.height = canvasDims;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const boids: Boid[] = [];
    for (let i = 0; i < 100; i++) {
      const boid = new Boid(canvas.width, canvas.height, i === 31);
      boids.push(boid);
      if (i === 31) {
        rainbowBoidRef.current = boid;
      }
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

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const rainbowBoid = rainbowBoidRef.current;
    if (!canvas || !rainbowBoid) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Check if the click is within the bounds of the rainbow boid
    const boidSize = 10; // Assuming the boid size is 10, adjust as necessary
    if (
      x >= rainbowBoid.position.x - boidSize &&
      x <= rainbowBoid.position.x + boidSize &&
      y >= rainbowBoid.position.y - boidSize &&
      y <= rainbowBoid.position.y + boidSize
    ) {
      awardAchievement('67a7954828b1cdb939e06769');
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      className='rounded-full shadow-[0px_0px_40px_0px_rgba(138,_43,_226,_0.4),_inset_0px_0px_40px_0px_rgba(138,_43,_226,_0.4)]'
    />
  );
};

export default Boids;