import React, { useEffect, useState } from 'react';

export default function BootScreen({ username, onComplete }) {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const bootSequence = [
            "BIOS CHECK... OK",
            "LOADING KERNEL...",
            "MOUNTING FILE SYSTEMS...",
            "VERIFYING AGENT CREDENTIALS...",
            `WELCOME, AGENT ${username ? username.toUpperCase() : 'UNKNOWN'}`,
            "INITIALIZING DESKTOP ENVIRONMENT..."
        ];

        let delay = 0;
        bootSequence.forEach((log, index) => {
            delay += Math.random() * 500 + 300;
            setTimeout(() => {
                setLogs(prev => [...prev, log]);
                if (index === bootSequence.length - 1) {
                    setTimeout(onComplete, 800);
                }
            }, delay);
        });
    }, [username, onComplete]);

    return (
        <div className="h-screen w-full bg-black text-green-600 font-mono p-10 flex flex-col justify-end pb-20">
            {logs.map((log, i) => (
                <div key={i} className="mb-1">
                    <span className="opacity-50 mr-2">[{new Date().toLocaleTimeString()}]</span>
                    {log}
                </div>
            ))}
            <div className="animate-pulse">_</div>
        </div>
    );
}
