'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import {
  historyArchive, historyCategories, historyFormats, historyHorizontalMap, historyPeriods, historyRelations, historySeries, historySeriesById,
  type HistoryCategory, type HistoryFormat, type HistoryPeriod,
} from '@/content/history';

type All<T extends string> = 'ALL' | T;
const periodKorean: Record<HistoryPeriod,string> = {'ANCIENT':'고대','THREE KINGDOMS':'삼국','NORTH–SOUTH STATES':'남북국','GORYEO':'고려','JOSEON':'조선','KOREAN EMPIRE':'개항기·대한제국','COLONIAL PERIOD':'일제강점기','MODERN':'현대'};

export default function HistoryArchiveIndex({embedded=false}:{embedded?:boolean}={}) {
  const [query,setQuery] = useState('');
  const [period,setPeriod] = useState<All<HistoryPeriod>>('ALL');
  const [category,setCategory] = useState<All<HistoryCategory>>('ALL');
  const [format,setFormat] = useState<All<HistoryFormat>>('ALL');
  const [series,setSeries] = useState('ALL');
  const [activeSlug,setActiveSlug] = useState(historyArchive[0]?.slug ?? '');

  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    const requestedCategory=params.get('category');
    const requestedSeries=params.get('series');
    if(requestedCategory && historyCategories.includes(requestedCategory as HistoryCategory)) setCategory(requestedCategory as HistoryCategory);
    if(requestedSeries && historySeries.some(item=>item.id===requestedSeries)) setSeries(requestedSeries);
  },[]);

  const filtered = useMemo(() => {
    const q=query.trim().toLocaleLowerCase('ko-KR');
    return historyArchive.filter((item)=>{
      const seriesMeta=historySeriesById(item.seriesId);
      const haystack=[item.title,item.koreanTitle,item.period,item.category,item.format,item.dateLabel,item.subSeries ?? '',seriesMeta?.title ?? '',seriesMeta?.koreanTitle ?? '',...(item.people ?? []),...(item.relatedEvents ?? []),...item.keywords].join(' ').toLocaleLowerCase('ko-KR');
      return (!q || haystack.includes(q)) && (period==='ALL'||item.period===period) && (category==='ALL'||item.category===category) && (format==='ALL'||item.format===format) && (series==='ALL'||item.seriesId===series);
    });
  },[query,period,category,format,series]);

  const active=filtered.find(item=>item.slug===activeSlug) ?? filtered[0] ?? historyArchive[0];
  const activeSeries=historySeriesById(active?.seriesId);
  const relatedSearch=query.trim()?historyArchive.filter(item=>item.slug!==active?.slug && [item.koreanTitle,...item.keywords,...(item.people??[]),...(item.relatedEvents??[])].join(' ').toLocaleLowerCase('ko-KR').includes(query.trim().toLocaleLowerCase('ko-KR'))).slice(0,4):[];
  const pct=(year:number)=>((year-historyHorizontalMap.start)/(historyHorizontalMap.end-historyHorizontalMap.start))*100;

  function clearFilters(){ setQuery(''); setPeriod('ALL'); setCategory('ALL'); setFormat('ALL'); setSeries('ALL'); }

  return <div id="archive-index" className={`historyArchiveShell historyArchiveV12 ${embedded?'historyArchiveEmbedded':''}`}>
    {!embedded&&<section className="historyArchiveHero" aria-labelledby="history-title">
      <div className="historyArchiveKicker">FORMA OPUS / ACADEMIA</div>
      <h1 id="history-title">HISTORY</h1>
      <div className="historyArchiveHeroFoot"><strong>HISTORICAL KNOWLEDGE ARCHIVE</strong><span>INFORMATION → CLASSIFICATION → RELATION → RECONSTRUCTION → UNDERSTANDING</span></div>
    </section>}

    <section className="historyControlPlane" aria-label="Archive search and filter">
      <label className="historySearchLine"><span>SEARCH</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="인물, 사건, 시대, SERIES, Keyword"/><small>{String(filtered.length).padStart(3,'0')} / {String(historyArchive.length).padStart(3,'0')}</small></label>
      <div className="historyFilterStack">
        <HistoryFilter label="PERIOD" korean="시대" values={['ALL',...historyPeriods]} active={period} onChange={value=>setPeriod(value as All<HistoryPeriod>)}/>
        <HistoryFilter label="CATEGORY" korean="분류" values={['ALL',...historyCategories]} active={category} onChange={value=>setCategory(value as All<HistoryCategory>)}/>
        <HistoryFilter label="FORMAT" korean="형식" values={['ALL',...historyFormats]} active={format} onChange={value=>setFormat(value as All<HistoryFormat>)}/>
        <HistoryFilter label="SERIES" korean="시리즈" values={['ALL',...historySeries.map(item=>item.id)]} valueLabels={Object.fromEntries(historySeries.map(item=>[item.id,item.title]))} active={series} onChange={setSeries}/>
      </div>
    </section>

    <section className="historySeriesField" aria-label="Archive series">
      <div className="historySeriesCode">SERIES / 01</div>
      <div><strong>{historySeries[0].title}</strong><em>{historySeries[0].koreanTitle}</em><small>{historySeries[0].status}</small></div>
      <p>{historySeries[0].description}</p>
      <button type="button" onClick={()=>setSeries(series===historySeries[0].id?'ALL':historySeries[0].id)}>{series===historySeries[0].id?'SHOW ALL ARCHIVES':'FILTER THIS SERIES'} ↗</button>
    </section>

    <section className="historyIndexSection" aria-labelledby="archive-index-title">
      <header className="historySectionHead"><span>01</span><div><small>CATALOGUE / INDEX</small><h2 id="archive-index-title">ARCHIVE INDEX</h2></div></header>
      <div className="historyIndexGrid">
        <div className="historyLedger" role="list">
          {filtered.length?filtered.map(item=>{
            const itemSeries=historySeriesById(item.seriesId);
            return <Link key={item.slug} role="listitem" className={`historyLedgerRow ${active?.slug===item.slug?'isActive':''}`} href={`/academia/history/${item.slug}`} onMouseEnter={()=>setActiveSlug(item.slug)} onFocus={()=>setActiveSlug(item.slug)}>
              <span className="historyLedgerNo">{item.archiveNo}</span>
              <span className="historyLedgerTitle"><strong>{item.title}</strong><em>{item.koreanTitle}</em>{itemSeries&&<small>{itemSeries.title}{item.subSeries?` / ${item.subSeries}`:''}</small>}</span>
              <span className="historyLedgerPeriod">{item.dateLabel}<small>{item.period}</small></span>
              <span className="historyLedgerType">{item.category}<small>/ {item.format}</small></span><span className="historyLedgerArrow">↗</span>
            </Link>;
          }):<div className="historyEmpty"><strong>NO MATCHING ARCHIVE</strong><button type="button" onClick={clearFilters}>FILTER RESET</button></div>}
        </div>
        {active&&<aside className="historyIndexPreview" aria-label="Selected archive preview">
          <div className="historyPreviewPlate" data-format={active.format}><span>{active.archiveNo}</span><strong>{active.koreanTitle}</strong><small>{active.dateLabel}</small></div>
          <div className="historyPreviewMeta"><span>{active.period}</span><span>{active.category} / {active.format}</span></div>
          {activeSeries&&<div className="historyPreviewSeries"><span>SERIES</span><strong>{activeSeries.title}</strong><small>{active.subSeries ?? activeSeries.koreanTitle}</small></div>}
          <p>{active.summary}</p><div className="historyKeywordLine">{active.keywords.slice(0,6).map(k=><span key={k}>{k}</span>)}</div>
          <Link href={`/academia/history/${active.slug}`}>OPEN ARCHIVE <span>↗</span></Link>
        </aside>}
      </div>
      {!!relatedSearch.length&&<div className="historySearchRelations"><span>RELATED TO SEARCH</span>{relatedSearch.map(item=><Link key={item.slug} href={`/academia/history/${item.slug}`}><small>{item.archiveNo}</small><strong>{item.koreanTitle}</strong></Link>)}</div>}
    </section>

    <section className="historyHorizontalSection" aria-labelledby="horizontal-history-title">
      <header className="historySectionHead"><span>02</span><div><small>INTERACTIVE STUDY / TIME + RELATION</small><h2 id="horizontal-history-title">HORIZONTAL HISTORY MAP</h2></div></header>
      <div className="historyHorizontalViewport" tabIndex={0} aria-label="고려 대외관계 가로 시간축">
        <div className="historyHorizontalMap">
          <div className="historyHorizontalHead"><div><strong>{historyHorizontalMap.title}</strong><span>{historyHorizontalMap.koreanTitle}</span></div><small>SCROLL / TAP / OPEN ARCHIVE</small></div>
          <div className="historyHorizontalAxis"><span>{historyHorizontalMap.start}</span><i/><span>{historyHorizontalMap.end}</span></div>
          <div className="historyHorizontalBands">
            {historyHorizontalMap.bands.map(band=><Link key={band.slug} href={`/academia/history/${band.slug}`} className="historyHorizontalBand" style={{left:`${pct(band.start)}%`,width:`${Math.max(5,pct(band.end)-pct(band.start))}%`,top:`${18+band.lane*74}px`}}>
              <span>{band.start}{band.end!==band.start?`—${band.end}`:''}</span><strong>{band.label}<em>{band.koreanLabel}</em></strong><small>{band.note}</small>
            </Link>)}
          </div>
        </div>
      </div>
      <p className="historyHorizontalFoot">PRINT의 가로 비교 구조를 작은 이미지로 축소하지 않고, 실제 시간축과 ARCHIVE 링크가 결합된 학습도구로 전환합니다.</p>
    </section>

    <section className="historyRelationSection" aria-labelledby="history-relation-title">
      <header className="historySectionHead"><span>03</span><div><small>RELATIONSHIP / CROSS-LINK</small><h2 id="history-relation-title">RELATION INDEX</h2></div></header>
      <div className="historyRelationGrid">{historyRelations.map(group=><article key={group.id} className="historyRelationBlock"><header><span>{group.label}</span><strong>{group.title}</strong><small>{group.koreanTitle}</small></header><div className="historyRelationNodes">{group.nodes.map((node,index)=><div key={node.slug} className="historyRelationNodeWrap">{index>0&&<i>→</i>}<Link href={`/academia/history/${node.slug}`}><span>{String(index+1).padStart(2,'0')}</span><strong>{node.label}</strong><small>{node.ko}</small></Link></div>)}</div></article>)}</div>
    </section>

    <section className="historyTimelineSection" aria-labelledby="history-timeline-title">
      <header className="historySectionHead"><span>04</span><div><small>CHRONOLOGICAL ACCESS</small><h2 id="history-timeline-title">TIMELINE</h2></div></header>
      <div className="historyTimelineRail">{historyPeriods.map((p,index)=>{const count=historyArchive.filter(item=>item.period===p).length;return <button key={p} className={period===p?'active':''} onClick={()=>setPeriod(period===p?'ALL':p)}><span>{String(index+1).padStart(2,'0')}</span><strong>{p}</strong><small>{periodKorean[p]} · {count} ARCHIVE</small></button>;})}</div>
      <div className="historyTimelineNote">시대 선택은 같은 ARCHIVE DB의 PEOPLE / EVENTS / WAR / CULTURE / SYSTEM을 좁혀 보여줍니다. 별도의 교육 플랫폼 레이어를 만들지 않습니다.</div>
    </section>
  </div>;
}

function HistoryFilter({label,korean,values,active,onChange,valueLabels={}}:{label:string;korean:string;values:string[];active:string;onChange:(value:string)=>void;valueLabels?:Record<string,string>}){
  return <div className="historyFilterLine"><div className="historyFilterLabel"><span>{label}</span><i>/</i><em>{korean}</em></div><div className="historyFilterValues">{values.map(value=><button type="button" key={value} className={active===value?'active':''} onClick={()=>onChange(value)}>{valueLabels[value]??value}</button>)}</div></div>;
}
