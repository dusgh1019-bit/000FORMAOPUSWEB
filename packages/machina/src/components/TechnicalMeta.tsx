export default function TechnicalMeta({ rows }: { rows: Array<[string,string]> }) {
  return <dl className="machinaTechnicalMeta">{rows.map(([key,value])=><div key={key}><dt>{key}</dt><dd>{value}</dd></div>)}</dl>;
}
