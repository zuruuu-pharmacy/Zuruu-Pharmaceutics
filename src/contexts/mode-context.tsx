"use client";

import type { ReactNode } from 'react';
import { createContext, useContext, useState, useMemo, useEffect } from 'react';

export type Mode = 'patient' | 'pharmacist' | 'student';

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  isInitialized: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode>('patient'); // Start with patient as default
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize mode from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('app-mode') as Mode;
      if (savedMode && ['patient', 'pharmacist', 'student'].includes(savedMode)) {
        setModeState(savedMode);
      }
      setIsInitialized(true);
    } else {
      setIsInitialized(true);
    }
  }, []);

  // Update localStorage when mode changes
  const setMode = (newMode: Mode) => {
    setModeState(newMode);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app-mode', newMode);
    }
  };

  // Sync with localStorage changes from other tabs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleStorageChange = () => {
        const savedMode = localStorage.getItem('app-mode') as Mode;
        if (savedMode && ['patient', 'pharmacist', 'student'].includes(savedMode) && savedMode !== mode) {
          setModeState(savedMode);
        }
      };

      window.addEventListener('storage', handleStorageChange);
      return () => window.removeEventListener('storage', handleStorageChange);
    }
  }, [mode]);
  
  const contextValue = useMemo(() => ({ mode, setMode, isInitialized }), [mode, isInitialized]);

  return (
    <ModeContext.Provider value={contextValue}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
