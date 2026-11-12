'use client';

import { useMemo, useState, type CSSProperties } from 'react';
import type { ExercitusAsset } from '@content/grea/exercitus';

type CaptureSettings = { yaw: number; pitch: number; roll: number; perspective: number };
type Props = { asset: ExercitusAsset | null; onClose: () => void; onConvert: (settings: CaptureSettings) => void };

export default function EquipmentCaptureModal({ asset, onClose, onConvert }: Props) {
  const [yaw, setYaw] = useState(28);
  const [pitch, setPitch] = useState(-8);
  const [roll, setRoll] = useState(0);
  const [perspective, setPerspective] = useState(52);

  const previewStyle = useMemo(() => {
    const rad = yaw * Math.PI / 180;
    const sx = 0.58 + Math.abs(Math.cos(rad)) * 0.42;
    const skew = Math.sin(rad) * -12;
    const tilt = pitch * 0.16;
    const scale = 0.9 + perspective / 500;
    return {
      '--capture-sx': sx,
      '--capture-skew': `${skew}deg`,
      '--capture-tilt': `${tilt}deg`,
      '--capture-scale': scale,
    } as CSSProperties;
  }, [yaw, pitch, perspective]);

  if (!asset) return null;
  const isLauncher = asset.id.includes('k239');

  return (
    <div className="exModalBackdrop" role="presentation">
      <section className="exCaptureModal" role="dialog" aria-modal="true" aria-labelledby="capture-title">
        <div className="exCaptureHeader">
          <div><div className="exEyebrow">3D → 2D CAPTURE</div><h2 id="capture-title">{asset.title}</h2></div>
          <button className="exClose" onClick={onClose} aria-label="닫기">×</button>
        </div>
        <div className="captureGrid">
          <div className="captureViewport">
            <div className={`equipmentProxy ${isLauncher ? 'isLauncher' : 'isTank'}`} style={{ transform: `perspective(${280 + perspective * 5}px) rotateX(${pitch}deg) rotateY(${yaw}deg) rotateZ(${roll}deg)` }}>
              <span /><span /><span /><span className="proxyDetail" />
            </div>
            <div className="captureOutputCard">
              <div className="exEyebrow">LIVE 2D CAPTURE PREVIEW</div>
              <div className={`capturedEquipment2d ${isLauncher ? 'capturedLauncher' : 'capturedTank'}`} style={previewStyle}>
                <i className="equipBody" /><i className="equipTop" /><i className="equipLong" /><i className="equipDetail1" /><i className="equipDetail2" />
              </div>
              <small>현재 3D 각도와 원근값으로 생성될 투명 2D 레이어 예시</small>
            </div>
            <div className="captureNote">DEV PROXY · 실제 GLB 렌더러 연결 시 동일 시퀀스로 교체</div>
          </div>
          <div className="captureControls">
            <label>Yaw <output>{yaw}°</output><input type="range" min="-180" max="180" value={yaw} onChange={(e) => setYaw(Number(e.target.value))} /></label>
            <label>Pitch <output>{pitch}°</output><input type="range" min="-80" max="80" value={pitch} onChange={(e) => setPitch(Number(e.target.value))} /></label>
            <label>Roll <output>{roll}°</output><input type="range" min="-90" max="90" value={roll} onChange={(e) => setRoll(Number(e.target.value))} /></label>
            <label>Perspective <output>{perspective}</output><input type="range" min="0" max="100" value={perspective} onChange={(e) => setPerspective(Number(e.target.value))} /></label>
            <div className="captureSummary"><span>OUTPUT</span><strong>Transparent 2D Layer</strong><small>각도값은 레이어에 함께 저장되어 추후 재생성할 수 있습니다.</small></div>
            <button className="exPrimaryButton" type="button" onClick={() => onConvert({ yaw, pitch, roll, perspective })}>현재 구도로 2D 변환</button>
          </div>
        </div>
      </section>
    </div>
  );
}
