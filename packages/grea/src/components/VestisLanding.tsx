'use client';

import { useState } from 'react';
import Link from '@forma-opus/ui/react/Link';
import GreaNav from './GreaNav';
import { getGreaProduct } from '@content/grea/index';

type VestisView='ARTWORK'|'PLACEMENT'|'GARMENT';

export default function VestisLanding() {
  const p = getGreaProduct('GV-001')!;
  const [view,setView]=useState<VestisView>('ARTWORK');
  return <main className="greaV2Page vestisPage"><GreaNav current="VESTIS" />
    <section className="greaSubHero vestisHero"><div><span>EXPRESSION / DEVELOPMENT</span><h1>VESTIS</h1><strong>WEAR WHAT<br/>YOU CHOOSE.</strong></div><div><p>GRAPHIC APPAREL</p><em>그래픽 의류</em><small>I WANT TO WEAR THIS DESIGN.</small></div></section>
    <section className={`vestisMechanism view-${view.toLowerCase()}`}>
      <header><span>PRODUCT MECHANISM</span><h2>GRAPHIC → GARMENT → VARIANT → ORDER</h2><p>현재 GV-001은 SAMPLE이므로 실제 가격·재고·주문 기능은 노출하지 않습니다.</p></header>
      <div className="vestisStage">
        <div className="vestisArtworkField"><span>GV-001</span><div><b>GREA</b><strong>FORM / MARK / WEAR</strong><i>01</i></div><small>ARTWORK / SAMPLE</small></div>
        <div className="vestisGarmentProxy" aria-hidden="true"><i className="sleeve left"/><i className="sleeve right"/><i className="body"/><b className="placement">GREA<br/><small>FORM / MARK / WEAR</small></b></div>
        <div className="vestisViewLabel"><strong>{view}</strong><small>{view==='ARTWORK'?'FULL FRAME GRAPHIC':view==='PLACEMENT'?'ARTWORK POSITION ON GARMENT':'GARMENT VIEW / SAMPLE'}</small></div>
      </div>
      <nav className="greaProductActionBar"><button className={view==='ARTWORK'?'isActive':''} onClick={()=>setView('ARTWORK')}>VIEW GRAPHIC</button><button className={view==='PLACEMENT'?'isActive':''} onClick={()=>setView('PLACEMENT')}>PLACEMENT</button><button className={view==='GARMENT'?'isActive':''} onClick={()=>setView('GARMENT')}>GARMENT</button><span>ORDER / NOT AVAILABLE — SAMPLE</span></nav>
    </section>
    <section className="vestisStudy"><div className="vestisMeta"><span>{p.id} / {p.status}</span><h2>{p.title}</h2><p>{p.descriptor}</p><dl><div><dt>CATEGORY</dt><dd>GRAPHIC APPAREL</dd></div><div><dt>STATUS</dt><dd>SAMPLE</dd></div><div><dt>CUSTOM</dt><dd>NOT DEFINED</dd></div><div><dt>PRODUCTION</dt><dd>TO BE DEFINED</dd></div></dl></div><div className="vestisMotionRule"><span>FRAME</span><i>→</i><span>REVEAL</span><i>→</i><span>WEAR</span></div></section>
    <section className="greaPrincipleStrip"><span>LINE DISTINCTION</span><strong>EXERCITUS = SPECIALIZED IDENTITY / VESTIS = GREA'S GRAPHIC EXPRESSION</strong><p>판매 중인 Collection처럼 표현하지 않습니다.</p></section>
    <section className="greaEndActions"><Link href="/grea">← GREA</Link><Link href="/grea/insignia">INSIGNIA →</Link></section>
  </main>;
}
