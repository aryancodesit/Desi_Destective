'use client';

import React, { useState } from 'react';
import { MessageSquare, User, AlertTriangle, Play, ChevronRight, Scale } from 'lucide-react';

const DialogueSystem = ({ suspect, clues, onClueRevealed }) => {
    const [mood, setMood] = useState(50); // 0 (Angry) - 100 (Happy)
    const [history, setHistory] = useState([
        { type: 'npc', text: `What do you want? I'm busy.` }
    ]);
    const [isTalking, setIsTalking] = useState(false);

    const addToHistory = (type, text) => {
        setHistory(prev => [...prev, { type, text }]);
    };

    const handleAsk = (topic) => {
        addToHistory('player', `Tell me about ${topic}.`);

        // Simple logic for prototype:
        // If mood is low, they refuse.
        // If high, they give info.

        setTimeout(() => {
            if (mood < 30) {
                addToHistory('npc', "I'm done talking to you. Leave me alone.");
            } else {
                if (topic === 'Alibi') {
                    addToHistory('npc', suspect.alibi || "I was at home alone. Provide proof if you think otherwise.");
                    setMood(prev => prev - 10); // Annoyed
                } else if (topic === 'Victim') {
                    addToHistory('npc', "We had our differences, but I didn't kill them!");
                    setMood(prev => prev - 5);
                }
            }
        }, 1000);
    };

    const handlePresentClue = (clue) => {
        addToHistory('player', `Can you explain this? (Shows ${clue.text})`);

        setTimeout(() => {
            if (clue.relatedSuspectId === suspect.id) {
                addToHistory('npc', "!!! That... that's not what it looks like.");
                setMood(prev => prev - 20); // Panicked
                onClueRevealed({ ...clue, status: 'ANALYZED', note: "Suspect reacted nervously." });
            } else {
                addToHistory('npc', "I've never seen that before in my life.");
            }
        }, 1000);
    };

    const handleFlatter = () => {
        addToHistory('player', "Look, I'm just trying to help. Be honest with me.");
        setTimeout(() => {
            setMood(prev => Math.min(prev + 15, 100)); // Improve mood
            addToHistory('npc', "Fine. Ask what you need to ask.");
        }, 800);
    };

    const handlePress = () => {
        addToHistory('player', "I KNOW YOU'RE LYING!");
        setTimeout(() => {
            if (mood < 50) {
                addToHistory('npc', "LAWYER! NOW!");
                setMood(0);
            } else {
                addToHistory('npc', "Okay, calm down! I was there, but I didn't do it.");
                setMood(prev => prev - 30);
                onClueRevealed({ id: 'confession_fragment', text: "Admitted to being at scene", type: 'TESTIMONIAL' });
            }
        }, 800);
    };

    // Auto-scroll to bottom of chat
    const chatEndRef = React.useRef(null);
    React.useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    return (
        <div className="flex flex-col h-full bg-[#0a1525] border border-cyan-900/50 rounded-sm overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-cyan-900/30 flex justify-between items-center bg-[#070e1a] shrink-0">
                <div className="flex items-center gap-3">
                    <User className="w-6 h-6 text-green-500" />
                    <div>
                        <h3 className="text-white font-bold">{suspect.name}</h3>
                        <p className="text-xs text-cyan-600 uppercase">{suspect.role}</p>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <span className="text-[10px] text-cyan-700 uppercase font-bold tracking-widest">Cooperation Level</span>
                    <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden mt-1">
                        <div
                            className={`h-full transition-all duration-500 ${mood < 30 ? 'bg-red-500' : mood < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                            style={{ width: `${mood}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-[#050b14] min-h-0">
                {history.map((msg, idx) => (
                    <div key={idx} className={`flex ${msg.type === 'player' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2`}>
                        <div className={`max-w-[80%] p-3 rounded-sm text-sm ${msg.type === 'player'
                            ? 'bg-cyan-900/20 border border-cyan-500/30 text-cyan-100 rounded-tr-none'
                            : 'bg-gray-900 border border-gray-700 text-gray-300 rounded-tl-none'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>

            {/* Actions */}
            <div className="p-4 bg-[#070e1a] border-t border-cyan-900/30 shrink-0">
                <div className="grid grid-cols-2 gap-2 mb-2">
                    <button
                        onClick={() => handleAsk('Alibi')}
                        className="p-3 bg-cyan-950/30 border border-cyan-900/50 hover:bg-cyan-900/50 text-cyan-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 group"
                    >
                        <MessageSquare className="w-4 h-4 group-hover:text-cyan-300" /> Ask Alibi
                    </button>
                    <button
                        onClick={() => handleAsk('Victim')}
                        className="p-3 bg-cyan-950/30 border border-cyan-900/50 hover:bg-cyan-900/50 text-cyan-400 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 group"
                    >
                        <User className="w-4 h-4 group-hover:text-cyan-300" /> Ask about Victim
                    </button>
                    <button
                        onClick={() => handlePress()}
                        className="p-3 bg-red-950/20 border border-red-900/50 hover:bg-red-900/30 text-red-500 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 group"
                    >
                        <AlertTriangle className="w-4 h-4 group-hover:text-red-400" /> Press Hard
                    </button>
                    <button
                        onClick={() => handleFlatter()}
                        className="p-3 bg-green-950/20 border border-green-900/50 hover:bg-green-900/30 text-green-500 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 group"
                    >
                        <Scale className="w-4 h-4 group-hover:text-green-400" /> Build Rapport
                    </button>

                    {/* Evidence Carousel (Simplistic) */}
                    <div className="col-span-2 mt-2 pt-2 border-t border-cyan-900/30">
                        <p className="text-[10px] text-cyan-700 uppercase font-bold mb-2">Present Evidence</p>
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {clues.map(clue => (
                                <button
                                    key={clue.id}
                                    onClick={() => handlePresentClue(clue)}
                                    className="flex-shrink-0 px-3 py-1 bg-[#0a1525] border border-cyan-800 text-xs text-cyan-500 whitespace-nowrap hover:border-green-500"
                                >
                                    {clue.text.substring(0, 15)}...
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DialogueSystem;
