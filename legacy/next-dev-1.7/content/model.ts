export type BrandSlug = 'grea' | 'parvus' | 'machina';
export type AcademiaSlug = 'history' | 'cad';

export type Brand = {
  slug: BrandSlug;
  name: string;
  descriptor: string;
  manifesto: string;
  previewLabel: string;
};

export type Project = {
  id: string;
  brand: BrandSlug;
  slug: string;
  title: string;
  descriptor: string;
  year: number;
  featured: 'FEATURED' | 'SELECTED' | 'NONE';
};

export const brands: Brand[] = [
  {
    slug: 'grea',
    name: 'GREA',
    descriptor: 'Identity / apparel / field equipment',
    manifesto: '규율과 강철이 만드는 통제된 위압감.',
    previewLabel: 'Identity / Apparel / Field Equipment',
  },
  {
    slug: 'parvus',
    name: 'PARVUS',
    descriptor: 'Affection / brick / build',
    manifesto: '곁에 두고 싶은 기억·놀이·장소를 작은 오브젝트로 재해석합니다.',
    previewLabel: 'Affection / Brick / Build',
  },
  {
    slug: 'machina',
    name: 'MACHINA',
    descriptor: 'Precision / engineering / systems',
    manifesto: '공학적 질서와 정밀한 구조가 만들어내는 기술적 아름다움.',
    previewLabel: 'Precision / Structure / Technology',
  },
];

export const greaProjects: Project[] = [
  { id: 'grea-001', brand: 'grea', slug: 'exercitus', title: 'EXERCITUS', descriptor: 'Military Apparel / For Service', year: 2026, featured: 'FEATURED' },
  { id: 'grea-002', brand: 'grea', slug: 'faber', title: 'FABER', descriptor: 'Workwear & Field Equipment / Development', year: 2026, featured: 'SELECTED' },
  { id: 'grea-003', brand: 'grea', slug: 'vestis', title: 'VESTIS', descriptor: 'Graphic Apparel / Development', year: 2026, featured: 'SELECTED' },
];


export const academia = [
  {
    slug: 'history' as AcademiaSlug,
    name: 'HISTORY',
    descriptor: 'Korean History / Lecture / Archive',
    previewLabel: 'History / Lecture / Research',
  },
  {
    slug: 'cad' as AcademiaSlug,
    name: 'CAD',
    descriptor: 'Mechanical Drawing / CAD / Design',
    previewLabel: 'ARCHIVE IN PREPARATION',
  },
];
