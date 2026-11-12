'use client';

import { useState } from 'react';
import Link from 'next/link';
import GreaNav from './GreaNav';

const steps=['SELECT','POSITION','ATTACH','LOCK'] as const;

export default function InsigniaLanding(){
  const [step,setStep]=useState(0);
  const next=()=>setStep(v=>(v+1)%steps.length);
  return <main className="greaV2Page insigniaPage"><GreaNav current="INSIGNIA" />
    <section className="greaSubHero insigniaHero"><div><span>MARK / CROSS-LINE SYSTEM</span><h1>INSIGNIA</h1><strong>MARK IT.</strong></div><div><p>PATCHES & MARKS</p><em>패치 · 표식</em><small>I WANT TO MARK IT.</small></div></section>
    <section className="insigniaMechanism"><header><span>COMPONENT MECHANISM</span><h2>SELECT → POSITION → ATTACH → LOCK</h2><p>GI-001은 CONCEPT입니다. 아래 동작은 Cross-line Mark System을 평가하는 Visual Demonstration이며 실제 자유배치·부착호환성을 주장하지 않습니다.</p></header><div className={`insigniaAttachStage step-${step}`} onClick={next} role="button" tabIndex={0} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();next()}}}><div className="insigniaBaseProduct"><span>FABER PANEL / CONCEPT SLOT</span><i className="slot"/></div><div className="patchProxy"><b>GREA</b><strong>IDENTITY</strong><i>001</i></div><div className="insigniaAttachGuide"><strong>{steps[step]}</strong><small>TAP / CLICK TO ADVANCE</small></div></div><nav className="insigniaStepNav">{steps.map((s,i)=><button key={s} className={i===step?'isActive':''} onClick={()=>setStep(i)}>{String(i+1).padStart(2,'0')} {s}</button>)}</nav></section>
    <section className="insigniaLogic"><header><span>SYSTEM LOGIC</span><h2>BASE PRODUCT<br/>≠ MARK.</h2></header><div><article><span>EXERCITUS</span><strong>+ INSIGNIA</strong><small>UNIT / ROLE / NAME</small></article><article><span>FABER</span><strong>+ INSIGNIA</strong><small>COMPANY / NAME / PROJECT</small></article><article><span>VESTIS</span><strong>+ INSIGNIA</strong><small>SELECTED APPLICATION</small></article></div></section>
    <section className="insigniaSample"><span>GI-001 / CONCEPT</span><div><h2>IDENTITY PATCH 01</h2><p>실제 규격·부착 방식·생산방식·호환성은 TO BE DEFINED입니다.</p><dl><div><dt>TYPE</dt><dd>PATCH / MARK</dd></div><div><dt>COMPATIBILITY</dt><dd>NOT VERIFIED</dd></div><div><dt>PRODUCTION</dt><dd>TO BE DEFINED</dd></div></dl></div></section>
    <section className="greaEndActions"><Link href="/grea">← GREA</Link><Link href="/grea/custom">CUSTOM →</Link></section>
  </main>;
}
