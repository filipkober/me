"use client";
import { useState, useRef, ReactNode, ComponentType } from 'react';

const CircularNavigation = ({ items = [], centerComponent: CenterComponent }: {items: ReactNode[], centerComponent: ComponentType}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [CIRCLE_RADIUS] = useState(400);
 
  // Define fixed positions for the 6 items
  const positions = [
    { angle: -60, radius: CIRCLE_RADIUS }, // About Me (bottom right)
    { angle: 150, radius: CIRCLE_RADIUS }, // Blog (left)
    { angle: 30, radius: CIRCLE_RADIUS },  // Portfolio (top right)
    { angle: 60, radius: CIRCLE_RADIUS },  // Fun (right)
    { angle: -30, radius: CIRCLE_RADIUS }, // Tools (top)
    { angle: -150, radius: CIRCLE_RADIUS } // Secrets (bottom left)
  ];

  const getItemPosition = (index: number) => {
    const position = positions[index];
    const angleInRadians = position.angle * (Math.PI / 180);
    
    return {
      x: Math.cos(angleInRadians) * position.radius,
      y: Math.sin(angleInRadians) * position.radius
    };
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative"
    >
      {/* Purple circle background */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-purple-900/20" />
      
      {/* Center component */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
        {CenterComponent && <CenterComponent />}
      </div>
     
      {/* Navigation items */}
      {items.map((item, index) => {
        const { x, y } = getItemPosition(index);
        return (
          <div 
            key={index} 
            className="absolute left-1/2 top-1/2 transform"
            style={{ 
              transform: `translate(${x}px, ${y}px)`,
              transition: 'transform 0.3s ease-in-out'
            }}
          >
            {item}
          </div>
        );
      })}
    </div>
  );
};

export default CircularNavigation;