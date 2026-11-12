'use client';

import { useEffect, useRef, useState } from 'react';
import Link from '@forma-opus/ui/react/Link';
import type { GreaProduct } from '@content/grea/index';
import { getGreaRelations } from '@content/grea/index';

type Mode = 'NORMAL' | 'FUNCTION' | 'CONFIGURE';

export default function FaberStudy({ product }: { product: GreaProduct }) {
  const [mode, setMode] = useState<Mode>('NORMAL');
  const [evidenceActive,setEvidenceActive]=useState(false);
  const problemRef=useRef<HTMLElement|null>(null);
  const relations=getGreaRelations(product.id,true);

  useEffect(()=>{
    const node=problemRef.current; if(!node || typeof IntersectionObserver==='undefined') return;
    const observer=new IntersectionObserver(([entry])=>setEvidenceActive(entry.isIntersecting),{threshold:.35});
    observer.observe(node); return()=>observer.disconnect();
  },[]);

  return (
    <>
      <section className="faberDetailHero">
        <div className="faberDetailIntro"><span>{product.id} / {product.status}</span><h1>{product.title}</h1><strong>{product.statement}</strong><p>{product.descriptor}</p><div className="faberNeed">I NEED SOMETHING<br/>THAT WORKS.</div></div>
        <div className={`faberObjectStudy is-${mode.toLowerCase()}`}>
          <span className="faberStudyMode">{mode} VIEW</span>
          <div className="faberPouch" aria-hidden="true"><i className="body"/><i className="pocket p1"/><i className="pocket p2"/><i className="strap"/><i className="point a"/><i className="point b"/><i className="access"/></div>
          <div className="faberFunctionLabels" aria-hidden={mode!=='FUNCTION'}><span className="label-pocket">POCKET SEPARATION</span><span className="label-attach">ATTACHMENT POINT</span><span className="label-access">ACCESS DIRECTION</span></div>
          <div className="faberConfigureOverlay" aria-hidden={mode!=='CONFIGURE'}><span className="base">GF-001 / BASE</span><i/><span className="slot">HOLD SLOT<br/><b>TO BE DEFINED</b></span><i/><span className="mark">GI-001 / INSIGNIA<br/><b>CONCEPT RELATION</b></span></div>
        </div>
        <nav className="greaProductActionBar" aria-label="FABER product actions">
          <button className={mode==='FUNCTION'?'isActive':''} onClick={()=>setMode('FUNCTION')}>VIEW FUNCTION</button>
          <button className={mode==='CONFIGURE'?'isActive':''} onClick={()=>setMode('CONFIGURE')}>CONFIGURE</button>
          <a href="#faber-spec">SPEC</a>
          <span>ORDER / NOT AVAILABLE — CONCEPT</span>
        </nav>
      </section>

      <section ref={problemRef} className={`faberMechanism ${evidenceActive?'isActive':''}`}>
        <header><span>PRODUCT MECHANISM</span><h2>PROBLEM → OBJECT → SOLUTION → PROOF</h2><p>Scroll은 제품의 기능을 설명합니다. 제품이 아닌 Motion은 남기지 않습니다.</p></header>
        <div className="faberProblemMotion" aria-hidden="true"><div className="looseTools"><i/><i/><i/><i/></div><div className="motionArrow">→</div><div className="alignedTools"><i/><i/><i/><i/></div><strong>{evidenceActive?'SEPARATE · ALIGN · POSITION · LOCK':'TOOLS MIX'}</strong></div>
      </section>

      <section className="faberEvidenceSequence">
        <article><span>01 / WHY IT EXISTS</span><h2>PROBLEM</h2><p>{product.field?.problem}</p></article>
        <article><span>02 / OBJECT</span><h2>{product.title}</h2><p>{product.functionalLabel}. 현재는 CONCEPT이며 실제 치수·소재·시험 결과는 확정되지 않았습니다.</p></article>
        <article><span>03 / SOLUTION</span><h2>FUNCTION</h2><p>{product.field?.solution}</p></article>
        <article><span>04 / PROOF</span><h2>FIELD TEST</h2><p>시험 완료 전에는 성능 주장을 표시하지 않습니다. 아래 항목은 Test Registry일 뿐 결과가 아닙니다.</p></article>
      </section>

      <section className="faberSpecGrid" id="faber-spec">
        <div><span>DIMENSIONS</span><strong>{product.specifications?.dimensions}</strong></div><div><span>WEIGHT</span><strong>{product.specifications?.weight}</strong></div><div><span>MATERIAL</span><strong>{product.specifications?.material}</strong></div><div><span>COMPATIBILITY</span><strong>TO BE DEFINED</strong></div>
      </section>

      <section className="faberTestRegistry"><header><span>FIELD TEST / EVIDENCE</span><h2>ONLY TEST WHAT<br/>CAN BE PROVED.</h2></header><div>{product.field?.tests?.map(test => <div key={test.name}><span>{test.name}</span><strong>{test.tested ? test.result ?? 'TESTED' : 'NOT TESTED'}</strong></div>)}</div></section>

      <section className="greaRelationGraph"><header><span>PRODUCT RELATIONSHIP</span><h2>PRODUCT + RELATION + ACTION</h2><p>confirmed=false인 관계는 Public Compatibility가 아닙니다. 현재는 Architecture Evaluation으로만 보입니다.</p></header><div>{relations.map((relation)=><article key={`${relation.sourceProductId}-${relation.targetProductId}`}><strong>{relation.sourceProductId}</strong><i>{relation.type}</i><strong>{relation.targetProductId}</strong><em>{relation.confirmed?'CONFIRMED':'UNCONFIRMED / CONCEPT'}</em><p>{relation.note}</p></article>)}</div></section>

      <section className="faberConfiguration"><div><span>FUTURE-READY</span><h2>FUNCTIONAL<br/>CONFIGURATION</h2><p>FABER의 CUSTOM은 제품 구성에 가깝습니다. 실제 공통 장착 규격이 개발되기 전까지 INSTRUMENTA는 공개 Line으로 사용하지 않습니다.</p></div><div className="faberStack"><span>BASE / FIELD PRODUCT</span><i>+</i><span>CARRY / HOLD</span><i>+</i><span>INSIGNIA</span><small>INTERFACE / STANDARD — TO BE DEFINED</small></div></section>

      <section className="greaCrossLink"><span>CONFIGURE WITH</span><div><strong>GI-001 / IDENTITY PATCH 01</strong><p>CONCEPT RELATION ONLY / NOT VERIFIED COMPATIBILITY</p></div><Link href="/grea/insignia">VIEW INSIGNIA →</Link></section>
    </>
  );
}
