import type { Config } from 'tailwindcss';
export default { content:['./app/**/*.{ts,tsx}','./components/**/*.{ts,tsx}'], theme:{extend:{colors:{ink:'#102b27',gold:'#b5965b',sand:'#f5f1e9'},fontFamily:{serif:['var(--font-playfair)'],sans:['var(--font-manrope)']},boxShadow:{luxury:'0 20px 60px rgba(16,43,39,.10)'}}}, plugins:[] } satisfies Config;
