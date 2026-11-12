import Link from 'next/link';

export default function GreaNav({ current }: { current?: string }) {
  return (
    <header className="greaV2Nav">
      <nav className="greaV2Path" aria-label="GREA hierarchy">
        <Link href="/">FORMA OPUS</Link><span>/</span><Link href="/grea">GREA</Link>{current ? <><span>/</span><span>{current}</span></> : null}
      </nav>
      <nav className="greaV2Links" aria-label="GREA navigation">
        <Link href="/grea/exercitus">EXERCITUS</Link>
        <Link href="/grea/faber">FABER</Link>
        <Link href="/grea/vestis">VESTIS</Link>
        <Link href="/grea/insignia">INSIGNIA</Link>
      </nav>
    </header>
  );
}
