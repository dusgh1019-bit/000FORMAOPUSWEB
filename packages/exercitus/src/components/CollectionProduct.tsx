'use client';
import { useMemo, useState } from 'react';
import BreadcrumbTrail from '@forma-opus/ui/react/BreadcrumbTrail';
import type { ExercitusCollectionIssue } from '@content/grea/exercitus';

export default function CollectionProduct({ item }: { item: ExercitusCollectionIssue }) {
  const [color,setColor]=useState(item.colors[0]);
  const [size,setSize]=useState(item.sizes[0]);
  const [qty,setQty]=useState(1);
  const [handoff,setHandoff]=useState(false);
  const total=useMemo(()=>item.price*qty,[item.price,qty]);
  return <main className="exCommercePage productPage">
    <header className="exCommerceHeader"><BreadcrumbTrail items={[{label:'FORMA OPUS',href:'/'},{label:'GREA',href:'/grea'},{label:'EXERCITUS',href:'/grea/exercitus'},{label:'COLLECTION',href:'/grea/exercitus/collection'},{label:item.issue,href:`/grea/exercitus/collection/${item.slug}`}]} /><span>{item.status}</span></header>
    <section className="productHero">
      <div className="productStage"><div className="collectionTee productTee"><span>{item.mark}</span><strong>{item.equipment}</strong><small>{item.typeLine}</small></div><div className="productViewLabel">FRONT / BACK RENDER · DEV PROXY</div></div>
      <div className="productPurchase"><div className="exEyebrow">{item.issue} / {item.series}</div><h1>{item.title}</h1><p>{item.descriptor}</p>
        <div className="optionBlock"><span>COLOR</span><div>{item.colors.map(v=><button key={v} className={color===v?'active':''} onClick={()=>setColor(v)}>{v}</button>)}</div></div>
        <div className="optionBlock"><span>SIZE</span><div>{item.sizes.map(v=><button key={v} className={size===v?'active':''} onClick={()=>setSize(v)}>{v}</button>)}</div></div>
        <label className="quantityControl"><span>QTY</span><input type="number" min="1" max="20" value={qty} onChange={e=>setQty(Math.max(1,Number(e.target.value)||1))}/></label>
        <div className="purchaseTotal"><span>ORDER TOTAL</span><strong>₩{total.toLocaleString('ko-KR')}</strong></div>
        <button className="naverHandoffButton" onClick={()=>setHandoff(true)}>NAVER에서 주문 확정</button>
        <small className="commerceSafety">회원가입 없음 · 카드정보 미저장 · 실제 네이버 상품 URL은 판매자 계정 준비 후 연결</small>
      </div>
    </section>
    {handoff && <div className="commerceModalBackdrop" role="presentation"><section className="commerceModal" role="dialog" aria-modal="true"><div className="exEyebrow">NAVER HANDOFF / DEV</div><h2>판매상품 연결 전입니다.</h2><p>실서비스에서는 <b>{item.issue} / {color} / {size} / {qty}장</b>에 대응하는 네이버 스마트스토어 상품 또는 옵션으로 이동합니다.</p><div className="handoffMap"><span>EXERCITUS</span><strong>{item.slug}</strong><span>NAVER PRODUCT</span><strong>NOT CONNECTED</strong></div><button className="exPrimaryButton" onClick={()=>setHandoff(false)}>확인</button></section></div>}
  </main>
}
