import Link from '@forma-opus/ui/react/Link';
import type { CSSProperties } from 'react';
import ParvusNav from './ParvusNav';
import ParvusThemePanel from './ParvusThemePanel';
import { parvusProjects, parvusThemeCopy, type ParvusTheme } from '@content/parvus/index';

export default function ParvusLanding() {
  return (
    <main className="parvusPage parvusLanding">
      <ParvusNav />
      <section className="parvusHero">
        <div className="parvusAssembly" aria-hidden="true">
          {Array.from({length: 18}, (_, i) => <i key={i} style={{'--i': i} as CSSProperties} />)}
          <b className="parvusAssemblyConnector c1"/><b className="parvusAssemblyConnector c2"/><b className="parvusAssemblyConnector c3"/>
        </div>
        <div className="parvusHeroMeta">P / 01 WORKS / AFFECTION SYSTEM</div>
        <div className="parvusHeroTitle"><span>AFFECTION</span><h1>PARVUS</h1></div>
        <div className="parvusHeroStatement"><strong>THINGS YOU WANT<br/>TO KEEP CLOSE.</strong><span>BRICK AS A MEDIUM.</span><small>INVITE · REACT · ASSEMBLE</small></div>
      </section>

      <section className="parvusMotionDoctrine" aria-label="PARVUS motion doctrine">
        <span>INTERACTION AS ASSEMBLY</span><strong>EVERY TOUCH SHOULD CHANGE SOMETHING.</strong><p>UNIT → CONNECT → STACK → BUILD → BREAK → REBUILD</p>
      </section>

      <section className="parvusThemeTriptych" aria-label="PARVUS KEEP PLAY PLACE">
        {(['KEEP','PLAY','PLACE'] as ParvusTheme[]).map((theme, index) => {
          const copy = parvusThemeCopy[theme];
          return <ParvusThemePanel key={theme} theme={theme} index={index} statement={copy.statement} meaning={copy.meaning} emotions={copy.emotions} />;
        })}
      </section>

      <section className="parvusMotionEvaluation" aria-label="Motion evaluation scenes">
        <header><span>MOTION EVALUATION / V1.6</span><h2>ASSEMBLY BECOMES<br/>THE INTERFACE.</h2><p>각 장면은 장식이 아니라 Theme의 행동을 설명합니다. 실제 조립 Mechanism이 없는 Sample은 VISUAL DEMONSTRATION으로 표시합니다.</p></header>
        <div className="parvusMotionEvalGrid">
          <article className="keep"><span>01 / K-001</span><strong>GATHER → FRAME → HOLD</strong><p>COMPANION PORTRAIT / KEEP / PRODUCT</p></article>
          <article className="play"><span>02 / PLAY SAMPLE</span><strong>ASSEMBLED → EXPLODED → REBUILD</strong><p>VISUAL DEMONSTRATION / MODULE BEHAVIOR</p></article>
          <article className="place"><span>03 / PLACE SAMPLE</span><strong>PLAN → RISE → BRICK OBJECT</strong><p>TRACE / HEIGHT / FORM</p></article>
        </div>
      </section>

      <section className="parvusFoundational">
        <header><div><span>FOUNDATIONAL WORKS</span><h2>BRICK-CENTERED PROJECTS</h2></div><p>실제 발미테 프로젝트 자료가 연결되기 전까지는 SAMPLE만 노출합니다. 과거 성과는 연도와 수행범위를 검증한 뒤 FOUNDATIONAL WORKS로 승격합니다.</p></header>
        <div className="parvusFoundationalRail">
          {parvusProjects.slice(0,3).map(project => <Link key={project.id} href={`/parvus/projects/${project.slug}`}><span>{project.id}</span><div><small>{project.theme} / {project.contentType} / {project.medium}</small><strong>{project.title}</strong><em>{project.koreanTitle}</em></div><b>{project.status}</b><i>↗</i></Link>)}
        </div>
      </section>

      <section className="parvusB2BBridge">
        <div className="parvusB2BLead"><span>B2B TRANSLATION</span><h2>PARVUS<br/>INTERPRETS SUBJECTS.</h2><p>기업이 구매하는 것은 철학이 아니라 브랜드·제품·장소·기념 대상을 브릭 오브젝트로 구현하는 프로젝트입니다.</p></div>
        <div className="parvusB2BMap"><div><span>KEEP</span><strong>COMMEMORATION / GIFT / REPRESENTATION</strong></div><div><span>PLAY</span><strong>ENGAGEMENT / EXPERIENCE / EDUCATION</strong></div><div><span>PLACE</span><strong>LANDMARK / SPACE / CORPORATE DISPLAY</strong></div></div>
      </section>

      <section className="parvusInquiryCTA"><div><span>CUSTOM BRICK PROJECT</span><h2>WHAT DO YOU WANT<br/>TO BUILD?</h2></div><div><p>PERSON · ANIMAL · OBJECT · PLACE · COMPANY · EVENT</p><Link href="/parvus/contact#inquiry">START WITH A SUBJECT <b>→</b></Link></div></section>
      <footer className="parvusFooter"><span>GREA / WEAR</span><strong>PARVUS / BUILD</strong><span>MACHINA / ENGINEER</span></footer>
    </main>
  );
}
