export type TechnicalVisualMode =
  | 'OBJECT_FINAL'
  | 'OBJECT_STRUCTURE'
  | 'OBJECT_DETAIL'
  | 'OBJECT_PROCESS'
  | 'SYSTEM'
  | 'CONFIDENTIAL';

export default function TechnicalVisual({
  variant = 1,
  label = 'SAMPLE VISUAL',
  mode = 'OBJECT_FINAL',
  process = ['INPUT', 'PROCESS', 'OUTPUT'],
}: {
  variant?: number;
  label?: string;
  mode?: TechnicalVisualMode;
  process?: string[];
}) {
  const systemMode = mode === 'SYSTEM' || mode === 'CONFIDENTIAL';
  return (
    <div className={`machinaTechnicalVisual variant-${variant} mode-${mode.toLowerCase()}`} aria-label={label}>
      <div className="machinaGridPlane" />
      {!systemMode && (
        <>
          <div className="machinaWireObject"><i /><i /><i /><em /><em /></div>
          <div className="machinaMeasure horizontal"><span>NTS</span></div>
          <div className="machinaMeasure vertical"><span>FORM</span></div>
          <div className="machinaStructureTrace"><i /><i /><i /><i /></div>
        </>
      )}
      {systemMode && (
        <div className="machinaProcessDiagram" aria-hidden="true">
          {process.map((step, index) => (
            <div key={`${step}-${index}`}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <strong>{step}</strong>
              {index < process.length - 1 && <i>↓</i>}
            </div>
          ))}
        </div>
      )}
      {mode === 'CONFIDENTIAL' && <div className="machinaConfidentialMask">DETAILS RESTRICTED</div>}
      <div className="machinaDrawingStamp">
        <span>MACHINA / {mode.replaceAll('_', ' ')}</span>
        <strong>{label}</strong>
        <small>SAMPLE / NTS / PUBLIC-SAFE PROXY</small>
      </div>
    </div>
  );
}
