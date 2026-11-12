import BreadcrumbTrail from '@/components/BreadcrumbTrail';
export default function CadPage() {
  return <main className="academiaHoldPage cadHoldPage">
    <div className="utility"><BreadcrumbTrail items={[{label:'FORMA OPUS',href:'/'},{label:'ACADEMIA',href:'/?scene=academia'},{label:'CAD',href:'/academia/cad'}]} /></div>
    <div className="academiaHoldCode">ACADEMIA / 02</div>
    <h1>CAD</h1>
    <div className="academiaHoldState">ARCHIVE IN PREPARATION</div>
    <p>기계제도·CAD 교육 영역은 유지하되 현재 버전에서는 내부 콘텐츠 구조를 확장하지 않습니다.</p>
  </main>;
}
