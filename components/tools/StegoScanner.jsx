'use client';

import React, { useState } from 'react';
import { Layers, CheckCircle, Fingerprint, ScanEye } from 'lucide-react';

export default function StegoScanner({ 
  imgSrc = "/api/placeholder/500/350", // Placeholder for actual evidence image
  hiddenText = "TIME: 20:45 | LOC: GREEN_ROOM",
  hiddenSubtext = "Matches Mr. Mehta's entry logs.",
  onSolve 
}) {
  const [overlayOpacity, setOverlayOpacity] = useState(0); 
  const [isSolved, setIsSolved] = useState(false);

  const checkStego = (val) => {
    setOverlayOpacity(val);
    
    // Win Condition: Sweet spot between 88% and 92% opacity
    if (val > 88 && val < 92) {
      if (!isSolved) {
        setIsSolved(true);
        if (onSolve) onSolve();
      }
    } else {
      setIsSolved(false);
    }
  };

  return (
    <div className="w-full h-full bg-slate-950 border border-green-900/50 rounded-lg flex flex-col font-mono shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden">
      
      {/* TOOLBAR */}
      <div className="h-12 border-b border-green-900 flex items-center px-4 gap-4 bg-slate-950">
        <div className="flex items-center gap-2 text-green-400">
          <Layers size={18} />
          <span className="font-bold text-sm">STEGO_SCANNER_v2.exe</span>
        </div>
        <div className="h-4 w-px bg-green-900"></div>
        <div className="text-xs text-slate-500">Overlay Analysis Mode</div>
        {isSolved && (
          <div className="ml-auto px-2 py-1 bg-green-900/50 border border-green-500 text-[10px] text-green-300 rounded animate-pulse">
            PATTERN MATCHED
          </div>
        )}
      </div>

      {/* WORKSPACE */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-hidden relative bg-[url('/assets/bg-grid.png')] bg-repeat opacity-90">
        
        <div className="relative w-[500px] h-[350px] border-2 border-slate-700 shadow-2xl bg-black overflow-hidden group">
          
          {/* Layer 1: The Base Image */}
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800 text-slate-600">
            {/* If you have a real image, use <img src={imgSrc} className="w-full h-full object-cover" /> */}
            <div className="text-center group-hover:scale-105 transition-transform duration-700">
              <Fingerprint size={64} className="mx-auto mb-4 opacity-20" />
              <p className="text-xs tracking-widest">EVIDENCE_IMG_SOURCE.JPG</p>
            </div>
          </div>

          {/* Layer 2: The Hidden Text (Only visible when overlay is correct) */}
          <div 
            className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 z-20"
            style={{ opacity: isSolved ? 1 : 0 }}
          >
            <div className="bg-black/90 p-6 border-2 border-green-500 text-green-500 font-mono text-sm shadow-[0_0_50px_rgba(34,197,94,0.4)] backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2 border-b border-green-900 pb-2">
                <ScanEye size={16} />
                <span className="font-bold text-xs uppercase">Steganography Decoded</span>
              </div>
              <p className="text-slate-400 text-xs mb-1">Payload Extracted:</p>
              <p className="font-bold text-lg text-white mb-2">"{hiddenText}"</p>
              <p className="text-xs text-green-400 italic">Analysis: {hiddenSubtext}</p>
            </div>
          </div>

          {/* Layer 3: The Filter Overlay (Visual Feedback) */}
          <div 
            className="absolute inset-0 bg-green-500 mix-blend-overlay pointer-events-none transition-opacity duration-75 z-10"
            style={{ opacity: overlayOpacity / 100 }}
          ></div>

          {/* Layer 4: Static Grid (To make it look technical) */}
          <div className="absolute inset-0 opacity-20 pointer-events-none z-0" style={{
              backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)',
              backgroundSize: '20px 20px'
          }}></div>

        </div>

        {/* CONTROLS (Floating Bottom Bar) */}
        <div className="absolute bottom-6 w-72 bg-slate-950/90 backdrop-blur border border-green-900 p-4 rounded-xl shadow-2xl flex flex-col gap-3">
          <div className="flex justify-between items-center">
             <label className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Alpha Channel Threshold</label>
             <span className="text-xs font-mono text-green-400">{overlayOpacity}%</span>
          </div>
          
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={overlayOpacity} 
            onChange={(e) => checkStego(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
          
          <div className="flex justify-between text-[8px] text-slate-600 font-mono uppercase">
            <span>Clear</span>
            <span>Decrypt Zone</span>
            <span>Opaque</span>
          </div>
        </div>

        {/* SUCCESS INDICATOR (Top Right) */}
        {isSolved && (
          <div className="absolute top-6 right-6 bg-green-600 text-black px-4 py-2 rounded shadow-lg flex items-center gap-2 animate-in slide-in-from-top-4">
            <CheckCircle size={16} />
            <span className="text-xs font-bold">DATA RECOVERED</span>
          </div>
        )}

      </div>
    </div>
  );
}