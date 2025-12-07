import React, { useEffect } from 'react';

export const NoiseEffect: React.FC = () => {
  // We use a canvas to generate random noise efficiently
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const drawNoise = () => {
      const w = canvas.width;
      const h = canvas.height;
      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.5) {
          buffer32[i] = 0xff000000; // Black
        } else {
          buffer32[i] = 0xffffffff; // White
        }
      }

      ctx.putImageData(idata, 0, 0);
      animationId = requestAnimationFrame(drawNoise);
    };

    drawNoise();

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      width={100} 
      height={100} 
      className="w-full h-full opacity-30 absolute inset-0 pointer-events-none" 
    />
  );
};