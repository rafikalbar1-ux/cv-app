import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Palet: ungu listrik, cyan, dan magenta di atas biru malam.
const dark = {
  bg: '#070B1A', tabBg: '#0B1024', surface: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.12)',
  text: '#F2F4FF', sub: '#9CA5CB', primary: '#8B6CFF', accent: '#22D3EE', accent2: '#F472B6',
  success: '#34D399', warn: '#FBBF24', danger: '#FB7185', onPrimary: '#FFFFFF',
  orbA: '#7C5CFF', orbB: '#22D3EE', orbC: '#F472B6', inputBg: 'rgba(255,255,255,0.05)',
};
const light = {
  bg: '#F4F2FF', tabBg: '#FFFFFF', surface: 'rgba(255,255,255,0.88)', border: 'rgba(91,70,200,0.15)',
  text: '#1A1640', sub: '#615B8C', primary: '#6D4AFF', accent: '#0891B2', accent2: '#DB2777',
  success: '#059669', warn: '#D97706', danger: '#E11D48', onPrimary: '#FFFFFF',
  orbA: '#A78BFA', orbB: '#67E8F9', orbC: '#F9A8D4', inputBg: 'rgba(255,255,255,0.9)',
};

const ThemeContext = createContext({ colors: dark, isDark: true, toggle: () => {} });
const KEY = 'theme-preference';

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(true);

  // Muat preferensi tersimpan (penyimpanan lokal).
  useEffect(() => {
    AsyncStorage.getItem(KEY).then((v) => { if (v) setIsDark(v === 'dark'); }).catch(() => {});
  }, []);

  const toggle = () => {
    const next = !isDark;
    setIsDark(next);
    AsyncStorage.setItem(KEY, next ? 'dark' : 'light').catch(() => {});
  };

  return (
    <ThemeContext.Provider value={{ colors: isDark ? dark : light, isDark, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}
export const useTheme = () => useContext(ThemeContext);
