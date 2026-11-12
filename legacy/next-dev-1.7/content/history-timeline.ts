export type HistoryLayer =
  | 'CONFLICT'
  | 'POWER'
  | 'CONTEST'
  | 'PEOPLE'
  | 'SYSTEM'
  | 'CULTURE'
  | 'RELIGION'
  | 'ECONOMY'
  | 'DIPLOMACY';

export type EraLayout =
  | 'EVIDENCE'
  | 'PARALLEL_POLITIES'
  | 'DUAL_POLITIES'
  | 'LAYERED_PERIOD'
  | 'HIERARCHICAL_POWER'
  | 'CORE_SPINE_LENS';

export type EvidenceLevel = 'LIMITED' | 'MODERATE' | 'EXTENSIVE';
export type PolityType = 'KINGDOM' | 'CONFEDERACY' | 'POLITY_GROUP' | 'COLONIAL_RULE' | 'MODERN_STATE' | 'OTHER';
export type HistoryRelationType = 'CAUSE' | 'CONSEQUENCE' | 'CONTEMPORARY' | 'POWER_CONTEXT' | 'CONFLICT_CONTEXT' | 'CONTEST_CONTEXT' | 'CONTINUITY' | 'TRANSITION';

export interface HistoryEra {
  id: string;
  title: string;
  koreanTitle: string;
  rangeLabel: string;
  start?: number;
  end?: number;
  masterWeight: number;
  layout: EraLayout;
  evidenceLevel?: EvidenceLevel;
  summaryThemes?: string[];
  polityIds?: string[];
  availableLayers?: HistoryLayer[];
  motionVerb: 'REVEAL' | 'SPLIT' | 'CONTINUE / EMERGE' | 'LAYER / EXPAND' | 'BRANCH' | 'FILTER / OVERLAY';
}

export interface HistoryPolity {
  id: string;
  eraId: string;
  title: string;
  koreanTitle: string;
  type: PolityType;
  start?: number;
  end?: number;
  continuesFrom?: string[];
  transitionsTo?: string[];
}

export interface HistoryPeriodBand {
  id: string;
  eraId: string;
  polityId?: string;
  layer: HistoryLayer;
  title: string;
  koreanTitle?: string;
  start?: number;
  end?: number;
  subtype?: string;
  whyGrouped?: string;
  keyEventIds?: string[];
  relatedPeriodIds?: string[];
  evidenceNote?: string;
  authorNote?: string;
}

export interface HistoryEventNode {
  id: string;
  eraId: string;
  polityId?: string;
  periodId?: string;
  title: string;
  koreanTitle: string;
  start?: number;
  end?: number;
  dateLabel: string;
  layer: HistoryLayer;
  summary?: string;
  cause?: string[];
  people?: string[];
  sequence?: string[];
  result?: string[];
  relatedEventIds?: string[];
  archiveLinks?: string[];
  sourceNote?: string;
  authorNote?: string;
}

export interface HistoricalRelation {
  sourceId: string;
  targetId: string;
  type: HistoryRelationType;
  description?: string;
}

export const historyLayerLabels: Record<HistoryLayer, { en: string; ko: string }> = {
  CONFLICT: { en: 'CONFLICT', ko: '전쟁·군사충돌' },
  POWER: { en: 'POWER', ko: '권력·정치질서' },
  CONTEST: { en: 'CONTEST', ko: '쟁탈·저항·정변' },
  PEOPLE: { en: 'PEOPLE', ko: '인물' },
  SYSTEM: { en: 'SYSTEM', ko: '제도' },
  CULTURE: { en: 'CULTURE', ko: '문화' },
  RELIGION: { en: 'RELIGION', ko: '종교' },
  ECONOMY: { en: 'ECONOMY', ko: '경제' },
  DIPLOMACY: { en: 'DIPLOMACY', ko: '외교' },
};

export const historyTimelineEras: HistoryEra[] = [
  { id:'gojoseon', title:'GOJOSEON', koreanTitle:'고조선', rangeLabel:'EVIDENCE-LIMITED ANCIENT', masterWeight:0.8, layout:'EVIDENCE', evidenceLevel:'LIMITED', summaryThemes:['EVIDENCE','POLITY','CONFLICT'], availableLayers:['POWER','CONFLICT','SYSTEM'], motionVerb:'REVEAL' },
  { id:'early-states', title:'EARLY STATES', koreanTitle:'초기국가', rangeLabel:'EARLY POLITIES', masterWeight:0.65, layout:'EVIDENCE', evidenceLevel:'LIMITED', summaryThemes:['POLITIES','SYSTEM','CULTURE'], availableLayers:['POWER','SYSTEM','CULTURE'], motionVerb:'REVEAL' },
  { id:'three-kingdoms', title:'THREE KINGDOMS', koreanTitle:'삼국', rangeLabel:'c. 1C BCE—7C', start:-100, end:700, masterWeight:1.5, layout:'PARALLEL_POLITIES', evidenceLevel:'MODERATE', summaryThemes:['STATE FORMATION','BUDDHISM','LAW','HAN RIVER','UNIFICATION'], polityIds:['goguryeo','baekje','silla','gaya'], availableLayers:['RELIGION','SYSTEM','CONFLICT','POWER'], motionVerb:'SPLIT' },
  { id:'north-south', title:'NORTH–SOUTH STATES', koreanTitle:'남북국', rangeLabel:'698—10C', start:654, end:936, masterWeight:1.0, layout:'DUAL_POLITIES', evidenceLevel:'MODERATE', summaryThemes:['SILLA CONTINUITY','BALHAE EMERGENCE','DUAL POLITIES','LATE SILLA'], polityIds:['silla','balhae'], availableLayers:['POWER','CONTEST','DIPLOMACY','CULTURE'], motionVerb:'CONTINUE / EMERGE' },
  { id:'goryeo', title:'GORYEO', koreanTitle:'고려', rangeLabel:'918—1392', start:918, end:1392, masterWeight:1.25, layout:'LAYERED_PERIOD', evidenceLevel:'EXTENSIVE', summaryThemes:['CONFLICT','POWER','CONTEST'], availableLayers:['CONFLICT','POWER','CONTEST','SYSTEM','CULTURE'], motionVerb:'LAYER / EXPAND' },
  { id:'joseon', title:'JOSEON', koreanTitle:'조선', rangeLabel:'1392—1910', start:1392, end:1910, masterWeight:1.55, layout:'HIERARCHICAL_POWER', evidenceLevel:'EXTENSIVE', summaryThemes:['POLITICAL ORDER','FACTIONS','SYSTEM','CONFLICT'], availableLayers:['POWER','CONFLICT','CONTEST','SYSTEM','CULTURE'], motionVerb:'BRANCH' },
  { id:'modern-transition', title:'MODERN TRANSITION', koreanTitle:'근대', rangeLabel:'19C—1910', masterWeight:0.85, layout:'CORE_SPINE_LENS', evidenceLevel:'EXTENSIVE', summaryThemes:['REFORM','DIPLOMACY','STATE TRANSITION'], availableLayers:['POWER','CONTEST','SYSTEM','DIPLOMACY'], motionVerb:'FILTER / OVERLAY' },
  { id:'colonial', title:'COLONIAL PERIOD', koreanTitle:'일제강점기', rangeLabel:'1910—1945', start:1910, end:1945, masterWeight:0.9, layout:'CORE_SPINE_LENS', evidenceLevel:'EXTENSIVE', summaryThemes:['COLONIAL RULE','INDEPENDENCE MOVEMENTS','SOCIETY'], availableLayers:['CONTEST','CONFLICT','PEOPLE','CULTURE'], motionVerb:'FILTER / OVERLAY' },
  { id:'modern', title:'MODERN', koreanTitle:'현대', rangeLabel:'1945—PRESENT', start:1945, end:2026, masterWeight:1.2, layout:'CORE_SPINE_LENS', evidenceLevel:'EXTENSIVE', summaryThemes:['CORE SPINE','POLITICS','ECONOMY','DEMOCRACY','INTER-KOREAN'], availableLayers:['POWER','CONFLICT','CONTEST','ECONOMY','DIPLOMACY','CULTURE'], motionVerb:'FILTER / OVERLAY' },
];

export const historyPolities: HistoryPolity[] = [
  { id:'goguryeo', eraId:'three-kingdoms', title:'GOGURYEO', koreanTitle:'고구려', type:'KINGDOM', start:-37, end:668, transitionsTo:[] },
  { id:'baekje', eraId:'three-kingdoms', title:'BAEKJE', koreanTitle:'백제', type:'KINGDOM', start:-18, end:660, transitionsTo:[] },
  { id:'silla', eraId:'three-kingdoms', title:'SILLA', koreanTitle:'신라', type:'KINGDOM', start:-57, end:935, transitionsTo:['silla-north-south'] },
  { id:'gaya', eraId:'three-kingdoms', title:'GAYA POLITIES', koreanTitle:'가야 여러 정치체', type:'POLITY_GROUP', start:42, end:562, transitionsTo:['silla'] },
  { id:'silla-north-south', eraId:'north-south', title:'SILLA', koreanTitle:'신라', type:'KINGDOM', start:654, end:935, continuesFrom:['silla'], transitionsTo:[] },
  { id:'balhae', eraId:'north-south', title:'BALHAE', koreanTitle:'발해', type:'KINGDOM', start:698, end:926, continuesFrom:[], transitionsTo:[] },
  { id:'later-baekje', eraId:'north-south', title:'LATER BAEKJE', koreanTitle:'후백제', type:'KINGDOM', start:900, end:936, transitionsTo:['goryeo-polity'] },
  { id:'later-goguryeo', eraId:'north-south', title:'LATER GOGURYEO', koreanTitle:'후고구려', type:'KINGDOM', start:901, end:918, transitionsTo:['goryeo-polity'] },
  { id:'goryeo-polity', eraId:'goryeo', title:'GORYEO', koreanTitle:'고려', type:'KINGDOM', start:918, end:1392, continuesFrom:['later-goguryeo'], transitionsTo:[] },
];

export const threeKingdomLensEvents: HistoryEventNode[] = [
  { id:'goguryeo-buddhism-372', eraId:'three-kingdoms', polityId:'goguryeo', title:'BUDDHISM RECOGNIZED', koreanTitle:'불교 수용', start:372, dateLabel:'372', layer:'RELIGION', summary:'소수림왕대 불교 수용.', sourceNote:'국사편찬위원회 우리역사넷 — 삼국 시대의 종교와 사상' },
  { id:'baekje-buddhism-384', eraId:'three-kingdoms', polityId:'baekje', title:'BUDDHISM RECOGNIZED', koreanTitle:'불교 수용', start:384, dateLabel:'384', layer:'RELIGION', summary:'침류왕대 불교 수용.', sourceNote:'국사편찬위원회 우리역사넷 — 삼국 시대의 종교와 사상' },
  { id:'silla-buddhism-527', eraId:'three-kingdoms', polityId:'silla', title:'BUDDHISM RECOGNIZED', koreanTitle:'불교 공인', start:527, dateLabel:'527', layer:'RELIGION', summary:'법흥왕대 이차돈 순교 이후 불교 공인.', sourceNote:'국사편찬위원회 우리역사넷 — 삼국 시대의 종교와 사상' },
  { id:'goguryeo-law-373', eraId:'three-kingdoms', polityId:'goguryeo', title:'LAW CODE', koreanTitle:'율령 반포', start:373, dateLabel:'373', layer:'SYSTEM', summary:'소수림왕대 율령 반포.', sourceNote:'국사편찬위원회 우리역사넷 — 율령 반포' },
  { id:'silla-law-520', eraId:'three-kingdoms', polityId:'silla', title:'LAW CODE', koreanTitle:'율령 반포', start:520, dateLabel:'520', layer:'SYSTEM', summary:'법흥왕 7년 율령 반포.', sourceNote:'국사편찬위원회 우리역사넷 — 신라 율령 반포' },
  { id:'hanseong-475', eraId:'three-kingdoms', polityId:'baekje', title:'HANSEONG FALLS', koreanTitle:'한성 함락', start:475, dateLabel:'475', layer:'CONFLICT', summary:'고구려의 남진과 백제의 한강 유역 상실을 보여주는 기준점.' },
  { id:'han-river-551', eraId:'three-kingdoms', title:'ALLIED ADVANCE', koreanTitle:'백제·신라 한강 유역 진출', start:551, dateLabel:'551', layer:'CONFLICT', summary:'백제와 신라가 고구려를 공격해 한강 하류·상류 지역을 나누어 확보.', sourceNote:'국사편찬위원회 우리역사넷 — 한강유역의 상실 / 나제동맹' },
  { id:'han-river-553', eraId:'three-kingdoms', polityId:'silla', title:'SILLA TAKES LOWER HAN', koreanTitle:'신라 한강 하류 장악', start:553, dateLabel:'553', layer:'CONFLICT', summary:'신라가 백제가 확보한 한강 하류 지역을 차지.', sourceNote:'국사편찬위원회 우리역사넷 — 한강유역의 상실 / 진흥왕' },
  { id:'gaya-integration', eraId:'three-kingdoms', polityId:'gaya', title:'GAYA POLITIES INTEGRATED', koreanTitle:'가야 여러 정치체의 신라 병합', start:532, end:562, dateLabel:'532—562', layer:'POWER', summary:'금관가야와 대가야 등 가야 여러 정치체가 단계적으로 신라 영역에 편입.' },
  { id:'baekje-end-660', eraId:'three-kingdoms', polityId:'baekje', title:'BAEKJE ENDS', koreanTitle:'백제 멸망', start:660, dateLabel:'660', layer:'CONFLICT' },
  { id:'goguryeo-end-668', eraId:'three-kingdoms', polityId:'goguryeo', title:'GOGURYEO ENDS', koreanTitle:'고구려 멸망', start:668, dateLabel:'668', layer:'CONFLICT' },
  { id:'silla-consolidation-676', eraId:'three-kingdoms', polityId:'silla', title:'SILLA CONTINUES', koreanTitle:'신라의 통합 질서 형성', start:676, dateLabel:'676', layer:'POWER', summary:'나당 전쟁 이후 신라의 지배 질서가 한반도 남부에서 이어짐.' },
  { id:'balhae-emerge-698', eraId:'north-south', polityId:'balhae', title:'BALHAE EMERGES', koreanTitle:'발해 성립', start:698, dateLabel:'698', layer:'POWER', summary:'고구려 멸망 뒤의 역사적 맥락 속에서 새로운 북방 정치체가 성립.' },
];

export const historyPeriodsV2: HistoryPeriodBand[] = [
  { id:'goryeo-khitan', eraId:'goryeo', layer:'CONFLICT', title:'KHITAN CONFLICTS', koreanTitle:'거란 침입', start:993, end:1019, subtype:'MILITARY CONFLICT', whyGrouped:'세 차례의 거란 침입을 고려의 외교·방어·반격이 연결된 하나의 대외 충돌기로 묶는다.', keyEventIds:['khitan-993','khitan-1010','khitan-1018'], relatedPeriodIds:['goryeo-state-consolidation'], authorNote:'993 서희 / 1010 양규 / 1018~1019 강감찬이라는 기준점을 먼저 잡는다.' },
  { id:'goryeo-jurchen', eraId:'goryeo', layer:'CONFLICT', title:'JURCHEN CONFLICT', koreanTitle:'여진 대응', start:1107, end:1109, subtype:'MILITARY CONFLICT', whyGrouped:'별무반·정벌·동북 9성을 하나의 대응 과정으로 본다.' },
  { id:'goryeo-mongol', eraId:'goryeo', layer:'CONFLICT', title:'MONGOL INVASIONS', koreanTitle:'몽골 침입과 장기 항쟁', start:1231, end:1259, subtype:'MILITARY CONFLICT', whyGrouped:'반복 침입과 강화 천도, 장기 항쟁을 하나의 전쟁기로 묶는다.', relatedPeriodIds:['goryeo-military-regime','goryeo-sambyeolcho'] },
  { id:'goryeo-state-consolidation', eraId:'goryeo', layer:'POWER', title:'STATE CONSOLIDATION', koreanTitle:'건국·통치체제 정비', start:918, end:1009, whyGrouped:'건국과 후삼국 통합, 왕권·제도 정비를 초기 정치질서의 형성과정으로 묶는다.' },
  { id:'goryeo-aristocratic', eraId:'goryeo', layer:'POWER', title:'ARISTOCRATIC ORDER', koreanTitle:'문벌 중심 정치질서', start:1009, end:1170, whyGrouped:'특정 한 가문이 아니라 문벌귀족 중심의 정치질서를 Master Level에서 다룬다.' },
  { id:'goryeo-military-regime', eraId:'goryeo', layer:'POWER', title:'MILITARY REGIME', koreanTitle:'무신정권', start:1170, end:1270, whyGrouped:'1170년 무신정변 이후 무신 집권질서가 지속된 시기를 하나의 Power Band로 본다.' },
  { id:'goryeo-yuan-interference', eraId:'goryeo', layer:'POWER', title:'YUAN INTERFERENCE / POWERFUL FAMILIES', koreanTitle:'원 간섭기와 권문세족', start:1270, end:1356, whyGrouped:'대원 관계와 고려 내부 권력구조의 변화가 결합된 정치질서를 큰 층위에서 보여준다.' },
  { id:'goryeo-reform-literati', eraId:'goryeo', layer:'POWER', title:'REFORM / NEW LITERATI', koreanTitle:'개혁정치와 신진사대부', start:1356, end:1392, whyGrouped:'공민왕대 개혁과 신진사대부 성장, 왕조 교체로 이어지는 후기 변화를 묶는다.' },
  { id:'goryeo-social-resistance', eraId:'goryeo', layer:'CONTEST', title:'SOCIAL RESISTANCE PERIOD', koreanTitle:'12세기 후반 사회 저항', start:1176, end:1198, subtype:'POPULAR RESISTANCE', whyGrouped:'망이·망소이, 김사미·효심, 만적 등 서로 다른 사건을 “12세기 후반 사회 저항”이라는 교육적 비교 기간으로 묶은 것.', authorNote:'개별 사건을 먼저 외우기보다 무신정권기 사회 변화의 맥락에서 한 묶음으로 보고 이후 세부 사건을 펼친다.' },
  { id:'goryeo-sambyeolcho', eraId:'goryeo', layer:'CONTEST', title:'SAMBYEOLCHO RESISTANCE', koreanTitle:'삼별초 항쟁', start:1270, end:1273, subtype:'MILITARY RESISTANCE', whyGrouped:'개경 환도 이후 삼별초의 저항을 별도의 Contest Period로 표시한다.' },
];

export const goryeoEvents: HistoryEventNode[] = [
  { id:'khitan-993', eraId:'goryeo', periodId:'goryeo-khitan', title:'FIRST KHITAN INVASION', koreanTitle:'거란 1차 침입', start:993, dateLabel:'993', layer:'CONFLICT', people:['서희'], archiveLinks:['goryeo-khitan-war'], authorNote:'서희 담판과 강동 6주를 함께 연결.' },
  { id:'khitan-1010', eraId:'goryeo', periodId:'goryeo-khitan', title:'SECOND KHITAN INVASION', koreanTitle:'거란 2차 침입', start:1010, dateLabel:'1010', layer:'CONFLICT', people:['양규'], archiveLinks:['goryeo-khitan-war'] },
  { id:'khitan-1018', eraId:'goryeo', periodId:'goryeo-khitan', title:'THIRD KHITAN INVASION', koreanTitle:'거란 3차 침입·귀주대첩', start:1018, end:1019, dateLabel:'1018—1019', layer:'CONFLICT', people:['강감찬'], archiveLinks:['goryeo-khitan-war'] },
  { id:'jurchen-1107', eraId:'goryeo', periodId:'goryeo-jurchen', title:'JURCHEN CAMPAIGN', koreanTitle:'여진 정벌과 동북 9성', start:1107, end:1109, dateLabel:'1107—1109', layer:'CONFLICT', people:['윤관'], archiveLinks:['goryeo-jurchen-conflict'] },
  { id:'mongol-1231', eraId:'goryeo', periodId:'goryeo-mongol', title:'MONGOL INVASIONS', koreanTitle:'몽골 침입', start:1231, dateLabel:'1231—', layer:'CONFLICT', archiveLinks:['goryeo-mongol-war'] },
  { id:'ganghwa-1232', eraId:'goryeo', periodId:'goryeo-mongol', title:'CAPITAL TO GANGHWA', koreanTitle:'강화 천도', start:1232, dateLabel:'1232', layer:'POWER', archiveLinks:['goryeo-mongol-war'] },
  { id:'peace-1259', eraId:'goryeo', periodId:'goryeo-mongol', title:'PEACE WITH MONGOL', koreanTitle:'몽골과 강화', start:1259, dateLabel:'1259', layer:'CONFLICT', archiveLinks:['goryeo-mongol-war'] },
  { id:'sambyeolcho-1270', eraId:'goryeo', periodId:'goryeo-sambyeolcho', title:'SAMBYEOLCHO RESISTANCE', koreanTitle:'삼별초 항쟁', start:1270, end:1273, dateLabel:'1270—1273', layer:'CONTEST', archiveLinks:['goryeo-mongol-war'] },
];

export const joseonPowerOrders = [
  { id:'royal-consolidation', title:'ROYAL CONSOLIDATION', koreanTitle:'왕조·왕권 기반 정비', range:'15C' },
  { id:'hungu-order', title:'HUNGU-DOMINANT ORDER', koreanTitle:'훈구 중심 정치질서', range:'LATE 15C—16C' },
  { id:'sarim-expansion', title:'SARIM EXPANSION', koreanTitle:'사림의 성장', range:'16C' },
  { id:'factional-politics', title:'FACTIONAL POLITICS', koreanTitle:'붕당정치', range:'LATE 16C—17C' },
  { id:'hwanguk-politics', title:'HWANGUK POLITICS', koreanTitle:'환국정치', range:'LATE 17C' },
  { id:'tangpyeong-politics', title:'TANGPYEONG POLITICS', koreanTitle:'탕평정치', range:'18C' },
  { id:'sedo-politics', title:'SEDO POLITICS', koreanTitle:'세도정치', range:'19C' },
];

export const joseonFactionTree = [
  { id:'sarim', label:'SARIM', ko:'사림', parent:null },
  { id:'easterners', label:'EASTERNERS', ko:'동인', parent:'sarim' },
  { id:'westerners', label:'WESTERNERS', ko:'서인', parent:'sarim' },
  { id:'southerners', label:'SOUTHERNERS', ko:'남인', parent:'easterners' },
  { id:'northerners', label:'NORTHERNERS', ko:'북인', parent:'easterners' },
  { id:'noron', label:'NORON', ko:'노론', parent:'westerners' },
  { id:'soron', label:'SORON', ko:'소론', parent:'westerners' },
];

export const modernCoreSpine = [
  { id:'liberation-1945', year:'1945', title:'LIBERATION', ko:'광복' },
  { id:'state-formation-1948', year:'1948', title:'STATE FORMATION', ko:'대한민국 정부 수립' },
  { id:'korean-war-1950', year:'1950—1953', title:'KOREAN WAR', ko:'한국전쟁' },
  { id:'political-transition-1960', year:'1960', title:'POLITICAL TRANSITION', ko:'4·19 혁명과 정치질서 변화' },
  { id:'democratization-1987', year:'1987', title:'DEMOCRATIZATION', ko:'6월 민주항쟁과 헌정질서 변화' },
  { id:'contemporary', year:'1990s—', title:'CONTEMPORARY PERIOD', ko:'현대 사회의 다층적 전개' },
];

export const modernLenses = {
  POLITICS: [ ['1948','정부 수립'], ['1960','4·19 혁명'], ['1987','헌정질서 변화'] ],
  ECONOMY: [ ['1960s','경제개발 계획'], ['1970s','산업구조 변화'], ['1997','외환위기'] ],
  SOCIETY: [ ['1945—','인구·도시·교육 변화'], ['1980s—','시민사회 확대'] ],
  DIPLOMACY: [ ['1965','한일 국교 정상화'], ['1990s—','냉전 이후 외교환경 변화'] ],
  'INTER-KOREAN': [ ['1972','7·4 남북 공동성명'], ['2000','남북 정상회담'] ],
  DEMOCRACY: [ ['1960','4·19 혁명'], ['1980','5·18 민주화운동'], ['1987','6월 민주항쟁'] ],
  CULTURE: [ ['1960s—','대중문화의 변화'], ['1990s—','미디어·문화산업 확장'] ],
} as const;

export const historicalRelations: HistoricalRelation[] = [
  { sourceId:'goryeo-mongol', targetId:'goryeo-military-regime', type:'POWER_CONTEXT', description:'몽골 침입기의 대응은 무신정권의 권력구조와 함께 읽어야 한다.' },
  { sourceId:'goryeo-mongol', targetId:'goryeo-sambyeolcho', type:'CONTEST_CONTEXT', description:'강화와 개경 환도 이후 삼별초 항쟁이 이어진다.' },
  { sourceId:'silla', targetId:'silla-north-south', type:'CONTINUITY', description:'삼국시대 신라의 국가선은 남북국 시기에도 이어진다.' },
  { sourceId:'goguryeo', targetId:'balhae', type:'TRANSITION', description:'고구려 멸망 뒤의 역사적 맥락과 유민·북방질서 속에서 발해가 성립한다. 단순한 직선 승계로 표현하지 않는다.' },
];

export function timelineEraById(id:string){ return historyTimelineEras.find(era=>era.id===id); }
export function eventById(id:string){ return [...threeKingdomLensEvents,...goryeoEvents].find(event=>event.id===id); }
