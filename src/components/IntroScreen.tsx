
import React, { useState, useEffect } from 'react';
import { TextMagnifier } from './TextMagnifier';
import { FileText, User, FolderClosed, HelpCircle } from 'lucide-react';

interface IntroScreenProps {
  onComplete: () => void;
}

export const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);
  const [canInteract, setCanInteract] = useState(false);

  useEffect(() => {
    // Enable lens interaction after items have dropped in (approx 2s due to slow speed)
    const timer = setTimeout(() => {
      setCanInteract(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (!canInteract || isExiting) return;
    setIsExiting(true);
    // Wait for scatter animation
    setTimeout(onComplete, 1000);
  };

  return (
    <div 
      className={`fixed inset-0 z-[100] bg-pop-bg flex items-center justify-center overflow-hidden transition-opacity duration-500 cursor-magnify`}
      onClick={handleClick}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none" />

      {/* Container for Magnifier Area */}
      <div className="w-full h-full relative flex items-center justify-center">
        <TextMagnifier lensSize={250} zoomScale={2}>
            <div className="relative w-full h-full flex items-center justify-center">
                
                {/* --- ITEM 1: FOLDER (Bottom Layer) --- */}
                {/* Blue, Slide from Left */}
                <div 
                  className={`absolute w-[100vw] h-[100vh] md:w-[110vw] md:h-[90vh] bg-pop-blue border-4 border-black rounded-lg shadow-pop flex flex-col p-8 origin-center
                    ${isExiting ? 'animate-scatter' : 'animate-slide-in'}
                  `}
                  style={{ 
                    '--tw-enter-x': '-120vw',
                    '--tw-enter-y': '20vh',
                    '--tw-enter-rotate': '-15deg',
                    
                    '--tw-exit-x': '-120vw',
                    '--tw-exit-y': '50vh',
                    '--tw-exit-rotate': '-45deg',
                    animationDelay: '0s',
                    zIndex: 10
                  } as React.CSSProperties}
                >
                    {/* Folder Tab */}
                    <div className="absolute -top-16 left-0 w-64 h-20 bg-pop-blue border-t-4 border-x-4 border-black rounded-t-xl flex items-center justify-center">
                         <span className="font-bold text-lg text-white tracking-widest">ARCHIVE</span>
                    </div>
                    
                    <div className="w-full h-full border-2 border-black/20 rounded-lg flex flex-col items-center justify-center gap-10">
                        <FolderClosed size={200} className="text-white/30" />
                        <div className="bg-white text-black font-black text-6xl md:text-8xl px-12 py-4 border-4 border-black rotate-[-5deg] shadow-lg">
                            TOP SECRET
                        </div>
                    </div>
                </div>

                {/* --- ITEM 2: NEWSPAPER (Middle Layer) --- */}
                {/* White/Red, Slide from Right */}
                <div 
                  className={`absolute w-[95vw] h-[95vh] md:w-[100vw] md:h-[95vh] bg-white border-4 border-black p-8 shadow-pop flex flex-col gap-6 origin-center
                    ${isExiting ? 'animate-scatter' : 'animate-slide-in'}
                  `}
                  style={{ 
                    '--tw-enter-x': '120vw',
                    '--tw-enter-y': '-20vh',
                    '--tw-enter-rotate': '10deg',

                    '--tw-exit-x': '120vw',
                    '--tw-exit-y': '20vh',
                    '--tw-exit-rotate': '45deg',
                    animationDelay: '0.4s',
                    zIndex: 20
                  } as React.CSSProperties}
                >
                    <div className="w-full border-b-4 border-black pb-6 mb-4 flex justify-between items-end">
                        <span className="font-black text-6xl md:text-9xl tracking-tighter text-pop-red">DAILY NEWS</span>
                        <span className="font-bold text-xl md:text-2xl border-4 border-black px-4 py-1 rounded-full">VOL.99</span>
                    </div>
                    <div className="flex gap-8 h-full overflow-hidden">
                        <div className="w-2/3 flex flex-col gap-6">
                            <div className="w-full h-80 bg-black/5 flex items-center justify-center border-4 border-black">
                                <FileText size={100} className="text-black/30" />
                            </div>
                            <div className="w-full h-4 bg-black rounded-full"></div>
                            <div className="w-full h-4 bg-black rounded-full"></div>
                            <div className="w-4/5 h-4 bg-black rounded-full"></div>
                            <div className="w-full h-4 bg-black rounded-full mt-4"></div>
                            <div className="w-full h-4 bg-black rounded-full"></div>
                        </div>
                        <div className="w-1/3 flex flex-col gap-4">
                             <div className="w-full h-4 bg-black rounded-full"></div>
                             <div className="w-full h-4 bg-black rounded-full"></div>
                             <div className="w-full flex-1 bg-pop-yellow border-4 border-black p-4 flex items-center justify-center relative shadow-pop">
                                <span className="font-black text-5xl text-black -rotate-12 absolute">HOT!</span>
                             </div>
                        </div>
                    </div>
                </div>

                {/* --- ITEM 3: CHARACTER PROFILE (Top Layer) --- */}
                {/* Pink, Slide from Bottom */}
                <div 
                  className={`absolute w-[90vw] h-[90vh] md:w-[90vw] md:h-[90vh] bg-pop-pink border-4 border-black p-8 shadow-pop flex flex-col items-center gap-8 origin-center
                    ${isExiting ? 'animate-scatter' : 'animate-slide-in'}
                  `}
                  style={{ 
                    '--tw-enter-x': '0vw',
                    '--tw-enter-y': '120vh',
                    '--tw-enter-rotate': '-5deg',

                    '--tw-exit-x': '0vw',
                    '--tw-exit-y': '-120vh',
                    '--tw-exit-rotate': '-180deg',
                    animationDelay: '0.8s',
                    zIndex: 30
                  } as React.CSSProperties}
                >
                    <div className="w-full flex justify-between items-center border-b-4 border-black pb-4">
                        <span className="font-black text-4xl md:text-6xl">PROFILE</span>
                        <div className="bg-black text-white px-4 py-2 font-mono font-bold text-xl">CONFIDENTIAL</div>
                    </div>
                    
                    <div className="w-72 h-72 md:w-96 md:h-96 bg-white rounded-full border-4 border-black flex items-center justify-center relative overflow-hidden mt-8 shadow-inner">
                        <User size={250} className="text-gray-300 absolute -bottom-10" />
                        <div className="absolute inset-0 flex items-center justify-center">
                             <HelpCircle size={150} className="text-pop-red fill-white animate-pulse drop-shadow-md" />
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-6 mt-6 bg-white/50 p-6 rounded-2xl border-4 border-black">
                        <div className="flex gap-6 items-center">
                             <span className="font-black text-3xl w-24">NAME:</span>
                             <div className="h-10 flex-1 bg-black/10 rounded-xl animate-pulse"></div>
                        </div>
                        <div className="flex gap-6 items-center">
                             <span className="font-black text-3xl w-24">TYPE:</span>
                             <div className="h-10 w-48 bg-black/10 rounded-xl"></div>
                        </div>
                        <div className="w-full h-40 border-4 border-dashed border-black/40 rounded-xl p-4 flex flex-wrap gap-4">
                             <div className="w-full h-4 bg-black/20 rounded-full"></div>
                             <div className="w-2/3 h-4 bg-black/20 rounded-full"></div>
                             <div className="w-3/4 h-4 bg-black/20 rounded-full"></div>
                             <div className="w-1/2 h-4 bg-black/20 rounded-full"></div>
                        </div>
                    </div>
                </div>

            </div>
        </TextMagnifier>

        {/* Click Prompt (Only visible after drop) */}
        {canInteract && !isExiting && (
            <div className="absolute bottom-16 z-50 animate-bounce pointer-events-none">
                <span className="bg-pop-yellow text-black font-black text-3xl px-12 py-6 border-4 border-black rounded-full shadow-pop rotate-2 inline-block">
                    點擊調查文件
                </span>
            </div>
        )}
      </div>
    </div>
  );
};
