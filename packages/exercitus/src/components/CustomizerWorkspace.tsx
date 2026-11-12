'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from '@forma-opus/ui/react/router';
import BreadcrumbTrail from '@forma-opus/ui/react/BreadcrumbTrail';
import TShirtStage from './TShirtStage';
import EquipmentCaptureModal from './EquipmentCaptureModal';
import {
  exercitusAssets,
  exercitusSamplePresets,
  typographyFontOptions,
  type ColorMode,
  type DesignLayer,
  type ExercitusAsset,
  type ExercitusAssetKind,
  type Surface,
} from '@content/grea/exercitus';

const DRAFT_KEY = 'exercitus-design-draft-v3';
type InsertPosition = { x: number; y: number };
type LayerOrderAction = 'back' | 'backward' | 'forward' | 'front';
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

function normalizeRotation(value: number) {
  return ((Number(value || 0) % 360) + 360) % 360;
}

function makeLayer(asset: ExercitusAsset, surface: Surface, position?: InsertPosition): DesignLayer {
  return {
    id: `${asset.id}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    assetId: asset.id,
    title: asset.title,
    kind: asset.kind,
    surface,
    x: position?.x ?? 50,
    y: position?.y ?? (asset.kind === 'unit' && surface === 'back' ? 44 : 50),
    scale: asset.kind === 'unit' ? 1.2 : 1,
    stretchX: 1,
    stretchY: 1,
    rotation: 0,
    simplification: 28,
    colorMode: 'color',
    textContent: asset.typographyMode === 'customer' ? 'YOUR TEXT' : asset.previewCode,
    fontFamily: 'Barlow Condensed, Arial Narrow, sans-serif',
    fontSize: asset.typographyMode === 'customer' ? 24 : 22,
    letterSpacing: 0,
    wordSpacing: 0,
  };
}

export default function CustomizerWorkspace() {
  const router = useRouter();
  const [surface, setSurface] = useState<Surface>('front');
  const [category, setCategory] = useState<'all' | ExercitusAssetKind>('all');
  const [query, setQuery] = useState('');
  const [layers, setLayers] = useState<DesignLayer[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [captureAsset, setCaptureAsset] = useState<ExercitusAsset | null>(null);
  const [capturePosition, setCapturePosition] = useState<InsertPosition | null>(null);
  const [saveState, setSaveState] = useState('저장됨');
  const [toast, setToast] = useState('');
  const [quantityTotal, setQuantityTotal] = useState(1);
  const [zoom, setZoom] = useState(1);
  const [libraryMode, setLibraryMode] = useState<'assets' | 'samples'>('assets');
  const [pendingInsert, setPendingInsert] = useState(false);
  const hydrated = useRef(false);

  useEffect(() => {
    const saved = localStorage.getItem(DRAFT_KEY) || localStorage.getItem('exercitus-design-draft-v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setLayers((parsed.layers ?? []).map((layer: DesignLayer) => ({
          ...layer,
          stretchX: layer.stretchX ?? 1,
          stretchY: layer.stretchY ?? 1,
          rotation: normalizeRotation(layer.rotation),
          fontFamily: layer.fontFamily ?? 'Barlow Condensed, Arial Narrow, sans-serif',
          fontSize: layer.fontSize ?? 24,
          letterSpacing: layer.letterSpacing ?? 0,
          wordSpacing: layer.wordSpacing ?? 0,
        })));
      } catch { /* ignore invalid local draft */ }
    }
    try {
      const parsed = JSON.parse(sessionStorage.getItem('exercitus-size-quantities') || '{"M":1}');
      setQuantityTotal(Math.max(1, Object.values(parsed as Record<string, number>).reduce((a, b) => a + Number(b || 0), 0)));
    } catch { setQuantityTotal(1); }
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    setSaveState('저장 중…');
    const timer = window.setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ version: 3, updatedAt: new Date().toISOString(), layers }));
      setSaveState('저장됨');
    }, 900);
    return () => window.clearTimeout(timer);
  }, [layers]);

  const selected = layers.find((layer) => layer.id === selectedId) ?? null;
  const selectedAsset = selected ? exercitusAssets.find((asset) => asset.id === selected.assetId) ?? null : null;
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return exercitusAssets.filter((asset) => asset.approved
      && (category === 'all' || asset.kind === category)
      && (!normalized || [asset.title, asset.subtitle, ...asset.tags].join(' ').toLowerCase().includes(normalized)));
  }, [category, query]);

  const quantities = quantityTotal;
  const coverage = Math.min(100, Math.round(layers.reduce((sum, layer) => {
    const stretch = ((layer.stretchX ?? 1) + (layer.stretchY ?? 1)) / 2;
    return sum + Math.max(4, 38 - layer.simplification * .32) * layer.scale * stretch;
  }, 0)));
  const estimate = Math.round((24500 + layers.length * 1800 + coverage * 28) * quantities * (quantities >= 10 ? .88 : quantities >= 5 ? .94 : 1));
  const frontCount = layers.filter((layer) => layer.surface === 'front').length;
  const backCount = layers.filter((layer) => layer.surface === 'back').length;

  function addAsset(asset: ExercitusAsset, position?: InsertPosition) {
    if (asset.sourceType === '3d') {
      setCaptureAsset(asset);
      setCapturePosition(position ?? null);
      return;
    }
    const layer = makeLayer(asset, surface, position);
    setLayers((current) => [...current, layer]);
    setSelectedId(layer.id);
    setPendingInsert(true);
  }

  function addAssetById(assetId: string, position?: InsertPosition) {
    const asset = exercitusAssets.find((item) => item.id === assetId);
    if (asset) addAsset(asset, position);
  }

  function updateSelected(patch: Partial<DesignLayer>) {
    if (!selectedId) return;
    setLayers((current) => current.map((layer) => layer.id === selectedId ? { ...layer, ...patch } : layer));
    setPendingInsert(true);
  }

  function duplicateSelected() {
    if (!selected) return;
    const copy: DesignLayer = {
      ...selected,
      id: `${selected.assetId}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      x: Math.min(98, selected.x + 7),
      y: Math.min(98, selected.y + 7),
    };
    setLayers((current) => [...current, copy]);
    setSelectedId(copy.id);
    setPendingInsert(true);
  }

  function reorderSelected(action: LayerOrderAction) {
    if (!selected) return;
    setLayers((current) => {
      const sameSurface = current.filter((layer) => layer.surface === selected.surface);
      const position = sameSurface.findIndex((layer) => layer.id === selected.id);
      if (position < 0) return current;
      let target = position;
      if (action === 'back') target = 0;
      if (action === 'backward') target = Math.max(0, position - 1);
      if (action === 'forward') target = Math.min(sameSurface.length - 1, position + 1);
      if (action === 'front') target = sameSurface.length - 1;
      if (target === position) return current;
      const reordered = [...sameSurface];
      const [item] = reordered.splice(position, 1);
      reordered.splice(target, 0, item);
      let cursor = 0;
      return current.map((layer) => layer.surface === selected.surface ? reordered[cursor++] : layer);
    });
  }

  function confirmPending(action: () => void) {
    if (selectedId && pendingInsert) {
      const okay = window.confirm('현재 편집 중인 요소가 아직 삽입 완료되지 않았습니다.\n지금 상태로 삽입 완료 후 이동하시겠습니까?');
      if (!okay) return;
      setPendingInsert(false);
      setSelectedId(null);
    }
    action();
  }

  function selectSurface(next: Surface) {
    confirmPending(() => { setSurface(next); setLibraryMode('assets'); });
  }

  function insertSamplePreset(index: number) {
    const preset = exercitusSamplePresets[index];
    const created = preset.map((layer, order) => ({ ...layer, id: `preset-${index}-${Date.now()}-${order}` }));
    setLayers((current) => [...current, ...created]);
    setSelectedId(null);
    setPendingInsert(false);
    setLibraryMode('assets');
    setToast('작업자 샘플디자인을 삽입했습니다.');
    window.setTimeout(() => setToast(''), 2200);
  }

  function uploadImages(files: FileList | null) {
    if (!files?.length) return;
    [...files].filter((file) => file.type.startsWith('image/')).forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = () => {
        const stamp = Date.now() + index;
        const layer: DesignLayer = { id:`upload-${stamp}`,assetId:`upload-${stamp}`,title:file.name,kind:'image',surface,x:50+index*3,y:50+index*3,scale:1,stretchX:1,stretchY:1,rotation:0,simplification:10,colorMode:'color',imageSrc:String(reader.result||'') };
        setLayers((current) => [...current, layer]);
        setSelectedId(layer.id);
        setPendingInsert(true);
      };
      reader.readAsDataURL(file);
    });
  }

  function manualSave() {
    const revision = { id: `rev-${Date.now()}`, savedAt: new Date().toISOString(), layers };
    localStorage.setItem(`exercitus-revision-${revision.id}`, JSON.stringify(revision));
    setToast('디자인 스냅샷을 저장했습니다.');
    window.setTimeout(() => setToast(''), 2400);
  }

  function addToCart() {
    if (!layers.length) {
      setToast('인쇄할 디자인 요소를 하나 이상 추가해주십시오.');
      return;
    }
    const revisionId = `cart-rev-${Date.now()}`;
    const cart = { revisionId, layers, quantities, estimate, coverage, createdAt: new Date().toISOString() };
    localStorage.setItem('exercitus-cart-line', JSON.stringify(cart));
    setToast('Preflight가 완료되었습니다. Final Proof로 이동합니다.');
    window.setTimeout(() => router.push('/grea/exercitus/custom/confirm'), 450);
  }

  return (
    <main className="exCustomizer">
      <header className="exEditorHeader">
        <BreadcrumbTrail items={[
          { label: 'FORMA OPUS', href: '/' },
          { label: 'GREA', href: '/grea' },
          { label: 'EXERCITUS', href: '/grea/exercitus' },
        ]} />
        <div className="saveState">{saveState}</div>
      </header>

      <section className="exWorkspace">
        <div className="exStagePanel">
          <div className="surfaceSwitch" aria-label="티셔츠 면 선택">
            <button className={surface === 'front' ? 'active' : ''} onClick={() => selectSurface('front')}>앞면 <span>{frontCount}</span></button>
            <button className={surface === 'back' ? 'active' : ''} onClick={() => selectSurface('back')}>뒷면 <span>{backCount}</span></button>
          </div>
          <div className="stageZoomControls" aria-label="편집창 확대 축소">
            <button onClick={() => setZoom((value) => clamp(value - .25, .5, 4))} aria-label="축소">−</button>
            <button className="zoomReadout" onClick={() => setZoom(1)} title="100%로 복원">{Math.round(zoom * 100)}%</button>
            <button onClick={() => setZoom((value) => clamp(value + .25, .5, 4))} aria-label="확대">＋</button>
            <button className="zoomFit" onClick={() => setZoom(1)}>FIT</button>
          </div>
          <TShirtStage
            interactive
            surface={surface}
            layers={layers}
            selectedId={selectedId}
            zoom={zoom}
            onSelectLayer={setSelectedId}
            onTransformLayer={(id, patch) => { setLayers((current) => current.map((layer) => layer.id === id ? { ...layer, ...patch } : layer)); setPendingInsert(true); }}
            onDropAsset={(assetId, x, y) => addAssetById(assetId, { x, y })}
          />
          <div className="stageLegend"><span>PRINT SURFACE · {surface.toUpperCase()}</span><span>드래그 이동 · 8개 노드 변형 · Zoom {Math.round(zoom * 100)}%</span></div>
        </div>

        <aside className="exLibraryPanel">
          <div className="exLibraryTop">
            <label className="assetSearch"><span className="srOnly">부대명 또는 장비명 검색</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="부대명 또는 장비명 검색" /></label>
            <div className="assetTabs">
              {([['all','전체'],['unit','부대마크'],['equipment','장비 3D'],['type','타이포']] as const).map(([value,label]) => (
                <button key={value} className={category === value ? 'active' : ''} onClick={() => confirmPending(() => { setCategory(value); setLibraryMode('assets'); })}>{label}</button>
              ))}
            </div>
            <div className="libraryUtilityRow"><button className={libraryMode === 'samples' ? 'isActive' : ''} onClick={() => confirmPending(() => setLibraryMode('samples'))}>샘플디자인</button><label>이미지 첨부<input hidden multiple type="file" accept="image/*" onChange={(event) => confirmPending(() => uploadImages(event.target.files))} /></label></div>
          </div>

          {selected ? (
            <div className="layerInspector">
              <div className="inspectorHead">
                <div><div className="exEyebrow">SELECTED LAYER · {selected.surface.toUpperCase()}</div><h2>{selected.title}</h2></div>
                <button className="inspectorBack" onClick={() => confirmPending(() => setSelectedId(null))}>라이브러리</button>
              </div>

              {selectedAsset?.typographyMode === 'customer' && (
                <div className="typeToolPanel">
                  <label className="textInputControl">문구<input type="text" value={selected.textContent ?? ''} maxLength={80} onChange={(event) => updateSelected({ textContent: event.target.value })} /></label>
                  <label>폰트<select value={selected.fontFamily ?? typographyFontOptions[0].value} onChange={(event) => updateSelected({ fontFamily: event.target.value })}>{typographyFontOptions.map((font) => <option key={font.label} value={font.value}>{font.label}</option>)}</select></label>
                  <label>폰트 크기 <output>{selected.fontSize ?? 24}px</output><input type="range" min="8" max="96" step="1" value={selected.fontSize ?? 24} onChange={(event) => updateSelected({ fontSize: Number(event.target.value) })} /></label>
                  <label>문자 간격 <output>{selected.letterSpacing ?? 0}px</output><input type="range" min="-2" max="12" step=".25" value={selected.letterSpacing ?? 0} onChange={(event) => updateSelected({ letterSpacing: Number(event.target.value) })} /></label>
                  <label>띄어쓰기 간격 <output>{selected.wordSpacing ?? 0}px</output><input type="range" min="0" max="36" step="1" value={selected.wordSpacing ?? 0} onChange={(event) => updateSelected({ wordSpacing: Number(event.target.value) })} /></label>
                  <small>문구와 타이포 설정은 입력 즉시 왼쪽 인쇄면에 반영됩니다.</small>
                </div>
              )}

              <label>크기 <output>{selected.scale.toFixed(2)}×</output><input type="range" min="0.1" max="5" step="0.01" value={selected.scale} onChange={(e) => updateSelected({ scale: Number(e.target.value) })} /></label>
              <div className="rangeExtremes"><span>0.10×</span><span>5.00×</span></div>
              <label>회전 <output>{Math.round(selected.rotation)}°</output><input type="range" min="0" max="360" step="1" value={normalizeRotation(selected.rotation)} onChange={(e) => updateSelected({ rotation: Number(e.target.value) })} /></label>
              <div className="rangeExtremes"><span>0°</span><span>360°</span></div>
              <label>단순화 <output>{selected.simplification}%</output><input type="range" min="0" max="100" step="1" value={selected.simplification} onChange={(e) => updateSelected({ simplification: Number(e.target.value) })} /></label>
              <div className="rangeExtremes"><span>원본 디테일</span><span>최대 단순화</span></div>

              <div className="directEditStatus"><span>직접 편집</span><strong>{(selected.stretchX ?? 1).toFixed(2)} : {(selected.stretchY ?? 1).toFixed(2)}</strong><small>모서리 노드 = 비율 유지 확대/축소 · 측면 노드 = 가로/세로 비율</small></div>

              <div className="layerOrderPanel">
                <span>레이어 순서</span>
                <div><button onClick={() => reorderSelected('back')}>맨 뒤</button><button onClick={() => reorderSelected('backward')}>뒤로</button><button onClick={() => reorderSelected('forward')}>앞으로</button><button onClick={() => reorderSelected('front')}>맨 앞</button></div>
              </div>

              {selected.kind === 'equipment' && selected.capture3d && (
                <div className="captureStateCard"><span>3D CAPTURE SOURCE</span><strong>Yaw {selected.capture3d.yaw}° · Pitch {selected.capture3d.pitch}°</strong><small>Perspective {selected.capture3d.perspective} · 해당 각도에서 생성된 2D 레이어가 현재 인쇄면에 표시됩니다.</small></div>
              )}

              <div className="recommendRow"><span>추천</span><button onClick={() => updateSelected({ simplification: selected.kind === 'unit' ? 20 : selected.kind === 'equipment' ? 42 : 12 })}>자동 추천값 적용</button></div>
              <div className="colorMode"><span>표현</span>{(['color','mono'] as ColorMode[]).map((mode) => <button key={mode} className={selected.colorMode === mode ? 'active' : ''} onClick={() => updateSelected({ colorMode: mode })}>{mode === 'color' ? '컬러' : '흑백'}</button>)}</div>
              <div className="coverageCard"><span>Coverage Load</span><strong>{Math.min(100, Math.round(Math.max(4, 38 - selected.simplification * .32) * selected.scale * (((selected.stretchX ?? 1) + (selected.stretchY ?? 1)) / 2)))}</strong><small>프린터별 실측 보정 전 상대 지수</small></div>
              <div className="inspectorActions"><button className="exGhostButton" onClick={() => { setLayers((current) => current.filter((layer) => layer.id !== selected.id)); setSelectedId(null); }}>삭제</button><button className="exGhostButton" onClick={duplicateSelected}>복제</button><button className="exPrimaryButton" onClick={() => { setPendingInsert(false); setSelectedId(null); }}>삽입 완료</button></div>
            </div>
          ) : libraryMode === 'samples' ? (
            <div className="sampleDesignGrid">
              <button className="sampleDesignCard" onClick={() => insertSamplePreset(0)}><strong>Missile Artillery Classic</strong><small>앞면 좌가슴 타이포 + 뒷면 부대마크 / 천무</small><span>WORKER PRESET 01</span></button>
              <button className="sampleDesignCard" onClick={() => insertSamplePreset(1)}><strong>Armored Force Marking</strong><small>앞면 소형 표기 + 뒷면 중대마크 / K2</small><span>WORKER PRESET 02</span></button>
            </div>
          ) : (
            <div className="assetResults">
              {results.map((asset) => (
                <button key={asset.id} type="button" className="assetCard" draggable onDragStart={(event) => { event.dataTransfer.effectAllowed = 'copy'; event.dataTransfer.setData('text/exercitus-asset', asset.id); }} onClick={() => addAsset(asset)}>
                  <span className={`assetGlyph glyph-${asset.kind}`}>{asset.previewCode ?? (asset.kind === 'unit' ? '◆' : asset.kind === 'equipment' ? '▰' : 'Aa')}</span>
                  <span><strong>{asset.title}</strong><small>{asset.subtitle}</small></span><em>{asset.sourceType.toUpperCase()}</em>
                </button>
              ))}
            </div>
          )}

          <footer className="exQuoteBar"><div className="quoteValue"><span>예상 견적</span><strong>₩{estimate.toLocaleString('ko-KR')}</strong><small>{quantities}장 · Coverage {coverage}/100</small></div><button className="exGhostButton" onClick={manualSave}>저장</button><button className="exPrimaryButton" onClick={addToCart}>장바구니 담기</button></footer>
        </aside>
      </section>

      <EquipmentCaptureModal
        asset={captureAsset}
        onClose={() => { setCaptureAsset(null); setCapturePosition(null); }}
        onConvert={(settings) => {
          if (!captureAsset) return;
          const layer = { ...makeLayer(captureAsset, surface, capturePosition ?? undefined), capture3d: settings };
          setLayers((current) => [...current, layer]);
          setSelectedId(layer.id);
          setCaptureAsset(null);
          setCapturePosition(null);
        }}
      />
      {toast && <div className="exToast" role="status">{toast}</div>}
    </main>
  );
}
