'use client';

import React from 'react';
import { FileText, User, Clock, AlertCircle } from 'lucide-react';

export default function ChatLog({ 
  caseId = "000",
  participants = ["Unknown", "Target"],
  messages = [
    { id: 1, sender: "Target", timestamp: "2023-10-24T22:30:00", content: "Did you delete the files?" },
    { id: 2, sender: "Unknown", timestamp: "2023-10-24T22:31:15", content: "Yes. Server is wiped." },
    { id: 3, sender: "Target", timestamp: "2023-10-24T22:32:00", content: "Good. Payment sent to the usual wallet." }
  ]
}) {
  return (
    <div className="w-full h-full bg-slate-950 border border-green-900/50 rounded-lg flex flex-col font-mono shadow-2xl overflow-hidden">
      
      {/* HEADER: REPORT METADATA */}
      <div className="bg-slate-900 p-4 border-b border-green-900 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-900/20 border border-green-500/30 rounded text-green-400">
            <FileText size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-200 tracking-widest">IM_LOG_EXTRACTOR v1.4</h2>
            <div className="text-[10px] text-green-600">CASE ID: {caseId} | SOURCE: CLOUD_BACKUP_04</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-slate-500 uppercase">Participants</div>
          <div className="text-xs text-green-500 font-bold">{participants.join(" <-> ")}</div>
        </div>
      </div>

      {/* LOG CONTENT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black/40 relative">
        
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
           <AlertCircle size={200} />
        </div>

        {messages.map((msg) => {
          const isTarget = msg.sender === "Target" || msg.sender === participants[1];
          return (
            <div 
              key={msg.id} 
              className={`flex flex-col max-w-[85%] ${isTarget ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              {/* Metadata Line */}
              <div className="flex items-center gap-2 text-[10px] text-slate-500 mb-1">
                <span className={`flex items-center gap-1 ${isTarget ? 'text-orange-400' : 'text-blue-400'}`}>
                  <User size={10} /> {msg.sender.toUpperCase()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={10} /> {new Date(msg.timestamp).toLocaleTimeString()}
                </span>
              </div>

              {/* Message Bubble */}
              <div className={`
                p-3 rounded border text-xs leading-relaxed shadow-sm
                ${isTarget 
                  ? 'bg-orange-900/10 border-orange-900/50 text-orange-100 rounded-tr-none' 
                  : 'bg-blue-900/10 border-blue-900/50 text-blue-100 rounded-tl-none'}
              `}>
                {msg.content}
              </div>
            </div>
          );
        })}
        
        {/* End of Log Marker */}
        <div className="py-4 flex items-center justify-center gap-2 opacity-30">
          <div className="h-px w-12 bg-green-500"></div>
          <span className="text-[10px] text-green-500">END OF TRANSCRIPT</span>
          <div className="h-px w-12 bg-green-500"></div>
        </div>

      </div>
    </div>
  );
}