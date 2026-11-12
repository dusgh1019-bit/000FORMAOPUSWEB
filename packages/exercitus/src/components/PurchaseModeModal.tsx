'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from '@forma-opus/ui/react/router';
import { garmentSizes } from '@content/grea/exercitus';

type Props = { open: boolean; onClose: () => void };
type Mode = 'single' | 'bulk' | null;

type CheckedMap = Record<string, boolean>;
type QtyMap = Record<string, number>;

const emptyChecked = () => Object.fromEntries(garmentSizes.map((size) => [size, false])) as CheckedMap;
const emptyQuantities = () => Object.fromEntries(garmentSizes.map((size) => [size, 0])) as QtyMap;

export default function PurchaseModeModal({ open, onClose }: Props) {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>(null);
  const [checked, setChecked] = useState<CheckedMap>(emptyChecked);
  const [quantities, setQuantities] = useState<QtyMap>(emptyQuantities);

  useEffect(() => {
    if (!open) return;
    setMode(null);
    setChecked(emptyChecked());
    setQuantities(emptyQuantities());
  }, [open]);

  const activeSizes = useMemo(() => garmentSizes.filter((size) => checked[size]), [checked]);
  const bulkValid = activeSizes.length > 0 && activeSizes.every((size) => quantities[size] > 0);
  const total = useMemo(
    () => activeSizes.reduce((sum, size) => sum + quantities[size], 0),
    [activeSizes, quantities],
  );

  if (!open) return null;

  function proceedSingle() {
    sessionStorage.setItem('exercitus-purchase-mode', 'single');
    sessionStorage.setItem('exercitus-size-quantities', JSON.stringify({ M: 1 }));
    router.push('/grea/exercitus/customize');
  }

  function toggleSize(size: string) {
    setChecked((current) => {
      const next = { ...current, [size]: !current[size] };
      if (!next[size]) setQuantities((qty) => ({ ...qty, [size]: 0 }));
      return next;
    });
  }

  function proceedBulk() {
    if (!bulkValid) return;
    const selected = Object.fromEntries(activeSizes.map((size) => [size, quantities[size]]));
    sessionStorage.setItem('exercitus-purchase-mode', 'bulk');
    sessionStorage.setItem('exercitus-size-quantities', JSON.stringify(selected));
    router.push('/grea/exercitus/customize');
  }

  return (
    <div className="exModalBackdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="exModal" role="dialog" aria-modal="true" aria-labelledby="purchase-title">
        <button className="exClose" type="button" onClick={onClose} aria-label="닫기">×</button>
        <div className="exEyebrow">ORDER MODE</div>
        <h2 id="purchase-title">어떻게 주문하시겠습니까?</h2>

        {!mode && (
          <div className="exModeGrid">
            <button className="exModeCard" type="button" onClick={() => setMode('single')}>
              <strong>한 장 구매</strong><span>한 장을 디자인합니다.</span>
            </button>
            <button className="exModeCard" type="button" onClick={() => setMode('bulk')}>
              <strong>여러 장 구매</strong><span>사이즈와 벌수를 먼저 지정합니다.</span>
            </button>
          </div>
        )}

        {mode === 'single' && (
          <div className="exModalStep">
            <p>기본 수량 1장으로 디자인 편집기에 진입합니다. 사이즈는 장바구니 전에도 변경할 수 있습니다.</p>
            <div className="exModalActions">
              <button type="button" className="exGhostButton" onClick={() => setMode(null)}>이전</button>
              <button type="button" className="exPrimaryButton" onClick={proceedSingle}>디자인 시작</button>
            </div>
          </div>
        )}

        {mode === 'bulk' && (
          <div className="exModalStep exBulkStep">
            <p className="exBulkInstruction">필요한 사이즈를 선택한 뒤 각 사이즈별 벌수를 입력하십시오.</p>
            <div className="exBulkSizeRow" role="group" aria-label="사이즈와 벌수">
              {garmentSizes.map((size) => (
                <div key={size} className={`exBulkSizeCard ${checked[size] ? 'isChecked' : ''}`}>
                  <label className="exBulkCheckbox">
                    <input type="checkbox" checked={checked[size]} onChange={() => toggleSize(size)} />
                    <span className="checkVisual" aria-hidden="true" />
                    <strong>{size}</strong>
                  </label>
                  <div className={`exQuantityReveal ${checked[size] ? 'isVisible' : ''}`} aria-hidden={!checked[size]}>
                    <label>
                      <span>벌수</span>
                      <input
                        type="number"
                        min="1"
                        max="999"
                        inputMode="numeric"
                        disabled={!checked[size]}
                        value={checked[size] && quantities[size] > 0 ? quantities[size] : ''}
                        placeholder="0"
                        onChange={(event) => setQuantities((current) => ({
                          ...current,
                          [size]: Math.max(0, Number(event.target.value) || 0),
                        }))}
                      />
                    </label>
                  </div>
                </div>
              ))}
            </div>
            <div className="exBulkSummary">
              <span>{activeSizes.length ? `${activeSizes.join(' · ')} 선택` : '사이즈를 선택하십시오'}</span>
              <strong>{total > 0 ? `총 ${total}장` : '—'}</strong>
            </div>
            <div className="exModalActions exBulkActions">
              <button type="button" className="exGhostButton" onClick={() => setMode(null)}>이전</button>
              <button type="button" className="exPrimaryButton exNextButton" disabled={!bulkValid} onClick={proceedBulk}>다음</button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
