
import  { useState, useRef } from 'react';
import { RobotTV } from './components/RobotTV';
import { CharacterCard } from './components/CharacterCard';
import { RulesModal } from './components/RulesModal';
import { HistoryModal } from './components/HistoryModal';
import { SnowEffect } from './components/SnowEffect';
import { IntroScreen } from './components/IntroScreen';
import { CHARACTERS } from './constants';
import type { AppState, DrawRecord } from './types';


function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [appState, setAppState] = useState<AppState>('IDLE');
  const [currentChannel, setCurrentChannel] = useState<number>(0);
  const [showRules, setShowRules] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  // New States for Input and History
  const [userName, setUserName] = useState('');
  const [isInputShaking, setIsInputShaking] = useState(false);
  const [drawHistory, setDrawHistory] = useState<DrawRecord[]>([]);
  const [drawnCharacterIds, setDrawnCharacterIds] = useState<number[]>([]);

  const audioContextRef = useRef<AudioContext | null>(null);

  // Initialize Audio Context
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playSound = (type: 'lever' | 'tick' | 'success' | 'error') => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.connect(gain);
    gain.connect(ctx.destination);

    const now = ctx.currentTime;

    if (type === 'lever') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.2);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'tick') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(200, now);
      osc.frequency.exponentialRampToValueAtTime(50, now + 0.05);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.1);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.1);
      osc.frequency.setValueAtTime(783.99, now + 0.2);
      osc.frequency.setValueAtTime(1046.50, now + 0.3);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0, now + 0.6);
      osc.start(now);
      osc.stop(now + 0.6);
    }
  };

  const handleInteraction = () => {
    initAudio();

    // Validation: Check if Name is entered
    if (!userName.trim()) {
      setIsInputShaking(true);
      playSound('error');
      setTimeout(() => setIsInputShaking(false), 500);
      return;
    }

    // Validation: Check if all characters are drawn
    if (drawnCharacterIds.length >= CHARACTERS.length) {
      alert("所有角色都已被抽出！遊戲結束。");
      setAppState('COMPLETED');
      return;
    }
    
    if (appState === 'IDLE' || appState === 'REVEALED') {
      playSound('lever');
      setAppState('PULLING');
      
      setTimeout(() => {
        startScan();
      }, 400);
    }
  };

  const startScan = () => {
    setAppState('SCANNING');
    
    let duration = 0;
    const maxDuration = 2000;
    const intervalTime = 80;
    
    const interval = setInterval(() => {
      duration += intervalTime;
      
      // Visual shuffling only
      const nextChannel = Math.floor(Math.random() * CHARACTERS.length);
      setCurrentChannel(nextChannel);
      playSound('tick');

      if (duration >= maxDuration) {
        clearInterval(interval);
        finishScan();
      }
    }, intervalTime);
  };

  const finishScan = () => {
    // 1. Filter out already drawn characters
    const availableCharacters = CHARACTERS.filter(c => !drawnCharacterIds.includes(c.id));
    
    if (availableCharacters.length === 0) {
      // Should actally be caught in handleInteraction, but safety check
      setAppState('COMPLETED');
      return;
    }

    // 2. Randomly select from available
    const winnerIndex = Math.floor(Math.random() * availableCharacters.length);
    const winner = availableCharacters[winnerIndex];

    // 3. Find the original index of this winner in the main array for display
    const originalIndex = CHARACTERS.findIndex(c => c.id === winner.id);
    setCurrentChannel(originalIndex);
    
    // 4. Update History and Drawn List
    const newRecord: DrawRecord = {
      id: Date.now(),
      playerName: userName,
      characterName: winner.name,
      characterTitle: winner.title,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setDrawHistory(prev => [newRecord, ...prev]);
    setDrawnCharacterIds(prev => [...prev, winner.id]);

    setAppState('LOCKED');
    
    setTimeout(() => {
      playSound('success');
      setAppState('REVEALED');
      // Optional: Clear name after success? 
      // setUserName(''); 
    }, 600);
  };

  const handleCloseCard = () => {
    // Check completion again
    if (drawnCharacterIds.length >= CHARACTERS.length) {
       setAppState('COMPLETED');
    } else {
       setAppState('IDLE');
    }
  };

  return (
    <div className="min-h-screen bg-pop-bg bg-grid-pattern flex flex-col items-center justify-center p-4 overflow-hidden relative selection:bg-pop-pink selection:text-white pb-20">
      
      {showIntro && (
        <IntroScreen onComplete={() => setShowIntro(false)} />
      )}

      <SnowEffect />

      <div className="relative z-10 w-full flex flex-col items-center justify-center gap-6 mt-4 md:-mt-12">
        
        {/* Main Title Section */}
        <div className="flex flex-col items-center gap-2 mb-2">
            <h1 className="text-4xl md:text-5xl font-black text-black tracking-widest drop-shadow-[2px_2px_0px_#000] bg-white border-2 border-black px-4 py-2 rotate-[-2deg] rounded-xl">
              誰是健人<span className="text-2xl ml-2 text-pop-red">- 聖誕篇</span>
            </h1>
            <span className="font-logo text-sm text-black tracking-[0.2em] font-bold bg-pop-blue border-2 border-black px-2 py-1 rotate-[1deg] shadow-[2px_2px_0px_#000] rounded-md">WHO IS THE GYM RAT?</span>
        </div>

        {/* Top Banner Text */}
        <div className="relative z-20 group w-full flex justify-center">
            {/* Memo Bar Container - Width matching control deck (380px) */}
            <div className="relative z-20 w-[380px] transform transition-transform duration-200 scale-[0.85] sm:scale-[1.0] md:scale-[1.3] lg:scale-[1.5] origin-bottom mx-auto bg-pop-yellow border-2 border-black py-2 px-2 text-center shadow-[4px_4px_0px_#000] rounded-xl flex items-center justify-center max-w-[1000px]">
                {/* Eyes peeking behind bar - Moved here so it scales with the bar */}
                {/* Actually user asked to move eyes to Roof, but in case I need to move it back or keep it. Current instruction was Roof. So I remove EyeTracker from here if present */}
                
                <span className="font-rounded font-bold text-base md:text-xl text-black tracking-wide leading-none relative z-10 whitespace-nowrap">
                  好想知道你的小秘密
                </span>
            </div>
        </div>

        {/* Arcade Machine */}
        <RobotTV 
          appState={appState}
          currentChannel={currentChannel}
          onInteract={handleInteraction}
          onOpenRules={() => setShowRules(true)}
          userName={userName}
          onNameChange={setUserName}
          onOpenHistory={() => setShowHistory(true)}
          isInputError={isInputShaking}
        />

        {/* OLD INPUT SECTION REMOVED */}
        
      </div>

      {appState === 'REVEALED' && (
        <CharacterCard 
          character={CHARACTERS[currentChannel]} 
          onClose={handleCloseCard} 
        />
      )}

      {showRules && (
        <RulesModal onClose={() => setShowRules(false)} />
      )}

      {showHistory && (
        <HistoryModal 
          records={drawHistory} 
          onClose={() => setShowHistory(false)} 
        />
      )}

    </div>
  );
}

export default App;
