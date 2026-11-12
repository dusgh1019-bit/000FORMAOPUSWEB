'use client';

import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import Link from '@forma-opus/ui/react/Link';
import BreadcrumbTrail from '@forma-opus/ui/react/BreadcrumbTrail';
import { exercitusCollection, type CoverageGrade, type ExercitusCollectionIssue } from '@content/grea/exercitus';

type SeriesFilter = 'ALL' | 'ARTILLERY' | 'ARMORED' | 'SERVICE';
type StatusFilter = 'ALL' | 'CURRENT' | 'LIMITED';
type CoverageFilter = 'ALL' | CoverageGrade;

const seriesFilters: SeriesFilter[] = ['ALL', 'ARTILLERY', 'ARMORED', 'SERVICE'];
const coverageFilters: CoverageFilter[] = ['ALL', 'LIGHT', 'STANDARD', 'HEAVY'];
const statusFilters: StatusFilter[] = ['ALL', 'CURRENT', 'LIMITED'];

function seriesKey(series: string): SeriesFilter {
  if (series.includes('ARTILLERY')) return 'ARTILLERY';
  if (series.includes('ARMORED')) return 'ARMORED';
  return 'SERVICE';
}

const galleryLabels = ['FRONT','BACK','MATERIAL'] as const;

function IssuedGallery({item,active}:{item:ExercitusCollectionIssue;active:boolean}){
  const [frame,setFrame]=useState(0);
  useEffect(()=>{
    if(!active){ setFrame(0); return; }
    const timer=window.setInterval(()=>setFrame(value=>(value+1)%galleryLabels.length),3000);
    return ()=>window.clearInterval(timer);
  },[active]);
  return <div className="issuedGallery" aria-label={`${item.title} gallery`}>
    <div className="issuedGalleryFrames" aria-live="off">
      {galleryLabels.map((label,index)=><div key={label} className={`issuedGalleryFrame is${label} ${frame===index?'isVisible':''}`}>
        <div className="issuedArtwork" aria-hidden="true">
          <span className="issuedArtworkMark">{item.mark}</span>
          <strong>{index===0?item.equipment:index===1?item.title.split(' ')[0]:item.typeLine.split(' / ')[0]}</strong>
          <small>{index===2?'DTG / COTTON SURFACE':item.typeLine}</small>
        </div>
      </div>)}
    </div>
    <div className="issuedGalleryOverlay">
      <div><span>{item.issue}</span><span>{galleryLabels[frame]} / 03</span></div>
      <strong>{item.title}</strong>
      <div><span>{item.series}</span><span>{item.coverage}</span><span>{item.status}</span></div>
    </div>
    <div className="issuedGalleryNav" aria-label="Gallery views">{galleryLabels.map((label,index)=><button type="button" key={label} className={frame===index?'active':''} onClick={()=>setFrame(index)} aria-label={`Show ${label}`}>{String(index+1).padStart(2,'0')}</button>)}</div>
  </div>;
}

export default function CollectionIndex() {
  const [expanded, setExpanded] = useState(exercitusCollection[0]?.slug ?? '');
  const [series, setSeries] = useState<SeriesFilter>('ALL');
  const [coverage, setCoverage] = useState<CoverageFilter>('ALL');
  const [status, setStatus] = useState<StatusFilter>('ALL');

  const filtered = useMemo(() => exercitusCollection.filter((item) => (
    (series === 'ALL' || seriesKey(item.series) === series) &&
    (coverage === 'ALL' || item.coverage === coverage) &&
    (status === 'ALL' || item.status === status)
  )), [series, coverage, status]);

  return (
    <main className="exCommercePage collectionPageV2">
      <header className="exCommerceHeader">
        <BreadcrumbTrail items={[{label:'FORMA OPUS',href:'/'},{label:'GREA',href:'/grea'},{label:'EXERCITUS',href:'/grea/exercitus'},{label:'COLLECTION',href:'/grea/exercitus/collection'}]} />
        <span>ISSUED / ACTIVE INDEX</span>
      </header>

      <section className="collectionIntro collectionIntroCompact">
        <div className="exEyebrow">EXERCITUS COLLECTION</div>
        <h1>Issued, then discovered.</h1>
        <p>대표 ISSUE는 티셔츠 자체보다 인쇄 그래픽을 먼저 읽을 수 있는 발행 갤러리로 보여줍니다. 전체 상품군은 DB 속성으로 좁혀 탐색합니다.</p>
      </section>

      <section className="issuedShowcase" aria-labelledby="issued-title">
        <div className="issuedHeading">
          <div><span>01</span><h2 id="issued-title">ISSUED</h2></div>
          <p>선택한 ISSUE는 그래픽을 화면에 가득 채우고 FRONT / BACK / MATERIAL을 약 3초 간격으로 순환합니다. 실제 제품 이미지가 준비되면 동일 프레임에 그대로 교체됩니다.</p>
        </div>

        <div className="issuedRail" role="list">
          {exercitusCollection.map((item, index) => {
            const active = expanded === item.slug;
            return (
              <article className={`issuedBar ${active ? 'isExpanded' : ''}`} key={item.slug} role="listitem">
                <button className="issuedBarTrigger" type="button" aria-expanded={active} onClick={() => setExpanded(active ? '' : item.slug)}>
                  <span className="issuedBarNo">{String(index + 1).padStart(2, '0')}</span>
                  <span className="issuedBarTitle">{item.title}</span>
                  <span className="issuedBarSeries">{item.series}</span>
                </button>
                <div className="issuedBarExpansion" aria-hidden={!active}>
                  <IssuedGallery item={item} active={active}/>
                  <div className="issuedBarCopy">
                    <p>{item.descriptor}</p>
                    <div className="issuedPrice"><strong>₩{item.price.toLocaleString('ko-KR')}</strong><span>{item.colors.join(' / ')}</span></div>
                    <Link href={`/grea/exercitus/collection/${item.slug}`}>OPEN ISSUE <span>↗</span></Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="activeIndex" aria-labelledby="active-index-title">
        <div className="activeIndexLead">
          <div className="activeIndexOrdinal">02</div>
          <div><div className="exEyebrow">DISCOVER BY ATTRIBUTE</div><h2 id="active-index-title">ACTIVE INDEX</h2></div>
          <p>현재 구매 가능한 EXERCITUS 상품군 전체를 DB 속성으로 좁혀 탐색합니다. 표나 쇼핑몰 카드 대신 움직이는 제품 인덱스로 유지합니다.</p>
        </div>

        <div className="collectionFilterDeck">
          <div className="filterRail"><span>SERIES <i>/</i> <em>시리즈</em></span>{seriesFilters.map((value) => <button key={value} className={series===value?'active':''} onClick={() => setSeries(value)}>{value}</button>)}</div>
          <div className="filterRail"><span>COVERAGE <i>/</i> <em>인쇄밀도</em></span>{coverageFilters.map((value) => <button key={value} className={coverage===value?'active':''} onClick={() => setCoverage(value)}>{value}</button>)}</div>
          <div className="filterRail"><span>STATUS <i>/</i> <em>상태</em></span>{statusFilters.map((value) => <button key={value} className={status===value?'active':''} onClick={() => setStatus(value)}>{value}</button>)}</div>
        </div>

        <div className="activeProductField" aria-live="polite">
          {filtered.length ? filtered.map((item, index) => (
            <Link className="activeProductStrip" href={`/grea/exercitus/collection/${item.slug}`} key={item.slug} style={{'--strip-index': index} as CSSProperties}>
              <span className="activeProductNo">{item.issue.replace('ISSUE ', '')}</span>
              <div className="activeProductIdentity"><small>{item.series}</small><strong>{item.title}</strong></div>
              <div className="activeProductSignals"><span>{item.coverage}</span><span>{item.status}</span><span>{item.colors.length} COLOR</span></div>
              <div className="activeProductPrice">₩{item.price.toLocaleString('ko-KR')}</div>
              <div className="activeProductArrow">↗</div>
            </Link>
          )) : <div className="activeIndexEmpty">조건에 맞는 현재 상품이 없습니다. 필터를 하나 줄여보십시오.</div>}
        </div>
      </section>
    </main>
  );
}
