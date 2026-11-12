export type ExercitusAssetKind = 'unit' | 'equipment' | 'type' | 'image';
export type Surface = 'front' | 'back';
export type ColorMode = 'color' | 'mono';

export type ExercitusAsset = {
  id: string;
  kind: ExercitusAssetKind;
  title: string;
  subtitle: string;
  sourceType: '2d' | '3d';
  approved: boolean;
  tags: string[];
  previewCode?: string;
  typographyMode?: 'fixed' | 'customer';
};

export type DesignLayer = {
  id: string;
  assetId: string;
  title: string;
  kind: ExercitusAssetKind;
  surface: Surface;
  x: number;
  y: number;
  scale: number;
  stretchX: number;
  stretchY: number;
  rotation: number;
  simplification: number;
  colorMode: ColorMode;
  textContent?: string;
  fontFamily?: string;
  fontSize?: number;
  letterSpacing?: number;
  wordSpacing?: number;
  capture3d?: { yaw: number; pitch: number; roll: number; perspective: number };
  imageSrc?: string;
};

export const exercitusAssets: ExercitusAsset[] = [
  {
    id: 'unit-demo-corps',
    kind: 'unit',
    title: '샘플 군단 부대마크',
    subtitle: 'Unit Mark A · 2D master derivative',
    sourceType: '2d',
    approved: true,
    tags: ['부대', '군단', 'unit', 'mark', 'corps'],
    previewCode: 'Ⅰ',
  },
  {
    id: 'unit-demo-company',
    kind: 'unit',
    title: '샘플 중대 부대마크',
    subtitle: 'Unit Mark B · 2D master derivative',
    sourceType: '2d',
    approved: true,
    tags: ['부대', '중대', 'unit', 'mark', 'company'],
    previewCode: 'C',
  },
  {
    id: 'equipment-k239-demo',
    kind: 'equipment',
    title: 'K-239 천무',
    subtitle: 'Equipment A · 3D source → 2D capture',
    sourceType: '3d',
    approved: true,
    tags: ['육군', '포병', '미사일포병', '천무', 'k239'],
    previewCode: 'K239',
  },
  {
    id: 'equipment-k2-demo',
    kind: 'equipment',
    title: 'K2 전차',
    subtitle: 'Equipment B · 3D source → 2D capture',
    sourceType: '3d',
    approved: true,
    tags: ['육군', '기갑', '전차', 'k2', 'tank'],
    previewCode: 'K2',
  },
  {
    id: 'type-roka-demo',
    kind: 'type',
    title: 'ROKA',
    subtitle: '완성형 타이포 · 2D master derivative',
    sourceType: '2d',
    approved: true,
    tags: ['roka', '대한민국육군', 'typography', '완성형'],
    previewCode: 'ROKA',
    typographyMode: 'fixed',
  },
  {
    id: 'type-custom-demo',
    kind: 'type',
    title: '구매자 직접 기입',
    subtitle: '직접기입형 타이포 · licensed font',
    sourceType: '2d',
    approved: true,
    tags: ['문구', '폰트', 'typography', '직접기입'],
    previewCode: 'TEXT',
    typographyMode: 'customer',
  },
];

export const typographyFontOptions = [
  { value: 'Barlow Condensed, Arial Narrow, sans-serif', label: 'Barlow Condensed' },
  { value: 'Pretendard, Arial, sans-serif', label: 'Pretendard' },
  { value: 'Arial Narrow, Arial, sans-serif', label: 'Arial Narrow' },
  { value: 'Georgia, Times New Roman, serif', label: 'Editorial Serif' },
  { value: 'Courier New, monospace', label: 'Monospace' },
] as const;

export const garmentSizes = ['M', 'XL', '3XL', '6XL'] as const;


export type CoverageGrade = 'LIGHT' | 'STANDARD' | 'HEAVY';
export type CustomService = 'STANDARD' | 'CUSTOM PREMIUM';

export type ExercitusCollectionIssue = {
  slug: string;
  issue: string;
  title: string;
  series: string;
  descriptor: string;
  price: number;
  colors: string[];
  sizes: readonly string[];
  coverage: CoverageGrade;
  status: 'CURRENT' | 'LIMITED' | 'ARCHIVE';
  mark: string;
  equipment: string;
  typeLine: string;
};

export const exercitusCollection: ExercitusCollectionIssue[] = [
  {
    slug: 'missile-artillery-001',
    issue: 'ISSUE 001',
    title: 'MISSILE ARTILLERY',
    series: 'ARTILLERY SERIES',
    descriptor: '장거리 화력의 구조와 직선적인 타이포를 결합한 EXERCITUS 완성 디자인.',
    price: 39000,
    colors: ['WHITE', 'BLACK'],
    sizes: garmentSizes,
    coverage: 'STANDARD',
    status: 'CURRENT',
    mark: 'Ⅰ',
    equipment: 'K239',
    typeLine: 'ROKA / MISSILE ARTILLERY',
  },
  {
    slug: 'armored-crew-002',
    issue: 'ISSUE 002',
    title: 'ARMORED CREW',
    series: 'ARMORED SERIES',
    descriptor: '기갑 장비의 질량감과 승무원 표식을 간결한 후면 구성으로 정리한 디자인.',
    price: 41000,
    colors: ['WHITE', 'BLACK'],
    sizes: garmentSizes,
    coverage: 'HEAVY',
    status: 'CURRENT',
    mark: 'C',
    equipment: 'K2',
    typeLine: 'ARMORED / SERVICE',
  },
  {
    slug: 'field-standard-003',
    issue: 'ISSUE 003',
    title: 'FIELD STANDARD',
    series: 'SERVICE SERIES',
    descriptor: '일상 착용을 기준으로 그래픽 밀도를 낮춘 서비스 표준형 디자인.',
    price: 36000,
    colors: ['WHITE'],
    sizes: garmentSizes,
    coverage: 'LIGHT',
    status: 'LIMITED',
    mark: '03',
    equipment: 'FIELD',
    typeLine: 'EXERCITUS / GREA',
  },
];

export const exercitusSamplePresets: Omit<DesignLayer, 'id'>[][] = [
  [
    { assetId:'type-roka-demo', title:'ROKA MISSILE ARTILLERY', kind:'type', surface:'front', x:28, y:18, scale:.82, stretchX:1, stretchY:1, rotation:0, simplification:16, colorMode:'mono', textContent:'ROKA MISSILE ARTILLERY', fontFamily:'Barlow Condensed, Arial Narrow, sans-serif', fontSize:14, letterSpacing:1, wordSpacing:1 },
    { assetId:'unit-demo-corps', title:'샘플 군단 부대마크', kind:'unit', surface:'back', x:50, y:35, scale:1.75, stretchX:1.08, stretchY:1.08, rotation:0, simplification:30, colorMode:'mono' },
    { assetId:'equipment-k239-demo', title:'K-239 천무', kind:'equipment', surface:'back', x:50, y:66, scale:1.22, stretchX:1.25, stretchY:1.06, rotation:356, simplification:24, colorMode:'color', capture3d:{ yaw:36, pitch:-10, roll:-3, perspective:58 } },
  ],
  [
    { assetId:'type-roka-demo', title:'ARMORED FORCE', kind:'type', surface:'front', x:27, y:19, scale:.8, stretchX:1, stretchY:1, rotation:0, simplification:12, colorMode:'color', textContent:'ARMORED FORCE', fontFamily:'Arial Narrow, Arial, sans-serif', fontSize:15, letterSpacing:1, wordSpacing:1 },
    { assetId:'unit-demo-company', title:'샘플 중대 부대마크', kind:'unit', surface:'back', x:30, y:30, scale:1.38, stretchX:1, stretchY:1, rotation:0, simplification:20, colorMode:'mono' },
    { assetId:'equipment-k2-demo', title:'K2 전차', kind:'equipment', surface:'back', x:52, y:66, scale:1.3, stretchX:1.34, stretchY:1.06, rotation:2, simplification:26, colorMode:'color', capture3d:{ yaw:22, pitch:-6, roll:1, perspective:54 } },
  ],
];

export function coverageGrade(value: number): CoverageGrade {
  if (value <= 30) return 'LIGHT';
  if (value <= 65) return 'STANDARD';
  return 'HEAVY';
}

export const customServiceOptions: { id: CustomService; label: string; description: string; surcharge: number }[] = [
  { id: 'STANDARD', label: 'STANDARD', description: '자동 Preflight · 기본 DTG 출력 · 기본 QC / 포장', surcharge: 0 },
  { id: 'CUSTOM PREMIUM', label: 'CUSTOM PREMIUM', description: '작업자 최종 검토 · 출력 전 Proof 확인 · 강화 QC / 우선 검토', surcharge: 12000 },
];
