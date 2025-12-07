
import React, { useState, useRef } from 'react';

interface TextMagnifierProps {
  children: React.ReactNode;
  lensSize?: number;
  zoomScale?: number;
}

export const TextMagnifier: React.FC<TextMagnifierProps> = ({ children, lensSize = 150, zoomScale = 1.5 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0 });
  const [showLens, setShowLens] = useState(false);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { top, left, width, height } = containerRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    // Constrain inside
    if (x >= 0 && x <= width && y >= 0 && y <= height) {
       setLensPos({ x, y });
    } else {
       setShowLens(false);
    }
  };

  return (
    <div 
      className="relative w-full h-full overflow-hidden cursor-none"
      ref={containerRef}
      onMouseEnter={() => setShowLens(true)}
      onMouseLeave={() => setShowLens(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Original Content */}
      <div className="w-full h-full">
        {children}
      </div>

      {/* Magnifying Lens */}
      {showLens && (
        <div
          className="absolute z-50 overflow-hidden bg-white border-4 border-black rounded-full shadow-xl pointer-events-none"
          style={{
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            top: `${lensPos.y - lensSize / 2}px`,
            left: `${lensPos.x - lensSize / 2}px`,
          }}
        >
          {/* Mirrored Content Scaled Up */}
          <div
            className="absolute w-full h-full"
            style={{
              top: `${-(lensPos.y * zoomScale) + (lensSize / 2)}px`,
              left: `${-(lensPos.x * zoomScale) + (lensSize / 2)}px`,
              width: `${containerRef.current?.offsetWidth}px`,
              height: `${containerRef.current?.offsetHeight}px`,
              transform: `scale(${zoomScale})`,
              transformOrigin: '0 0',
            }}
          >
             {children}
          </div>
        </div>
      )}
    </div>
  );
};
