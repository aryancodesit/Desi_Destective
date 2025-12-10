'use client';

import React, { useState, useEffect } from 'react';
import { MapPin, Image as ImageIcon, Scan, Globe, Crosshair, AlertCircle } from 'lucide-react';

export default function GeoTracer({ onSolve }) {
  const [view, setView] = useState('image'); // 'image' or 'map'
  const [analyzing, setAnalyzing] = useState(false);
  const [dataRevealed, setDataRevealed] = useState(false);
  const [traceProgress, setTraceProgress] = useState(0);
  const [locationFound, setLocationFound] = useState(false);

  // SIMULATE METADATA EXTRACTION
  const runAnalysis = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setDataRevealed(true);
    }, 2000);
  };

  // SIMULATE SATELLITE TRACING
  const runTrace = () => {
    if (traceProgress > 0) return;
    const interval = setInterval(() => {
      setTraceProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setLocationFound(true);
          if (onSolve) onSolve(); // Trigger win
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  return (
    <div className="w-full h-full bg-slate-950 border border-green-900/50 rounded-lg flex flex-col font-mono shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden">
      
      {/* TOOLBAR */}
      <div className="bg-black/50 border-b border-green-900 p-2 flex gap-2">
        <button 
          onClick={() => setView('image')}
          className={`flex-1 py-2 flex items-center justify-center gap-2 rounded text-xs font-bold transition-all ${view === 'image' ? 'bg-green-900/30 text-green-400 border border-green-500/50' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <ImageIcon size={14} /> EXIF_ANALYZER
        </button>
        <button 
          onClick={() => setView('map')}
          className={`flex-1 py-2 flex items-center justify-center gap-2 rounded text-xs font-bold transition-all ${view === 'map' ? 'bg-green-900/30 text-green-400 border border-green-500/50' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Globe size={14} /> SAT_UPLINK
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 relative p-4">
        
        {/* VIEW 1: IMAGE ANALYZER */}
        {view === 'image' && (
          <div className="h-full flex flex-col md:flex-row gap-4 animate-in fade-in">
            
            {/* The Evidence Image */}
            <div className="flex-1 bg-black border border-slate-800 rounded flex items-center justify-center relative overflow-hidden group">
              {/* Fake Image Content */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 opacity-50"></div>
              <div className="text-center z-10 opacity-50 group-hover:opacity-100 transition-opacity">
                <ImageIcon size={48} className="mx-auto mb-2" />
                <p className="text-xs">IMG_LEAK_FINAL.JPG</p>
              </div>
              
              {/* Scanning Overlay */}
              {analyzing && (
                <div className="absolute inset-0 bg-green-500/20 border-b-2 border-green-500 animate-[scanline_1.5s_linear_infinite]"></div>
              )}
            </div>

            {/* Metadata Panel */}
            <div className="w-full md:w-64 bg-slate-900 border border-green-900/30 rounded p-4 flex flex-col">
              <h3 className="text-xs text-green-500 font-bold mb-4 flex items-center gap-2">
                <Scan size={14} /> METADATA LOG
              </h3>
              
              <div className="flex-1 space-y-3 text-[10px] text-slate-400">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>DEVICE:</span> <span className="text-slate-200">iPhone 14 Pro</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>ISO:</span> <span className="text-slate-200">400</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                  <span>DATE:</span> <span className="text-slate-200">2023:10:24</span>
                </div>
                
                {/* THE CLUE */}
                <div className={`mt-4 p-2 rounded border ${dataRevealed ? 'bg-green-900/20 border-green-500 text-green-400' : 'bg-black border-slate-800 opacity-50'}`}>
                  <div className="mb-1 font-bold">GPS DATA:</div>
                  {dataRevealed ? (
                    <div className="font-mono text-sm">
                      19.155° N <br/> 72.885° E
                    </div>
                  ) : (
                    <div className="font-mono">--.---° N <br/> --.---° E</div>
                  )}
                </div>
              </div>

              <button 
                onClick={runAnalysis}
                disabled={analyzing || dataRevealed}
                className="mt-4 w-full py-2 bg-green-700 hover:bg-green-600 disabled:bg-slate-800 disabled:text-slate-600 text-black font-bold text-xs rounded uppercase"
              >
                {analyzing ? 'EXTRACTING...' : dataRevealed ? 'EXTRACTION COMPLETE' : 'RUN EXIF TOOL'}
              </button>
            </div>
          </div>
        )}

        {/* VIEW 2: SATELLITE MAP */}
        {view === 'map' && (
          <div className="h-full flex flex-col relative animate-in zoom-in-95 duration-300">
            
            {/* The Map */}
            <div className="flex-1 bg-slate-900 rounded border border-slate-700 relative overflow-hidden">
              {/* Grid Lines (Fake Map) */}
              <div className="absolute inset-0 opacity-20" style={{
                  backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)',
                  backgroundSize: '40px 40px'
              }}></div>
              
              {/* Random Map Noise */}
              <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-slate-700 rounded-full opacity-30"></div>
              <div className="absolute bottom-1/3 right-1/4 w-64 h-2 border-t border-slate-700 rotate-45 opacity-30"></div>

              {/* Target Marker */}
              {locationFound && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                  <MapPin className="text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" size={32} fill="rgba(239,68,68,0.2)" />
                  <div className="bg-black/80 text-red-500 text-[10px] px-2 py-1 rounded mt-2 border border-red-500">
                    TARGET: DIRECTOR'S FARMHOUSE
                  </div>
                </div>
              )}

              {/* Scanning Crosshair */}
              {!locationFound && traceProgress > 0 && (
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Crosshair className="text-green-500 animate-spin opacity-50" size={64} />
                 </div>
              )}
            </div>

            {/* Controls Overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-black/80 border border-green-900/50 p-4 rounded flex items-center justify-between backdrop-blur-sm">
              <div className="font-mono text-xs">
                 <div className="text-slate-500 mb-1">TARGET COORDINATES</div>
                 {dataRevealed ? (
                   <div className="text-green-400 tracking-widest">19.155° N, 72.885° E</div>
                 ) : (
                   <div className="text-red-500 flex items-center gap-2"><AlertCircle size={12}/> NO DATA INPUT</div>
                 )}
              </div>

              {traceProgress > 0 && traceProgress < 100 ? (
                <div className="w-1/3">
                   <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-green-500" style={{width: `${traceProgress}%`}}></div>
                   </div>
                   <div className="text-[10px] text-green-500 text-center mt-1">TRIANGULATING SIGNAL...</div>
                </div>
              ) : (
                <button 
                  onClick={runTrace}
                  disabled={!dataRevealed || locationFound}
                  className="px-6 py-2 bg-green-600 hover:bg-green-500 disabled:bg-slate-800 disabled:text-slate-600 text-black font-bold text-xs rounded uppercase shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                >
                  {locationFound ? 'TARGET LOCKED' : 'INITIATE SATELLITE TRACE'}
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}