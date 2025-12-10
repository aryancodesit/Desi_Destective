'use client';

import React, { useState, useEffect } from 'react';
import { Activity, Play, Pause, Volume2, Mic, Settings, Rewind } from 'lucide-react';

export default function AudioIsolator({ onSolve }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [cutoff, setCutoff] = useState(120); // Frequency cutoff (Hz)
  const [gain, setGain] = useState(50);
  const [decodedText, setDecodedText] = useState("");
  const [bars, setBars] = useState(new Array(32).fill(10));

  // --- MOCK AUDIO VISUALIZER LOOP ---
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setBars(prev => prev.map(() => Math.random() * 80 + 10)); // Random heights
      }, 100);
    } else {
      setBars(new Array(32).fill(10)); // Reset when paused
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // --- FILTER LOGIC ---
  useEffect(() => {
    // The "Sweet Spot" is between 60Hz and 80Hz (Filtering out the wind)
    const isSweetSpot = cutoff > 60 && cutoff < 80;
    
    if (isPlaying && isSweetSpot) {
      setDecodedText("...under the third pillar... midnight...");
      if(onSolve) {
          // Trigger solve callback after a short delay for dramatic effect
          const timer = setTimeout(() => onSolve(), 3000);
          return () => clearTimeout(timer);
      }
    } else if (isPlaying) {
      setDecodedText("(Wind Howling) ... (Static) ... (Unintelligible)");
    } else {
      setDecodedText("Ready to analyze.");
    }
  }, [cutoff, isPlaying, onSolve]);

  return (
    <div className="w-full h-full bg-slate-950 border border-green-900/50 rounded-lg p-6 flex flex-col font-mono shadow-[0_0_40px_rgba(0,0,0,0.6)] relative overflow-hidden">
      
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
          backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)',
          backgroundSize: '40px 40px'
      }}></div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-900/20 rounded border border-green-500/30 text-green-400">
            <Activity size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-200 tracking-wider">SPECTRAL_ISOLATOR v3.0</h2>
            <div className="text-[10px] text-green-600">SOURCE: GOLCONDA_REC_004.WAV</div>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 bg-black border border-green-900 rounded text-xs text-green-500 animate-pulse">
           <Mic size={12} />
           <span>NOISE_GATE: ACTIVE</span>
        </div>
      </div>

      {/* VISUALIZER DISPLAY */}
      <div className="flex-1 bg-black border border-slate-800 rounded-lg mb-6 relative flex items-center justify-center gap-1 px-4 overflow-hidden shadow-inner">
        {/* Frequency Bars */}
        {bars.map((height, i) => (
          <div 
            key={i} 
            className="flex-1 bg-green-500 opacity-60 rounded-t-sm transition-all duration-100 ease-linear"
            style={{ 
              height: `${height}%`,
              // Change color based on filter: turns Red if "Wind Noise" (High freq) is dominant
              backgroundColor: (i > 20 && cutoff > 80) ? '#ef4444' : '#22c55e'
            }}
          ></div>
        ))}
        
        {/* Playhead Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
             <div className="w-full h-px bg-green-500/30 absolute top-1/2"></div>
        </div>
      </div>

      {/* TRANSCRIPT BOX */}
      <div className="bg-slate-900/80 border border-green-900/30 p-4 rounded mb-6 min-h-[60px] flex items-center justify-center text-center relative z-10">
        <p className={`text-sm ${decodedText.includes("pillar") ? "text-green-400 font-bold animate-pulse" : "text-slate-600 blur-[0.5px]"}`}>
           {decodedText}
        </p>
      </div>

      {/* CONTROLS */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg relative z-10">
        <div className="flex items-center gap-6">
          
          {/* Play/Pause Button */}
          <button 
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-500 text-black transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)]"
          >
            {isPlaying ? <Pause fill="black" /> : <Play fill="black" className="ml-1" />}
          </button>

          {/* Sliders */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Low Pass Filter Slider */}
            <div className="space-y-2">
               <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                 <span className="flex items-center gap-1"><Settings size={10} /> LOW_PASS FILTER</span>
                 <span className="text-green-500">{cutoff} Hz</span>
               </div>
               <input 
                 type="range" 
                 min="20" 
                 max="200" 
                 value={cutoff}
                 onChange={(e) => setCutoff(parseInt(e.target.value))}
                 className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
               />
               <div className="flex justify-between text-[10px] text-slate-600">
                  <span>WIND</span>
                  <span>VOICE</span>
                  <span>STATIC</span>
               </div>
            </div>

            {/* Gain Slider (Dummy for feel) */}
            <div className="space-y-2 opacity-70">
               <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                 <span className="flex items-center gap-1"><Volume2 size={10} /> INPUT_GAIN</span>
                 <span>{gain}%</span>
               </div>
               <input 
                 type="range" 
                 min="0" 
                 max="100" 
                 value={gain}
                 onChange={(e) => setGain(parseInt(e.target.value))}
                 className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
               />
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}