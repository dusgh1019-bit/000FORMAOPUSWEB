import Link from 'next/link';
import ParvusNav from './ParvusNav';
import ParvusVisual from './ParvusVisual';
import { parvusProjects, parvusThemeCopy, type ParvusTheme } from '@/content/parvus';

export default function ParvusProjectsIndex() {
  return <main className="parvusPage parvusProjectsPage"><ParvusNav />
    <section className="parvusSectionHero"><div><span>PARVUS / PROJECTS</span><h1>BRICK<br/>PROJECTS</h1></div><div><strong>BRICK AS A MEDIUM.</strong><p>KEEP / PLAY / PLACE는 감정적 이유, OBJECT / MODULE은 내부 구조입니다. 두 축은 서로 교차합니다.</p></div></section>
    {(['KEEP','PLAY','PLACE'] as ParvusTheme[]).map((theme, themeIndex) => { const copy=parvusThemeCopy[theme]; const items=parvusProjects.filter(p=>p.theme===theme); return <section className="parvusThemeIndex" id={theme.toLowerCase()} key={theme}>
      <header><span>0{themeIndex+1}</span><div><h2>{theme}</h2><strong>{copy.statement}</strong><p>{copy.meaning}</p></div><aside><small>B2B</small><b>{copy.b2b}</b></aside></header>
      <div className="parvusProjectLedger">{items.map(p=><Link href={`/parvus/projects/${p.slug}`} key={p.id}><ParvusVisual variant={p.visualVariant} mode={theme==='PLAY'?'play':theme==='PLACE'?'place':'object'} label={`${p.id} / ${p.medium}`} /><div className="parvusProjectRow"><span>{p.id}</span><div><small>{p.theme} / {p.medium}</small><strong>{p.title}</strong><em>{p.koreanTitle}</em></div><div><span>{p.year}</span><span>{p.clientType}</span><span>{p.structure}</span></div><b>{p.status}</b><i>↗</i></div></Link>)}</div>
    </section>})}
    <section className="parvusB2BRule"><span>BRAND RULE</span><h2>PARVUS IS NOT<br/>A BRICK TOY STORE.</h2><p>PARVUS는 기억·놀이·장소를 곁에 둘 가치가 있는 오브젝트로 바꿉니다. BRICK은 현재 가장 강력한 표현매체입니다.</p><Link href="/parvus/contact#inquiry">CUSTOM BRICK PROJECT →</Link></section>
  </main>;
}
