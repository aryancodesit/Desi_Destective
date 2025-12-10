'use client';

import React, { useState } from 'react';
import { Clock, RefreshCw, AlertTriangle, ArrowRightLeft, FileText } from 'lucide-react';

export default function TimeSync({ onSolve }) {
  const [offset, setOffset] = useState(0); // Minutes
  const [isSynced, setIsSynced] = useState(false);

  // DATA: The "Raw" logs from the server
  const RAW_LOGS = [
    { id: 1, event: "TURNSTILE_ENTER", location: "CHURCHGATE", time: "22:15" },
    { id: 2, event: "CCTV_CAM_04", location: "PLATFORM 3", time: "22:18" },
    { id: 3, event: "TRAIN_DEPART", location: "FAST_LOCAL", time: "22:20" },
    { id: 4, event: "TURNSTILE_EXIT", location: "DADAR_WEST", time: "22:35" }, // Suspect's Alibi Time
    { id: 5, event: "ATM_WITHDRAWAL", location: "DADAR_ATM", time: "22:40" },
  ];

  // The Murder happened at 22:50 on the train.
  // The Suspect claims he left the train at Dadar at 22:35 (Log #4).
  // BUT: The Physical Clue says "Churchgate Server is FAST by 20 minutes".
  // So Real Time of Log #4 = 22:35 - 20 = 22:15. 
  // Wait, that doesn't make him guilty.
  
  // Let's reverse it: 
  // Suspect claims he was HOME by 23:00.
  // Digital Log shows he entered his building at 23:00.
  // Clue: "Security System Clock reset to DEFAULT (1 hour behind)".
  // Real Time = 00:00. He has no alibi for 23:00.

  // Let's stick to the "Train Drift" scenario from the plan:
  // Train leaves at 23:45.
  // Suspect claims he exited at 23:42 (Before train left).
  // Log shows 23:42.
  // Physical Report: "Clock Lag: -5 Minutes".
  // Real Time = 23:47. (He was on the train when it left).
  
  const TARGET_OFFSET = -5; 

  const handleSync = () => {
    if (parseInt(offset) === TARGET_OFFSET) {
      setIsSynced(true);
      if (onSolve) onSolve();
    } else {
      setIsSynced(false);
    }
  };

  // Helper to add minutes to HH:MM string
  const adjustTime = (timeStr, mins) => {
    const [h, m] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(h, m + mins);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  return (
    <div className="w-full h-full bg-slate-950 border border-green-900/50 rounded-lg flex flex-col font-mono shadow-[0_0_40px_rgba(0,0,0,0.6)] overflow-hidden">
      
      {/* TOOLBAR */}
      <div className="bg-slate-900 border-b border-green-900 p-3 flex justify-between items-center">
        <div className="flex items-center gap-2 text-green-500 font-bold text-sm">
          <Clock size={16} />
          <span>CHRONO_SYNC_MANAGER</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
           <span>SERVER: MUM_WEST_01</span>
           <div className={`w-2 h-2 rounded-full ${isSynced ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* LEFT: CONTROLS */}
        <div className="w-full md:w-64 bg-black/40 border-r border-green-900/30 p-6 flex flex-col gap-6">
           
           <div className="space-y-2">
             <label className="text-xs text-slate-400 uppercase font-bold">Time Correction (Offset)</label>
             <div className="flex items-center gap-2">
               <input 
                 type="number" 
                 value={offset}
                 onChange={(e) => setOffset(e.target.value)}
                 className="bg-slate-900 border border-green-700 text-green-400 p-2 rounded w-20 text-center focus:outline-none focus:shadow-[0_0_10px_rgba(34,197,94,0.3)]"
               />
               <span className="text-xs text-slate-500">MINS</span>
             </div>
             <p className="text-[10px] text-slate-600 leading-tight">
               Refer to physical maintenance logs for drift values.
             </p>
           </div>

           <button 
             onClick={handleSync}
             className={`
               w-full py-3 flex items-center justify-center gap-2 rounded text-xs font-bold uppercase transition-all
               ${isSynced ? 'bg-green-600 text-black shadow-[0_0_15px_rgba(34,197,94,0.4)]' : 'bg-green-900/20 text-green-500 border border-green-900 hover:bg-green-900/40'}
             `}
           >
             <RefreshCw size={14} className={isSynced ? "" : "animate-spin-slow"} />
             {isSynced ? 'TIMELINE SYNCED' : 'APPLY OFFSET'}
           </button>

           {isSynced && (
             <div className="mt-auto bg-red-900/20 border border-red-500/50 p-3 rounded animate-in fade-in slide-in-from-bottom-2">
               <div className="flex items-center gap-2 text-red-500 font-bold text-xs mb-1">
                 <AlertTriangle size={14} /> ANOMALY DETECTED
               </div>
               <p className="text-[10px] text-red-300 leading-relaxed">
                 Subject exited station at <strong>23:47</strong>. <br/>
                 Train departed at <strong>23:45</strong>. <br/>
                 <span className="text-white font-bold underline">ALIBI INVALID.</span>
               </p>
             </div>
           )}
        </div>

        {/* RIGHT: LOG VIEWER */}
        <div className="flex-1 bg-slate-900 p-6 overflow-y-auto">
          <div className="space-y-4">
             
             {/* HEADER ROW */}
             <div className="grid grid-cols-12 text-[10px] text-slate-500 uppercase tracking-widest border-b border-slate-800 pb-2">
               <div className="col-span-1">ID</div>
               <div className="col-span-3">TIMESTAMP (RAW)</div>
               <div className="col-span-3 text-green-600 font-bold">ACTUAL TIME</div>
               <div className="col-span-5">EVENT LOG</div>
             </div>

             {/* DATA ROWS */}
             {RAW_LOGS.map((log) => {
               // Hardcoded Log times for the scenario
               // Train leaves at 23:45
               // Suspect Log raw: 23:42
               const rawTime = log.id === 4 ? "23:42" : log.time; 
               const eventName = log.id === 4 ? "TURNSTILE_EXIT (SUSPECT)" : log.event;

               return (
                 <div key={log.id} className="grid grid-cols-12 text-xs py-3 border-b border-slate-800/50 hover:bg-white/5 transition-colors items-center group">
                   <div className="col-span-1 text-slate-600">#{log.id.toString().padStart(3, '0')}</div>
                   
                   <div className="col-span-3 font-mono text-slate-400 group-hover:text-white">
                     {rawTime}
                   </div>
                   
                   <div className="col-span-3 font-mono font-bold text-green-500">
                     {isSynced ? (
                       <span className="bg-green-900/30 px-1 rounded animate-pulse">
                         {adjustTime(rawTime, parseInt(offset))}
                       </span>
                     ) : (
                       <span className="text-slate-700">--:--</span>
                     )}
                   </div>
                   
                   <div className="col-span-5 flex items-center gap-2">
                     <span className={log.id === 4 && isSynced ? "text-red-400 font-bold" : "text-slate-300"}>
                       {eventName}
                     </span>
                     {log.id === 4 && isSynced && <AlertTriangle size={12} className="text-red-500" />}
                   </div>
                 </div>
               );
             })}

             {/* TRAIN DEPARTURE LINE (CONTEXT) */}
             <div className="relative py-4">
               <div className="absolute inset-0 flex items-center">
                 <div className="w-full border-t border-dashed border-slate-600"></div>
               </div>
               <div className="relative flex justify-center">
                 <span className="bg-slate-900 px-2 text-[10px] text-slate-500 border border-slate-700 rounded">
                   TRAIN SCHEDULED DEPARTURE: 23:45:00
                 </span>
               </div>
             </div>

          </div>
        </div>

      </div>
    </div>
  );
}