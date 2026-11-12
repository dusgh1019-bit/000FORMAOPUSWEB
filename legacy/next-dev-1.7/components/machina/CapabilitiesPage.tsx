import Link from 'next/link';
import MachinaNav, { MachinaMobileNav } from './MachinaNav';
import { machinaCapabilities } from '@/content/machina';

export default function CapabilitiesPage() {
  return <main className="machinaPage machinaCapabilitiesPage"><MachinaNav mode="systems"/><section className="machinaSectionHero compact"><div><span>MACHINA / SYSTEMS</span><h1>CAPABILITIES</h1></div><p>기계설계에서 제작·조립 검토까지.<br/>업무범위는 프로젝트 요구사항에 따라 조합됩니다.</p></section><section className="machinaCapabilityGrid">{machinaCapabilities.map(([name,ko],i)=><article key={name}><span>{String(i+1).padStart(2,'0')}</span><h2>{name}</h2><p>{ko}</p><small>PROJECT SCOPE / REVIEW REQUIRED</small></article>)}</section><section className="machinaProcess"><span>WORKFLOW</span><div>{['요구사항 확인','기술 검토','설계 / CAD','제작성 검토','제작 / 조립','납품 범위 정리'].map((x,i)=><div key={x}><i>{String(i+1).padStart(2,'0')}</i><strong>{x}</strong></div>)}</div></section><section className="machinaB2BInquiry"><span>TECHNICAL REVIEW</span><div><h2>도면 또는 현재 설비 사진이 있다면<br/>함께 보내주시는 것이 가장 빠릅니다.</h2><Link href="/machina/contact#inquiry">도면 검토 요청 <b>→</b></Link></div></section><MachinaMobileNav/></main>;
}
