import type { CSSProperties } from 'react';
import Link from '@forma-opus/ui/react/Link';
import VisualEntrySurface from '@forma-opus/ui/react/VisualEntrySurface';
import GreaNav from './GreaNav';
import { greaLines, greaSystems } from '@content/grea/index';

export default function GreaLanding() {
  return (
    <main className="greaV2Page greaV2Landing">
      <GreaNav />
      <section className="greaV2Hero">
        <div className="greaV2HeroCopy"><span>IDENTITY / WEARABLE + FUNCTIONAL</span><h1>GREA</h1><div className="greaV2HeroStatement"><strong>COMMON FORM.<br/>DIFFERENT PURPOSE.</strong><strong>IDENTITY IN WEAR.<br/>PURPOSE IN USE.</strong></div></div>
        <div className="greaV2HeroMark" aria-hidden="true"><i/><i/><i/><b>WEAR.</b><b>WORK.</b><b>MARK.</b></div>
      </section>

      <section className="greaLineField" aria-label="GREA primary product lines">
        {greaLines.map((line) => (
          <article
            key={line.line}
            className={`greaLinePanel line-${line.line.toLowerCase()}`}
            data-motion={line.motion.join('-')}
            style={{ '--g-line-accent': line.accent, '--entry-focus': line.accent } as CSSProperties}
          >
            <VisualEntrySurface href={line.route} label={`${line.line} / ${line.functionalLabel} 열기`} />
            <div className="greaLineVisual" aria-hidden="true"><i/><i/><i/><b className="greaLineMotionMark">{line.motion.join(' / ')}</b></div>
            <div className="greaLineStatus"><span>{line.index} / PRIMARY LINE</span><b>{line.status}</b></div>
            <div className="greaLineCopy">
              <small>{line.functionalLabel}</small>
              <h2>{line.line}</h2>
              <strong>{line.philosophy}</strong>
              <em>{line.koreanLabel}</em>
              <p>{line.statement}</p>
              <blockquote>{line.motivation}</blockquote>
              <div className="greaLineIdentity" aria-hidden="true"><span>{line.accentRole}</span><b>{line.motionCharacter}</b></div>
            </div>
            <span className="greaLineEnter" aria-hidden="true">ENTER LINE <span>→</span></span>
          </article>
        ))}
      </section>

      <section className="greaSystemLayer" aria-label="GREA cross-line systems"><header><span>CROSS-LINE SYSTEMS</span><p>BASE PRODUCT는 Primary Line이 결정하고, MARK와 CUSTOM은 Product Data가 허용할 때만 작동합니다.</p></header><div className="greaSystemRows">{greaSystems.map(system => <Link key={system.system} href={system.route} className="greaSystemRow"><span>{system.id}</span><div><strong>{system.system}</strong><small>{system.functionalLabel} / {system.koreanLabel}</small></div><b>{system.statement}</b><em>{system.status}</em><i>→</i></Link>)}</div></section>

      <section className="greaEcosystemPreview"><header><span>INTERACTION AS USE</span><h2>NEED → PRODUCT → CONFIGURE → MARK → CUSTOM → ORDER</h2><p>모든 단계가 모든 Product에 존재하는 것은 아닙니다. Use Case와 Data가 있는 Action만 노출합니다.</p></header><div><article><span>EXERCITUS</span><strong>MARK → LOCK → ISSUE</strong></article><article><span>FABER</span><strong>OPEN → ATTACH → CONFIGURE</strong></article><article><span>VESTIS</span><strong>FRAME → REVEAL → WEAR</strong></article></div></section>
      <section className="greaPrincipleStrip"><span>PRODUCT PRINCIPLE</span><strong>CONTENT DEPTH MAY DIFFER. ENTRY RIGHTS DO NOT.</strong><p>NO FEATURE WITHOUT A REASON. / NO CONFIGURATION WITHOUT A USE CASE.</p></section>
    </main>
  );
}
