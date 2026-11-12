'use client';

import Link from '@forma-opus/ui/react/Link';
import { useState } from 'react';
import MachinaNav from './MachinaNav';
import TechnicalMeta from './TechnicalMeta';
import TechnicalVisual from './TechnicalVisual';
import type { MachinaObjectProduct } from '@content/machina/index';

export default function ObjectDetail({ item }: { item: MachinaObjectProduct }) {
  const [structure, setStructure] = useState(false);
  return (
    <main className="machinaPage machinaObjectDetail">
      <MachinaNav />
      <section className="machinaDetailHero machinaObjectDetailHero">
        <div className="machinaDetailTitle">
          <span>MACHINA / OBJECTS / {item.id}</span>
          <h1>{item.title}</h1>
          <strong>FORM THROUGH STRUCTURE.</strong>
          <p>{item.summary}</p>
          <small>SAMPLE / CONCEPTUAL UI VALIDATION — NOT A REAL CLIENT PROJECT</small>
        </div>
        <button className="machinaObjectHeroCompare" type="button" onClick={() => setStructure(!structure)} aria-pressed={structure}>
          <TechnicalVisual variant={1} label={`${item.id} / ${structure ? 'STRUCTURAL VIEW' : 'FINAL FORM'}`} mode={structure ? 'OBJECT_STRUCTURE' : 'OBJECT_FINAL'} />
          <span><b>{structure ? 'STRUCTURE' : 'FINAL FORM'}</b><i>↕</i><small>{structure ? 'FINAL FORM' : 'STRUCTURE'}</small></span>
        </button>
      </section>
      <section className="machinaSpecSection">
        <TechnicalMeta rows={[
          ['OBJECT', item.id],
          ['DOMAIN', item.domain],
          ['SUBJECT', item.subject],
          ['MEDIUM', item.medium],
          ['SCALE', item.scale || 'NTS'],
          ['YEAR', String(item.year)],
          ['PROJECT TYPE', item.projectType],
          ['DISCLOSURE', item.disclosure],
          ['STATUS', item.status],
        ]}/>
        <div className="machinaRevision"><span>OBJECT STUDY</span><strong>{item.notation}</strong><small>MEDIUM IS INFORMATION. NOT IDENTITY.</small></div>
      </section>
      <section className="machinaObjectExistence">
        <header><span>OBJECT SEQUENCE</span><h2>HOW DID THIS FORM<br/>COME INTO EXISTENCE?</h2></header>
        <div>{item.studyViews.map((view,index) => <article key={view.key}>
          <TechnicalVisual variant={(index%4)+1} label={`${item.id} / ${view.label}`} mode={view.mode === 'FINAL' ? 'OBJECT_FINAL' : view.mode === 'STRUCTURE' ? 'OBJECT_STRUCTURE' : view.mode === 'DETAIL' ? 'OBJECT_DETAIL' : 'OBJECT_PROCESS'} />
          <footer><span>{view.key}</span><strong>{view.label}</strong><p>{view.caption}</p></footer>
        </article>)}</div>
      </section>
      <section className="machinaB2BInquiry"><span>B2B PRODUCT INQUIRY</span><div><h2>유사 Object 또는 맞춤형 제작이 필요한 경우<br/>기준 대상과 요구사항을 보내주십시오.</h2><Link href={`/machina/contact?subject=${encodeURIComponent(item.title)}#inquiry`}>제품 문의 <b>→</b></Link></div></section>
      <section className="machinaCrossLink"><span>PRECISION YOU CAN SEE.</span><Link href="/machina/systems">VIEW ENGINEERED SYSTEMS →</Link></section>
    </main>
  );
}
