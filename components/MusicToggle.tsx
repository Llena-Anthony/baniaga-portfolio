'use client';

import { useEffect, useRef, useState } from 'react';

const PREFERENCE_KEY = 'rojennieleen-music-enabled';
const TARGET_VOLUME = .08;

export default function MusicToggle() {
  const audioRef = useRef<HTMLAudioElement>(null); const fadeFrame = useRef<number | null>(null); const [enabled, setEnabled] = useState(false); const [hydrated, setHydrated] = useState(false);
  const fadeTo = (target: number, done?: () => void) => { const audio = audioRef.current; if (!audio) return; if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current); const start = audio.volume; const startedAt = performance.now(); const duration = 2400; const step = (time: number) => { const progress = Math.min((time - startedAt) / duration, 1); audio.volume = start + (target - start) * progress; if (progress < 1) fadeFrame.current = requestAnimationFrame(step); else { fadeFrame.current = null; done?.(); } }; fadeFrame.current = requestAnimationFrame(step); };
  useEffect(() => { setEnabled(localStorage.getItem(PREFERENCE_KEY) === 'true'); setHydrated(true); return () => { if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current); }; }, []);
  useEffect(() => { if (hydrated) localStorage.setItem(PREFERENCE_KEY, String(enabled)); }, [enabled, hydrated]);
  const toggle = () => { const audio = audioRef.current; if (!audio) return; if (enabled && !audio.paused) { fadeTo(0, () => audio.pause()); setEnabled(false); return; } audio.volume = 0; void audio.play().then(() => { fadeTo(TARGET_VOLUME); setEnabled(true); }).catch(() => setEnabled(false)); };
  return <><audio ref={audioRef} src="/audio/background-music.mp3" loop preload="metadata" /><button className="music-toggle" type="button" onClick={toggle} aria-label={enabled ? 'Turn background music off' : 'Turn background music on'} aria-pressed={enabled}>{enabled ? '🎵' : '🔇'}</button></>;
}
