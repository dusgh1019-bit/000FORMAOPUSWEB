'use client';

import VisualEntrySurface from '@forma-opus/ui/react/VisualEntrySurface';
import { useState } from 'react';
import MachinaNav from './MachinaNav';
import TechnicalVisual from './TechnicalVisual';

type Focused = 'objects' | 'systems' | null;

export default function MachinaLanding() {
  const [focused, setFocused] = useState<Focused>(null);
  return (
    <main className={`machinaPage machinaLanding ${focused ? `hasFocus focus-${focused}` : ''}`}>
      <MachinaNav />
      <section className="machinaLandingHero">
        <div className="machinaHeroCode">M / 01 WORKS / PRECISION SYSTEM</div>
        <h1>MACHINA</h1>
        <div className="machinaHeroStatement">
          <strong>PRECISION IN OBJECTS.</strong>
          <strong>PRECISION IN SYSTEMS.</strong>
        </div>
      </section>

      <section className="machinaLandingSplit" aria-label="MACHINA OBJECTS and SYSTEMS">
        <article
          className={`machinaLandingPanel objects ${focused === 'objects' ? 'isFocused' : ''}`}
          onPointerEnter={() => setFocused('objects')}
          onPointerLeave={() => setFocused(null)}
        >
          <VisualEntrySurface
            href="/machina/objects"
            label="MACHINA OBJECTS 열기"
            onFocus={() => setFocused('objects')}
            onBlur={() => setFocused(null)}
          />
          <TechnicalVisual variant={1} label="OBJECT STUDY / FINAL FORM" mode={focused === 'objects' ? 'OBJECT_STRUCTURE' : 'OBJECT_FINAL'} />
          <div className="machinaLandingPanelShade" />
          <div className="machinaLandingPanelContent">
            <span>01 / DESIGNED OBJECTS</span>
            <h2>OBJECTS</h2>
            <strong>DESIGNED OBJECTS.</strong>
            <b className="machinaLandingDoctrine">FORM THROUGH STRUCTURE.</b>
            <div className="machinaMicroList">NAVAL · VEHICLE · ARCHITECTURE · INDUSTRIAL · MECHANICAL · CUSTOM</div>
            <div className="machinaFocusReveal"><span>LOOK</span><span>INSPECT</span><span>DISCOVER</span><span>DETAIL</span></div>
            <span className="machinaEntryCue" aria-hidden="true">VIEW OBJECTS <b>→</b></span>
          </div>
        </article>

        <article
          className={`machinaLandingPanel systems ${focused === 'systems' ? 'isFocused' : ''}`}
          onPointerEnter={() => setFocused('systems')}
          onPointerLeave={() => setFocused(null)}
        >
          <VisualEntrySurface
            href="/machina/systems"
            label="MACHINA SYSTEMS 열기"
            onFocus={() => setFocused('systems')}
            onBlur={() => setFocused(null)}
          />
          <TechnicalVisual variant={2} label="SYSTEM STUDY / TECHNICAL EVIDENCE" mode="SYSTEM" process={['REQUIREMENT','DESIGN','BUILD','RESULT']} />
          <div className="machinaLandingPanelShade" />
          <div className="machinaLandingPanelContent">
            <span>02 / ENGINEERED SYSTEMS</span>
            <h2>SYSTEMS</h2>
            <strong>ENGINEERED SYSTEMS.</strong>
            <b className="machinaLandingDoctrine">SHOW WHAT PROVES. PROTECT WHAT MATTERS.</b>
            <div className="machinaMicroList">AUTOMATION · MACHINE DESIGN · CAD ENGINEERING · JIG & FIXTURE · FABRICATION</div>
            <div className="machinaFocusReveal"><span>READ</span><span>VERIFY</span><span>UNDERSTAND</span><span>TRUST</span></div>
            <span className="machinaEntryCue" aria-hidden="true">VIEW PROJECTS <b>→</b></span>
          </div>
        </article>
      </section>

      <section className="machinaInteractionDoctrine">
        <div><span>INTERACTION PRINCIPLE</span><strong>RESPOND,<br/>DON&apos;T PERFORM.</strong></div>
        <div className="machinaFiveInteractions">
          {['01 FOCUS','02 REVEAL','03 COMPARE','04 SEQUENCE','05 DETAIL'].map((item) => <span key={item}>{item}</span>)}
        </div>
        <p>EVERY MOTION<br/>MUST EXPLAIN SOMETHING.</p>
      </section>
      <footer className="machinaLandingFooter"><span>PRECISION YOU CAN SEE.</span><span>ENGINEERING YOU CAN TRUST.</span><small>FORMA OPUS / MACHINA</small></footer>
    </main>
  );
}
