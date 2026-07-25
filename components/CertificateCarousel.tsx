'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Certificate = { id: string; title: string; issuer: string; date: string; category: string; image: string; alt: string; description: string };
const certificates: Certificate[] = [
  { id: 'filipino-brand-service-excellence', title: 'Filipino Brand of Service Excellence', issuer: 'Department of Tourism – CAR', date: 'March 2026', category: 'Training', image: '/certifications/filipino-brand-service-excellence.jpg', alt: 'Filipino Brand of Service Excellence certificate awarded to Rojennieleen Baniaga', description: 'Eight-hour service excellence training.' },
  { id: 'tea-concoction-silver-medal', title: 'Tea Concoction Competition — Silver Medal', issuer: 'Hotel and Restaurant Association of Baguio', date: 'October 2025', category: 'Award', image: '/certifications/tea-concoction-silver-medal.jpg', alt: 'Tea Concoction silver medal certificate awarded to Rojennieleen Baniaga', description: 'Silver medal recognition at the 18th HRT Month and 16th National Food Showdown.' },
  { id: 'devesse-exemplary-academics', title: 'Devesse Award for Exemplary Performance in Academics', issuer: 'Saint Louis University', date: 'June 2026', category: 'Award', image: '/certifications/devesse-exemplary-academics.jpg', alt: 'Devesse academic excellence award awarded to Rojennieleen Baniaga', description: 'Top 1 among third-year SAMCIS students, first semester.' },
  { id: 'devesse-competence-academics', title: 'Devesse Award for Competence in Academics', issuer: 'Saint Louis University', date: 'May 2025', category: 'Award', image: '/certifications/devesse-competence-academics.jpg', alt: 'Devesse competence in academics award awarded to Rojennieleen Baniaga', description: 'One of the top three second-year BS Hospitality Management students.' },
  { id: 'devesse-leadership', title: 'Devesse Award for Exemplary Performance in Leadership', issuer: 'Saint Louis University', date: 'June 2026', category: 'Award', image: '/certifications/devesse-leadership.jpg', alt: 'Devesse leadership award awarded to Rojennieleen Baniaga', description: 'Recognition for service as an SLU-LIGHT officer.' },
  { id: 'puj-modernization-research', title: 'Award for Research', issuer: 'Saint Louis School, Inc.', date: 'May 2023', category: 'Research', image: '/certifications/puj-modernization-research.jpg', alt: 'Research award certificate for Rojennieleen Baniaga', description: 'Perception of Commuters in Baguio City to the PUJ Modernization Program.' },
  { id: 'tourism-start-up-challenge', title: 'Tourism Start-Up Challenge 2025', issuer: 'Commission on Higher Education & Department of Tourism – CAR', date: 'February 2026', category: 'Recognition', image: '/certifications/tourism-start-up-challenge.jpg', alt: 'Tourism Start-Up Challenge certificate awarded to Rojennieleen Baniaga', description: 'Recognition for a Cordillera gastronomy tourism proposal.' },
  { id: 'tea-concoction-participation', title: 'Tea Concoction Competition', issuer: 'Hotel and Restaurant Association of Baguio', date: 'October 2025', category: 'Participation', image: '/certifications/tea-concoction-participation.jpg', alt: 'Tea Concoction participation certificate awarded to Rojennieleen Baniaga', description: 'Competitor in the student division.' },
  { id: 'mocktail-mixing-participation', title: 'Mocktail Mixing Competition', issuer: 'SLU-LIGHT', date: 'March 2025', category: 'Participation', image: '/certifications/mocktail-mixing-participation.jpg', alt: 'Mocktail Mixing Competition certificate awarded to Rojennieleen Baniaga', description: 'HTM Week competition participation.' },
  { id: 'usher-recognition', title: 'Certificate of Recognition — Usher', issuer: 'Saint Louis University', date: 'May 2025', category: 'Recognition', image: '/certifications/usher-recognition.jpg', alt: 'Usher recognition certificate awarded to Rojennieleen Baniaga', description: 'Valued contributions as an usher throughout A.Y. 2024–2025.' },
  { id: 'national-discipline-award', title: 'National Discipline Award', issuer: 'AY Foundation', date: 'May 2023', category: 'Award', image: '/certifications/national-discipline-award.jpg', alt: 'National Discipline Award certificate awarded to Rojennieleen Baniaga', description: 'Recognition for exemplary character and discipline.' },
  { id: 'louisian-award', title: 'Louisian Award', issuer: 'Saint Louis School, Inc.', date: 'May 2019', category: 'Award', image: '/certifications/louisian-award.jpg', alt: 'Louisian Award certificate awarded to Rojennieleen Baniaga', description: 'Recognition for living out Louisian values.' }
];
const items = [...certificates, ...certificates, ...certificates];

function Card({ certificate, onOpen, duplicate }: { certificate: Certificate; onOpen: () => void; duplicate: boolean }) {
  return <button className="certificate-slide" onClick={onOpen} tabIndex={duplicate ? -1 : 0} aria-hidden={duplicate || undefined}><Image src={certificate.image} alt={duplicate ? '' : certificate.alt} width={900} height={650} sizes="(max-width: 700px) 82vw, (max-width: 1100px) 44vw, 31vw" /><span>{certificate.category} · {certificate.date}</span><h3>{certificate.title}</h3><p>{certificate.issuer}</p></button>;
}

export default function CertificateCarousel() {
  const [open, setOpen] = useState<number | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const position = useRef(0); const velocity = useRef(0); const last = useRef(0); const dragging = useRef(false); const moved = useRef(false); const pointerX = useRef(0); const pausedUntil = useRef(0); const loopWidth = useRef(0);
  const render = () => { if (trackRef.current) trackRef.current.style.transform = `translate3d(${-position.current}px,0,0)`; };
  const normalize = () => { const width = loopWidth.current; if (!width) return; while (position.current >= width * 2) position.current -= width; while (position.current < width) position.current += width; };
  const pauseBriefly = (ms = 1350) => { pausedUntil.current = performance.now() + ms; };

  useEffect(() => {
    const measure = () => { const track = trackRef.current; if (!track) return; loopWidth.current = track.scrollWidth / 3; if (!position.current) { position.current = loopWidth.current; render(); } };
    measure(); window.addEventListener('resize', measure);
    let frame = 0;
    const tick = (time: number) => { const dt = Math.min((time - (last.current || time)) / 1000, .05); last.current = time; if (!dragging.current && open === null && time > pausedUntil.current) { velocity.current += (34 - velocity.current) * Math.min(1, dt * 2.5); } if (!dragging.current) { position.current += velocity.current * dt; velocity.current *= Math.pow(.16, dt); } normalize(); render(); frame = requestAnimationFrame(tick); };
    frame = requestAnimationFrame(tick); return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', measure); };
  }, [open]);
  useEffect(() => { const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') setOpen(null); }; window.addEventListener('keydown', escape); return () => window.removeEventListener('keydown', escape); }, []);
  const move = (amount: number) => { velocity.current = amount * 3; position.current += amount; normalize(); render(); pauseBriefly(); };
  const pointerDown = (event: React.PointerEvent<HTMLDivElement>) => { dragging.current = true; moved.current = false; pointerX.current = event.clientX; velocity.current = 0; event.currentTarget.setPointerCapture(event.pointerId); };
  const pointerMove = (event: React.PointerEvent<HTMLDivElement>) => { if (!dragging.current) return; const dx = event.clientX - pointerX.current; if (Math.abs(dx) > 2) moved.current = true; position.current -= dx; velocity.current = -dx * 45; pointerX.current = event.clientX; normalize(); render(); };
  const pointerUp = () => { if (!dragging.current) return; dragging.current = false; pauseBriefly(250); };
  return <><div ref={viewportRef} className="certificate-carousel" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerUp} onPointerCancel={pointerUp} onWheel={event => { event.preventDefault(); position.current += event.deltaY + event.deltaX; velocity.current = (event.deltaY + event.deltaX) * 2; normalize(); render(); pauseBriefly(1200); }}><button className="cert-nav prev" aria-label="Previous certificates" onClick={() => move(-330)}><ChevronLeft size={19} /></button><div ref={trackRef} className="certificate-track">{items.map((certificate, index) => <div className="certificate-item" key={`${certificate.id}-${index}`}><Card certificate={certificate} duplicate={index < certificates.length || index >= certificates.length * 2} onOpen={() => { if (!moved.current) setOpen(index % certificates.length); }} /></div>)}</div><button className="cert-nav next" aria-label="Next certificates" onClick={() => move(330)}><ChevronRight size={19} /></button></div>{open !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label={certificates[open].title} onClick={() => setOpen(null)}><button className="lightbox-close" aria-label="Close preview"><X /></button><div onClick={event => event.stopPropagation()}><Image src={certificates[open].image} alt={certificates[open].alt} width={1500} height={1100} priority /><h3>{certificates[open].title}</h3><p>{certificates[open].issuer} · {certificates[open].date}</p></div></div>}</>;
}
