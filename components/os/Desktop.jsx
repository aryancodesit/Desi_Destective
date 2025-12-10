'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { Folder, Lock, Unlock, Github, Instagram, User, Terminal, Cpu, Shield, MapPin, Music } from 'lucide-react';

export default function Desktop({ username }) {
    const [showProfile, setShowProfile] = useState(false);

    // Initial Case Data
    const [cases, setCases] = useState([
        { id: '001', title: 'Silence of the Sangeet', loc: 'Udaipur', diff: '⭐⭐⭐', status: 'OPEN', completed: false },
        { id: '002', title: 'Bangalore Bit-Rot', loc: 'Bengaluru', diff: '⭐⭐⭐⭐⭐', status: 'LOCKED', completed: false },
        { id: '003', title: 'Ghost of Golconda', loc: 'Hyderabad', diff: '⭐⭐⭐⭐', status: 'LOCKED', completed: false },
        { id: '004', title: 'The Midnight Local', loc: 'Mumbai', diff: '⭐⭐⭐', status: 'LOCKED', completed: false },
        { id: '005', title: 'Bollywood Blackmail', loc: 'Mumbai', diff: '⭐⭐⭐⭐', status: 'LOCKED', completed: false },
    ]);

    // Check Local Storage for Progress
    React.useEffect(() => {
        const case001 = localStorage.getItem('case_001_status');
        const case002Locked = localStorage.getItem('case_002_status'); // Solved?
        const case003Locked = localStorage.getItem('case_003_status'); // Unlocked?
        const case004Locked = localStorage.getItem('case_004_status');
        const case005Locked = localStorage.getItem('case_005_status');

        setCases(prev => prev.map(c => {
            if (c.id === '001' && case001 === 'SOLVED') return { ...c, completed: true };
            if (c.id === '002' && case002Locked === 'UNLOCKED') return { ...c, status: 'OPEN' };
            if (c.id === '002' && case002Locked === 'SOLVED') return { ...c, status: 'OPEN', completed: true };
            if (c.id === '003' && case003Locked === 'UNLOCKED') return { ...c, status: 'OPEN' };

            // Logic for Case 003 completion and 004 unlock
            if (c.id === '003' && case003Locked === 'SOLVED') return { ...c, status: 'OPEN', completed: true };
            if (c.id === '004' && case004Locked === 'UNLOCKED') return { ...c, status: 'OPEN' };

            // Logic for Case 004 completion and 005 unlock
            if (c.id === '004' && case004Locked === 'SOLVED') return { ...c, status: 'OPEN', completed: true };
            if (c.id === '005' && case005Locked === 'UNLOCKED') return { ...c, status: 'OPEN' };

            return c;
        }));
    }, []);

    return (
        <div className="h-screen w-full bg-zinc-950 text-green-500 font-mono flex flex-col relative overflow-hidden selection:bg-green-500/30">

            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(#22c55e 1px, transparent 1px), linear-gradient(90deg, #22c55e 1px, transparent 1px)',
                backgroundSize: '40px 40px'
            }}></div>

            {/* --- TOP BAR --- */}
            <header className="h-14 border-b border-green-900/50 bg-black/80 backdrop-blur-sm flex items-center justify-between px-6 z-20">
                <div className="flex items-center gap-3">
                    <img src="/logo.png" alt="Logo" className="w-8 h-8 opacity-80" />
                    <span className="font-bold tracking-widest text-sm text-green-400 hidden md:block">DESI DETECTIVE OS</span>
                </div>
                <div className="flex items-center gap-6 text-xs">
                    <div className="flex items-center gap-2 text-zinc-500">
                        <Cpu size={14} />
                        <span>SYS_NORMAL</span>
                    </div>
                    <div className="flex items-center gap-2 text-green-500 font-bold border border-green-900 px-3 py-1 rounded-full bg-green-900/10">
                        <User size={14} />
                        <span>AGENT: {username}</span>
                    </div>
                </div>
            </header>

            <main className="flex-1 flex overflow-hidden z-10">

                {/* --- LEFT: CASE FILES GRID --- */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Folder className="text-green-500" />
                        ACTIVE INVESTIGATIONS
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {cases.map((c) => (
                            <Link href={`/cases/${c.id}`} key={c.id}>
                                <div className={`
                                    relative group p-5 rounded-lg border transition-all duration-300 h-40 flex flex-col justify-between
                                    ${c.status === 'OPEN'
                                        ? 'bg-zinc-900 border-green-900/50 hover:border-green-500 hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] cursor-pointer'
                                        : 'bg-zinc-950 border-zinc-800 opacity-60 grayscale cursor-not-allowed'}
                                `}>
                                    <div className="flex justify-between items-start">
                                        <div className="bg-zinc-950 p-2 rounded border border-zinc-800 group-hover:border-green-500/50 transition-colors">
                                            <span className="text-xs font-bold text-zinc-500 group-hover:text-green-400">#{c.id}</span>
                                        </div>
                                        {c.completed ? (
                                            <div className="bg-green-900/20 p-1 rounded-full border border-green-500/50">
                                                <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
                                            </div>
                                        ) : (
                                            c.status === 'OPEN' ? <Unlock size={16} className="text-green-600" /> : <Lock size={16} className="text-zinc-600" />
                                        )}
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-lg text-zinc-100 leading-tight group-hover:text-green-400 transition-colors">{c.title}</h3>
                                        <div className="flex items-center gap-2 mt-2 text-[10px] text-zinc-500 uppercase tracking-wider">
                                            <MapPin size={10} /> {c.loc}
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* --- RIGHT: CREATOR PROFILE (ARYAN GUPTA) --- */}
                <aside className="w-80 border-l border-green-900/30 bg-black/40 p-6 flex flex-col gap-6 hidden md:flex">

                    {/* ID Card Widget */}
                    <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg relative group hover:border-green-500/50 transition-all">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-transparent"></div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full border-2 border-green-500/50 overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.4)] relative bg-zinc-800">
                                <img
                                    src="/aryan-profile.jpg"
                                    alt="Aryan Gupta"
                                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Aryan Gupta</h3>
                                <p className="text-xs text-green-500">Lead Investigator</p>
                            </div>
                        </div>

                        <div className="space-y-3 text-xs text-zinc-400 font-sans">
                            <div className="flex items-center gap-2">
                                <Shield size={14} className="text-green-600" />
                                <span>Cybersecurity & Forensics</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Terminal size={14} className="text-green-600" />
                                <span>Crime Podcast listener & Aviation Investigation Enthusiast</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Music size={14} className="text-green-600" />
                                <span>Poet & Musician, Table Tennis </span>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-zinc-800 flex gap-4 justify-center">
                            <a href="https://github.com/aryancodesit" target="_blank" className="p-2 bg-zinc-950 rounded hover:text-white hover:bg-zinc-800 transition-all text-zinc-500">
                                <Github size={18} />
                            </a>
                            <a href="https://www.instagram.com/chief_aryan._" target="_blank" className="p-2 bg-zinc-950 rounded hover:text-pink-500 hover:bg-zinc-800 transition-all text-zinc-500">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* System Status Widget */}
                    <div className="flex-1 bg-zinc-900/50 border border-zinc-800 rounded-lg p-4 font-mono text-[10px] text-green-900 overflow-hidden relative">
                        <div className="absolute inset-0 p-4 opacity-50">
                            {Array(20).fill(0).map((_, i) => (
                                <div key={i}>&gt; SYSTEM_CHECK... OK</div>
                            ))}
                            <div className="animate-pulse">&gt; AWAITING_INPUT_</div>
                        </div>
                    </div>

                </aside>

            </main>
        </div>
    );
}