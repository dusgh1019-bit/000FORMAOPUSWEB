import Link from 'next/link';
import { notFound } from 'next/navigation';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';
import AuthorsNote from '@/components/history/AuthorsNote';
import { historyArchive, historyBySlug, historySeriesById } from '@/content/history';

export function generateStaticParams(){ return historyArchive.map(item=>({slug:item.slug})); }

export default async function HistoryArchiveDetailPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const item=historyBySlug(slug); if(!item) notFound();
  const related=item.related.map(historyBySlug).filter(Boolean); const series=historySeriesById(item.seriesId);
  return <main className="historyDetailPage historyDetailV12">
    <header className="historyDetailUtility"><BreadcrumbTrail className="historyPath" items={[{label:'FORMA OPUS',href:'/'},{label:'ACADEMIA',href:'/?scene=academia'},{label:'HISTORY',href:'/academia/history'},{label:item.category,href:`/academia/history?category=${item.category}`},{label:item.archiveNo,href:`/academia/history/${item.slug}`}]} /><span>{item.period}</span></header>

    <section className="historyDetailHero">
      <div className="historyDetailCode">{item.archiveNo}</div><h1>{item.title}</h1><h2>{item.koreanTitle}</h2>
      <div className="historyDetailFacts"><span>{item.dateLabel}</span><span>{item.period}</span><span>{item.category} / {item.format}</span>{series&&<span>SERIES / {series.title}</span>}</div><p>{item.summary}</p>
    </section>

    <div className="historyDetailBody">
      <aside className="historyDetailIndex" aria-label="Archive section index"><span>DOCUMENT INDEX</span>{item.sections.map(section=><a key={section.id} href={`#${section.id}`}>{section.label}</a>)}{item.authorsNote&&<a href="#authors-note">AUTHOR&apos;S NOTE</a>}{item.printEdition&&<a href="#print-edition">PRINT EDITION</a>}<a href="#related">RELATED ARCHIVES</a></aside>
      <article className="historyDocument">
        {series&&<section className="historyDetailSeries"><span>SERIES</span><strong>{series.title}<em>{series.koreanTitle}</em></strong><small>{item.subSeries ?? series.status}</small></section>}
        {item.sections.map(section=><section key={section.id} id={section.id} className="historyDocumentSection"><div className="historyDocumentLabel">{section.label}</div>{section.title&&<h3>{section.title}</h3>}{section.paragraphs?.map((paragraph,index)=><p key={index}>{paragraph}</p>)}{section.points&&<ol className="historyDocumentPoints">{section.points.map((point,index)=><li key={`${section.id}-${index}`}><span>{String(index+1).padStart(2,'0')}</span><p>{point}</p></li>)}</ol>}{section.id==='map'&&<div className="historyMapProxy" aria-label="Map visualization placeholder"><div className="historyMapGrid"/><span>MAP LAYER / ARCHIVE VISUAL SYSTEM</span><strong>{item.koreanTitle}</strong></div>}</section>)}

        {!!item.crossLinks?.length&&<section className="historyCrossLinks"><div className="historyDocumentLabel">CROSS REFERENCES</div>{item.crossLinks.map(link=><Link key={link.slug} href={`/academia/history/${link.slug}`}><span>{link.label}</span><small>{link.relation??'CONNECTED ARCHIVE'} ↗</small></Link>)}</section>}
        {!!item.authorsNote?.length&&<div id="authors-note"><AuthorsNote notes={item.authorsNote}/></div>}
        {item.printEdition&&<section className="historyPrintEdition" id="print-edition"><div><span>PRINT EDITION</span><strong>{item.printEdition.label}</strong><small>{item.printEdition.status==='AVAILABLE'?'SEPARATE A4 STUDY LAYOUT':'NOT ISSUED / STRUCTURE RESERVED'}</small></div>{item.printEdition.status==='AVAILABLE'&&item.printEdition.href?<a href={item.printEdition.href}>OPEN PRINT EDITION ↗</a>:<b>NO DOWNLOAD</b>}</section>}
        <section className="historyRelated" id="related"><div className="historyDocumentLabel">RELATED ARCHIVES</div>{related.map(relatedItem=>relatedItem&&<Link key={relatedItem.slug} href={`/academia/history/${relatedItem.slug}`}><span>{relatedItem.archiveNo}</span><strong>{relatedItem.title}<em>{relatedItem.koreanTitle}</em></strong><small>{relatedItem.category} / {relatedItem.format}</small><b>↗</b></Link>)}</section>
      </article>
    </div>
  </main>;
}
