
import React, { useEffect, useRef } from 'react';

export const SnowEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const snowflakes: { x: number; y: number; r: number; d: number; speed: number }[] = [];
    const maxFlakes = 100;

    for (let i = 0; i < maxFlakes; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 3 + 1, // radius
        d: Math.random() * maxFlakes, // density
        speed: Math.random() * 1 + 0.5, // speed
      });
    }

    let animationId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.beginPath();
      
      for (let i = 0; i < maxFlakes; i++) {
        const f = snowflakes[i];
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
      }
      ctx.fill();
      update();
      animationId = requestAnimationFrame(draw);
    };

    const update = () => {
      for (let i = 0; i < maxFlakes; i++) {
        const f = snowflakes[i];
        f.y += f.speed;
        // Sway effect
        f.x += Math.sin(f.y / 50) * 0.5;

        if (f.y > height) {
          snowflakes[i] = { x: Math.random() * width, y: -10, r: f.r, d: f.d, speed: f.speed };
        }
        if (f.x > width) {
           snowflakes[i] = { x: 0, y: f.y, r: f.r, d: f.d, speed: f.speed };
        }
        if (f.x < 0) {
           snowflakes[i] = { x: width, y: f.y, r: f.r, d: f.d, speed: f.speed };
        }
      }
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
