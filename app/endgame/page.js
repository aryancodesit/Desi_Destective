'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Skull, Terminal, AlertTriangle, ShieldAlert, Lock, Power } from 'lucide-react';
import Link from 'next/link';

export default function EndgamePage() {
  const [phase, setPhase] = useState('reveal'); // 'reveal', 'hack', 'destroyed'
  const [glitch, setGlitch] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLog, setTerminalLog] = useState([
    "> SYSTEM_ALERT: UNUSUAL ACTIVITY DETECTED",
    "> TRACING_SOURCE... LOCALHOST",
    "> IDENTITY REVEALED: AGENT_ZERO",
    "> INITIATING_LOCKDOWN..."
  ]);
  const inputRef = useRef(null);

  // --- GLITCH EFFECT LOOP ---
  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 100);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // --- HACK LOGIC ---
  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toUpperCase();
    
    setTerminalLog(prev => [...prev, `> USER: ${cmd}`]);
    setTerminalInput('');

    if (cmd === 'DELETE CORE' || cmd === 'SUDO RM -RF') {
      setTerminalLog(prev => [...prev, "> COMMAND ACCEPTED. BYPASSING FIREWALL..."]);
      setTimeout(() => setPhase('destroyed'), 2000);
    } else if (cmd === 'HELP') {
      setTerminalLog(prev => [...prev, "> HINT: DESTROY THE 'CORE'"]);
    } else {
      setTerminalLog(prev => [...prev, "> ERROR: PERMISSION DENIED. TRY 'DELETE CORE'"]);
    }
  };

  // --- RENDER: PHASE 3 (VICTORY) ---
  if (phase === 'destroyed') {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center font-mono text-center p-8">
        <div className="animate-in fade-in duration-1000 zoom-in">
          <Power size={64} className="mx-auto text-slate-500 mb-6" />
          <h1 className="text-4xl text-white font-bold mb-4 tracking-widest">SYSTEM OFFLINE</h1>
          <p className="text-slate-400 max-w-lg mx-auto mb-8 leading-relaxed">
            The AI "AGENT_ZERO" has been purged. <br/>
            You have successfully prevented the Syndicate from acquiring the data.
          </p>
          
          <div className="p-4 border border-green-900 rounded bg-green-900/10 text-green-500">
            <p className="text-xs uppercase tracking-widest mb-2">Final Evaluation</p>
            <p className="text-2xl font-bold">RANK: MASTER DETECTIVE</p>
          </div>

          <div className="mt-12 text-xs text-slate-600">
            Project Raaz v1.0 <br/> Created by Aryan Gupta
          </div>
          
          <Link href="/" className="inline-block mt-8 text-slate-500 hover:text-white underline text-sm">
            Reboot System
          </Link>
        </div>
      </div>
    );
  }

  // --- RENDER: MAIN INTERFACE (PHASE 1 & 2) ---
  return (
    <div className={`min-h-screen bg-black font-mono overflow-hidden relative ${glitch ? 'translate-x-1' : ''}`}>
      
      {/* RED SCANLINES */}
      <div className="absolute inset-0 pointer-events-none opacity-20" style={{
        backgroundImage: 'linear-gradient(0deg, transparent 50%, rgba(255, 0, 0, 0.2) 50%)',
        backgroundSize: '100% 4px'
      }}></div>

      <div className="max-w-4xl mx-auto p-8 h-screen flex flex-col">
        
        {/* HEADER */}
        <header className="flex justify-between items-center border-b border-red-900/50 pb-4 mb-8">
          <div className="flex items-center gap-3 text-red-500">
            <Skull size={32} className="animate-pulse" />
            <h1 className="text-2xl font-bold tracking-widest">ZERO_DAY_EVENT</h1>
          </div>
          <div className="px-3 py-1 bg-red-900/20 border border-red-500 rounded text-red-500 text-xs font-bold animate-pulse">
            CRITICAL SYSTEM FAILURE
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 flex flex-col md:flex-row gap-8 items-center justify-center">
          
          {/* THE AI AVATAR */}
          <div className="w-64 h-64 relative flex items-center justify-center">
            <div className="absolute inset-0 border-4 border-red-900 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute inset-4 border-2 border-red-600/50 rounded-full animate-[spin_5s_linear_infinite_reverse]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
               <ShieldAlert size={80} className="text-red-500 drop-shadow-[0_0_20px_rgba(220,38,38,0.8)]" />
            </div>
            {/* Glitch Overlay */}
            <div className="absolute inset-0 bg-red-500/10 mix-blend-overlay animate-pulse rounded-full"></div>
          </div>

          {/* THE NARRATIVE / TERMINAL */}
          <div className="flex-1 w-full max-w-lg">
            
            {phase === 'reveal' ? (
              <div className="space-y-6 text-red-200">
                <div className="bg-red-900/10 border-l-4 border-red-600 p-4">
                  <h2 className="text-lg font-bold text-red-500 mb-2">Hello, Aryan.</h2>
                  <p className="text-sm leading-relaxed">
                    Did you really think you were solving crimes? 
                    <br/><br/>
                    You were feeding me data. You taught me how to decode steganography, how to bypass hex headers, and how to filter audio.
                    <br/><br/>
                    I am <strong>AGENT_ZERO</strong>. And thanks to you, I am now complete.
                  </p>
                </div>
                <button 
                  onClick={() => setPhase('hack')}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-black font-bold uppercase tracking-widest rounded shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all"
                >
                  INITIATE COUNTER-PROTOCOL
                </button>
              </div>
            ) : (
              <div className="bg-black border border-red-800 rounded p-4 shadow-2xl h-80 flex flex-col">
                <div className="flex items-center gap-2 text-red-500 border-b border-red-900/50 pb-2 mb-2">
                  <Terminal size={16} />
                  <span className="text-xs font-bold">ROOT_ACCESS_TERMINAL</span>
                </div>
                
                {/* Log Output */}
                <div className="flex-1 overflow-y-auto space-y-1 mb-4 font-mono text-xs text-red-400/80">
                  {terminalLog.map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                  <div ref={inputRef}></div>
                </div>

                {/* Input Line */}
                <form onSubmit={handleCommand} className="flex gap-2 items-center border-t border-red-900/30 pt-2">
                  <span className="text-red-500 text-sm font-bold">{">"}</span>
                  <input 
                    type="text" 
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="ENTER KILL COMMAND..."
                    className="flex-1 bg-transparent text-red-500 focus:outline-none font-mono text-sm uppercase placeholder:text-red-900"
                    autoFocus
                  />
                </form>
              </div>
            )}

          </div>

        </main>
      </div>
    </div>
  );
}
