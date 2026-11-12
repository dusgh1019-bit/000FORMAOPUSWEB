import Link from 'next/link';
import MachinaNav, { MachinaMobileNav } from './MachinaNav';
import TechnicalMeta from './TechnicalMeta';
import TechnicalVisual from './TechnicalVisual';
import type { MachinaSystemProject } from '@/content/machina';

function evidenceLabel(value: string) {
  return value === 'CLIENT_APPROVED' ? 'CLIENT-APPROVED' : value.replaceAll('_', ' ');
}

export default function ProjectDetail({ project }: { project: MachinaSystemProject }) {
  const confidential = project.disclosureLevel === 'CONFIDENTIAL';
  const anonymized = project.disclosureLevel === 'ANONYMIZED';
  const publicSequence = project.sequence.filter((section) => section.public);
  const processLabels = project.sequence.length ? project.sequence.map((s) => s.label) : ['PROJECT','DETAILS','RESTRICTED'];

  return (
    <main className="machinaPage machinaProjectDetail">
      <MachinaNav mode="systems" />
      <section className="machinaDetailHero system">
        <div className="machinaDetailTitle"><span>MACHINA / SYSTEMS / {project.id}</span><h1>{confidential ? <>CONFIDENTIAL<br/>PROJECT</> : project.title}</h1><p>{project.publicSummary}</p><small>SAMPLE / UI VALIDATION — NOT A REAL CLIENT PROJECT</small></div>
        <TechnicalVisual variant={2} label={`${project.id} / ${project.disclosureLevel}`} mode={confidential ? 'CONFIDENTIAL' : 'SYSTEM'} process={processLabels} />
      </section>

      <section className="machinaSpecSection">
        <TechnicalMeta rows={[
          ['PROJECT',project.id],
          ['STATUS',project.status],
          ['YEAR',String(project.year)],
          ['SECTOR',project.sector || '—'],
          ['SCOPE',project.scope.join(' / ')],
          ['DISCLOSURE',project.disclosureLevel],
          ['EVIDENCE',evidenceLabel(project.evidenceType)],
          ['CLIENT',project.hideClient ? 'CONFIDENTIAL / NOT DISCLOSED' : (project.clientName || '—')],
        ]}/>
        <div className="machinaRevision"><span>PROJECT RECORD</span><strong>{project.notation}</strong><small>{confidential ? 'NO PUBLIC DETAIL PAGE DATA' : 'PUBLIC RENDER IS GOVERNED BY DISCLOSURE FLAGS'}</small></div>
      </section>

      <section className="machinaDisclosureGate">
        <div><span>DISCLOSURE GATE</span><h2>{project.disclosureLevel}</h2></div>
        <dl>
          <div><dt>CLIENT</dt><dd>{project.hideClient ? 'HIDDEN' : 'VISIBLE'}</dd></div>
          <div><dt>GEOMETRY</dt><dd>{project.hideGeometry ? 'HIDDEN' : 'VISIBLE'}</dd></div>
          <div><dt>SPECIFICATIONS</dt><dd>{project.hideSpecifications ? 'HIDDEN' : 'VISIBLE'}</dd></div>
          <div><dt>PROCESS</dt><dd>{project.hideProcess ? 'HIDDEN / GENERALIZED' : 'VISIBLE IN SAMPLE SCHEMA'}</dd></div>
        </dl>
        <p>SHOW WHAT PROVES.<br/>PROTECT WHAT MATTERS.</p>
      </section>

      {confidential ? (
        <section className="machinaConfidentialProjectOnly"><TechnicalVisual variant={4} label="CONFIDENTIAL INDUSTRIAL PROJECT" mode="CONFIDENTIAL" process={['SCOPE','EXPERIENCE','RESTRICTED']} /><div><span>{project.id}</span><h2>CONFIDENTIAL<br/>INDUSTRIAL PROJECT</h2><strong>{project.scope.join(' / ')}</strong><p>PROJECT DETAILS RESTRICTED.<br/>실제 이미지·형상·수치·고객정보를 생성하거나 추정하지 않습니다.</p></div></section>
      ) : anonymized ? (
        <section className="machinaAnonymizedProcess"><header><span>ANONYMIZED PUBLIC DIAGRAM</span><h2>FUNCTION WITHOUT<br/>CLIENT-SENSITIVE DETAIL</h2></header><TechnicalVisual variant={2} label={`${project.id} / GENERALIZED PROCESS`} mode="SYSTEM" process={processLabels} /><p>실제 공정의 순서·센서 위치·치공구 형상·검사 기준을 재현하지 않고, 공개 가능한 기능 단계만 보여주는 구조입니다.</p></section>
      ) : (
        <section className="machinaProjectDocument"><aside><span>SEQUENCE</span>{publicSequence.map((s)=><a href={`#section-${s.key}`} key={s.key}>{s.key} — {s.label}</a>)}</aside><div>{publicSequence.map((section,index)=><article id={`section-${section.key}`} key={section.key}><div className="machinaDocumentText"><span>{section.key} — {section.label}</span><h2>{section.label}</h2><p>{section.body}</p></div><TechnicalVisual variant={(index%4)+1} label={`${project.id} / ${section.label}`} mode="SYSTEM" process={[section.label]} /></article>)}</div></section>
      )}

      <section className="machinaB2BInquiry"><span>SIMILAR PROJECT?</span><div><h2>유사한 설비 또는 구조물의 설계·제작 검토가 필요하십니까?</h2><p>기존 도면, 사진 또는 요구사항을 보내주시면 사람이 기술 검토한 뒤 정식 견적 단계로 연결합니다.</p><Link href={`/machina/contact?subject=${encodeURIComponent(project.title)}#inquiry`}>프로젝트 문의 <b>→</b></Link></div></section>
      <section className="machinaCrossLink"><span>ENGINEERING YOU CAN TRUST.</span><Link href="/machina/objects">VIEW DESIGNED OBJECTS →</Link></section>
      <MachinaMobileNav />
    </main>
  );
}
