import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata={title:'Rojennieleen Baniaga | Hospitality Management',description:'A thoughtful hospitality professional in the making.',openGraph:{title:'Rojennieleen Baniaga',description:'Hospitality Management portfolio',type:'website'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
