'use client';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from '@forma-opus/ui/react/router';
import BreadcrumbTrail from '@forma-opus/ui/react/BreadcrumbTrail';
import { coverageGrade, customServiceOptions, type CustomService } from '@content/grea/exercitus';

type Cart = { revisionId?: string; quantities?: number; estimate?: number; coverage?: number; layers?: unknown[]; createdAt?: string };
function newDesignId(){return `EXC-${Math.random().toString(36).slice(2,6).toUpperCase()}-${Math.random().toString(36).slice(2,5).toUpperCase()}`;}
export default function CustomFinalProof(){
 const router=useRouter(); const [cart,setCart]=useState<Cart>({}); const [designId,setDesignId]=useState(''); const [service,setService]=useState<CustomService>('STANDARD'); const [approved,setApproved]=useState(false);
 useEffect(()=>{try{setCart(JSON.parse(localStorage.getItem('exercitus-cart-line')||'{}'));}catch{} setDesignId(sessionStorage.getItem('exercitus-design-id')||newDesignId());},[]);
 useEffect(()=>{if(designId)sessionStorage.setItem('exercitus-design-id',designId);},[designId]);
 const grade=coverageGrade(cart.coverage??0); const selectedService=customServiceOptions.find(v=>v.id===service)!; const total=(cart.estimate??24500)+selectedService.surcharge;
 function simulateHandoff(){if(!approved)return;const order={designId,grade,service,expectedTotal:total,status:'PAYMENT HANDOFF',createdAt:new Date().toISOString()};sessionStorage.setItem('exercitus-mock-order',JSON.stringify(order));router.push('/grea/exercitus/order');}
 return <main className="exCommercePage customProofPage"><header className="exCommerceHeader"><BreadcrumbTrail items={[{label:'FORMA OPUS',href:'/'},{label:'GREA',href:'/grea'},{label:'EXERCITUS',href:'/grea/exercitus'},{label:'CUSTOM',href:'/grea/exercitus/customize'},{label:'FINAL PROOF',href:'/grea/exercitus/custom/confirm'}]} /><span>NO ACCOUNT / TEMP PRIVATE DRAFT</span></header>
 <section className="proofIntro"><div className="exEyebrow">CUSTOM / FINAL PROOF</div><h1>확정 전에 한 번 더.</h1><p>디자인을 잠그고 네이버 CUSTOM 상품과 매칭할 주문정보를 생성합니다. 현재는 실제 결제가 아닌 개발용 이관 시뮬레이션입니다.</p></section>
 <section className="proofGrid"><div className="proofVisual"><div className="proofSide"><span>FRONT</span><div className="proofTee">DESIGN<br/>PROOF</div></div><div className="proofSide"><span>BACK</span><div className="proofTee back">LOCKED<br/>PREVIEW</div></div><small>실서비스에서는 저장된 front/back proof image와 hash를 표시합니다.</small></div>
 <div className="proofSummary"><div className="designIdCard"><span>DESIGN ID</span><strong>{designId||'GENERATING…'}</strong><small>결제 전 임시 Private Draft · 미결제 Draft는 보존기간 후 자동삭제</small></div>
 <dl className="proofFacts"><div><dt>수량</dt><dd>{cart.quantities??1}장</dd></div><div><dt>Coverage</dt><dd>{cart.coverage??0}/100 · {grade}</dd></div><div><dt>기본 견적</dt><dd>₩{(cart.estimate??24500).toLocaleString('ko-KR')}</dd></div></dl>
 <div className="serviceChoices"><span>SERVICE</span>{customServiceOptions.map(v=><button key={v.id} className={service===v.id?'active':''} onClick={()=>setService(v.id)}><strong>{v.label}</strong><small>{v.description}</small><em>{v.surcharge?`+ ₩${v.surcharge.toLocaleString('ko-KR')}`:'INCLUDED'}</em></button>)}</div>
 <label className="proofAgreement"><input type="checkbox" checked={approved} onChange={e=>setApproved(e.target.checked)}/><span>현재 FRONT/BACK 시안을 기준으로 주문제작되는 것과 Design ID가 네이버 주문정보 매칭에 사용되는 것을 확인했습니다.</span></label>
 <div className="proofTotal"><span>네이버 주문 예상금액</span><strong>₩{total.toLocaleString('ko-KR')}</strong></div><button className="naverHandoffButton" disabled={!approved} onClick={simulateHandoff}>NAVER SMARTSTORE로 주문 확정</button><small className="commerceSafety">DEV SIMULATION · 실제 Merchant/Product/API 인증정보는 아직 연결되지 않았습니다.</small></div></section></main>
}
