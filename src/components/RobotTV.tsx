
import React from 'react';
import { CHARACTERS } from '../constants';
import type { AppState } from '../types';
import { NoiseEffect } from './NoiseEffect';
import { Zap, Search, ClipboardList } from 'lucide-react';
import { EyeTracker } from './EyeTracker';

interface RobotTVProps {
  appState: AppState;
  currentChannel: number;
  onInteract: () => void;
  onOpenRules: () => void;
  // New props for Input and History
  userName: string;
  onNameChange: (name: string) => void;
  onOpenHistory: () => void;
  isInputError?: boolean;
}

export const RobotTV: React.FC<RobotTVProps> = ({ 
  appState, 
  currentChannel, 
  onInteract, 
  onOpenRules,
  userName,
  onNameChange,
  onOpenHistory,
  isInputError
}) => {
  const displayedCharacter = CHARACTERS[currentChannel];
  
  const isPulling = appState === 'PULLING';
  const isScanning = appState === 'SCANNING';
  const isIdle = appState === 'IDLE';

  // Animation classes
  const containerClass = `relative flex flex-col items-center transition-transform duration-200 
    ${isScanning ? 'animate-shake' : ''} 
    scale-[0.85] sm:scale-[1.0] md:scale-[1.3] lg:scale-[1.5] origin-top
  `;

  // Standard Border Style
  const borderStyle = "border-2 border-black";

  return (
    <div className={containerClass}>

      {/* --- LIGHTNING EFFECT (Only when scanning) --- */}
      {isScanning && (
        <>
          {/* Left Bolt - Thinner stroke to match machine */}
          <div className="absolute top-1/2 -left-20 transform -translate-y-1/2 z-0 animate-pulse">
             <Zap size={64} strokeWidth={2} className="text-pop-yellow fill-pop-yellow stroke-black rotate-[-15deg]" />
          </div>
          <div className="absolute top-1/3 -left-16 transform -translate-y-1/2 z-0 animate-bounce-short delay-75">
             <Zap size={48} strokeWidth={2} className="text-pop-blue fill-pop-blue stroke-black rotate-[-45deg]" />
          </div>

          {/* Right Bolt */}
          <div className="absolute top-1/2 -right-20 transform -translate-y-1/2 z-0 animate-pulse delay-100">
             <Zap size={64} strokeWidth={2} className="text-pop-yellow fill-pop-yellow stroke-black rotate-[15deg]" />
          </div>
          <div className="absolute top-2/3 -right-16 transform -translate-y-1/2 z-0 animate-bounce-short delay-150">
             <Zap size={48} strokeWidth={2} className="text-pop-blue fill-pop-blue stroke-black rotate-[45deg]" />
          </div>
        </>
      )}

      {/* --- ARCADE CABINET --- */}
      <div className="relative z-10 flex flex-col items-center drop-shadow-xl">
        
        {/* 1. ROOF / TOP CAP - Rounded 30 - Fixed 340px */}
        <div className={`w-[340px] h-12 bg-pop-red ${borderStyle} rounded-[30px] z-30 relative overflow-hidden`}>
            {/* Eyes in Center */}
            <div className="absolute top-1 left-1/2 -translate-x-1/2 z-0">
               <EyeTracker />
            </div>
        </div>

        {/* 2. VENT / MARQUEE AREA - Rounded 25 - Fixed 320px */}
        <div className={`w-[320px] h-20 bg-pop-pink border-x-2 border-b-2 border-black rounded-[25px] relative flex items-center justify-center z-20 overflow-hidden -mt-4 pt-4`}>
           {/* Graphic Stripes */}
           <div className="flex gap-4">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="w-1 h-10 bg-black transform -skew-x-12 opacity-80"></div>
              ))}
           </div>
        </div>

        {/* 3. MAIN SCREEN BODY - Rounded 30 - Fixed 320px */}
        <div className={`w-[320px] h-[280px] bg-pop-pink border-x-2 border-black p-4 flex items-center justify-center z-10 relative -mt-6 pt-8`}>
            
            {/* Blue Bezel - Rounded 30 */}
            <div className={`w-full h-full bg-pop-blue ${borderStyle} rounded-[30px] p-3 relative shadow-inner flex items-center justify-center`}>
               
               {/* Inner Screen - Rounded 20 to fit inside */}
               <div className={`w-full h-full bg-white ${borderStyle} rounded-[20px] overflow-hidden relative`}>
                  {isIdle ? (
                    <div className="w-full h-full flex flex-col items-center justify-center font-rounded text-black select-none bg-white p-4 gap-2">
                       {/* INPUT FIELD - White BG, Blue Text */}
                       <div className="w-full flex flex-col items-center gap-1">
                          <label className="text-[10px] font-black text-pop-blue tracking-widest opacity-70">PLAYER NAME</label>
                          <input 
                            type="text"
                            value={userName}
                            onChange={(e) => onNameChange(e.target.value)}
                            placeholder="輸入名字"
                            className={`
                              w-4/5 h-10 bg-white text-pop-blue text-center font-black text-2xl placeholder-blue-200 outline-none border-b-4 border-pop-blue transition-all
                              ${isInputError ? 'animate-shake border-pop-red text-pop-red placeholder-red-200' : ''}
                            `}
                          />
                       </div>

                       {/* Centered Large Text */}
                       <h2 className="font-black text-4xl tracking-tight text-black flex items-center mt-2">
                         調查對象
                         {/* Magnifying Glass Icon */}
                         <Search size={40} strokeWidth={2.5} className="ml-2 text-black" />
                       </h2>
                    </div>
                  ) : (
                    <>
                      <img 
                        src={displayedCharacter.imageUrl}
                        className={`w-full h-full object-cover filter contrast-125 saturate-150 ${isScanning ? 'opacity-80' : ''}`}
                        alt="Screen"
                      />
                      {isScanning && <NoiseEffect />}
                    </>
                  )}
               </div>

               {/* RULES BUTTON - Staggered above HHG Badge */}
               <div 
                  onClick={onOpenRules}
                  className={`absolute bottom-10 -right-14 bg-pop-red ${borderStyle} rounded-[30px] px-3 py-1 transform -rotate-3 z-50 shadow-[2px_2px_0px_#000] cursor-pointer hover:scale-110 active:scale-95 transition-all`}
               >
                  <span className="font-black text-base text-white tracking-widest">遊戲規則</span>
               </div>

               {/* "HHG" Badge Container - Rounded 30 */}
               <div className={`absolute -bottom-4 -right-10 bg-pop-yellow ${borderStyle} rounded-[30px] px-4 py-1 transform rotate-2 z-40 shadow-[2px_2px_0px_#000] group hover:scale-110 transition-transform`}>
                  {/* Badge Text */}
                  <span className="font-logo font-black text-3xl text-black tracking-wider">HHG</span>
               </div>
            </div>
        </div>

        {/* 4. CONTROL DECK - Rounded 30 - Fixed 380px */}
        <div className={`w-[380px] h-32 bg-pop-green ${borderStyle} relative z-30 -mt-2 rounded-[30px] shadow-lg flex px-8 py-6 justify-between items-end`}>
             
             {/* JOYSTICK (Interactable) */}
             <div 
               className="relative w-24 h-24 flex items-end justify-center cursor-pointer group"
               onClick={() => {
                 if (isIdle || appState === 'REVEALED') {
                   onInteract();
                 }
               }}
             >
                {/* Joystick Base */}
                <div className={`w-16 h-8 bg-pop-pink ${borderStyle} rounded-full absolute bottom-0 z-10`}></div>
                
                {/* Joystick Shaft & Ball */}
                <div className={`
                    absolute bottom-4 left-1/2 -translate-x-1/2 w-3 h-16 bg-white ${borderStyle} z-0 origin-bottom transition-transform duration-300
                    ${isPulling ? 'rotate-[-25deg] translate-y-2' : ''}
                    ${isScanning ? 'animate-shake' : ''}
                    group-hover:scale-105
                `}>
                   {/* Ball Top */}
                   <div className={`w-12 h-12 bg-pop-red ${borderStyle} rounded-full absolute -top-10 -left-[18px]`}></div>
                </div>
             </div>

             {/* BUTTONS */}
             <div className="flex gap-4 mb-2 z-10">
                {/* Pink Button (Decorative) */}
                <div className={`w-14 h-14 rounded-full ${borderStyle} bg-pop-pink shadow-[2px_2px_0px_0px_#000] transform active:translate-y-1 active:shadow-none transition-all`}></div>
                
                {/* Blue Button (History Trigger) */}
                <div 
                   onClick={onOpenHistory}
                   className={`w-14 h-14 rounded-full ${borderStyle} bg-pop-blue shadow-[2px_2px_0px_0px_#000] transform active:translate-y-1 active:shadow-none transition-all cursor-pointer flex items-center justify-center group`}
                   title="查看紀錄"
                >
                    <ClipboardList size={24} className="text-white opacity-80 group-hover:scale-110 transition-transform" strokeWidth={2.5} />
                </div>
             </div>
        </div>

      </div>

    </div>
  );
};
