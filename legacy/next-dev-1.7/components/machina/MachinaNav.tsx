'use client';

import Link from 'next/link';

const ROOT_STATE_KEY = 'forma-opus-root-state';

export default function MachinaNav({ mode = 'default' }: { mode?: 'default' | 'systems' }) {
  return (
    <header className={`machinaNav ${mode === 'systems' ? 'isSystems' : ''}`}>
      <nav className="machinaPath" aria-label="MACHINA hierarchy">
        <Link href="/" onClick={() => sessionStorage.setItem(ROOT_STATE_KEY, 'brands')}>FORMA OPUS</Link>
        <span>/</span>
        <Link href="/?scene=works" onClick={() => sessionStorage.setItem(ROOT_STATE_KEY, 'brands')}>01 WORKS</Link>
        <span>/</span>
        <Link href="/?scene=academia" onClick={() => sessionStorage.setItem(ROOT_STATE_KEY, 'brands')}>02 ACADEMIA</Link>
        <span>/</span>
        <Link href="/machina">MACHINA</Link>
      </nav>
      <nav className="machinaPrimaryNav" aria-label="MACHINA navigation">
        <Link href="/machina/objects">OBJECTS</Link>
        <Link href="/machina/systems">SYSTEMS</Link>
        <Link href="/machina/systems#projects">PROJECTS</Link>
        <Link href="/machina/capabilities">CAPABILITIES</Link>
        <Link href="/machina/contact#inquiry">견적문의</Link>
        <Link href="/machina/contact#contact">연락처</Link>
      </nav>
    </header>
  );
}

export function MachinaMobileNav() {
  return (
    <nav className="machinaMobileNav" aria-label="MACHINA mobile quick navigation">
      <Link href="/machina/systems#projects">프로젝트</Link>
      <Link href="/machina/capabilities">업무범위</Link>
      <a href="tel:+820000000000">전화</a>
      <Link href="/machina/contact#inquiry">문의</Link>
    </nav>
  );
}
