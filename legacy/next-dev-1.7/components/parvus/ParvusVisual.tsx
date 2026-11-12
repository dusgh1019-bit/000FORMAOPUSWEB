export default function ParvusVisual({ variant = 1, mode = 'object', label }: { variant?: 1|2|3|4|5|6; mode?: 'object'|'play'|'place'; label?: string }) {
  return (
    <div className={`parvusVisual variant-${variant} mode-${mode}`} aria-hidden="true">
      <div className="parvusGridLines" />
      <div className="parvusUnit u1" /><div className="parvusUnit u2" /><div className="parvusUnit u3" /><div className="parvusUnit u4" />
      <div className="parvusUnit u5" /><div className="parvusUnit u6" /><div className="parvusUnit u7" /><div className="parvusUnit u8" />
      <div className="parvusVisualCaption">{label ?? 'BRICK / STUDY'}</div>
    </div>
  );
}
