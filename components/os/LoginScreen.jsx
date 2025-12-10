import React, { useState } from 'react';

export default function LoginScreen({ onLogin }) {
    const [inputVal, setInputVal] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputVal.trim()) {
            onLogin(inputVal);
        }
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-zinc-950 text-green-500 font-mono">
            <div className="w-full max-w-md p-8 border border-green-500/30 bg-black/50 backdrop-blur shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                <h1 className="text-3xl font-bold mb-2 text-center tracking-widest uppercase">
                    Desi Detective
                </h1>
                <p className="text-xs text-center text-green-500/60 mb-8">
                    CYBER CELL INTELLIGENCE UNIT
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="agent-id" className="text-sm uppercase tracking-wider">
                            Enter Agent ID
                        </label>
                        <input
                            id="agent-id"
                            type="text"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            className="w-full bg-black border border-green-500/50 p-3 text-green-400 focus:outline-none focus:border-green-400 focus:shadow-[0_0_10px_rgba(34,197,94,0.3)] transition-all placeholder-green-900"
                            placeholder="AGENT_NAME"
                            autoFocus
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-green-600/20 hover:bg-green-600/40 text-green-400 border border-green-500/50 py-3 uppercase tracking-wider transition-all hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]"
                    >
                        Authenticate
                    </button>
                </form>

                <div className="mt-8 text-[10px] text-center text-green-900">
                    SECURE CONNECTION ESTABLISHED • V.1.0.4
                </div>
            </div>
        </div>
    );
}
