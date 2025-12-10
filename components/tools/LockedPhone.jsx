'use client';

import React, { useState } from 'react';
import { Lock, Unlock, Battery, Wifi, Signal, ChevronLeft, MessageSquare, Image as ImageIcon, Send, User } from 'lucide-react';

export default function LockedPhone({ 
  passcode = "1415", // Default: The answer to the Shayari Cipher (Year 1, Season 4...)
  victimName = "Vikram Oberoi",
  messages = [
    { id: 1, sender: "Kaka (Chef)", text: "Sahab, please don't fire me. I have nowhere to go.", time: "Yesterday, 10:30 PM" },
    { id: 2, sender: "Me", text: "It's done. Leave the keys.", time: "Yesterday, 10:32 PM" },
    { id: 3, sender: "Unknown", text: "I know about the allergy. Be careful what you eat.", time: "Yesterday, 11:00 PM" },
  ]
}) {
  const [isLocked, setIsLocked] = useState(true);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [activeApp, setActiveApp] = useState('home'); // 'home', 'messages', 'gallery'

  const handleKeyPress = (num) => {
    if (input.length < 4) {
      const newInput = input + num;
      setInput(newInput);
      setError(false);
      
      // Auto-submit on 4 digits
      if (newInput.length === 4) {
        if (newInput === passcode) {
          setTimeout(() => setIsLocked(false), 300);
        } else {
          setTimeout(() => {
            setError(true);
            setInput("");
          }, 300);
        }
      }
    }
  };

  // --- SUB-COMPONENTS ---

  const StatusBar = () => (
    <div className="flex justify-between items-center px-4 py-2 text-[10px] text-white">
      <span>22:45</span>
      <div className="flex gap-1">
        <Signal size={10} />
        <Wifi size={10} />
        <Battery size={10} />
      </div>
    </div>
  );

  return (
    <div className="w-[300px] h-[600px] bg-black border-4 border-slate-800 rounded-[2rem] overflow-hidden relative shadow-2xl mx-auto ring-4 ring-slate-900/50">
      
      {/* PHONE NOTCH */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-xl z-20"></div>

      {/* --- SCREEN 1: LOCK SCREEN --- */}
      {isLocked && (
        <div className="h-full bg-[url('https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=1000&auto=format&fit=crop')] bg-cover flex flex-col items-center justify-between pb-10 pt-12 relative z-10">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
          
          <div className="relative z-10 text-center text-white">
            <Lock className="mx-auto mb-2 opacity-80" size={24} />
            <div className="text-4xl font-thin tracking-tighter">22:45</div>
            <div className="text-xs opacity-70 mt-1">Friday, October 24</div>
          </div>

          <div className="relative z-10 w-full px-8">
            {/* PIN DOTS */}
            <div className={`flex justify-center gap-4 mb-8 ${error ? 'animate-shake' : ''}`}>
              {[...Array(4)].map((_, i) => (
                <div 
                  key={i} 
                  className={`w-3 h-3 rounded-full border border-white ${i < input.length ? 'bg-white' : 'bg-transparent'}`}
                ></div>
              ))}
            </div>

            {/* KEYPAD */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button 
                  key={num}
                  onClick={() => handleKeyPress(num.toString())}
                  className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white text-2xl font-light flex items-center justify-center transition-colors mx-auto"
                >
                  {num}
                </button>
              ))}
              <div className="col-start-2">
                <button 
                  onClick={() => handleKeyPress("0")}
                  className="w-16 h-16 rounded-full bg-white/10 hover:bg-white/30 backdrop-blur-md text-white text-2xl font-light flex items-center justify-center transition-colors mx-auto"
                >
                  0
                </button>
              </div>
            </div>
            
            {error && <div className="text-red-300 text-xs text-center mt-4 font-bold">WRONG PASSCODE</div>}
            <div className="text-white/50 text-[10px] text-center mt-2">Hint: Read the Shayari</div>
          </div>
        </div>
      )}

      {/* --- SCREEN 2: HOME SCREEN --- */}
      {!isLocked && activeApp === 'home' && (
        <div className="h-full bg-slate-900 flex flex-col">
          <StatusBar />
          
          <div className="flex-1 p-6 grid grid-cols-3 content-start gap-y-8 gap-x-4 pt-12">
            
            {/* App Icons */}
            <button onClick={() => setActiveApp('messages')} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                <MessageSquare className="text-white" fill="white" size={28} />
              </div>
              <span className="text-white text-xs">WhatsApp</span>
            </button>

            <button className="flex flex-col items-center gap-2 group cursor-not-allowed opacity-50">
              <div className="w-14 h-14 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                <ImageIcon className="text-white" size={28} />
              </div>
              <span className="text-white text-xs">Photos</span>
            </button>

             <button className="flex flex-col items-center gap-2 group cursor-not-allowed opacity-50">
              <div className="w-14 h-14 bg-gray-700 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="text-white" size={28} />
              </div>
              <span className="text-white text-xs">Contacts</span>
            </button>

          </div>

          {/* Dock */}
          <div className="h-20 bg-white/10 backdrop-blur-md m-4 rounded-3xl flex items-center justify-around px-4">
             <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <div className="bg-white p-1 rounded-full"><span className="text-green-600 text-xs">📞</span></div>
             </div>
             <div className="w-12 h-12 bg-slate-700 rounded-xl"></div>
             <div className="w-12 h-12 bg-slate-700 rounded-xl"></div>
             <div className="w-12 h-12 bg-slate-700 rounded-xl"></div>
          </div>
        </div>
      )}

      {/* --- SCREEN 3: MESSAGES APP --- */}
      {!isLocked && activeApp === 'messages' && (
        <div className="h-full bg-[#0b141a] flex flex-col font-sans">
          {/* Header */}
          <div className="bg-[#202c33] p-3 pt-8 flex items-center gap-3 shadow-md">
            <button onClick={() => setActiveApp('home')} className="text-white">
              <ChevronLeft />
            </button>
            <div className="w-8 h-8 rounded-full bg-slate-500 flex items-center justify-center overflow-hidden">
               <User className="text-slate-300" size={20} />
            </div>
            <div className="flex-1">
               <div className="text-white text-sm font-bold">Unknown Sender</div>
               <div className="text-[#8696a0] text-xs">Last seen today at 22:30</div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat opacity-90">
             
             {messages.map((msg) => (
               <div key={msg.id} className={`flex ${msg.sender === 'Me' ? 'justify-end' : 'justify-start'}`}>
                 <div className={`
                    max-w-[80%] rounded-lg p-2 text-sm shadow-sm relative
                    ${msg.sender === 'Me' ? 'bg-[#005c4b] text-[#e9edef] rounded-tr-none' : 'bg-[#202c33] text-[#e9edef] rounded-tl-none'}
                 `}>
                   <div className={`text-[10px] font-bold mb-1 ${msg.sender === 'Me' ? 'text-green-300' : 'text-blue-300'}`}>
                     {msg.sender === 'Me' ? 'You' : msg.sender}
                   </div>
                   {msg.text}
                   <div className="text-[9px] text-right mt-1 opacity-60 flex justify-end items-center gap-1">
                     {msg.time}
                     {msg.sender === 'Me' && <span>✓✓</span>}
                   </div>
                 </div>
               </div>
             ))}

          </div>

          {/* Input Area (Visual only) */}
          <div className="p-2 bg-[#202c33] flex items-center gap-2">
             <div className="flex-1 bg-[#2a3942] rounded-full h-9 px-4 text-sm text-slate-400 flex items-center">
               Type a message
             </div>
             <div className="w-10 h-10 bg-[#005c4b] rounded-full flex items-center justify-center">
               <Send className="text-white ml-1" size={18} />
             </div>
          </div>
        </div>
      )}

    </div>
  );
}