'use client';

import React, { useState, useEffect } from 'react';
import { Binary, Save, RefreshCw, FileWarning, CheckCircle } from 'lucide-react';

// --- CONFIGURATION ---
const TARGET_HEADER = ['FF', 'D8', 'FF', 'E0']; // Standard JPEG Header
const CORRUPTED_HEADER = ['00', '00', '00', '00']; // What the user sees initially

export default function HexEditor({ onSolve }) {
  // Generate a fake hex dump
  const [memory, setMemory] = useState([]);
  const [userHeader, setUserHeader] = useState([...CORRUPTED_HEADER]);
  const [isFixed, setIsFixed] = useState(false);

  // Initialize random hex data (Mocking the file body)
  useEffect(() => {
    const rows = [];
    for (let i = 0; i < 10; i++) {
      const row = [];
      for (let j = 0; j < 8; j++) {
        // Random hex values like '4A', 'B2', etc.
        row.push(Math.floor(Math.random() * 255).toString(16).toUpperCase().padStart(2, '0'));
      }
      rows.push(row);
    }
    setMemory(rows);
  }, []);

  // Handle clicking a byte to fix it
  const cycleByte = (index) => {
    if (isFixed) return;
    
    const newHeader = [...userHeader];
    const currentVal = parseInt(newHeader[index], 16);
    // Cycle through a few values, ensuring one of them is the correct target
    const nextVal = (currentVal + 0x10) % 0xFF; 
    
    // Cheat logic: If close to target, snap to target for gameplay feel
    // Or just simple cycling:
    const targetVal = parseInt(TARGET_HEADER[index], 16);
    
    // If the next random cycle is close, set it to the target (Game feel)
    let finalHex = nextVal.toString(16).toUpperCase().padStart(2, '0');
    
    // Simple toggle logic for the prototype: 
    // If it's 00 -> switch to correct value -> else random
    if (newHeader[index] === '00') {
      finalHex = TARGET_HEADER[index];
    } else if (newHeader[index] === TARGET_HEADER[index]) {
      finalHex = 'CC'; // Break it again
    } else {
      finalHex = '00'; // Reset
    }

    newHeader[index] = finalHex;
    setUserHeader(newHeader);

    // Check Win Condition
    if (JSON.stringify(newHeader) === JSON.stringify(TARGET_HEADER)) {
      setIsFixed(true);
      if(onSolve) onSolve();
    }
  };

  return (
    <div className="w-full h-full bg-black border border-green-900/50 rounded-lg p-4 font-mono text-sm flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.5)]">
      
      {/* TOOLBAR */}
      <div className="flex justify-between items-center mb-4 border-b border-green-900 pb-2">
        <div className="flex items-center gap-2 text-green-500">
          <Binary size={18} />
          <span className="font-bold">HEX_EDITOR_PRO.EXE</span>
        </div>
        <div className="flex gap-2 text-[10px]">
          <div className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-400">OFFSET: 0x0000</div>
          <div className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-slate-400">ENCODING: UTF-8</div>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        
        {/* MAIN HEX GRID */}
        <div className="flex-1 bg-slate-900/50 p-4 rounded overflow-y-auto border border-green-900/30">
          
          {/* HEADER ROW (INTERACTIVE) */}
          <div className="flex gap-4 mb-1 bg-red-900/20 p-1 -mx-1 rounded border border-red-500/30">
            <span className="text-slate-500 select-none w-16">00000000</span>
            <div className="flex gap-3">
              {userHeader.map((byte, idx) => (
                <button
                  key={`header-${idx}`}
                  onClick={() => cycleByte(idx)}
                  className={`
                    w-6 text-center hover:bg-green-500 hover:text-black rounded transition-colors
                    ${byte === TARGET_HEADER[idx] ? 'text-green-400 font-bold' : 'text-red-500 animate-pulse font-bold bg-red-900/40'}
                  `}
                  title="Click to modify byte injection"
                >
                  {byte}
                </button>
              ))}
              {/* Padding bytes to fill row */}
              <span className="text-slate-600">4A</span>
              <span className="text-slate-600">F2</span>
              <span className="text-slate-600">00</span>
              <span className="text-slate-600">1B</span>
            </div>
          </div>

          {/* BODY ROWS (STATIC DECORATION) */}
          {memory.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-4 mb-1 opacity-50 hover:opacity-100 transition-opacity">
              <span className="text-slate-600 select-none w-16">
                {(rIdx + 1).toString(16).toUpperCase().padStart(8, '0')}
              </span>
              <div className="flex gap-3 text-slate-400">
                {row.map((byte, cIdx) => (
                  <span key={cIdx} className="w-6 text-center">{byte}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* SIDEBAR: INSPECTOR */}
        <div className="w-48 bg-slate-950 border-l border-green-900 p-3 flex flex-col gap-4">
          
          <div className="p-3 bg-green-900/10 border border-green-900/50 rounded">
            <h3 className="text-[10px] text-green-600 uppercase mb-1">Status</h3>
            {isFixed ? (
              <div className="text-green-400 flex items-center gap-2 font-bold text-xs">
                <CheckCircle size={14} /> HEADER OK
              </div>
            ) : (
              <div className="text-red-400 flex items-center gap-2 font-bold text-xs animate-pulse">
                <FileWarning size={14} /> CORRUPTED
              </div>
            )}
          </div>

          <div className="flex-1 border border-slate-800 rounded bg-black p-2 relative overflow-hidden flex items-center justify-center">
            {isFixed ? (
              <img 
                src="/api/placeholder/150/150" 
                alt="Recovered Evidence" 
                className="opacity-80 grayscale hover:grayscale-0 transition-all border border-green-500" 
              />
            ) : (
              <div className="text-center space-y-2">
                 <FileWarning className="mx-auto text-red-900" size={32} />
                 <p className="text-[10px] text-red-700">PREVIEW UNAVAILABLE</p>
                 <p className="text-[10px] text-slate-600">Fix magic bytes to render preview.</p>
              </div>
            )}
          </div>

          <button 
            disabled={!isFixed}
            className={`
              w-full py-2 flex items-center justify-center gap-2 rounded text-xs font-bold uppercase
              ${isFixed 
                ? 'bg-green-600 text-black hover:bg-green-500 cursor-pointer shadow-[0_0_15px_rgba(34,197,94,0.4)]' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
            `}
          >
            <Save size={14} /> Extract File
          </button>
        </div>

      </div>
    </div>
  );
}