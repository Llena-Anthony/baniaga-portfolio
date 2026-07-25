'use client';

import { useEffect } from 'react';

export default function NavigationEnhancer() {
  useEffect(() => {
    const nav = document.querySelector('nav');
    const links = [...document.querySelectorAll<HTMLAnchorElement>('nav .navlinks a')];
    const updateHeader = () => nav?.classList.toggle('is-scrolled', window.scrollY > 24);
    const setActive = (id: string) => links.forEach(link => link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`));
    updateHeader(); window.addEventListener('scroll', updateHeader, { passive: true });
    const observer = new IntersectionObserver(entries => { const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]; if (visible) setActive(visible.target.id); }, { rootMargin: '-28% 0px -58% 0px', threshold: [.05, .25, .5] });
    links.forEach(link => { const section = document.querySelector(link.getAttribute('href') || ''); if (section) observer.observe(section); });
    return () => { window.removeEventListener('scroll', updateHeader); observer.disconnect(); };
  }, []);
  return null;
}
