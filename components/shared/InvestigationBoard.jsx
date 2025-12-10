'use client';

import React, { useState } from 'react';
import { GitCommit, Search, Link as LinkIcon, Trash2 } from 'lucide-react';

const InvestigationBoard = ({ clues, onConnect }) => {
    // In a real implementation we would use a library like react-dnd or a canvas.
    // For this prototype, we simulate a "Click to Select -> Click to Connect" flow.

    const [selectedClueId, setSelectedClueId] = useState(null);
    const [connections, setConnections] = useState([]); // [{from: id, to: id}]

    const handleClueClick = (clueId) => {
        if (selectedClueId === null) {
            setSelectedClueId(clueId);
        } else if (selectedClueId === clueId) {
            setSelectedClueId(null); // Deselect
        } else {
            // Attempt connection
            const newConn = { from: selectedClueId, to: clueId };
            // Check duplicates
            if (!connections.some(c => (c.from === newConn.from && c.to === newConn.to) || (c.from === newConn.to && c.to === newConn.from))) {
                setConnections(prev => [...prev, newConn]);
                onConnect(selectedClueId, clueId);
            }
            setSelectedClueId(null);
        }
    };

    return (
        <div className="relative w-full h-full bg-[#1a1a1a] overflow-hidden border border-cyan-900/50 rounded-sm"
            style={{
                backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
                backgroundSize: '20px 20px'
            }}
        >
            <div className="absolute top-4 left-4 z-10 bg-black/80 p-2 border border-cyan-500/30 text-cyan-500 text-xs font-mono">
                MODE: {selectedClueId ? 'CONNECTING...' : 'VIEWING'}
            </div>

            {/* Connections (Visualized as SVG lines) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                {connections.map((conn, idx) => {
                    // This is tricky without absolute coordinates.
                    // For prototype, we will skip drawing actual lines between DOM elements 
                    // and just list connections or trust the logic.
                    // A real board needs a robust coord system.
                    return null;
                })}
            </svg>

            {/* Sticky Notes Grid */}
            <div className="p-8 grid grid-cols-2 md:grid-cols-3 gap-6 relative z-10">
                {clues.map((clue) => {
                    const isSelected = selectedClueId === clue.id;
                    const isConnected = connections.some(c => c.from === clue.id || c.to === clue.id);

                    return (
                        <div
                            key={clue.id}
                            onClick={() => handleClueClick(clue.id)}
                            className={`
                                relative p-4 w-full min-h-[120px] shadow-lg transition-all cursor-pointer transform hover:scale-105
                                ${isSelected ? 'ring-2 ring-green-500 rotate-1' : 'rotate-0'}
                                ${clue.type === 'PHYSICAL' ? 'bg-yellow-100 text-black rotate-[-1deg]' : ''}
                                ${clue.type === 'DIGITAL' ? 'bg-blue-100 text-blue-900 rotate-[2deg]' : ''}
                                ${clue.type === 'TESTIMONIAL' ? 'bg-pink-100 text-pink-900 rotate-[-2deg]' : ''}
                            `}
                        >
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-12 bg-red-500/80 rotate-45 opacity-50"></div> {/* Tape */}

                            <h4 className="font-bold text-xs uppercase mb-2 border-b border-black/10 pb-1 flex justify-between">
                                {clue.type}
                                {isConnected && <LinkIcon className="w-3 h-3 text-black/50" />}
                            </h4>
                            <p className="text-sm font-handwriting leading-tight">{clue.text}</p>

                            {isSelected && (
                                <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-[10px] px-2 py-1 rounded-full shadow">
                                    SELECTED
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Logic Box (Simulated Mind Palace) */}
            <div className="absolute bottom-4 right-4 bg-black/90 p-4 border border-green-500/30 max-w-xs">
                <h5 className="text-green-500 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                    <GitCommit className="w-4 h-4" /> deductions
                </h5>
                <ul className="text-cyan-400 text-[10px] space-y-1">
                    {connections.length === 0 ? (
                        <li className="opacity-50">Connect related clues to form a hypothesis.</li>
                    ) : (
                        connections.map((c, i) => (
                            <li key={i}>Link established between items. (+5 XP)</li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default InvestigationBoard;
