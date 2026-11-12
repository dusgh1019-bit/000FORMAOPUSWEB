'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  goryeoEvents,
  historicalRelations,
  historyLayerLabels,
  historyPeriodsV2,
  historyPolities,
  historyTimelineEras,
  joseonFactionTree,
  joseonPowerOrders,
  modernCoreSpine,
  modernLenses,
  threeKingdomLensEvents,
  timelineEraById,
  type HistoryEventNode,
  type HistoryLayer,
} from '@/content/history-timeline';

type Mode = 'STUDY' | 'LECTURE';
type ThreeLens = 'OVERVIEW' | 'BUDDHISM' | 'LAW' | 'HAN RIVER' | 'TRANSITION';
type ModernLens = keyof typeof modernLenses;

const MASTER_LAYERS: HistoryLayer[] = ['CONFLICT','POWER','CONTEST'];
const semanticClass: Partial<Record<HistoryLayer,string>> = {CONFLICT:'semanticConflict',POWER:'semanticPower',CONTEST:'semanticContest'};

export default function HistoryTimelineExperience(){
  const [interactive,setInteractive]=useState(false);
  const [eraId,setEraId]=useState<string>('three-kingdoms');
  const [mode,setMode]=useState<Mode>('STUDY');
  const [activeLayers,setActiveLayers]=useState<HistoryLayer[]>(MASTER_LAYERS);
  const [threeLens,setThreeLens]=useState<ThreeLens>('OVERVIEW');
  const [modernLens,setModernLens]=useState<ModernLens>('POLITICS');
  const [detail,setDetail]=useState<HistoryEventNode|null>(null);
  const rootRef=useRef<HTMLElement>(null);

  useEffect(()=>{
    const timer=window.setTimeout(()=>setInteractive(true),2200);
    const wake=()=>setInteractive(true);
    const node=rootRef.current;
    node?.addEventListener('pointerdown',wake,{once:true});
    node?.addEventListener('wheel',wake,{once:true,passive:true});
    window.addEventListener('keydown',wake,{once:true});
    return()=>{window.clearTimeout(timer);node?.removeEventListener('pointerdown',wake);node?.removeEventListener('wheel',wake);window.removeEventListener('keydown',wake);};
  },[]);

  const era=timelineEraById(eraId) ?? historyTimelineEras[0];
  const totalWeight=historyTimelineEras.reduce((sum,item)=>sum+item.masterWeight,0);

  function toggleLayer(layer:HistoryLayer){
    setActiveLayers(current=>current.includes(layer)?current.filter(item=>item!==layer):[...current,layer]);
  }

  function chooseEra(id:string){ setInteractive(true); setEraId(id); setDetail(null); }

  return <section ref={rootRef} className={`historyTimelineExperience ${interactive?'isInteractive':'isPassive'} mode${mode}`} aria-labelledby="history-map-title">
    <header className="historyTimelineIntro">
      <div className="historyTimelineIntroCopy">
        <span>FORMA OPUS / ACADEMIA / HISTORY</span>
        <h1 id="history-map-title">HISTORY</h1>
        <strong>SEE THE FLOW.<br/>TOUCH THE STRUCTURE.<br/>ENTER THE DETAIL.</strong>
        <p>역사를 외우기 전에, 같은 시간 위에 올려놓는다.</p>
      </div>
      <div className="historyTimelineMode" aria-label="History presentation mode">
        {(['STUDY','LECTURE'] as Mode[]).map(value=><button key={value} type="button" className={mode===value?'active':''} onClick={()=>setMode(value)}>{value}</button>)}
      </div>
      <div className="historyPassiveFlow" aria-hidden="true"><i/><i/><i/><i/><b>TIME</b><span>THE FLOW BECOMES THE STRUCTURE.</span></div>
    </header>

    <div className="historyMasterTimeline" aria-label="Korean history master timeline">
      <div className="historyMasterAxis"><span>EARLIER</span><i/><span>LATER</span></div>
      <div className="historyMasterBands">
        {historyTimelineEras.map((item,index)=><button key={item.id} type="button" onClick={()=>chooseEra(item.id)} className={`historyMasterBand ${eraId===item.id?'active':''}`} style={{flexGrow:item.masterWeight,flexBasis:`${(item.masterWeight/totalWeight)*100}%`}} aria-pressed={eraId===item.id}>
          <span>{String(index+1).padStart(2,'0')}</span><strong>{item.title}</strong><em>{item.koreanTitle}</em><small>{item.rangeLabel}</small>
        </button>)}
      </div>
    </div>

    <div className="historyEraContext">
      <div><span>ERA / LEVEL 01</span><h2>{era.title}<em>{era.koreanTitle}</em></h2><p>{era.summaryThemes?.join(' / ')}</p></div>
      <div className="historyEraMeta"><span>MOTION VERB</span><strong>{era.motionVerb}</strong><small>EVIDENCE / {era.evidenceLevel ?? 'CONTEXTUAL'}</small></div>
    </div>

    <div className="historyTimelineWorkspace">
      <aside className="historyLensRail" aria-label="History layers">
        <span>LENS / LAYER</span>
        {(era.availableLayers ?? MASTER_LAYERS).map(layer=><button key={layer} type="button" className={`${activeLayers.includes(layer)?'active':''} ${semanticClass[layer]??''}`} aria-pressed={activeLayers.includes(layer)} onClick={()=>toggleLayer(layer)}><i/><strong>{historyLayerLabels[layer].en}</strong><small>{historyLayerLabels[layer].ko}</small></button>)}
        <div className="historyLegend"><b className="semanticConflict">CONFLICT</b><b className="semanticPower">POWER</b><b className="semanticContest">CONTEST</b><small>COLOR + LABEL + PATTERN</small></div>
      </aside>
      <div className="historyEraStage">
        {eraId==='gojoseon'||eraId==='early-states'?<EvidenceEra eraId={eraId}/>:null}
        {eraId==='three-kingdoms'?<ThreeKingdomsPrototype lens={threeLens} setLens={setThreeLens} setDetail={setDetail}/>:null}
        {eraId==='north-south'?<NorthSouthPrototype setDetail={setDetail}/>:null}
        {eraId==='goryeo'?<GoryeoPrototype activeLayers={activeLayers} setDetail={setDetail}/>:null}
        {eraId==='joseon'?<JoseonPrototype/>:null}
        {(eraId==='modern'||eraId==='modern-transition'||eraId==='colonial')?<ModernPrototype eraId={eraId} lens={modernLens} setLens={setModernLens}/>:null}
      </div>
    </div>

    <footer className="historyTimelineFooter"><span>TIMELINE = SKELETON</span><span>ARCHIVE = CONTENT</span><a href="#archive-index">OPEN ARCHIVE INDEX ↓</a></footer>
    {detail&&<HistoryEventPanel event={detail} onClose={()=>setDetail(null)}/>} 
  </section>;
}

function EvidenceEra({eraId}:{eraId:string}){
  const gojoseon=eraId==='gojoseon';
  return <section className="historyDialect evidenceDialect" aria-label="Evidence-first historical era">
    <header><span>{gojoseon?'EVIDENCE-FIRST':'POLITY-FIRST'}</span><strong>{gojoseon?'DO NOT FILL THE UNKNOWN.':'EVIDENCE BEFORE DENSITY.'}</strong></header>
    <div className="evidenceMeter"><span>EVIDENCE DENSITY</span><b>{gojoseon?'●●○○○':'●●●○○'}</b><small>{gojoseon?'LIMITED':'LIMITED / MODERATE'}</small></div>
    <div className="evidenceLanes"><div><span>POWER</span><i className="semanticPower"/></div><div><span>CONFLICT</span><i className="semanticConflict short"/></div><div><span>CONTEST</span><em>LIMITED EVIDENCE</em></div></div>
    <p>사료의 공백을 사건으로 채우지 않습니다. 이 시대의 빈 공간 자체가 학습 정보입니다.</p>
  </section>;
}

function ThreeKingdomsPrototype({lens,setLens,setDetail}:{lens:ThreeLens;setLens:(v:ThreeLens)=>void;setDetail:(e:HistoryEventNode)=>void}){
  const polities=historyPolities.filter(item=>item.eraId==='three-kingdoms');
  const min=-100,max=700,pct=(year:number)=>Math.max(0,Math.min(100,((year-min)/(max-min))*100));
  const lensEvents=lens==='BUDDHISM'?threeKingdomLensEvents.filter(e=>e.layer==='RELIGION'):lens==='LAW'?threeKingdomLensEvents.filter(e=>e.layer==='SYSTEM'):lens==='HAN RIVER'?threeKingdomLensEvents.filter(e=>['hanseong-475','han-river-551','han-river-553'].includes(e.id)):lens==='TRANSITION'?threeKingdomLensEvents.filter(e=>['gaya-integration','baekje-end-660','goguryeo-end-668','silla-consolidation-676','balhae-emerge-698'].includes(e.id)):[];
  return <section className={`historyDialect threeKingdomsDialect lens${lens.replace(/\s/g,'')}`}>
    <header className="historyDialectHead"><div><span>ERA DIALECT / PARALLEL POLITIES</span><strong>ONE ERA → MULTIPLE POLITIES</strong></div><div className="historySequenceSteps"><b>01 ERA</b><i>→</i><b>02 SPLIT</b><i>→</i><b>03 COMPARE</b><i>→</i><b>04 TRANSITION</b></div></header>
    <div className="historyDialectControls">{(['OVERVIEW','BUDDHISM','LAW','HAN RIVER','TRANSITION'] as ThreeLens[]).map(value=><button key={value} type="button" className={lens===value?'active':''} onClick={()=>setLens(value)}>{value}</button>)}</div>
    <div className="parallelTimeline">
      <div className="parallelAxis"><span>100 BCE</span><i/><span>300</span><i/><span>500</span><i/><span>700</span></div>
      {polities.map(polity=><div key={polity.id} className={`polityLane polity-${polity.id}`}><div className="polityLabel"><strong>{polity.title}</strong><small>{polity.koreanTitle}</small><em>{polity.type.replace('_',' ')}</em></div><div className="polityTrack"><i className="polityLife" style={{left:`${pct(Math.max(polity.start??min,min))}%`,right:`${100-pct(Math.min(polity.end??max,max))}%`}}/>{lensEvents.filter(event=>event.polityId===polity.id || (!event.polityId&&lens==='HAN RIVER')).map(event=><button key={event.id} type="button" className={`historyEventDot ${semanticClass[event.layer]??''}`} style={{left:`${pct(event.start??min)}%`}} onClick={()=>setDetail(event)}><span>{event.dateLabel}</span><strong>{event.koreanTitle}</strong></button>)}{lens==='TRANSITION'&&polity.id==='silla'&&<span className="continuityFlag">CONTINUE → NORTH–SOUTH</span>}</div></div>)}
      {lens==='HAN RIVER'&&<div className="hanRiverStrip"><span>HAN RIVER RELATION / 한강 주도권</span><b>475 GOGURYEO PRESSURE</b><i>→</i><b>551 BAEKJE + SILLA ADVANCE</b><i>→</i><b>553 SILLA CONTROL</b></div>}
      {lens==='OVERVIEW'&&<div className="threeKingdomThemes"><span>STATE FORMATION</span><span>BUDDHISM</span><span>LAW</span><span>HAN RIVER</span><span>UNIFICATION</span></div>}
      {lens==='TRANSITION'&&<div className="balhaeEmergence"><span>GOGURYEO / END 668</span><i>historical context</i><strong>BALHAE / EMERGE 698</strong><small>NOT A DIRECT MORPH</small></div>}
    </div>
    <p className="historyDialectNote">같은 X 위치는 같은 시간을 의미합니다. 색은 국가 구분이 아니라 역사적 의미를 나타냅니다.</p>
  </section>;
}

function NorthSouthPrototype({setDetail}:{setDetail:(e:HistoryEventNode)=>void}){
  const balhae=threeKingdomLensEvents.find(event=>event.id==='balhae-emerge-698');
  return <section className="historyDialect northSouthDialect">
    <header className="historyDialectHead"><div><span>ERA DIALECT / DUAL POLITIES</span><strong>SILLA CONTINUES. BALHAE EMERGES.</strong></div><small>SAME TIME / DIFFERENT POLITIES</small></header>
    <div className="continuityBridge"><span>THREE KINGDOMS</span><i/><b>SILLA CONTINUES</b><i/><span>NORTH–SOUTH STATES</span></div>
    <div className="dualPolityGrid"><div className="dualLane balhae"><header><strong>BALHAE</strong><small>발해 / 698—926</small></header><div className="dualTrack"><button type="button" onClick={()=>balhae&&setDetail(balhae)}><span>698</span><strong>FOUNDATION</strong></button><i/><span>EXPANSION</span><i/><span>PROSPERITY</span><i/><span>DECLINE</span><b>926 END</b></div></div><div className="dualLane silla"><header><strong>SILLA</strong><small>신라 / CONTINUOUS POLITY</small></header><div className="dualTrack"><span>MIDDLE PERIOD</span><i/><span>LATE PERIOD</span><div className="lateSillaMarkers"><b>MORE CONTEST</b><b>POWER FRAGMENTATION</b></div><em>935 END</em></div></div></div>
    <div className="laterThreeBranches"><span>SILLA LATE</span><i/><b>LATER BAEKJE / 900</b><b>LATER GOGURYEO / 901</b><strong>GORYEO / 918 →</strong></div>
  </section>;
}

function GoryeoPrototype({activeLayers,setDetail}:{activeLayers:HistoryLayer[];setDetail:(e:HistoryEventNode)=>void}){
  const min=918,max=1392,pct=(year:number)=>((year-min)/(max-min))*100;
  const periods=historyPeriodsV2.filter(period=>activeLayers.includes(period.layer));
  return <section className="historyDialect goryeoDialect">
    <header className="historyDialectHead"><div><span>REFERENCE ERA / LAYERED PERIODS</span><strong>PERIOD FIRST. EVENT SECOND.</strong></div><small>918 ← SAME SCALE → 1392</small></header>
    <div className="goryeoAxis"><span>918</span><i/><span>1000</span><i/><span>1100</span><i/><span>1200</span><i/><span>1300</span><i/><span>1392</span></div>
    <div className="goryeoLayerStack">{(['CONFLICT','POWER','CONTEST'] as HistoryLayer[]).map(layer=><div key={layer} className={`goryeoLayer ${semanticClass[layer]??''} ${activeLayers.includes(layer)?'active':'muted'}`}><header><strong>{layer}</strong><small>{historyLayerLabels[layer].ko}</small></header><div className="goryeoLayerTrack">{periods.filter(period=>period.layer===layer&&period.start&&period.end).map(period=><button type="button" key={period.id} className="goryeoPeriodBand" style={{left:`${pct(period.start!)}%`,width:`${Math.max(3,pct(period.end!)-pct(period.start!))}%`}} title={period.whyGrouped}><span>{period.start}—{period.end}</span><strong>{period.title}</strong><small>{period.koreanTitle}</small></button>)}</div></div>)}</div>
    <div className="goryeoEventRail"><span>LEVEL 03 / EVENT</span>{goryeoEvents.map(event=><button key={event.id} type="button" className={semanticClass[event.layer]??''} onClick={()=>setDetail(event)}><small>{event.dateLabel}</small><strong>{event.koreanTitle}</strong></button>)}</div>
    <div className="historyRelationPreview"><span>RELATION PREVIEW</span><p>{historicalRelations.find(rel=>rel.sourceId==='goryeo-mongol')?.description}</p><b>CONFLICT → POWER CONTEXT → CONTEST</b></div>
  </section>;
}

function JoseonPrototype(){
  return <section className="historyDialect joseonDialect"><header className="historyDialectHead"><div><span>ERA DIALECT / HIERARCHICAL POWER</span><strong>MASTER = POLITICAL ORDER. ZOOM = FACTION.</strong></div><small>POWER / TWO SCALES</small></header><div className="joseonOrderRail">{joseonPowerOrders.map((item,index)=><div key={item.id}><span>{String(index+1).padStart(2,'0')}</span><strong>{item.title}</strong><em>{item.koreanTitle}</em><small>{item.range}</small></div>)}</div><div className="joseonBranchStage"><div className="branchRoot"><strong>SARIM</strong><small>사림</small></div><div className="branchColumns"><div><span>EASTERNERS / 동인</span><b>SOUTHERNERS / 남인</b><b>NORTHERNERS / 북인</b></div><div><span>WESTERNERS / 서인</span><b>NORON / 노론</b><b>SORON / 소론</b></div></div><small>LINE → BRANCH → FACTION / Timeline position remains contextual.</small></div><div className="joseonBranchData" hidden>{joseonFactionTree.length} faction nodes</div></section>;
}

function ModernPrototype({eraId,lens,setLens}:{eraId:string;lens:ModernLens;setLens:(value:ModernLens)=>void}){
  if(eraId!=='modern') return <section className="historyDialect modernDialect"><header className="historyDialectHead"><div><span>ERA DIALECT / CORE SPINE + LENS</span><strong>{eraId==='colonial'?'COLONIAL RULE + INDEPENDENCE MOVEMENTS':'TRANSITION / REFORM / DIPLOMACY'}</strong></div></header><div className="modernReserved"><span>STRUCTURE RESERVED</span><strong>Archive data remains available below.</strong><p>이 단계의 세부 Periodization은 교육자 검토 후 확장합니다.</p></div></section>;
  const lenses=Object.keys(modernLenses) as ModernLens[];
  return <section className="historyDialect modernDialect"><header className="historyDialectHead"><div><span>ERA DIALECT / CORE SPINE + LENSES</span><strong>DO NOT SHOW EVERYTHING AT ONCE.</strong></div><small>FILTER / OVERLAY</small></header><div className="modernSpine">{modernCoreSpine.map((item,index)=><div key={item.id}><span>{item.year}</span><i/><strong>{item.title}</strong><small>{item.ko}</small>{index<modernCoreSpine.length-1&&<b>→</b>}</div>)}</div><div className="modernLensPicker">{lenses.map(value=><button key={value} type="button" className={lens===value?'active':''} onClick={()=>setLens(value)}>{value}</button>)}</div><div className="modernLensLayer"><span>LENS / {lens}</span>{modernLenses[lens].map(([date,label])=><div key={`${date}-${label}`}><b>{date}</b><strong>{label}</strong></div>)}</div><p className="historyDialectNote">추가 관점은 색을 늘리지 않고 Label / Pattern / Opacity로 구분합니다.</p></section>;
}

function HistoryEventPanel({event,onClose}:{event:HistoryEventNode;onClose:()=>void}){
  return <aside className="historyEventPanel" aria-label={`${event.koreanTitle} detail`}><button type="button" className="historyEventClose" onClick={onClose}>CLOSE ×</button><span>LEVEL 03 / EVENT</span><h3>{event.dateLabel}</h3><strong>{event.title}</strong><h4>{event.koreanTitle}</h4>{event.summary&&<p>{event.summary}</p>}<dl><div><dt>LAYER</dt><dd>{event.layer} / {historyLayerLabels[event.layer].ko}</dd></div>{event.people?.length?<div><dt>PEOPLE</dt><dd>{event.people.join(' / ')}</dd></div>:null}{event.sourceNote?<div><dt>SOURCE NOTE</dt><dd>{event.sourceNote}</dd></div>:null}</dl>{event.authorNote&&<div className="historyEventAuthor"><span>AUTHOR&apos;S NOTE</span><p>{event.authorNote}</p></div>}{event.archiveLinks?.map(slug=><Link key={slug} href={`/academia/history/${slug}`}>OPEN ARCHIVE / {slug.toUpperCase()} ↗</Link>)}</aside>;
}
