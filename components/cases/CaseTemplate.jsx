'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, Clock, Users, Database, LayoutGrid, Microscope, ArrowRight, Shield, AlertCircle, Fingerprint } from 'lucide-react';
import { generateGameSession, checkVerdict } from '../../lib/game_engine';
import DialogueSystem from '../shared/DialogueSystem';
import InvestigationBoard from '../shared/InvestigationBoard';

const CaseTemplate = ({ caseId, ToolComponent, toolProps }) => {
    // --- ENGINE STATE ---
    const [gameSession, setGameSession] = useState(null);
    const [verdictStatus, setVerdictStatus] = useState('PENDING'); // PENDING, SUCCESS, FAILURE
    const [toast, setToast] = useState(null); // { message, type }

    // --- UI STATE ---
    const [activeView, setActiveView] = useState('DASHBOARD'); // DASHBOARD, BOARD, INTERROGATE, FORENSICS
    const [selectedSuspectId, setSelectedSuspectId] = useState(null);
    const [toolSolved, setToolSolved] = useState(false);
    const [showBriefing, setShowBriefing] = useState(true);

    // --- INITIALIZATION ---
    useEffect(() => {
        const session = generateGameSession(caseId);
        setGameSession(session);
    }, [caseId]);

    // --- COMPUTED STATE ---
    // Has the tool been solved?
    const isForensicsDone = toolSolved;
    // Are all distinct clue types found? (Simplified logic for 'Enough Evidence')
    const keyCluesFound = gameSession ? gameSession.clues.filter(c => c.status !== 'UNFOUND').length >= 4 : false;
    const canAccuse = keyCluesFound && isForensicsDone;

    // --- GAMEPLAY ACTIONS ---
    const handleTimePass = (cost = 1) => {
        if (!gameSession) return;
        setGameSession(prev => ({
            ...prev,
            difficulty: {
                ...prev.difficulty,
                movesLeft: Math.max(0, prev.difficulty.movesLeft - cost)
            }
        }));
    };

    const handleClueDiscovery = (clue) => {
        if (!gameSession) return;
        setGameSession(prev => {
            const updatedClues = prev.clues.map(c =>
                c.id === clue.id ? { ...c, status: c.status === 'UNFOUND' ? 'FOUND' : 'ANALYZED' } : c
            );
            return { ...prev, clues: updatedClues };
        });
        setToast({ message: `New Clue Found: ${clue.type}`, type: 'success' });
        setTimeout(() => setToast(null), 3000);
    };

    const handleToolComplete = () => {
        setToolSolved(true);
        // Add a "Forensic Report" clue
        const forensicClue = {
            id: `forensic_${caseId}`,
            type: 'DIGITAL',
            text: "Forensic Analysis Conclusive. (See Lab Report)",
            status: 'FOUND',
            relatedSuspectId: null // or random logic
        };
        setGameSession(prev => ({
            ...prev,
            clues: [...prev.clues, forensicClue]
        }));
        setToast({ message: "Forensic Analysis Complete", type: 'success' });
        setTimeout(() => setToast(null), 3000);
    };

    const handleVerdictSubmit = (suspectId) => {
        const isCorrect = checkVerdict(caseId, suspectId, gameSession);
        if (isCorrect) {
            setVerdictStatus('SUCCESS');
        } else {
            setVerdictStatus('FAILURE');
            handleTimePass(5);
        }
    };

    if (!gameSession) return <div className="text-green-500 font-mono p-8 animate-pulse">BOOTING CASE ENGINE...</div>;

    const { caseInfo, suspects, clues, difficulty } = gameSession;

    return (
        <div className="h-screen bg-[#050b14] text-cyan-500 font-mono flex flex-col overflow-hidden selection:bg-green-500/30 relative">

            {/* BRIEFING SCREEN OVERLAY */}
            {showBriefing && (
                <div className="absolute inset-0 z-50 bg-[#050b14]/95 backdrop-blur-md flex items-center justify-center p-8 animate-in fade-in duration-500">
                    <div className="max-w-2xl w-full bg-[#0a1525] border border-cyan-900/50 p-8 shadow-[0_0_100px_rgba(34,211,238,0.1)] relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 shadow-[0_0_10px_cyan]"></div>

                        <div className="mb-6 flex items-start justify-between">
                            <div>
                                <h4 className="text-cyan-600 text-xs font-bold uppercase tracking-[0.3em] mb-1">Incoming Transmission</h4>
                                <h1 className="text-3xl text-white font-bold tracking-tight uppercase leading-none">{caseInfo.title}</h1>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] text-cyan-700 uppercase font-bold tracking-widest">Case ID</div>
                                <div className="text-xl text-cyan-400 font-mono">#{caseInfo.id || caseId}</div>
                            </div>
                        </div>

                        <div className="space-y-6 mb-8">
                            <div className="bg-[#050b14] p-6 border-l-2 border-green-500">
                                <p className="text-cyan-100 leading-relaxed text-sm whitespace-pre-line">
                                    {caseInfo.plot || "Classified Mission. No Intel Available."}
                                </p>
                            </div>

                            <div>
                                <h5 className="text-xs font-bold text-cyan-700 uppercase tracking-widest mb-2 flex items-center gap-2"><Shield size={14} /> Primary Objective</h5>
                                <p className="text-green-400 font-mono text-sm">{caseInfo.objective}</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowBriefing(false)}
                            className="w-full py-4 bg-cyan-900/20 hover:bg-cyan-900/40 border border-cyan-500/30 hover:border-green-500 text-cyan-400 hover:text-green-400 font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 group"
                        >
                            <span className="group-hover:translate-x-1 transition-transform">Accept Mission & Start Investigation</span> <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Top Bar */}
            <header className="flex items-center justify-between px-6 py-3 border-b border-cyan-900/30 bg-[#070e1a] shrink-0 z-20">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => window.location.href = '/'}
                        className="text-green-500 hover:text-green-400 transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
                    >
                        <ChevronLeft className="w-4 h-4" /> Back to OS
                    </button>
                    <div>
                        <h1 className="text-sm font-bold text-white tracking-[0.15em]">{caseInfo.title.toUpperCase()}</h1>
                        <p className="text-[10px] text-cyan-600 uppercase tracking-wider">{caseInfo.location}</p>
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className={`flex items-center gap-2 px-4 py-1.5 rounded-sm border ${difficulty.movesLeft < 5 ? 'bg-red-900/20 border-red-500 text-red-500 animate-pulse' : 'bg-cyan-950/30 border-cyan-500/30 text-cyan-400'}`}>
                        <Clock className="w-4 h-4" />
                        <span className="font-bold text-sm tracking-wider">{difficulty.movesLeft}h</span>
                        <span className="text-[10px] uppercase opacity-70">Remaining</span>
                    </div>

                    <div className="flex bg-[#0a1220] p-1 rounded-sm gap-1 border border-cyan-900/30">
                        {[
                            { id: 'DASHBOARD', icon: LayoutGrid, label: 'Field' },
                            { id: 'BOARD', icon: Database, label: 'Board' },
                            { id: 'FORENSICS', icon: Microscope, label: 'Lab' }
                        ].map(view => (
                            <button
                                key={view.id}
                                onClick={() => setActiveView(view.id)}
                                className={`px-4 py-1.5 rounded-sm flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider transition-all ${activeView === view.id ? 'bg-green-600 text-black shadow-[0_0_10px_rgba(22,163,74,0.4)]' : 'text-cyan-700 hover:text-cyan-400 hover:bg-cyan-950/50'
                                    }`}
                            >
                                <view.icon className="w-3 h-3" /> {view.label}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 overflow-hidden relative">

                {/* VERDICT SUCCESS */}
                {verdictStatus === 'SUCCESS' && (
                    <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center animate-in zoom-in-95">
                        <div className="relative">
                            <div className="absolute inset-0 bg-green-500 blur-[80px] opacity-20"></div>
                            <Shield className="w-32 h-32 text-green-500 mb-6 relative z-10" />
                        </div>
                        <h2 className="text-5xl font-black text-white tracking-widest mb-4">CASE CLOSED</h2>
                        <p className="text-green-500 font-mono text-sm tracking-[0.3em] mb-8 uppercase">Perpetrator Apprehended</p>
                        <div className="p-8 border border-green-500/30 bg-green-900/10 max-w-lg text-center mb-8 backdrop-blur-sm">
                            <p className="text-cyan-100 leading-relaxed">
                                With the evidence secured and the motive exposed, justice has been served. Area command has authorized your payment.
                            </p>
                        </div>
                        <button onClick={() => window.location.href = '/'} className="px-10 py-4 bg-green-600 text-black font-bold uppercase tracking-widest hover:bg-green-500 shadow-[0_0_20px_rgba(22,163,74,0.4)] transition-all">
                            Return to HQ
                        </button>
                    </div>
                )}

                {/* VERDICT FAILURE */}
                {verdictStatus === 'FAILURE' && (
                    <div className="absolute inset-0 z-50 bg-black/95 flex flex-col items-center justify-center animate-in zoom-in-95">
                        <div className="relative">
                            <div className="absolute inset-0 bg-red-600 blur-[80px] opacity-20"></div>
                            <AlertCircle className="w-32 h-32 text-red-600 mb-6 relative z-10" />
                        </div>
                        <h2 className="text-5xl font-black text-white tracking-widest mb-4">MISSION FAILED</h2>
                        <p className="text-red-500 font-mono text-sm tracking-[0.3em] mb-8 uppercase">Suspect Fled Jurisdiction</p>
                        <div className="p-8 border border-red-500/30 bg-red-900/10 max-w-lg text-center mb-8 backdrop-blur-sm">
                            <p className="text-red-200 leading-relaxed">
                                The accusation was incorrect. The trail has gone cold. Disavowing agent status.
                            </p>
                        </div>
                        <button onClick={() => window.location.reload()} className="px-10 py-4 border border-red-600 text-red-600 font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all">
                            Retry Operation
                        </button>
                    </div>
                )}

                {/* VIEW: DASHBOARD */}
                {activeView === 'DASHBOARD' && (
                    <div className="flex h-full animate-in fade-in duration-300">
                        {/* Suspect List */}
                        <aside className="w-80 border-r border-cyan-900/30 bg-[#070e1a] p-6 overflow-y-auto custom-scrollbar">
                            <h3 className="text-cyan-700 text-xs font-bold uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                                <Users className="w-3 h-3" /> Personnel Database
                            </h3>
                            <div className="space-y-3">
                                {suspects.map(s => (
                                    <div
                                        key={s.id}
                                        onClick={() => {
                                            setSelectedSuspectId(s.id);
                                            setActiveView('INTERROGATE');
                                            handleTimePass(1);
                                        }}
                                        className="p-4 bg-[#0a1525] border border-cyan-900/30 hover:border-green-500/50 hover:bg-cyan-900/10 cursor-pointer group transition-all relative overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 w-8 h-8 bg-cyan-900/10 rotate-45 transform translate-x-4 -translate-y-4 group-hover:bg-green-500/10 transition-colors"></div>
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="text-sm font-bold text-white group-hover:text-green-400 transition-colors">{s.name}</span>
                                            <span className="text-[9px] bg-cyan-950 border border-cyan-900 text-cyan-400 px-1.5 py-0.5 rounded uppercase tracking-wider">{s.role}</span>
                                        </div>
                                        <p className="text-[10px] text-cyan-600/70 leading-relaxed font-medium">{s.bio}</p>
                                    </div>
                                ))}
                            </div>
                        </aside>

                        {/* Interactive Scene Map */}
                        <main className="flex-1 bg-[#050b14] relative flex items-center justify-center overflow-hidden">
                            {/* Grid Background */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
                                backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)',
                                backgroundSize: '40px 40px'
                            }}></div>

                            <div className="text-center relative z-10 max-w-xl">
                                <div className="inline-flex p-6 border-2 border-cyan-900/50 rounded-full bg-[#0a1525] mb-8 relative group cursor-pointer hover:border-green-500/50 hover:shadow-[0_0_30px_rgba(22,163,74,0.2)] transition-all">
                                    <div className="absolute inset-0 rounded-full border border-dashed border-cyan-700/30 animate-[spin_10s_linear_infinite] group-hover:border-green-500/30"></div>
                                    <MapPin className="w-12 h-12 text-cyan-700 group-hover:text-green-500 transition-colors" />
                                </div>
                                <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">{caseInfo.location}</h2>
                                <p className="text-cyan-600 mb-8 font-mono text-sm">Sector 4 // Crime Scene Perimeter Established</p>

                                <div className="grid grid-cols-2 gap-4">
                                    <button
                                        onClick={() => {
                                            const hiddenClue = clues.find(c => c.status === 'UNFOUND');
                                            if (hiddenClue) {
                                                handleClueDiscovery(hiddenClue);
                                                handleTimePass(2);
                                            } else {
                                                setToast({ message: "Sector Scanned. No additional anomalies detected.", type: 'info' });
                                                setTimeout(() => setToast(null), 2000);
                                            }
                                        }}
                                        className="px-6 py-4 bg-cyan-900/10 border border-cyan-500/30 hover:bg-cyan-900/30 hover:border-green-500/50 hover:text-green-500 transition-all text-xs font-bold uppercase tracking-[0.1em]"
                                    >
                                        Initiate Grid Search (-2h)
                                    </button>
                                    <button
                                        onClick={() => setToast({ message: "Forensic Team dispatched. Awaiting report.", type: 'info' })}
                                        disabled={isForensicsDone}
                                        className="px-6 py-4 bg-cyan-900/10 border border-cyan-500/30 hover:bg-cyan-900/30 hover:border-blue-500/50 hover:text-blue-500 transition-all text-xs font-bold uppercase tracking-[0.1em] disabled:opacity-50"
                                    >
                                        Call Forensics Team (-4h)
                                    </button>
                                </div>
                            </div>
                        </main>
                    </div>
                )}

                {/* VIEW: INTERROGATE */}
                {activeView === 'INTERROGATE' && selectedSuspectId && (
                    <div className="h-full p-6 bg-[#050b14] animate-in slide-in-from-right-8 duration-300">
                        <div className="max-w-6xl mx-auto h-full flex flex-col">
                            <button
                                onClick={() => setActiveView('DASHBOARD')}
                                className="mb-4 text-cyan-600 hover:text-green-500 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors w-fit"
                            >
                                <ChevronLeft className="w-3 h-3" /> Terminate Interview
                            </button>
                            <div className="flex-1 border border-cyan-900/30 shadow-2xl">
                                <DialogueSystem
                                    suspect={suspects.find(s => s.id === selectedSuspectId)}
                                    clues={clues.filter(c => c.status !== 'UNFOUND')}
                                    onClueRevealed={handleClueDiscovery}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW: BOARD */}
                {activeView === 'BOARD' && (
                    <div className="h-full flex flex-col bg-[#111] animate-in fade-in duration-300">
                        <div className="flex-1 p-4 overflow-hidden">
                            <InvestigationBoard
                                clues={clues.filter(c => c.status !== 'UNFOUND')}
                                onConnect={(id1, id2) => {
                                    console.log(`Link: ${id1}<->${id2}`);
                                }}
                            />
                        </div>
                        <div className="h-24 bg-[#070e1a] border-t border-cyan-900/30 flex items-center justify-center gap-6 px-10 shrink-0">
                            <div className="mr-auto text-xs text-cyan-700 font-bold uppercase tracking-widest">
                                Warrant Authorization Protocol
                            </div>
                            {suspects.filter(s => s.role !== 'Victim').map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => handleVerdictSubmit(s.id)}
                                    disabled={!canAccuse}
                                    className={`px-6 py-3 border font-bold uppercase text-[10px] tracking-[0.2em] transition-all flex flex-col items-center ${canAccuse
                                        ? 'border-red-900/50 text-red-600 hover:bg-red-900/20 hover:border-red-500'
                                        : 'border-cyan-900/30 text-cyan-800 cursor-not-allowed opacity-50'
                                        }`}
                                >
                                    <span>Accuse {s.name.split(' ')[0]}</span>
                                    {!canAccuse && <span className="text-[8px] mt-1 normal-case opacity-70">(More Evidence Required)</span>}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {/* VIEW: FORENSICS */}
                {activeView === 'FORENSICS' && (
                    <div className="h-full flex flex-col animate-in fade-in zoom-in-95 duration-300">
                        {ToolComponent ? (
                            <div className="flex-1 p-8 bg-[#050b14]">
                                <div className="h-full border border-cyan-900/30 shadow-2xl relative">
                                    <ToolComponent
                                        {...toolProps}
                                        onSolve={handleToolComplete}
                                    />
                                    {/* Overlay if solved */}
                                    {toolSolved && (
                                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-10">
                                            <div className="bg-[#0a1525] border border-green-500 p-8 text-center shadow-[0_0_50px_rgba(22,163,74,0.3)]">
                                                <Microscope className="w-12 h-12 text-green-500 mx-auto mb-4" />
                                                <h3 className="text-white font-bold tracking-widest text-lg mb-2">ANALYSIS COMPLETE</h3>
                                                <p className="text-cyan-400 text-xs font-mono mb-6">Results attached to Case File.</p>
                                                <button onClick={() => setActiveView('BOARD')} className="px-6 py-2 bg-green-600 text-black text-xs font-bold uppercase">
                                                    Review Evidence
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-cyan-800 opacity-50">
                                <AlertCircle className="w-16 h-16 mb-4" />
                                <p className="font-bold tracking-widest">NO FORENSIC TOOL ASSIGNED</p>
                            </div>
                        )}
                    </div>
                )}

                {/* GLOBAL TOAST */}
                {toast && (
                    <div className={`absolute top-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-sm shadow-xl font-bold tracking-wider text-xs border animate-in slide-in-from-top-4 z-50 flex items-center gap-3 ${toast.type === 'success' ? 'bg-green-900/90 text-white border-green-500' : 'bg-cyan-900/90 text-cyan-100 border-cyan-500'
                        }`}>
                        {toast.type === 'success' && <Fingerprint className="w-4 h-4" />}
                        {toast.type === 'info' && <AlertCircle className="w-4 h-4" />}
                        {toast.message}
                    </div>
                )}

            </div>
        </div>
    );
};

export default CaseTemplate;
