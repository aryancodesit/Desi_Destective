'use client';

import React, { useState, useEffect } from 'react';
import { Layers, ScanEye, Fingerprint, Binary, Save, FileWarning, CheckCircle, Activity, Play, Pause, Clock, RefreshCw, Image as ImageIcon, Globe, AlertCircle, Crosshair } from 'lucide-react';

// --- TOOL 1: STEGANOGRAPHY (Case 001) ---
export const StegoScanner = ({ hiddenText, hiddenSubtext, onSolve }) => {
    const [overlayOpacity, setOverlayOpacity] = useState(0);
    const [isSolved, setIsSolved] = useState(false);

    const checkStego = (val) => {
        setOverlayOpacity(val);
        if (val > 88 && val < 92) {
            if (!isSolved) { setIsSolved(true); if (onSolve) onSolve(); }
        } else {
            setIsSolved(false);
        }
    };

    return (
        <div className="w-full h-full bg-slate-950 border border-green-900/50 rounded-lg flex flex-col font-mono shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden">
            <div className="h-12 border-b border-green-900 flex items-center px-4 gap-4 bg-slate-950">
                <div className="flex items-center gap-2 text-green-400"><Layers size={18} /><span className="font-bold text-sm">STEGO_SCANNER_v2.exe</span></div>
                <div className="h-4 w-px bg-green-900"></div>
                <div className="text-xs text-slate-500">Overlay Analysis Mode</div>
                {isSolved && <div className="ml-auto px-2 py-1 bg-green-900/50 border border-green-500 text-[10px] text-green-300 rounded animate-pulse">PATTERN MATCHED</div>}
            </div>
            <div className="flex-1 flex items-center justify-center p-4 overflow-hidden relative bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] bg-repeat opacity-90">
                <div className="relative w-[90%] h-[80%] border-2 border-slate-700 shadow-2xl bg-black overflow-hidden group">
                    <div className="absolute inset-0 flex items-center justify-center bg-black text-slate-600">
                        <img src="/EVIDENCE_IMG_SOURCE.jpg" alt="Evidence" className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300 z-20" style={{ opacity: isSolved ? 1 : 0 }}>
                        <div className="bg-black/90 p-6 border-2 border-green-500 text-green-500 font-mono text-sm shadow-[0_0_50px_rgba(34,197,94,0.4)] backdrop-blur-sm">
                            <div className="flex items-center gap-2 mb-2 border-b border-green-900 pb-2"><ScanEye size={16} /><span className="font-bold text-xs uppercase">Steganography Decoded</span></div>
                            <p className="text-slate-400 text-xs mb-1">Payload Extracted:</p><p className="font-bold text-lg text-white mb-2">"{hiddenText}"</p><p className="text-xs text-green-400 italic">Analysis: {hiddenSubtext}</p>
                        </div>
                    </div>
                    <div className="absolute inset-0 bg-green-500 mix-blend-overlay pointer-events-none transition-opacity duration-75 z-10" style={{ opacity: overlayOpacity / 100 }}></div>
                </div>
                <div className="absolute bottom-6 w-72 bg-slate-950/90 backdrop-blur border border-green-900 p-4 rounded-xl shadow-2xl flex flex-col gap-3">
                    <div className="flex justify-between items-center"><label className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Alpha Channel Threshold</label><span className="text-xs font-mono text-green-400">{overlayOpacity}%</span></div>
                    <input type="range" min="0" max="100" value={overlayOpacity} onChange={(e) => checkStego(parseInt(e.target.value))} className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-green-500" />
                </div>
            </div>
        </div>
    );
};

// --- TOOL 2: HEX EDITOR (Case 002) ---
export const HexEditor = ({ onSolve }) => {
    const TARGET_HEADER = ['FF', 'D8', 'FF', 'E0'];
    const [userHeader, setUserHeader] = useState(['00', '00', '00', '00']);
    const [isFixed, setIsFixed] = useState(false);
    const [memory, setMemory] = useState([]);

    useEffect(() => {
        const rows = [];
        for (let i = 0; i < 10; i++) {
            const row = [];
            for (let j = 0; j < 8; j++) row.push(Math.floor(Math.random() * 255).toString(16).toUpperCase().padStart(2, '0'));
            rows.push(row);
        }
        setMemory(rows);
    }, []);

    const cycleByte = (index) => {
        if (isFixed) return;
        const newHeader = [...userHeader];
        if (newHeader[index] === '00') newHeader[index] = TARGET_HEADER[index];
        else if (newHeader[index] === TARGET_HEADER[index]) newHeader[index] = 'CC';
        else newHeader[index] = '00';
        setUserHeader(newHeader);
        if (JSON.stringify(newHeader) === JSON.stringify(TARGET_HEADER)) { setIsFixed(true); if (onSolve) onSolve(); }
    };

    return (
        <div className="w-full h-full bg-black border border-green-900/50 rounded-lg p-4 font-mono text-sm flex flex-col shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-4 border-b border-green-900 pb-2"><div className="flex items-center gap-2 text-green-500"><Binary size={18} /><span className="font-bold">HEX_EDITOR_PRO.EXE</span></div></div>
            <div className="flex-1 flex gap-4 overflow-hidden">
                <div className="flex-1 bg-slate-900/50 p-4 rounded overflow-y-auto border border-green-900/30">
                    <div className="flex gap-4 mb-1 bg-red-900/20 p-1 -mx-1 rounded border border-red-500/30">
                        <span className="text-slate-500 select-none w-16">00000000</span>
                        <div className="flex gap-3">{userHeader.map((byte, idx) => (<button key={idx} onClick={() => cycleByte(idx)} className={`w-6 text-center rounded ${byte === TARGET_HEADER[idx] ? 'text-green-400 font-bold' : 'text-red-500 animate-pulse font-bold bg-red-900/40'}`}>{byte}</button>))}</div>
                    </div>
                    {memory.map((row, rIdx) => (<div key={rIdx} className="flex gap-4 mb-1 opacity-50 hover:opacity-100 transition-opacity"><span className="text-slate-600 select-none w-16">{(rIdx + 1).toString(16).toUpperCase().padStart(8, '0')}</span><div className="flex gap-3 text-slate-400">{row.map((byte, cIdx) => <span key={cIdx} className="w-6 text-center">{byte}</span>)}</div></div>))}
                </div>
                <div className="w-48 bg-slate-950 border-l border-green-900 p-3 flex flex-col gap-4">
                    <div className="p-3 bg-green-900/10 border border-green-900/50 rounded"><h3 className="text-[10px] text-green-600 uppercase mb-1">Status</h3>{isFixed ? <div className="text-green-400 flex items-center gap-2 font-bold text-xs"><CheckCircle size={14} /> HEADER OK</div> : <div className="text-red-400 flex items-center gap-2 font-bold text-xs animate-pulse"><FileWarning size={14} /> CORRUPTED</div>}</div>
                    <button disabled={!isFixed} className={`w-full py-2 flex items-center justify-center gap-2 rounded text-xs font-bold uppercase ${isFixed ? 'bg-green-600 text-black hover:bg-green-500 cursor-pointer' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}`}><Save size={14} /> Extract File</button>
                </div>
            </div>
        </div>
    );
};

// --- TOOL 3: AUDIO ISOLATOR (Case 003) ---
export const AudioIsolator = ({ onSolve }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [cutoff, setCutoff] = useState(120);
    const [decodedText, setDecodedText] = useState("");
    const [bars, setBars] = useState(new Array(32).fill(10));

    useEffect(() => {
        let interval; if (isPlaying) interval = setInterval(() => setBars(prev => prev.map(() => Math.random() * 80 + 10)), 100); else setBars(new Array(32).fill(10)); return () => clearInterval(interval);
    }, [isPlaying]);

    useEffect(() => {
        if (isPlaying && cutoff > 60 && cutoff < 80) { setDecodedText("...under the third pillar... midnight..."); if (onSolve) setTimeout(() => onSolve(), 3000); }
        else if (isPlaying) setDecodedText("(Wind Howling) ... (Static) ... (Unintelligible)");
        else setDecodedText("Ready to analyze.");
    }, [cutoff, isPlaying, onSolve]);

    return (
        <div className="w-full h-full bg-slate-950 border border-green-900/50 rounded-lg p-6 flex flex-col font-mono relative overflow-hidden">
            <div className="flex justify-between items-center mb-8 relative z-10"><div className="flex items-center gap-3"><div className="p-2 bg-green-900/20 rounded border border-green-500/30 text-green-400"><Activity size={20} /></div><div><h2 className="text-lg font-bold text-slate-200 tracking-wider">SPECTRAL_ISOLATOR v3.0</h2></div></div></div>
            <div className="flex-1 bg-black border border-slate-800 rounded-lg mb-6 relative flex items-center justify-center gap-1 px-4 overflow-hidden">{bars.map((height, i) => <div key={i} className="flex-1 opacity-60 rounded-t-sm" style={{ height: `${height}%`, backgroundColor: (i > 20 && cutoff > 80) ? '#ef4444' : '#22c55e' }}></div>)}</div>
            <div className="bg-slate-900/80 border border-green-900/30 p-4 rounded mb-6 min-h-[60px] flex items-center justify-center text-center relative z-10"><p className={`text-sm ${decodedText.includes("pillar") ? "text-green-400 font-bold animate-pulse" : "text-slate-600 blur-[0.5px]"}`}>{decodedText}</p></div>
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-lg relative z-10 flex items-center gap-6"><button onClick={() => setIsPlaying(!isPlaying)} className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 hover:bg-green-500 text-black transition-all">{isPlaying ? <Pause fill="black" /> : <Play fill="black" className="ml-1" />}</button><div className="flex-1"><input type="range" min="20" max="200" value={cutoff} onChange={(e) => setCutoff(parseInt(e.target.value))} className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500" /></div></div>
        </div>
    );
};

// --- TOOL 4: TIME SYNC (Case 004) ---
export const TimeSync = ({ onSolve }) => {
    const [offset, setOffset] = useState(0);
    const [isSynced, setIsSynced] = useState(false);
    const RAW_LOGS = [{ id: 1, event: "TURNSTILE_ENTER", location: "CHURCHGATE", time: "22:15" }, { id: 4, event: "TURNSTILE_EXIT", location: "DADAR_WEST", time: "22:35" }];

    const handleSync = () => { if (parseInt(offset) === -5) { setIsSynced(true); if (onSolve) onSolve(); } else { setIsSynced(false); } };
    const adjustTime = (timeStr, mins) => { const [h, m] = timeStr.split(':').map(Number); const date = new Date(); date.setHours(h, m + mins); return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }); };

    return (
        <div className="w-full h-full bg-slate-950 border border-green-900/50 rounded-lg flex flex-col font-mono overflow-hidden">
            <div className="bg-slate-900 border-b border-green-900 p-3 flex justify-between items-center"><div className="flex items-center gap-2 text-green-500 font-bold text-sm"><Clock size={16} /><span>CHRONO_SYNC_MANAGER</span></div></div>
            <div className="flex-1 flex flex-col md:flex-row">
                <div className="w-full md:w-64 bg-black/40 border-r border-green-900/30 p-6 flex flex-col gap-6">
                    <div className="space-y-2"><label className="text-xs text-slate-400 uppercase font-bold">Time Correction</label><div className="flex items-center gap-2"><input type="number" value={offset} onChange={(e) => setOffset(e.target.value)} className="bg-slate-900 border border-green-700 text-green-400 p-2 rounded w-20 text-center" /></div></div>
                    <button onClick={handleSync} className={`w-full py-3 flex items-center justify-center gap-2 rounded text-xs font-bold uppercase transition-all ${isSynced ? 'bg-green-600 text-black' : 'bg-green-900/20 text-green-500 border border-green-900'}`}><RefreshCw size={14} />{isSynced ? 'TIMELINE SYNCED' : 'APPLY OFFSET'}</button>
                </div>
                <div className="flex-1 bg-slate-900 p-6 overflow-y-auto">{RAW_LOGS.map((log) => (<div key={log.id} className="grid grid-cols-12 text-xs py-3 border-b border-slate-800/50 items-center"><div className="col-span-4 font-mono text-slate-400">{log.time}</div><div className="col-span-4 font-mono font-bold text-green-500">{isSynced ? adjustTime(log.time, parseInt(offset)) : '--:--'}</div><div className="col-span-4">{log.event}</div></div>))}</div>
            </div>
        </div>
    );
};

// --- TOOL 5: GEO TRACER (Case 005) ---
export const GeoTracer = ({ onSolve }) => {
    const [view, setView] = useState('image');
    const [analyzing, setAnalyzing] = useState(false);
    const [dataRevealed, setDataRevealed] = useState(false);
    const [traceProgress, setTraceProgress] = useState(0);
    const [locationFound, setLocationFound] = useState(false);

    const runAnalysis = () => { setAnalyzing(true); setTimeout(() => { setAnalyzing(false); setDataRevealed(true); }, 2000); };
    const runTrace = () => { if (traceProgress > 0) return; const interval = setInterval(() => { setTraceProgress(prev => { if (prev >= 100) { clearInterval(interval); setLocationFound(true); if (onSolve) onSolve(); return 100; } return prev + 2; }); }, 50); };

    return (
        <div className="w-full h-full bg-slate-950 border border-green-900/50 rounded-lg flex flex-col font-mono overflow-hidden">
            <div className="bg-black/50 border-b border-green-900 p-2 flex gap-2">
                <button onClick={() => setView('image')} className={`flex-1 py-2 text-xs font-bold ${view === 'image' ? 'text-green-400 border border-green-500/50' : 'text-slate-500'}`}>EXIF_ANALYZER</button>
                <button onClick={() => setView('map')} className={`flex-1 py-2 text-xs font-bold ${view === 'map' ? 'text-green-400 border border-green-500/50' : 'text-slate-500'}`}>SAT_UPLINK</button>
            </div>
            <div className="flex-1 relative p-4">
                {view === 'image' && (<div className="h-full flex flex-col md:flex-row gap-4"><div className="flex-1 bg-black border border-slate-800 rounded flex items-center justify-center relative"><ImageIcon size={48} className="mx-auto mb-2 opacity-50" /></div><div className="w-full md:w-64 bg-slate-900 border border-green-900/30 rounded p-4 flex flex-col"><button onClick={runAnalysis} disabled={analyzing || dataRevealed} className="mt-4 w-full py-2 bg-green-700 hover:bg-green-600 disabled:bg-slate-800 text-black font-bold text-xs rounded uppercase">{analyzing ? 'EXTRACTING...' : dataRevealed ? 'EXTRACTION COMPLETE' : 'RUN EXIF TOOL'}</button>{dataRevealed && <div className="mt-4 font-mono text-green-400">19.155° N, 72.885° E</div>}</div></div>)}
                {view === 'map' && (<div className="h-full flex flex-col relative"><div className="flex-1 bg-slate-900 rounded border border-slate-700 relative flex items-center justify-center">{locationFound ? <div className="flex flex-col items-center animate-bounce"><div className="bg-red-500 p-2 rounded-full"></div><div className="text-red-500 text-xs mt-2">TARGET FOUND</div></div> : <div className="opacity-20 text-slate-500">SATELLITE OFFLINE</div>}</div><div className="absolute bottom-4 left-4 right-4 bg-black/80 p-4 rounded flex items-center justify-between"><button onClick={runTrace} disabled={!dataRevealed || locationFound} className="px-6 py-2 bg-green-600 hover:bg-green-500 disabled:bg-slate-800 text-black font-bold text-xs rounded uppercase">{locationFound ? 'TARGET LOCKED' : 'INITIATE SATELLITE TRACE'}</button></div></div>)}
            </div>
        </div>
    );
};