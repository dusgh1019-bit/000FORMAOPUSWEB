'use client';

import { useState } from 'react';
import Link from 'next/link';
import BreadcrumbTrail from '@/components/BreadcrumbTrail';
import TShirtStage from './TShirtStage';
import PurchaseModeModal from './PurchaseModeModal';

export default function ExercitusEntry() {
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const [choicePinned, setChoicePinned] = useState(false);

  return (
    <main className="exEntryPage">
      <header className="exProjectUtility">
        <BreadcrumbTrail items={[
          { label: 'FORMA OPUS', href: '/' },
          { label: 'GREA', href: '/grea' },
          { label: 'EXERCITUS', href: '/grea/exercitus' },
        ]} />
        <span>COLLECTION / CUSTOM</span>
      </header>

      <section className="exEntryIntro">
        <div className="exEyebrow">MILITARY GRAPHIC SYSTEM / APPAREL</div>
        <h1>EXERCITUS</h1>
        <p>완성된 ISSUE를 선택하거나 직접 디자인합니다. 상품 선택은 회전하는 티셔츠 위에서 시작되며, 결제정보는 FORMA OPUS에 저장하지 않는 구조를 전제로 합니다.</p>
      </section>

      <section
        className={`exProductWindow exChoiceWindow ${choicePinned ? 'isChoicePinned' : ''}`}
        onClick={(event) => {
          if ((event.target as HTMLElement).closest('[data-entry-choice]')) return;
          setChoicePinned(true);
        }}
      >
        <div className="exChoiceStage">
          <TShirtStage onActivate={() => setChoicePinned(true)} />
        </div>

        <div className="exEntryChoiceOverlay" aria-label="EXERCITUS 진입 방식 선택">
          <div className="exEntryChoiceScrim" aria-hidden="true" />
          <div className="exEntryChoiceActions">
            <Link data-entry-choice className="exEntryChoice collection" href="/grea/exercitus/collection">
              <span>CURATED / READY TO ORDER</span>
              <strong>COLLECTION</strong>
              <small>GREA—EXERCITUS가 발행한 완성 상품 탐색</small>
            </Link>
            <button data-entry-choice type="button" className="exEntryChoice custom" onClick={() => setPurchaseOpen(true)}>
              <span>BUILD / PRINT / ORDER</span>
              <strong>CUSTOM</strong>
              <small>직접 디자인 → Design ID → 주문 제작</small>
            </button>
          </div>
          <div className="exEntryChoiceHint">HOVER / CLICK · TOUCH TO SELECT</div>
        </div>

        <div className="exProductMeta">
          <span>CURATED SAMPLE ROTATION</span>
          <strong>WHITE / DTG</strong>
        </div>
      </section>

      <p className="exEntryFootnote">PC에서는 티셔츠 창에 마우스를 올리고, 모바일에서는 한 번 터치해 COLLECTION 또는 CUSTOM을 선택합니다.</p>
      <PurchaseModeModal open={purchaseOpen} onClose={() => setPurchaseOpen(false)} />
    </main>
  );
}
