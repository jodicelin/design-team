
import React, { useEffect, useRef, useState } from 'react';

export const EyeTracker: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const distance = Math.min(6, Math.hypot(e.clientX - centerX, e.clientY - centerY) / 10); // Limit movement

      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      setPupilPos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="flex gap-4 pointer-events-none">
      {/* Left Eye */}
      <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center relative overflow-hidden shadow-[2px_2px_0px_#000]">
        <div 
            className="w-4 h-4 bg-black rounded-full absolute"
            style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }}
        />
      </div>
      {/* Right Eye */}
      <div className="w-10 h-10 bg-white border-2 border-black rounded-full flex items-center justify-center relative overflow-hidden shadow-[2px_2px_0px_#000]">
        <div 
            className="w-4 h-4 bg-black rounded-full absolute"
            style={{ transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)` }}
        />
      </div>
    </div>
  );
};
