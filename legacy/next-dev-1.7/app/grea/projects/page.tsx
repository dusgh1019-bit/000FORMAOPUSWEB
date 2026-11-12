import type { Metadata } from 'next';
import Link from 'next/link';
import GreaNav from '@/components/grea/GreaNav';
import { greaLines } from '@/content/grea';
export const metadata: Metadata = { title: 'Lines / GREA', description: 'GREA primary product lines.' };
export default function Page(){return <main className="greaV2Page greaLineIndexPage"><GreaNav current="LINES"/><section className="greaIndexHero"><span>PRIMARY PRODUCT LINES</span><h1>WEAR.<br/>WORK.<br/>MARK.</h1></section><section className="greaLineIndex">{greaLines.map(l=><Link key={l.line} href={l.route}><span>{l.index}</span><div><strong>{l.line}</strong><small>{l.functionalLabel} / {l.koreanLabel}</small></div><b>{l.status}</b><i>→</i></Link>)}</section></main>}
