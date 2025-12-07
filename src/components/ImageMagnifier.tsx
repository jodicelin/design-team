
import React, { useState } from 'react';

interface ImageMagnifierProps {
  src: string;
  alt: string;
  zoomLevel?: number;
}

export const ImageMagnifier: React.FC<ImageMagnifierProps> = ({ src, alt, zoomLevel = 2 }) => {
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({ display: 'none' });
  const [showLens, setShowLens] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { top, left, width, height } = e.currentTarget.getBoundingClientRect();
    const x = e.pageX - left - window.scrollX;
    const y = e.pageY - top - window.scrollY;

    // Lens Size
    const lensSize = 150; 

    // Prevent lens from going out of bounds visually (optional, but good for UX)
    // Here we just calculate position
    let xPercent = (x / width) * 100;
    let yPercent = (y / height) * 100;

    // Clamp
    xPercent = Math.max(0, Math.min(100, xPercent));
    yPercent = Math.max(0, Math.min(100, yPercent));

    setZoomStyle({
      display: 'block',
      position: 'absolute',
      height: `${lensSize}px`,
      width: `${lensSize}px`,
      top: `${y - lensSize / 2}px`,
      left: `${x - lensSize / 2}px`,
      pointerEvents: 'none',
      border: '4px solid #fff',
      borderRadius: '50%',
      backgroundColor: 'white',
      backgroundImage: `url('${src}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: `${width * zoomLevel}px ${height * zoomLevel}px`,
      backgroundPosition: `${xPercent}% ${yPercent}%`,
      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
      zIndex: 50,
    });
  };

  return (
    <div 
        className="relative w-full h-full overflow-hidden rounded-[24px] cursor-none" // Hide default cursor, use lens
        onMouseEnter={() => setShowLens(true)}
        onMouseLeave={() => setShowLens(false)}
        onMouseMove={handleMouseMove}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
      {showLens && <div style={zoomStyle}></div>}
    </div>
  );
};
