'use client';

import React, { useState } from 'react';

// These imports work because we set up the folder structure earlier.
// Ensure you have pasted the code into:
// - components/os/LoginScreen.jsx
// - components/os/BootScreen.jsx
// - components/os/Desktop.jsx
import LoginScreen from '../components/os/LoginScreen';
import BootScreen from '../components/os/BootScreen';
import Desktop from '../components/os/Desktop';

export default function Home() {
  // State to track the "OS" initialization progress
  // "string | null" is TypeScript syntax. If you get errors, just remove "<string | null>"
  const [username, setUsername] = useState<string | null>(null);
  const [bootComplete, setBootComplete] = useState<boolean>(false);

  // Auto-login if session exists
  React.useEffect(() => {
    const savedUser = localStorage.getItem('agent_name');
    if (savedUser) {
      setUsername(savedUser);
    }
  }, []);

  // 1. LOGIN PHASE
  // The system starts here. We need a user identity to proceed.
  if (!username) {
    return (
      <LoginScreen
        onLogin={(name: string) => {
          setUsername(name);
          localStorage.setItem('agent_name', name);
        }}
      />
    );
  }

  // 2. BOOT PHASE
  // Once logged in, we trigger the fake "BIOS" sequence.
  if (!bootComplete) {
    return (
      <BootScreen
        username={username}
        onComplete={() => setBootComplete(true)}
      />
    );
  }

  // 3. DESKTOP PHASE
  // Login and Boot are done. Welcome to the Cyber Cell.
  return (
    <Desktop username={username} />
  );
}