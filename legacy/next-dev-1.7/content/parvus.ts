export type ParvusTheme = 'KEEP' | 'PLAY' | 'PLACE';
export type ParvusStructure = 'OBJECT' | 'MODULE';
export type ParvusMedium = 'BRICK';
export type ParvusClientType = 'B2C' | 'B2B';
export type ParvusProjectStatus = 'SAMPLE' | 'FOUNDATIONAL' | 'CURRENT' | 'ARCHIVE';
export type ParvusContentType = 'PRODUCT' | 'PROJECT' | 'CUSTOM';
export type ParvusInteraction = 'GATHER' | 'FRAME' | 'HOLD' | 'BREAK' | 'MOVE' | 'REBUILD' | 'TRACE' | 'RISE' | 'BECOME';

export type ParvusProject = {
  id: string;
  slug: string;
  legacySlugs?: string[];
  title: string;
  koreanTitle: string;
  year: number;
  theme: ParvusTheme;
  contentType: ParvusContentType;
  interactions: ParvusInteraction[];
  structure: ParvusStructure;
  medium: ParvusMedium;
  clientType: ParvusClientType;
  purpose: string;
  quantity?: number;
  status: ParvusProjectStatus;
  descriptor: string;
  subject: string;
  interpretation: string;
  build: string;
  object: string;
  delivery: string;
  visualVariant: 1 | 2 | 3 | 4 | 5 | 6;
};

export const parvusThemeCopy: Record<ParvusTheme, {
  statement: string;
  meaning: string;
  b2b: string;
  emotions: string[];
  interactions: ParvusInteraction[];
}> = {
  KEEP: {
    statement: 'BUILD A MEMORY.',
    meaning: '기억하고 싶은 사람·동물·물건·장소·순간을 작은 브릭 오브젝트로 남깁니다.',
    b2b: 'COMMEMORATION / GIFT / REPRESENTATION',
    emotions: ['MEMORY', 'AFFECTION', 'POSSESSION'],
    interactions: ['GATHER','FRAME','HOLD'],
  },
  PLAY: {
    statement: 'BUILD IT YOUR WAY.',
    meaning: '조립하고, 배치하고, 바꾸고, 다시 연결할 수 있는 브릭 구조를 다룹니다.',
    b2b: 'ENGAGEMENT / EXPERIENCE / EDUCATION',
    emotions: ['INTERACTION', 'DISCOVERY', 'COMBINATION', 'EXPANSION'],
    interactions: ['BREAK','MOVE','REBUILD'],
  },
  PLACE: {
    statement: 'BUILD A PLACE.',
    meaning: '건축물·학교·공장·매장·사옥·집·랜드마크를 작은 오브젝트로 재해석합니다.',
    b2b: 'LANDMARK / SPACE / CORPORATE DISPLAY',
    emotions: ['PLACE', 'MEMORY', 'LANDMARK', 'BELONGING'],
    interactions: ['TRACE','RISE','BECOME'],
  },
};

export const parvusProjects: ParvusProject[] = [
  {
    id: 'P-001', slug: 'memory-object-01', title: 'MEMORY OBJECT 01', koreanTitle: '기억 오브젝트 01', year: 2026,
    theme: 'KEEP', contentType: 'PRODUCT', interactions: ['GATHER','FRAME','HOLD'], structure: 'OBJECT', medium: 'BRICK', clientType: 'B2C', purpose: 'Personal commemoration', status: 'SAMPLE',
    descriptor: 'A small brick portrait object built around one remembered subject.',
    subject: '기억하고 싶은 대상의 형태와 핵심 특징을 추립니다.',
    interpretation: '복잡한 디테일을 작은 브릭 단위와 제한된 실루엣으로 번역합니다.',
    build: '비례와 색 면을 검토하며 소규모 모듈을 단계적으로 조립합니다.',
    object: '책상이나 선반 가까이에 둘 수 있는 독립 오브젝트로 완성합니다.',
    delivery: '완성 오브젝트와 간단한 조립·보관 안내를 함께 전달하는 구조를 가정합니다.', visualVariant: 1,
  },
  {
    id: 'K-001', slug: 'companion-portrait', legacySlugs: ['companion-object-01'], title: 'COMPANION PORTRAIT', koreanTitle: '컴패니언 포트레이트', year: 2026,
    theme: 'KEEP', contentType: 'PRODUCT', interactions: ['GATHER','FRAME','HOLD'], structure: 'OBJECT', medium: 'BRICK', clientType: 'B2C', purpose: 'Pet / personal subject memory', status: 'SAMPLE',
    descriptor: 'Motion evaluation sample: small units gather around a familiar subject, frame it, then hold as a brick object.',
    subject: '사진이나 참고자료에서 가장 인상적인 자세와 특징을 선정합니다.',
    interpretation: '형태를 과장하기보다 작은 스케일에서 기억되는 특징을 우선합니다.',
    build: '부품 수보다 실루엣과 인상을 기준으로 조립 밀도를 결정합니다.',
    object: '작고 따뜻한 소장 오브젝트로 마감합니다.',
    delivery: '개인 소장을 전제로 간결한 포장과 기록 정보를 제공하는 구조를 가정합니다.', visualVariant: 2,
  },
  {
    id: 'P-003', slug: 'modular-desk-object-01', title: 'MODULAR DESK OBJECT 01', koreanTitle: '모듈형 데스크 오브젝트 01', year: 2026,
    theme: 'PLAY', contentType: 'PRODUCT', interactions: ['BREAK','MOVE','REBUILD'], structure: 'MODULE', medium: 'BRICK', clientType: 'B2C', purpose: 'Reconfigurable desk interaction', status: 'SAMPLE',
    descriptor: 'A modular object that can be visually evaluated through assembled, exploded and rebuild states.',
    subject: '하나의 완성형보다 반복해서 바꿀 수 있는 사용 장면을 먼저 정의합니다.',
    interpretation: 'ASSEMBLED / EXPLODED / PARTS / REBUILD 순서가 읽히는 모듈 구조로 설계합니다.',
    build: '실제 결합부와 반복 조립성은 제품 개발 시 검증하며, 현재 Sample에서는 Visual Demonstration만 제공합니다.',
    object: '사용자가 직접 조합을 바꿀 수 있는 브릭 데스크 오브젝트 방향을 검토합니다.',
    delivery: '실제 판매 시에만 모듈 구성과 재조립 가이드를 확정합니다.', visualVariant: 3,
  },
  {
    id: 'P-004', slug: 'engagement-module-01', title: 'ENGAGEMENT MODULE 01', koreanTitle: '참여형 모듈 01', year: 2026,
    theme: 'PLAY', contentType: 'PROJECT', interactions: ['BREAK','MOVE','REBUILD'], structure: 'MODULE', medium: 'BRICK', clientType: 'B2B', purpose: 'Event / education / engagement', quantity: 50, status: 'SAMPLE',
    descriptor: 'A repeatable brick module study designed around participation rather than passive display.',
    subject: '행사·교육·브랜드 참여 상황에서 어떤 행동을 유도할지 정의합니다.',
    interpretation: '짧은 시간 안에 조립과 변형이 가능한 반복 모듈로 단순화하는 방향을 검토합니다.',
    build: '실제 프로젝트가 생길 때 다량 제작 가능성, 파손 가능성, 조립 난이도를 검증합니다.',
    object: '다수가 반복 사용할 수 있는 참여형 브릭 모듈을 가정합니다.',
    delivery: '수량별 포장·운영 안내·교체 부품은 실제 계약 범위가 확정된 뒤 설계합니다.', visualVariant: 4,
  },
  {
    id: 'P-005', slug: 'architectural-place-01', title: 'ARCHITECTURAL PLACE 01', koreanTitle: '건축 장소 오브젝트 01', year: 2026,
    theme: 'PLACE', contentType: 'PRODUCT', interactions: ['TRACE','RISE','BECOME'], structure: 'OBJECT', medium: 'BRICK', clientType: 'B2C', purpose: 'Personal place / landmark memory', status: 'SAMPLE',
    descriptor: 'A remembered place reduced from plan and elevation cues into a small architectural brick object.',
    subject: '실제 장소의 외관·동선·상징 요소 중 기억에 남는 장면을 선정합니다.',
    interpretation: 'REAL → PLAN → INTERPRET → BUILD 순서로 구조와 비례를 브릭 문법으로 재구성합니다.',
    build: '랜드마크가 되는 면과 실루엣을 먼저 잡고 세부를 단계적으로 조립합니다.',
    object: '장소의 인상을 압축한 소형 건축 오브젝트로 완성하는 방향을 검토합니다.',
    delivery: '장소 정보와 제작 의도를 함께 기록해 소장성을 높이는 구조를 가정합니다.', visualVariant: 5,
  },
  {
    id: 'P-006', slug: 'corporate-landmark-01', title: 'CORPORATE LANDMARK 01', koreanTitle: '기업 랜드마크 01', year: 2026,
    theme: 'PLACE', contentType: 'PROJECT', interactions: ['TRACE','RISE','BECOME'], structure: 'OBJECT', medium: 'BRICK', clientType: 'B2B', purpose: 'Corporate display / commemorative gift', quantity: 100, status: 'SAMPLE',
    descriptor: 'A corporate place interpreted as a repeatable commemorative object study.',
    subject: '사옥·공장·매장·랜드마크에서 조직을 대표하는 핵심 장면을 선정합니다.',
    interpretation: '브랜드 식별성과 건축적 특징을 유지하면서 소형 브릭 구조로 재해석합니다.',
    build: '실제 프로젝트에서 대량 납품을 고려해 부품수, 조립 난이도, 반복 품질을 검증합니다.',
    object: '기념품·전시물·방문객용 오브젝트로 사용할 수 있는 형태를 가정합니다.',
    delivery: '수량, 포장, 일정, 전달 목적에 맞춘 기업 납품 구조는 실제 프로젝트에서 확정합니다.', visualVariant: 6,
  },
];

export function getParvusProject(slug: string) {
  return parvusProjects.find((project) => project.slug === slug || project.legacySlugs?.includes(slug));
}
