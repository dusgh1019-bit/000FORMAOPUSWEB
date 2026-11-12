export type MachinaObjectDomain =
  | 'NAVAL'
  | 'VEHICLE'
  | 'ARCHITECTURE'
  | 'INDUSTRIAL'
  | 'MECHANICAL'
  | 'CUSTOM';

export type MachinaObjectMedium =
  | 'BRICK'
  | '3D_PRINT'
  | 'RESIN'
  | 'METAL'
  | 'WOOD'
  | 'MIXED';

export type MachinaProjectType = 'B2C' | 'B2B' | 'INTERNAL';
export type MachinaObjectDisclosure = 'PUBLIC' | 'RESTRICTED' | 'ANONYMIZED';
export type MachinaObjectStatus = 'SAMPLE' | 'ARCHIVE' | 'ACTIVE';

export type MachinaObjectProduct = {
  id: string;
  slug: string;
  title: string;
  domain: MachinaObjectDomain;
  medium: MachinaObjectMedium;
  subject: string;
  scale?: string;
  year: number;
  projectType: MachinaProjectType;
  disclosure: MachinaObjectDisclosure;
  status: MachinaObjectStatus;
  philosophy: 'FORM THROUGH STRUCTURE.';
  summary: string;
  notation: string;
  studyViews: { key: string; label: string; caption: string; mode: 'FINAL' | 'STRUCTURE' | 'DETAIL' | 'PROCESS' }[];
};

export type MachinaDisclosureLevel = 'PUBLIC' | 'RESTRICTED' | 'ANONYMIZED' | 'CONFIDENTIAL';
export type MachinaEvidenceType = 'OWNED' | 'CLIENT_APPROVED' | 'CONFIDENTIAL_EXPERIENCE';
export type MachinaSystemStatus = 'SAMPLE' | 'COMPLETED' | 'ACTIVE';

export type MachinaSystemProject = {
  id: string;
  slug: string;
  title: string;
  year: number;
  sector?: string;
  scope: string[];
  disclosureLevel: MachinaDisclosureLevel;
  evidenceType: MachinaEvidenceType;
  clientName?: string;
  publicSummary?: string;
  approvedImages?: string[];
  hideClient: boolean;
  hideGeometry: boolean;
  hideSpecifications: boolean;
  hideProcess: boolean;
  approvalDate?: string;
  approvalReference?: string;
  status: MachinaSystemStatus;
  notation: string;
  sequence: { key: string; label: string; body: string; public: boolean }[];
};

export const machinaObjectDomains: MachinaObjectDomain[] = [
  'NAVAL',
  'VEHICLE',
  'ARCHITECTURE',
  'INDUSTRIAL',
  'MECHANICAL',
  'CUSTOM',
];

const objectViews = (medium: MachinaObjectMedium) => [
  { key: '01', label: 'FINAL FORM', caption: '완성된 형상과 비례를 동일한 OBJECT STUDY 프레임으로 확인합니다.', mode: 'FINAL' as const },
  { key: '02', label: 'STRUCTURE', caption: medium === 'BRICK' ? 'Unit과 Assembly가 Form을 만드는 구조를 확인합니다.' : '형상을 성립시키는 내부 구조와 제작 논리를 확인합니다.', mode: 'STRUCTURE' as const },
  { key: '03', label: 'DETAIL', caption: '재료보다 형상·접합·표면·디테일의 논리를 우선해 관찰합니다.', mode: 'DETAIL' as const },
  { key: '04', label: 'PROCESS', caption: medium === '3D_PRINT' ? 'CAD GEOMETRY → LAYER → FORM' : medium === 'METAL' ? 'DRAWING → MACHINING → FORM' : medium === 'BRICK' ? 'UNIT → ASSEMBLY → FORM' : 'GEOMETRY → MAKING → FORM', mode: 'PROCESS' as const },
];

export const machinaObjects: MachinaObjectProduct[] = [
  {
    id: 'O-001',
    slug: 'naval-study-01',
    title: 'NAVAL STUDY 01',
    domain: 'NAVAL',
    medium: 'BRICK',
    subject: 'MODERN NAVAL VESSEL',
    scale: '1:200',
    year: 2026,
    projectType: 'B2B',
    disclosure: 'ANONYMIZED',
    status: 'SAMPLE',
    philosophy: 'FORM THROUGH STRUCTURE.',
    summary: '현대 함정의 비례와 상부 구조, 선형의 관계를 하나의 정밀 OBJECT STUDY로 검증하기 위한 가상 샘플입니다.',
    notation: 'M-O-001 / SAMPLE / REV.A',
    studyViews: objectViews('BRICK'),
  },
  {
    id: 'O-006',
    slug: 'naval-study-02',
    title: 'NAVAL STUDY 02',
    domain: 'NAVAL',
    medium: 'RESIN',
    subject: 'PATROL VESSEL',
    scale: '1:100',
    year: 2026,
    projectType: 'INTERNAL',
    disclosure: 'PUBLIC',
    status: 'SAMPLE',
    philosophy: 'FORM THROUGH STRUCTURE.',
    summary: '동일한 NAVAL Domain 안에서 BRICK과 RESIN이 재료가 아닌 형상·비례 중심으로 공존하는지 평가하는 가상 샘플입니다.',
    notation: 'M-O-006 / SAMPLE / REV.A',
    studyViews: objectViews('RESIN'),
  },
  {
    id: 'O-003',
    slug: 'vehicle-study-01',
    title: 'VEHICLE STUDY 01',
    domain: 'VEHICLE',
    medium: '3D_PRINT',
    subject: 'UTILITY VEHICLE',
    scale: '1:24',
    year: 2026,
    projectType: 'INTERNAL',
    disclosure: 'PUBLIC',
    status: 'SAMPLE',
    philosophy: 'FORM THROUGH STRUCTURE.',
    summary: '차량의 비례와 기능 형상을 CAD Geometry에서 물리 Object로 전환하는 과정을 평가하는 가상 샘플입니다.',
    notation: 'M-O-003 / SAMPLE / REV.A',
    studyViews: objectViews('3D_PRINT'),
  },
  {
    id: 'O-004',
    slug: 'architecture-study-01',
    title: 'ARCHITECTURE STUDY 01',
    domain: 'ARCHITECTURE',
    medium: 'BRICK',
    subject: 'INDUSTRIAL BUILDING',
    scale: '1:150',
    year: 2026,
    projectType: 'B2B',
    disclosure: 'ANONYMIZED',
    status: 'SAMPLE',
    philosophy: 'FORM THROUGH STRUCTURE.',
    summary: '장소에 대한 애착보다 구조·비례·Mass와 반복 모듈을 중심으로 해석하는 MACHINA형 건축 Object 가상 샘플입니다.',
    notation: 'M-O-004 / SAMPLE / REV.A',
    studyViews: objectViews('BRICK'),
  },
  {
    id: 'O-005',
    slug: 'industrial-study-01',
    title: 'INDUSTRIAL STUDY 01',
    domain: 'INDUSTRIAL',
    medium: 'MIXED',
    subject: 'PRODUCTION EQUIPMENT SCALE MODEL',
    year: 2026,
    projectType: 'B2B',
    disclosure: 'RESTRICTED',
    status: 'SAMPLE',
    philosophy: 'FORM THROUGH STRUCTURE.',
    summary: '생산설비의 구조, Assembly와 Detail을 설명 가능한 축척 Object로 정리하는 방식을 검증하는 가상 샘플입니다.',
    notation: 'M-O-005 / SAMPLE / REV.A',
    studyViews: objectViews('MIXED'),
  },
  {
    id: 'O-002',
    slug: 'mechanical-study-01',
    title: 'MECHANICAL STUDY 01',
    domain: 'MECHANICAL',
    medium: 'METAL',
    subject: 'PRECISION MECHANICAL OBJECT',
    year: 2026,
    projectType: 'INTERNAL',
    disclosure: 'PUBLIC',
    status: 'SAMPLE',
    philosophy: 'FORM THROUGH STRUCTURE.',
    summary: 'BRICK과 NON-BRICK이 같은 OBJECT STUDY Art Direction에서 자연스럽게 연결되는지 평가하는 가상 금속 오브젝트 샘플입니다.',
    notation: 'M-O-002 / SAMPLE / REV.A',
    studyViews: objectViews('METAL'),
  },
];

export const machinaCapabilities = [
  ['MECHANICAL DESIGN', '기계 구조 설계 및 구성 검토'],
  ['AUTOMATION', '자동화 장비 구성 및 메커니즘 설계'],
  ['JIG & FIXTURE', '조립·가공·검사용 치공구 설계'],
  ['CAD ENGINEERING', '3D CAD 모델·2D 제작도 작성'],
  ['PROTOTYPING', '시제품 구조 검토와 제작 연계'],
  ['FABRICATION', '가공·판금·구매품을 포함한 제작 검토'],
  ['ASSEMBLY', '조립성 검토 및 조립 문서화'],
  ['INSTALLATION', '현장 설치 범위와 인터페이스 검토'],
] as const;

const sequence = (items: [string, string][], hideProcess = false) =>
  items.map(([label, body], index) => ({
    key: String(index + 1).padStart(2, '0'),
    label,
    body,
    public: !hideProcess,
  }));

export const machinaSystems: MachinaSystemProject[] = [
  {
    id: 'S-001',
    slug: 'automation-system-01',
    title: 'AUTOMATION SYSTEM 01',
    year: 2026,
    sector: 'MANUFACTURING',
    scope: ['MECHANICAL DESIGN', 'AUTOMATION', 'JIG & FIXTURE'],
    disclosureLevel: 'ANONYMIZED',
    evidenceType: 'CONFIDENTIAL_EXPERIENCE',
    publicSummary: '고객 식별정보와 실제 Geometry·수치·공정정보를 배제한 상태에서 자동화 프로젝트의 업무범위만 검증하는 UI용 가상 샘플입니다.',
    hideClient: true,
    hideGeometry: true,
    hideSpecifications: true,
    hideProcess: true,
    status: 'SAMPLE',
    notation: 'M-S-001 / SAMPLE / ANONYMIZED',
    sequence: sequence([
      ['INPUT', '공개용 Diagram에서는 입력 조건을 일반화합니다.'],
      ['POSITIONING', '실제 Jig 형상이나 기준치수 대신 기능 단계만 표현합니다.'],
      ['PROCESS', '고객 공정 노하우가 드러나지 않는 수준으로 추상화합니다.'],
      ['INSPECTION', '검사 방식·센서 위치·판정기준은 공개하지 않습니다.'],
      ['OUTPUT', '결과 흐름만 설명하고 실제 생산정보는 제외합니다.'],
    ], true),
  },
  {
    id: 'S-002',
    slug: 'fixture-system-01',
    title: 'FIXTURE SYSTEM 01',
    year: 2026,
    sector: 'MANUFACTURING',
    scope: ['JIG & FIXTURE', 'CAD ENGINEERING'],
    disclosureLevel: 'PUBLIC',
    evidenceType: 'OWNED',
    publicSummary: '자체 Demo Jig를 가정하여 요구사항에서 조립까지의 기술 Sequence를 검증하는 공개형 가상 샘플입니다.',
    hideClient: true,
    hideGeometry: false,
    hideSpecifications: true,
    hideProcess: false,
    status: 'SAMPLE',
    notation: 'M-S-002 / SAMPLE / PUBLIC',
    sequence: sequence([
      ['REQUIREMENT', '기준면, 반복 위치결정, 작업 접근성을 정의합니다.'],
      ['CAD', '형상과 간섭, 체결 접근성을 구조적으로 검토합니다.'],
      ['FABRICATION', '가공·표준품 구성과 조립 기준을 정리합니다.'],
      ['ASSEMBLY', '반복 위치와 교체 동선을 확인합니다.'],
    ]),
  },
  {
    id: 'S-003',
    slug: 'machine-design-01',
    title: 'MACHINE DESIGN 01',
    year: 2026,
    sector: 'INDUSTRIAL',
    scope: ['MACHINE DESIGN', 'CAD ENGINEERING', 'FABRICATION SUPPORT'],
    disclosureLevel: 'RESTRICTED',
    evidenceType: 'CLIENT_APPROVED',
    publicSummary: '실제 고객사처럼 보이는 정보 없이, 제한 공개 프로젝트에서 어떤 Evidence만 남겨야 하는지 평가하는 가상 샘플입니다.',
    hideClient: true,
    hideGeometry: true,
    hideSpecifications: true,
    hideProcess: false,
    status: 'SAMPLE',
    notation: 'M-S-003 / SAMPLE / RESTRICTED',
    sequence: sequence([
      ['REQUIREMENT', '프로젝트 목표와 공개 가능한 범위만 요약합니다.'],
      ['DESIGN', '민감 Geometry를 제거한 구조 설명만 사용합니다.'],
      ['FABRICATION', '세부 공법·수치 없이 제작 범위를 일반화합니다.'],
      ['RESULT', '승인된 범위 안에서 결과 상태만 기술합니다.'],
    ]),
  },
  {
    id: 'S-004',
    slug: 'confidential-project-01',
    title: 'CONFIDENTIAL PROJECT 01',
    year: 2026,
    sector: 'CONFIDENTIAL',
    scope: ['MECHANICAL DESIGN', 'AUTOMATION'],
    disclosureLevel: 'CONFIDENTIAL',
    evidenceType: 'CONFIDENTIAL_EXPERIENCE',
    publicSummary: 'PROJECT DETAILS RESTRICTED. 공개 가능한 최소 Scope와 상태만 표시하는 기밀 프로젝트 UI 가상 샘플입니다.',
    hideClient: true,
    hideGeometry: true,
    hideSpecifications: true,
    hideProcess: true,
    status: 'SAMPLE',
    notation: 'M-S-004 / SAMPLE / CONFIDENTIAL',
    sequence: [],
  },
];

export function getMachinaObject(slug: string) {
  return machinaObjects.find((item) => item.slug === slug);
}

export function getMachinaSystem(slug: string) {
  return machinaSystems.find((item) => item.slug === slug);
}
