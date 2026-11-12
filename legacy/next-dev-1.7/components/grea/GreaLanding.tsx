import Link from 'next/link';
import GreaNav from './GreaNav';
import { greaLines, greaSystems } from '@/content/grea';

export default function GreaLanding() {
  return (
    <main className="greaV2Page greaV2Landing">
      <GreaNav />
      <section className="greaV2Hero">
        <div className="greaV2HeroCopy"><span>IDENTITY / WEARABLE + FUNCTIONAL</span><h1>GREA</h1><div className="greaV2HeroStatement"><strong>IDENTITY IN<br/>WHAT YOU WEAR.</strong><strong>PURPOSE IN<br/>WHAT YOU USE.</strong></div></div>
        <div className="greaV2HeroMark" aria-hidden="true"><i/><i/><i/><b>WEAR.</b><b>WORK.</b><b>MARK.</b></div>
      </section>

      <section className="greaLineField" aria-label="GREA primary product lines">
        {greaLines.map((line) => (
          <article key={line.line} className={`greaLinePanel line-${line.line.toLowerCase()}`} data-motion={line.motion.join('-')}>
            <div className="greaLineVisual" aria-hidden="true"><i/><i/><i/><b className="greaLineMotionMark">{line.motion.join(' / ')}</b></div>
            <div className="greaLineStatus"><span>{line.index} / PRIMARY LINE</span><b>{line.status}</b></div>
            <div className="greaLineCopy"><small>{line.role}</small><h2>{line.line}</h2><strong>{line.functionalLabel}</strong><em>{line.koreanLabel}</em><p>{line.statement}</p><blockquote>{line.motivation}</blockquote></div>
            <Link href={line.route} className="greaLineEnter" aria-label={`${line.line} 열기`}>OPEN LINE <span>→</span></Link>
          </article>
        ))}
      </section>

      <section className="greaSystemLayer" aria-label="GREA cross-line systems"><header><span>CROSS-LINE SYSTEMS</span><p>BASE PRODUCT는 Primary Line이 결정하고, MARK와 CUSTOM은 Product Data가 허용할 때만 작동합니다.</p></header><div className="greaSystemRows">{greaSystems.map(system => <Link key={system.system} href={system.route} className="greaSystemRow"><span>{system.id}</span><div><strong>{system.system}</strong><small>{system.functionalLabel} / {system.koreanLabel}</small></div><b>{system.statement}</b><em>{system.status}</em><i>→</i></Link>)}</div></section>

      <section className="greaEcosystemPreview"><header><span>INTERACTION AS USE</span><h2>NEED → PRODUCT → CONFIGURE → MARK → CUSTOM → ORDER</h2><p>모든 단계가 모든 Product에 존재하는 것은 아닙니다. Use Case와 Data가 있는 Action만 노출합니다.</p></header><div><article><span>EXERCITUS</span><strong>IDENTIFY → MARK → ISSUE</strong></article><article><span>FABER</span><strong>OPEN → ACCESS → CONFIGURE → LOCK</strong></article><article><span>VESTIS</span><strong>FRAME → REVEAL → WEAR</strong></article></div></section>
      <section className="greaPrincipleStrip"><span>PRODUCT PRINCIPLE</span><strong>WHAT DOES THIS SAY ABOUT THE PERSON WHO USES IT?</strong><p>NO FEATURE WITHOUT A REASON. / NO CONFIGURATION WITHOUT A USE CASE.</p></section>
    </main>
  );
}
