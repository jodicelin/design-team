import React, { useState } from 'react';
import { Heart, Smile, Star, Flame, ThumbsUp, Frown, Laugh, Snowflake, Gift, Trees, Zap } from 'lucide-react';

interface StickerProps {
  Icon: React.ElementType;
  initialX: number;
  initialY: number;
  color: string;
  fillColor: string;
  rotate: number;
  scale: number;
}

const Sticker: React.FC<StickerProps> = ({ Icon, initialX, initialY, color, fillColor, rotate, scale }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [rotationOffset, setRotationOffset] = useState(0);

  const handleHover = () => {
    // Highly sensitive movement: Move significantly further away
    // Random direction but with minimum distance to ensure "push" feel
    const angle = Math.random() * Math.PI * 2;
    const distance = 150 + Math.random() * 100; // Move between 150px and 250px
    
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;
    
    // Also rotate wildly
    const rotateDelta = (Math.random() - 0.5) * 60;

    setOffset(prev => ({ x: prev.x + moveX, y: prev.y + moveY }));
    setRotationOffset(prev => prev + rotateDelta);
  };

  return (
    <div
      className="absolute transition-all duration-300 ease-out cursor-none pointer-events-auto"
      style={{
        left: `${initialX}%`,
        top: `${initialY}%`,
        transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotate + rotationOffset}deg) scale(${scale})`,
      }}
      onMouseEnter={handleHover}
    >
      <div className="relative group sticker-shadow hover:scale-110 transition-transform">
        {/* Updated to stroke-[2px] to match machine border thinness. sticker-shadow handles the white outline */}
        <Icon 
          size={72} 
          className={`stroke-[2px] stroke-black ${color} ${fillColor}`}
        />
      </div>
    </div>
  );
};

export const StickerOverlay: React.FC = () => {
  // Collection of stickers, avoiding center column (30% - 70% width)
  // Added Christmas elements: Snowflake, Gift, Trees, Zap(Candy)
  const stickers = [
    // Left side
    { id: 1, Icon: Heart, x: 5, y: 15, rotate: -15, color: 'text-arcade-pink', fillColor: 'fill-arcade-pink', scale: 1.2 },
    { id: 2, Icon: Snowflake, x: 18, y: 25, rotate: 10, color: 'text-blue-300', fillColor: 'fill-blue-100', scale: 1.0 },
    { id: 3, Icon: Star, x: 5, y: 45, rotate: -20, color: 'text-arcade-yellow', fillColor: 'fill-arcade-yellow', scale: 1.3 },
    { id: 4, Icon: Gift, x: 15, y: 65, rotate: 15, color: 'text-arcade-red', fillColor: 'fill-arcade-red', scale: 1.1 },
    { id: 5, Icon: ThumbsUp, x: 8, y: 85, rotate: -5, color: 'text-arcade-green', fillColor: 'fill-arcade-green', scale: 1.2 },
    { id: 6, Icon: Frown, x: 22, y: 55, rotate: 25, color: 'text-purple-400', fillColor: 'fill-purple-400', scale: 0.9 },
    
    // Right side
    { id: 7, Icon: Laugh, x: 85, y: 20, rotate: 12, color: 'text-arcade-yellow', fillColor: 'fill-arcade-yellow', scale: 1.1 },
    { id: 8, Icon: Trees, x: 75, y: 35, rotate: -10, color: 'text-green-600', fillColor: 'fill-green-400', scale: 1.3 },
    { id: 9, Icon: Zap, x: 92, y: 55, rotate: 18, color: 'text-arcade-red', fillColor: 'fill-arcade-red', scale: 0.9 },
    { id: 10, Icon: ThumbsUp, x: 80, y: 70, rotate: -15, color: 'text-arcade-blue', fillColor: 'fill-arcade-blue', scale: 1.2 },
    { id: 11, Icon: Flame, x: 90, y: 85, rotate: 5, color: 'text-orange-500', fillColor: 'fill-orange-500', scale: 1.1 },
    { id: 12, Icon: Smile, x: 78, y: 10, rotate: -25, color: 'text-arcade-pink', fillColor: 'fill-arcade-pink', scale: 1.0 },

    // Top/Bottom scattered
    { id: 13, Icon: Star, x: 30, y: 8, rotate: 45, color: 'text-arcade-yellow', fillColor: 'fill-arcade-yellow', scale: 0.8 },
    { id: 14, Icon: Snowflake, x: 55, y: 5, rotate: -30, color: 'text-blue-300', fillColor: 'fill-blue-100', scale: 1.0 },
    { id: 15, Icon: Smile, x: 35, y: 92, rotate: 10, color: 'text-arcade-green', fillColor: 'fill-arcade-green', scale: 1.2 },
    { id: 16, Icon: Gift, x: 65, y: 94, rotate: -10, color: 'text-arcade-red', fillColor: 'fill-arcade-pink', scale: 1.1 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
       {stickers.map((s) => (
         <Sticker 
           key={s.id}
           Icon={s.Icon}
           initialX={s.x}
           initialY={s.y}
           rotate={s.rotate}
           scale={s.scale}
           color={s.color}
           fillColor={s.fillColor}
         />
       ))}
    </div>
  );
};