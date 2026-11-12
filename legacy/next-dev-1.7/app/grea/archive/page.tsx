import type { Metadata } from 'next';
import Link from 'next/link';
import SiteUtility from '@/components/SiteUtility';
import { greaProjects } from '@/content/model';
export const metadata: Metadata = { title: 'Archive / GREA', description: 'GREA project archive within FORMA OPUS.' };
export default function GreaArchivePage(){ return <main className="placeholderPage"><SiteUtility current="GREA / ARCHIVE" /><div className="hold">Archive</div><h1>ARCHIVE</h1><p>현재 개발 단계에서는 같은 canonical project data를 사용하여 Archive 구조만 검증합니다.</p><div className="indexList">{[...greaProjects].sort((a,b)=>b.year-a.year).map(p=><Link className="indexRow" key={p.id} href={p.slug==='exercitus'?'/grea/exercitus':`/grea/projects/${p.slug}`}><span>{p.title}</span><span>{p.descriptor}</span><span>{p.year}</span></Link>)}</div></main>; }
