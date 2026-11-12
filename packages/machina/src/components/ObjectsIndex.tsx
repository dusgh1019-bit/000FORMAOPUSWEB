import MachinaNav from './MachinaNav';
import ObjectStudyCard from './ObjectStudyCard';
import { machinaObjectDomains, machinaObjects } from '@content/machina/index';

export default function ObjectsIndex() {
  const populated = machinaObjectDomains.filter((domain) => machinaObjects.some((item) => item.domain === domain));
  return (
    <main className="machinaPage machinaObjectsPage">
      <MachinaNav />
      <section className="machinaSectionHero compact machinaObjectsHero">
        <div><span>MACHINA / OBJECTS</span><h1>DESIGNED<br/>OBJECTS</h1></div>
        <div className="machinaObjectsHeroCopy"><strong>FORM THROUGH STRUCTURE.</strong><p>제작방식보다 무엇을 만들었는가를 먼저 봅니다.<br/>DOMAIN = WHAT. MEDIUM = HOW.</p></div>
      </section>
      <nav className="machinaDomainRail" aria-label="OBJECT domains">
        <span>OBJECT DOMAIN</span>
        {machinaObjectDomains.map((domain) => <a key={domain} href={`#domain-${domain.toLowerCase()}`} className={populated.includes(domain) ? '' : 'isEmpty'}>{domain}</a>)}
      </nav>
      <section className="machinaEditorialObjects">
        {populated.map((domain, domainIndex) => {
          const items = machinaObjects.filter((item) => item.domain === domain);
          return (
            <section className="machinaDomainChapter" id={`domain-${domain.toLowerCase()}`} key={domain}>
              <header><span>{String(domainIndex + 1).padStart(2, '0')}</span><h2>{domain}</h2><p>OBJECT STUDY / {items.length} SAMPLE{items.length > 1 ? 'S' : ''}</p></header>
              <div className={`machinaDomainStudies count-${items.length}`}>
                {items.map((item, index) => <ObjectStudyCard item={item} featured={index === 0} index={domainIndex + index} key={item.id} />)}
              </div>
            </section>
          );
        })}
      </section>
      <section className="machinaObjectPrinciple"><span>MEDIUM IS INFORMATION.<br/>NOT IDENTITY.</span><p>BRICK · 3D PRINT · RESIN · METAL · MIXED<br/>모두 동일한 OBJECT STUDY 시각문법 아래 통합됩니다.</p></section>
    </main>
  );
}
