import Link from 'next/link';

export default function NotFound(){return <main style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:'2rem',textAlign:'center'}}><div><p style={{color:'#b5965b',fontSize:12,fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase'}}>404 — Not found</p><h1 style={{fontFamily:"Georgia, 'Times New Roman', serif",fontSize:'clamp(2.5rem,7vw,5rem)',margin:'0 0 1rem'}}>This page has moved on.</h1><Link href="/" style={{color:'#102b27',fontWeight:700}}>Return home</Link></div></main>}
