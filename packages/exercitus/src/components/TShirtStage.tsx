'use client';

import { useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent } from 'react';
import type { DesignLayer, Surface } from '@content/grea/exercitus';

type TransformPatch = Partial<Pick<DesignLayer, 'x' | 'y' | 'scale' | 'stretchX' | 'stretchY'>>;

type Props = {
  interactive?: boolean;
  surface?: Surface;
  layers?: DesignLayer[];
  selectedId?: string | null;
  zoom?: number;
  onSelectLayer?: (id: string) => void;
  onTransformLayer?: (id: string, patch: TransformPatch) => void;
  onDropAsset?: (assetId: string, x: number, y: number) => void;
  onActivate?: () => void;
};

type DragState = { id: string; startX: number; startY: number; layerX: number; layerY: number };
type ResizeHandle = 'nw' | 'n' | 'ne' | 'e' | 'se' | 's' | 'sw' | 'w';
type ResizeState = { id: string; handle: ResizeHandle; startX: number; startY: number; scale: number; stretchX: number; stretchY: number };

const sampleDesigns = [
  { mark: 'Ⅰ', equipment: 'K239', type: 'ROKA / MISSILE ARTILLERY', style: 'a' },
  { mark: 'C', equipment: 'K2', type: 'SERVICE / 2026', style: 'b' },
  { mark: '◆', equipment: 'FIELD', type: 'REPUBLIC OF KOREA ARMY', style: 'c' },
  { mark: '03', equipment: 'UNIT', type: 'EXERCITUS / GREA', style: 'd' },
];
const handles: ResizeHandle[] = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'];
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function equipmentCaptureStyle(layer: DesignLayer) {
  const capture = layer.capture3d ?? { yaw: 28, pitch: -8, roll: 0, perspective: 52 };
  const rad = capture.yaw * Math.PI / 180;
  const sx = 0.58 + Math.abs(Math.cos(rad)) * 0.42;
  return {
    '--capture-sx': sx,
    '--capture-skew': `${Math.sin(rad) * -12}deg`,
    '--capture-tilt': `${capture.pitch * 0.16}deg`,
    '--capture-scale': 0.9 + capture.perspective / 500,
  } as CSSProperties;
}

export default function TShirtStage({
  interactive = false,
  surface = 'front',
  layers = [],
  selectedId,
  zoom = 1,
  onSelectLayer,
  onTransformLayer,
  onDropAsset,
  onActivate,
}: Props) {
  const [paused, setPaused] = useState(interactive);
  const [drag, setDrag] = useState<DragState | null>(null);
  const [resize, setResize] = useState<ResizeState | null>(null);
  const [sampleIndex, setSampleIndex] = useState(0);
  const printZoneRef = useRef<HTMLDivElement | null>(null);
  const visibleLayers = useMemo(() => layers.filter((layer) => layer.surface === surface), [layers, surface]);

  useEffect(() => {
    if (interactive) {
      setPaused(true);
      return;
    }
    setPaused(false);
    const timer = window.setInterval(() => setSampleIndex((index) => (index + 1) % sampleDesigns.length), 6000);
    return () => window.clearInterval(timer);
  }, [interactive]);

  function moveLayer(event: ReactPointerEvent<HTMLButtonElement>, layer: DesignLayer) {
    if (!drag || drag.id !== layer.id || !onTransformLayer || !printZoneRef.current) return;
    const rect = printZoneRef.current.getBoundingClientRect();
    const nextX = clamp(drag.layerX + ((event.clientX - drag.startX) / rect.width) * 100, 1, 99);
    const nextY = clamp(drag.layerY + ((event.clientY - drag.startY) / rect.height) * 100, 1, 99);
    onTransformLayer(layer.id, { x: nextX, y: nextY });
  }

  function resizeLayer(event: ReactPointerEvent<HTMLSpanElement>, layer: DesignLayer) {
    if (!resize || resize.id !== layer.id || !onTransformLayer || !printZoneRef.current) return;
    const rect = printZoneRef.current.getBoundingClientRect();
    const dx = (event.clientX - resize.startX) / rect.width;
    const dy = (event.clientY - resize.startY) / rect.height;
    const patch: TransformPatch = {};

    if (['nw', 'ne', 'se', 'sw'].includes(resize.handle)) {
      const sx = resize.handle.includes('e') ? 1 : -1;
      const sy = resize.handle.includes('s') ? 1 : -1;
      const delta = (dx * sx + dy * sy) * 2.15;
      patch.scale = clamp(resize.scale * (1 + delta), 0.1, 5);
    } else if (resize.handle === 'e' || resize.handle === 'w') {
      const direction = resize.handle === 'e' ? 1 : -1;
      patch.stretchX = clamp(resize.stretchX * (1 + dx * direction * 4), 0.25, 4);
    } else {
      const direction = resize.handle === 's' ? 1 : -1;
      patch.stretchY = clamp(resize.stretchY * (1 + dy * direction * 4), 0.25, 4);
    }
    onTransformLayer(layer.id, patch);
  }

  return (
    <div
      className={`shirtStage ${paused ? 'isPaused' : ''}`}
      onClick={() => !interactive && onActivate?.()}
      role={!interactive ? 'button' : undefined}
      tabIndex={!interactive ? 0 : undefined}
      onKeyDown={(event) => {
        if (!interactive && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          onActivate?.();
        }
      }}
      aria-label={!interactive ? 'EXERCITUS 티셔츠 선택 메뉴 열기' : '티셔츠 디자인 스테이지'}
    >
      <div className="shirtShadow" />
      <div className={`shirtModel shirt-${surface}`} style={{ '--stage-zoom': zoom } as CSSProperties}>
        <div className="shirtBody" />
        <div className="shirtSleeve left" />
        <div className="shirtSleeve right" />
        <div className="shirtNeck" />
        <div
          ref={printZoneRef}
          className="printZone"
          aria-label={`${surface === 'front' ? '앞면' : '뒷면'} 인쇄 영역`}
          onDragOver={(event) => {
            if (!interactive) return;
            event.preventDefault();
            event.dataTransfer.dropEffect = 'copy';
          }}
          onDrop={(event) => {
            if (!interactive || !onDropAsset) return;
            event.preventDefault();
            event.stopPropagation();
            const assetId = event.dataTransfer.getData('text/exercitus-asset');
            if (!assetId || !printZoneRef.current) return;
            const rect = printZoneRef.current.getBoundingClientRect();
            const x = clamp(((event.clientX - rect.left) / rect.width) * 100, 1, 99);
            const y = clamp(((event.clientY - rect.top) / rect.height) * 100, 1, 99);
            onDropAsset(assetId, x, y);
          }}
        >
          {!interactive && (
            <div className={`entrySampleDesign sample-${sampleDesigns[sampleIndex].style}`} key={sampleIndex} aria-hidden="true">
              <span className="sampleMark">{sampleDesigns[sampleIndex].mark}</span>
              <span className="sampleEquipment">{sampleDesigns[sampleIndex].equipment}</span>
              <span className="sampleType">{sampleDesigns[sampleIndex].type}</span>
            </div>
          )}

          {visibleLayers.map((layer, index) => {
            const isSelected = selectedId === layer.id;
            const simplification = clamp(layer.simplification, 0, 100);
            const coverage = 100 - simplification * 0.72;
            const stretchX = layer.stretchX ?? 1;
            const stretchY = layer.stretchY ?? 1;
            const handleScale = clamp(1 / Math.max(0.25, layer.scale), 0.55, 3.5);
            const simpBucket = Math.min(4, Math.floor(simplification / 25));
            const layerStyle = {
              left: `${layer.x}%`,
              top: `${layer.y}%`,
              transform: `translate(-50%, -50%) rotate(${layer.rotation}deg) scale(${layer.scale}) scaleX(${stretchX}) scaleY(${stretchY})`,
              '--coverage': `${coverage}%`,
              '--handle-scale': handleScale,
              zIndex: index + 1,
            } as CSSProperties;
            const textStyle = layer.kind === 'type' ? {
              fontFamily: layer.fontFamily ?? 'Barlow Condensed, Arial Narrow, sans-serif',
              fontSize: `${layer.fontSize ?? 24}px`,
              letterSpacing: `${layer.letterSpacing ?? 0}px`,
              wordSpacing: `${layer.wordSpacing ?? 0}px`,
            } as CSSProperties : undefined;

            return (
              <button
                type="button"
                key={layer.id}
                className={`designLayer layer-${layer.kind} simp-${simpBucket} ${isSelected ? 'isSelected' : ''} ${layer.colorMode === 'mono' ? 'isMono' : ''}`}
                style={layerStyle}
                onPointerDown={(event) => {
                  if (!interactive || resize) return;
                  event.currentTarget.setPointerCapture(event.pointerId);
                  setDrag({ id: layer.id, startX: event.clientX, startY: event.clientY, layerX: layer.x, layerY: layer.y });
                  onSelectLayer?.(layer.id);
                }}
                onPointerMove={(event) => moveLayer(event, layer)}
                onPointerUp={() => setDrag(null)}
                onPointerCancel={() => setDrag(null)}
                onClick={(event) => {
                  event.stopPropagation();
                  onSelectLayer?.(layer.id);
                }}
              >
                {layer.kind === 'equipment' ? (
                  <span className={`capturedEquipment2d ${layer.assetId.includes('k239') ? 'capturedLauncher' : 'capturedTank'}`} style={equipmentCaptureStyle(layer)}>
                    <i className="equipBody" /><i className="equipTop" /><i className="equipLong" /><i className="equipDetail1" /><i className="equipDetail2" />
                  </span>
                ) : layer.kind === 'image' ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="layerGraphicImage" src={layer.imageSrc} alt={layer.title} />
                ) : (
                  <span className="layerGraphic" style={textStyle}>
                    {layer.kind === 'unit' ? (layer.assetId.includes('company') ? 'C' : 'Ⅰ') : (layer.textContent || layer.title)}
                  </span>
                )}
                {layer.kind !== 'type' && <span className="layerLabel">{layer.title}</span>}

                {isSelected && handles.map((handle) => (
                  <span
                    key={handle}
                    className={`resizeHandle handle-${handle}`}
                    aria-hidden="true"
                    onPointerDown={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                      event.currentTarget.setPointerCapture(event.pointerId);
                      setDrag(null);
                      setResize({ id: layer.id, handle, startX: event.clientX, startY: event.clientY, scale: layer.scale, stretchX, stretchY });
                    }}
                    onPointerMove={(event) => resizeLayer(event, layer)}
                    onPointerUp={(event) => { event.stopPropagation(); setResize(null); }}
                    onPointerCancel={() => setResize(null)}
                  />
                ))}
              </button>
            );
          })}
        </div>
      </div>
      {!interactive && <div className="shirtStageHint">HOVER / TOUCH TO EXPLORE</div>}
    </div>
  );
}
