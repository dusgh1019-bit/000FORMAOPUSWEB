import Link from '@forma-opus/ui/react/Link';
import GreaNav from './GreaNav';
import FaberStudy from './FaberStudy';
import { faberProductTypes, getGreaProduct } from '@content/grea/index';

export default function FaberLanding() {
  const product = getGreaProduct('GF-001')!;
  return <main className="greaV2Page faberPage"><GreaNav current="FABER" />
    <section className="greaSubHero faberHero"><div><span>WORK / DEVELOPMENT</span><h1>FABER</h1><strong>BUILT FOR<br/>THE WORK.</strong></div><div><p>WORKWEAR & FIELD EQUIPMENT</p><em>작업복 · 현장용품</em><small>FUNCTION FIRST.</small></div></section>
    <section className="faberTypeRail"><span>PRODUCT TYPES</span>{faberProductTypes.map(t=><b key={t}>{t}</b>)}<small>FILTER / NOT SUB-BRANDS</small></section>
    <section className="faberProcess"><span>PRODUCT DEVELOPMENT</span>{['OBSERVE','PROBLEM','PROTOTYPE','FIELD TEST','REVISION','ISSUE'].map((x,i)=><div key={x}><b>{String(i+1).padStart(2,'0')}</b><strong>{x}</strong>{i<5?<i>→</i>:null}</div>)}</section>
    <FaberStudy product={product} />
    <section className="greaEndActions"><Link href="/grea">← GREA</Link><Link href="/grea/insignia">INSIGNIA →</Link></section>
  </main>;
}
