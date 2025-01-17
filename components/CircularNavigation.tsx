"use client";
import { useState, useRef, useEffect, ReactNode, ComponentType } from 'react';

const CircularNavigation = ({ items = [], centerComponent: CenterComponent }: {items: ReactNode[], centerComponent: ComponentType}) => {
  const [rotation, setRotation] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Constants for layout
  const CIRCLE_RADIUS = 500; // Distance from center to items
//   const CENTER_SIZE = 800; // Size of center canvas
  
  // Calculate positions for items around the circle
  const getItemPosition = (index: number, totalItems: number) => {
    const angle = (index * (360 / totalItems) + rotation) * (Math.PI / 180);
    const x = Math.cos(angle) * CIRCLE_RADIUS;
    const y = Math.sin(angle) * CIRCLE_RADIUS;
    return { x, y, angle: angle * (180 / Math.PI) };
  };

  // Handle scroll for rotation
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    setRotation(prev => prev + (e.deltaY > 0 ? 5 : -5));
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full h-full relative overflow-hidden"
    >
      {/* Center component */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {CenterComponent && <CenterComponent />}
      </div>

      {/* Circular scroll indicator */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border-4 border-purple-500/20 pointer-events-none" />
      
      {/* Navigation items */}
      {items.map((item, index) => {
        const { x, y, angle } = getItemPosition(index, items.length);
        return (
          <div
            key={index}
            className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 cursor-pointer hover:scale-110"
            style={{
              transform: `
                translate(calc(-50% + ${x-400}px), calc(-50% + ${y}px))
                rotate(${angle + 90}deg)
              `,
            }}
          >
            <div
              className="transform -rotate-90"
              style={{ transform: `rotate(${-angle - 90}deg)` }}
            >
              {item}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CircularNavigation;