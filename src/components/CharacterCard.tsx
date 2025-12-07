import React from 'react';
import type { CharacterProfile } from '../types.ts';
import { ImageMagnifier } from './ImageMagnifier.tsx';

interface CharacterCardProps {
  character: CharacterProfile;
  onClose: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({ character, onClose }) => {
  const borderStyle = "border-2 border-black";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm font-rounded cursor-magnify">
      {/* Card Container - Vertical NFT Style */}
      <div 
        className={`relative w-full max-w-[360px] bg-white ${borderStyle} rounded-3xl p-5 animate-pop-in flex flex-col gap-4 overflow-hidden pt-8`}
        style={{ boxShadow: `8px 8px 0px 0px ${character.color}` }}
      >
        
        {/* HHG DESIGN TEAM Label */}
        <div className="absolute top-3 left-4">
            <span className="text-[10px] font-black tracking-widest text-gray-400">HHG DESIGN TEAM</span>
        </div>

        {/* Header Section with Name */}
        <div className="flex flex-col items-center w-full gap-2 mt-1">
            {/* Small Label Row */}
            <div className="flex justify-between items-center w-full px-1 opacity-50">
               <span className="text-xs font-bold">HHG NO.{character.id + 1}</span>
               <span className="text-lg">❤️</span>
            </div>

            {/* Name moved to top */}
            <h1 className="text-5xl font-black text-black leading-tight tracking-tight">
              {character.name}
            </h1>
        </div>

        {/* Main Image - Large Square */}
        <div className={`w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden ${borderStyle} relative shadow-inner`}>
            <ImageMagnifier 
              src={character.imageUrl}
              alt={character.name}
              zoomLevel={2.5}
            />
        </div>

        {/* Content Section */}
        <div className="flex flex-col items-start w-full gap-2">
            <div className="flex flex-col gap-2 w-full">
                {/* 4-Character Adjective Badge */}
                <div className="self-start bg-black text-white px-4 py-1.5 rounded-full border-2 border-black transform -rotate-1 shadow-[2px_2px_0px_rgba(0,0,0,0.2)]">
                   <h2 className="text-lg font-bold tracking-widest">
                     {character.adjective}
                   </h2>
                </div>

                {/* Personality Phrase */}
                <p className="text-xl font-bold text-gray-800 leading-snug ml-1">
                  {character.personality}
                </p>
            </div>
        </div>

        {/* Footer Button - Full Width */}
        <button 
          onClick={onClose}
          className={`w-full bg-pop-yellow ${borderStyle} rounded-xl py-3 mt-auto shadow-[2px_2px_0px_#000] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_#000] active:shadow-none active:translate-y-[2px] transition-all cursor-pointer group relative overflow-hidden`}
        >
           <span className="text-xl font-black text-black relative z-10 group-hover:scale-110 transition-transform inline-block">關閉</span>
        </button>

      </div>
    </div>
  );
};