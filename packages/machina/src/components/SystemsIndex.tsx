import Link from '@forma-opus/ui/react/Link';
import MachinaNav, { MachinaMobileNav } from './MachinaNav';
import TechnicalVisual from './TechnicalVisual';
import { machinaCapabilities, machinaSystems } from '@content/machina/index';

function evidenceLabel(value: string) {
  return value === 'CLIENT_APPROVED' ? 'CLIENT-APPROVED' : value.replaceAll('_', ' ');
}

export default function SystemsIndex() {
  return (
    <main className="machinaPage machinaSystemsPage">
      <MachinaNav mode="systems" />
      <section className="machinaSystemsHero">
        <div><span>MACHINA / SYSTEMS</span><h1>ENGINEERED<br/>SYSTEMS</h1></div>
        <div className="machinaSystemsHeroStatement"><strong>CAPABILITY.<br/>PROCESS.<br/>EVIDENCE.<br/>CONTACT.</strong><p>TECHNICAL PERFORMANCE RECORD<br/>+ DIGITAL BUSINESS CARD<br/>+ ENGINEERING INQUIRY</p></div>
      </section>

      <section className="machinaSystemsOverview" id="projects">
        <article className="machinaSystemsProjects"><header><span>01</span><h2>PROJECTS</h2></header>{machinaSystems.map((p)=><Link href={`/machina/systems/${p.slug}`} className="machinaProjectMini" key={p.id}><span>{p.id}</span><strong>{p.title}</strong><small>{p.disclosureLevel}</small><b>→</b></Link>)}<Link className="machinaTextLink" href="#project-ledger">VIEW ALL PROJECTS →</Link></article>
        <article className="machinaCapabilitiesMini"><header><span>02</span><h2>CAPABILITIES</h2></header>{machinaCapabilities.slice(0,6).map(([cap,ko])=><div key={cap}><strong>{cap}</strong><small>{ko}</small></div>)}<Link className="machinaTextLink" href="/machina/capabilities">VIEW CAPABILITIES →</Link></article>
        <article className="machinaContactMini"><header><span>03</span><h2>CONTACT</h2></header><p>설계·제작 검토가 필요하신 경우<br/>도면, 사진 또는 요구사항을 보내주십시오.</p><Link href="/machina/contact#inquiry">프로젝트 문의 →</Link><small>온라인 가격 확정 없음 / 기술검토 후 견적</small></article>
      </section>

      <section className="machinaConfidentialityDoctrine">
        <div><span>SYSTEM RULE</span><h2>SHOW WHAT PROVES.<br/>PROTECT WHAT MATTERS.</h2></div>
        <div><strong>CONFIDENTIALITY<br/>IS PART OF ENGINEERING.</strong><p>Blur만으로 공개 가능 여부를 판단하지 않습니다. Geometry, Jig, Sensor, HMI, Layout, Part/ Drawing Number, 검사법과 생산 흐름까지 공개범위를 별도로 검토합니다.</p></div>
      </section>

      <section className="machinaEvidence" id="project-ledger">
        <header><div><span>PROJECT RECORD</span><h2>수행능력은 공개 가능한 Evidence로 증명합니다.</h2></div><p>아래 4개 항목은 전부 UI 검증용 가상 SAMPLE입니다. 실제 Client, 계약, 납품실적 또는 성능을 의미하지 않습니다.</p></header>
        <div className="machinaProjectLedger machinaProjectLedgerV14">
          {machinaSystems.map((p,index)=><Link href={`/machina/systems/${p.slug}`} key={p.id} className={`disclosure-${p.disclosureLevel.toLowerCase()}`}>
            <span>{String(index+1).padStart(2,'0')}</span>
            <div><strong>{p.title}</strong><small>{p.id} / {p.sector || '—'} / SAMPLE</small></div>
            <span>{p.disclosureLevel}</span>
            <span>{p.scope.slice(0,2).join(' / ')}</span>
            <b>→</b>
            <div className="machinaProjectReveal"><small>DISCLOSURE</small><strong>{p.disclosureLevel}</strong><small>EVIDENCE</small><strong>{evidenceLabel(p.evidenceType)}</strong></div>
          </Link>)}
        </div>
      </section>

      <section className="machinaDisclosureScale">
        {[
          ['PUBLIC','승인·소유 범위 안에서 구조와 과정을 공개'],
          ['RESTRICTED','제한된 Detail과 일반화된 Scope만 공개'],
          ['ANONYMIZED','고객 식별정보와 민감 Geometry·수치를 제거'],
          ['CONFIDENTIAL','공개 가능한 최소 Scope와 상태만 표시'],
        ].map(([level,body],index)=><article key={level}><span>{String(index+1).padStart(2,'0')}</span><strong>{level}</strong><p>{body}</p></article>)}
      </section>

      <section className="machinaEvidenceTypes"><span>EVIDENCE TYPES</span><div>{[['OWNED EVIDENCE','자체 CAD / Demo / Test / Internal R&D'],['CLIENT-APPROVED EVIDENCE','승인된 사진 / Scope / Result만'],['CONFIDENTIAL EXPERIENCE','Sector / Scope / Status 수준의 일반화']].map(([title,body])=><article key={title}><strong>{title}</strong><p>{body}</p></article>)}</div></section>

      <section className="machinaSystemsVisualBand"><TechnicalVisual variant={2} label="PUBLIC PROCESS DIAGRAM" mode="SYSTEM" process={['INPUT','POSITIONING','PROCESS','INSPECTION','OUTPUT']} /><div><span>PUBLIC DIAGRAM</span><strong>REAL DATA IS NOT<br/>REQUIRED TO EXPLAIN<br/>ENGINEERING LOGIC.</strong><small>민감 프로젝트는 별도의 Public Diagram으로 기능 관계만 설명합니다.</small></div></section>
      <section className="machinaB2BInquiry"><span>PROJECT INQUIRY</span><div><h2>설계·제작 검토가 필요하신 경우<br/>도면, 사진 또는 요구사항을 보내주십시오.</h2><Link href="/machina/contact#inquiry">프로젝트 문의 <b>→</b></Link></div></section>
      <MachinaMobileNav />
    </main>
  );
}
