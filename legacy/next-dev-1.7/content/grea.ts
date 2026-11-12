export type GreaLine = 'EXERCITUS' | 'FABER' | 'VESTIS';
export type GreaSystem = 'INSIGNIA' | 'CUSTOM';
export type GreaProductStatus = 'ACTIVE' | 'DEVELOPMENT' | 'SAMPLE' | 'CONCEPT' | 'ARCHIVE';
export type GreaFieldCategory = 'APPAREL' | 'CARRY' | 'HOLD' | 'ACCESSORY';
export type CustomType = 'GRAPHIC' | 'FUNCTIONAL' | 'INSIGNIA' | 'VARIANT';
export type GreaRelationType = 'COMPATIBLE' | 'INSIGNIA' | 'CUSTOM_OPTION' | 'ACCESSORY' | 'REPLACEMENT';

export type FieldTest = { name: string; tested: boolean; result?: string };
export type CustomCapability = { available: boolean; type?: CustomType[] };
export type GreaProductRelation = {
  sourceProductId: string;
  targetProductId: string;
  type: GreaRelationType;
  confirmed: boolean;
  note?: string;
};

export type GreaProduct = {
  id: string;
  slug: string;
  line: GreaLine;
  title: string;
  koreanTitle?: string;
  status: GreaProductStatus;
  category?: string;
  functionalLabel: string;
  descriptor: string;
  statement: string;
  images?: string[];
  customAvailable?: boolean;
  custom?: CustomCapability;
  compatibleInsignia?: string[];
  productionMethods?: string[];
  specifications?: { dimensions?: string; weight?: string; material?: string };
  field?: {
    problem?: string;
    solution?: string;
    compatibility?: string[];
    tests?: FieldTest[];
  };
};

export const greaLines = [
  { id:'GE', line:'EXERCITUS' as const, route:'/grea/exercitus', role:'DEDICATION', functionalLabel:'MILITARY APPAREL', koreanLabel:'군 관련 의류', statement:'FOR SERVICE.', motivation:'I WANT TO REPRESENT WHAT I SERVE.', status:'ACTIVE' as const, index:'01', motion:['IDENTIFY','MARK','ISSUE'] },
  { id:'GF', line:'FABER' as const, route:'/grea/faber', role:'WORK', functionalLabel:'WORKWEAR & FIELD EQUIPMENT', koreanLabel:'작업복 · 현장용품', statement:'FOR WORK.', motivation:'I NEED SOMETHING THAT WORKS.', status:'DEVELOPMENT' as const, index:'02', motion:['OPEN','ACCESS','LOCK'] },
  { id:'GV', line:'VESTIS' as const, route:'/grea/vestis', role:'EXPRESSION', functionalLabel:'GRAPHIC APPAREL', koreanLabel:'그래픽 의류', statement:'FOR EXPRESSION.', motivation:'I WANT TO WEAR THIS DESIGN.', status:'DEVELOPMENT' as const, index:'03', motion:['FRAME','REVEAL','WEAR'] },
];

export const greaSystems = [
  { id:'GI', system:'INSIGNIA' as const, route:'/grea/insignia', functionalLabel:'PATCHES & MARKS', koreanLabel:'패치 · 표식', statement:'MARK IT.', motivation:'I WANT TO MARK IT.', status:'DEVELOPMENT' as const },
  { id:'GC', system:'CUSTOM' as const, route:'/grea/custom', functionalLabel:'PRODUCT CUSTOMIZATION', koreanLabel:'제품별 커스터마이징', statement:'MAKE IT YOURS.', motivation:'I WANT TO MAKE IT MINE.', status:'DEVELOPMENT' as const },
];

export const faberProductTypes: GreaFieldCategory[] = ['APPAREL','CARRY','HOLD','ACCESSORY'];

export const greaProducts: GreaProduct[] = [
  {
    id:'GF-001', slug:'field-pouch-01', line:'FABER', title:'FIELD POUCH 01', koreanTitle:'필드 파우치 01', status:'CONCEPT', category:'CARRY', functionalLabel:'WORK / CARRY', statement:'BUILT FOR THE WORK.',
    descriptor:'작업 중 자주 사용하는 소형 공구를 정리하고 빠르게 접근하기 위한 현장용 Pouch Concept.',
    customAvailable:true, custom:{available:true,type:['FUNCTIONAL','INSIGNIA']}, compatibleInsignia:['GI-001'], productionMethods:[],
    specifications:{dimensions:'TO BE DEFINED',weight:'TO BE DEFINED',material:'TO BE DEFINED'},
    field:{
      problem:'커터, 마커, 줄자와 소형 공구가 한 공간에 섞여 필요한 도구를 빠르게 꺼내기 어렵다는 사용 상황을 가정합니다.',
      solution:'도구 위치를 분리하고, 접근 방향과 부착 지점을 명확하게 만드는 구조를 검토합니다.',
      compatibility:['ATTACHMENT STANDARD — TO BE DEFINED','RELATED INSIGNIA — GI-001 / CONCEPT RELATION'],
      tests:[
        {name:'GLOVE ACCESS',tested:false},{name:'ONE-HAND ACCESS',tested:false},{name:'DROP',tested:false},{name:'ABRASION',tested:false},{name:'LOAD',tested:false},{name:'DUST',tested:false},{name:'FIELD USE',tested:false},
      ],
    },
  },
  {
    id:'GV-001', slug:'graphic-tee-01', line:'VESTIS', title:'GRAPHIC TEE 01', koreanTitle:'그래픽 티 01', status:'SAMPLE', category:'GRAPHIC APPAREL', functionalLabel:'GRAPHIC APPAREL', statement:'WEAR WHAT YOU CHOOSE.',
    descriptor:'GREA 자체 Graphic Design Language와 ARTWORK → PLACEMENT → GARMENT 전환을 평가하기 위한 Sample Graphic Apparel.', customAvailable:false, custom:{available:false}, productionMethods:[],
  },
  {
    id:'GI-001', slug:'identity-patch-01', line:'FABER', title:'IDENTITY PATCH 01', koreanTitle:'아이덴티티 패치 01', status:'CONCEPT', category:'PATCH / MARK', functionalLabel:'PATCH / MARK', statement:'MARK IT.',
    descriptor:'Cross-line INSIGNIA interaction을 평가하기 위한 Mark Component Concept. 실제 규격·부착 방식·호환성은 확정되지 않았습니다.', customAvailable:true, custom:{available:true,type:['INSIGNIA']}, productionMethods:[],
  },
];

export const greaProductRelations: GreaProductRelation[] = [
  {
    sourceProductId:'GF-001', targetProductId:'GI-001', type:'INSIGNIA', confirmed:false,
    note:'Architecture evaluation only. Actual attachment standard and compatibility are TO BE DEFINED.',
  },
];

export function getGreaProduct(idOrSlug: string) {
  return greaProducts.find((product) => product.id === idOrSlug || product.slug === idOrSlug);
}

export function getGreaRelations(productId: string, includeUnconfirmed = false) {
  return greaProductRelations.filter((r) => (r.sourceProductId === productId || r.targetProductId === productId) && (includeUnconfirmed || r.confirmed));
}
