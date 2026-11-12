'use client';

import { useState, type CSSProperties } from 'react';
import Link from '@forma-opus/ui/react/Link';
import ParvusNav from './ParvusNav';
import ParvusVisual from './ParvusVisual';
import { parvusProjects, parvusThemeCopy, type ParvusProject, type ParvusTheme } from '@content/parvus/index';

export default function ParvusProjectDetail({ project }: { project: ParvusProject }) {
  const copy=parvusThemeCopy[project.theme];
  const themes: ParvusTheme[]=['KEEP','PLAY','PLACE'];
  const related=parvusProjects.filter((item)=>item.theme===project.theme && item.slug!==project.slug).slice(0,3);
  const [motionState,setMotionState]=useState(0);
  const productSections = [
    ['WHY THIS OBJECT', project.subject],
    ['THEME EXPERIENCE', `${copy.statement} ${copy.meaning}`],
    ['HOW IT WORKS', project.interpretation],
    ['DETAIL', project.build],
    ['SPECIFICATION', 'SAMPLE / SPECIFICATION — TO BE DEFINED'],
    ['IN THE BOX', 'SAMPLE / PACKAGE CONTENT — TO BE DEFINED'],
    ['CUSTOM / ORDER', '현재 Sample은 판매 중인 Product가 아닙니다. 실제 주문·Customization 가능 범위는 제품 확정 후 연결합니다.'],
    ['DELIVERY', project.delivery],
  ];
  const projectSections=[['SUBJECT',project.subject],['INTERPRETATION',project.interpretation],['BUILD',project.build],['OBJECT',project.object],['DELIVERY',project.delivery]];
  const sections = project.contentType === 'PRODUCT' ? productSections : projectSections;
  const verbs=project.interactions;
  return <main className="parvusPage parvusProjectDetail"><ParvusNav />
    <nav className="parvusDetailThemeContext" aria-label="PARVUS current theme"><span>THEME</span><div>{themes.map(theme=><Link key={theme} href={`/parvus/projects#${theme.toLowerCase()}`} aria-current={theme===project.theme?'page':undefined} className={theme===project.theme?'isActive':''}>{theme}</Link>)}</div><small>{project.theme} / {copy.statement}</small></nav>
    <section className={`parvusDetailHero parvusThemeDetail-${project.theme.toLowerCase()}`}><div><span>{project.id} / {project.status} / {project.theme} / {project.contentType}</span><h1>{project.title}</h1><strong>{project.koreanTitle}</strong><p>{project.descriptor}</p></div><div className={`parvusDetailInteractive state-${motionState}`} onClick={()=>setMotionState((motionState+1)%3)} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();setMotionState((motionState+1)%3)}}}><ParvusVisual variant={project.visualVariant} mode={project.theme==='PLAY'?'play':project.theme==='PLACE'?'place':'object'} label={`${project.theme} / ${project.contentType}`} /><div className="parvusDetailVerb"><span>{verbs[motionState]}</span><small>TAP / CLICK TO ADVANCE</small></div></div></section>
    <section className="parvusProjectMeta"><div><span>PROJECT NUMBER</span><strong>{project.id}</strong></div><div><span>YEAR</span><strong>{project.year}</strong></div><div><span>CONTENT TYPE</span><strong>{project.contentType}</strong></div><div><span>THEME</span><strong>{project.theme}</strong></div><div><span>STRUCTURE</span><strong>{project.structure}</strong></div><div><span>MEDIUM</span><strong>{project.medium}</strong></div><div><span>PURPOSE</span><strong>{project.purpose}</strong></div><div><span>STATUS</span><strong>{project.status}</strong></div></section>
    <section className="parvusInteractionSequence"><header><span>INTERACTION CHARACTER</span><h2>{verbs.join(' → ')}</h2><p>MOTION은 실제 Product Mechanism을 과장하지 않습니다. SAMPLE에서는 Theme의 정보구조를 설명하는 Visual Demonstration으로만 사용합니다.</p></header><div className={`parvusInteractionStage theme-${project.theme.toLowerCase()} state-${motionState}`}>{Array.from({length:9},(_,i)=><i key={i} style={{'--i':i} as CSSProperties}/>)}<b/><strong>{verbs[motionState]}</strong></div></section>
    <section className="parvusProjectSequence">{sections.map(([title,text],i)=><article key={title} id={title.toLowerCase().replace(/ /g,'-')}><header><span>{String(i+1).padStart(2,'0')}</span><h2>{title}</h2></header><div><ParvusVisual variant={((project.visualVariant+i-1)%6+1) as 1|2|3|4|5|6} mode={project.theme==='PLAY'?'play':project.theme==='PLACE'?'place':'object'} label={`${title} / ${project.contentType}`} /><p>{text}</p></div></article>)}</section>
    {related.length > 0 && <section className="parvusRelatedThemeWorks"><header><span>RELATED / {project.theme}</span><h2>STAY IN THE THEME.</h2></header><div>{related.map(item=><Link key={item.id} href={`/parvus/projects/${item.slug}`}><span>{item.id}</span><strong>{item.title}</strong><small>{item.contentType} / {item.status}</small><b>→</b></Link>)}</div></section>}
    <section className="parvusProjectClose"><div><span>{project.theme} / {project.contentType}</span><h2>{copy.statement}</h2><p>{copy.meaning}</p></div><div><small>B2B TRANSLATION</small><strong>{copy.b2b}</strong><Link href="/parvus/contact#inquiry">SIMILAR SUBJECT? / 프로젝트 문의 →</Link></div></section>
  </main>;
}
