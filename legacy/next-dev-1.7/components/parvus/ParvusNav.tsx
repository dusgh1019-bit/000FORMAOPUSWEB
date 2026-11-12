'use client';

import Link from 'next/link';

const ROOT_STATE_KEY = 'forma-opus-root-state';

export default function ParvusNav() {
  return (
    <header className="parvusNav">
      <nav className="parvusPath" aria-label="PARVUS hierarchy">
        <Link href="/" onClick={() => sessionStorage.setItem(ROOT_STATE_KEY, 'brands')}>FORMA OPUS</Link>
        <span>/</span>
        <Link href="/?scene=works" onClick={() => sessionStorage.setItem(ROOT_STATE_KEY, 'brands')}>01 WORKS</Link>
        <span>/</span>
        <Link href="/parvus">PARVUS</Link>
      </nav>
      <nav className="parvusPrimaryNav" aria-label="PARVUS navigation">
        <Link href="/parvus/projects#keep">KEEP</Link>
        <Link href="/parvus/projects#play">PLAY</Link>
        <Link href="/parvus/projects#place">PLACE</Link>
        <Link href="/parvus/projects">PROJECTS</Link>
        <Link href="/parvus/contact#inquiry">PROJECT INQUIRY</Link>
      </nav>
    </header>
  );
}
