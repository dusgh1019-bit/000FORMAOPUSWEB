export type HistoryCategory = 'TIMELINE' | 'PEOPLE' | 'EVENTS' | 'WAR' | 'CULTURE' | 'SYSTEM' | 'EXAM';
export type HistoryFormat = 'MICRO' | 'NOTE' | 'DOSSIER' | 'TIMELINE' | 'MAP';
export type HistoryPeriod = 'ANCIENT' | 'THREE KINGDOMS' | 'NORTH–SOUTH STATES' | 'GORYEO' | 'JOSEON' | 'KOREAN EMPIRE' | 'COLONIAL PERIOD' | 'MODERN';
export type HistoryAccess = 'OPEN';
export type PrintEditionStatus = 'PLANNED' | 'AVAILABLE';

export type HistorySection = {
  id: string;
  label: string;
  title?: string;
  paragraphs?: string[];
  points?: string[];
};

export type HistoryCrossLink = { label: string; slug: string; relation?: string };
export type HistorySeriesDefinition = { id: string; title: string; koreanTitle: string; status: 'WORKING TITLE' | 'LOCKED'; description: string };

export type HistoryArchiveItem = {
  slug: string;
  archiveNo: string;
  title: string;
  koreanTitle: string;
  period: HistoryPeriod;
  category: HistoryCategory;
  format: HistoryFormat;
  dateLabel: string;
  keywords: string[];
  people?: string[];
  relatedEvents?: string[];
  seriesId?: string;
  subSeries?: string;
  summary: string;
  access: HistoryAccess;
  sections: HistorySection[];
  related: string[];
  crossLinks?: HistoryCrossLink[];
  authorsNote?: string[];
  printEdition?: { status: PrintEditionStatus; label: string; href?: string };
};

export type HorizontalHistoryBand = {
  slug: string;
  label: string;
  koreanLabel: string;
  start: number;
  end: number;
  lane: number;
  note: string;
};

export const historyPeriods: HistoryPeriod[] = [
  'ANCIENT','THREE KINGDOMS','NORTH–SOUTH STATES','GORYEO','JOSEON','KOREAN EMPIRE','COLONIAL PERIOD','MODERN',
];
export const historyCategories: HistoryCategory[] = ['TIMELINE','PEOPLE','EVENTS','WAR','CULTURE','SYSTEM','EXAM'];
export const historyFormats: HistoryFormat[] = ['MICRO','NOTE','DOSSIER','TIMELINE','MAP'];

export const historySeries: HistorySeriesDefinition[] = [
  {
    id:'my-own-history',
    title:'MY OWN HISTORY',
    koreanTitle:'내 좋대로 한국사',
    status:'WORKING TITLE',
    description:'교과서 목차보다 관계·흐름·비교·암기 구조를 우선해 다시 배열하는 개인 편집형 한국사 자료 SERIES.',
  },
];

export const historyHorizontalMap = {
  title:'GORYEO / FOREIGN PRESSURE MAP',
  koreanTitle:'고려 대외관계 흐름',
  start:918,
  end:1392,
  bands:[
    {slug:'goryeo-khitan-war',label:'KHITAN',koreanLabel:'거란',start:993,end:1019,lane:0,note:'993 → 1010 → 1018/1019'},
    {slug:'goryeo-jurchen-conflict',label:'JURCHEN',koreanLabel:'여진',start:1104,end:1109,lane:1,note:'별무반 → 1107 정벌 → 동북 9성'},
    {slug:'goryeo-mongol-war',label:'MONGOL',koreanLabel:'몽골',start:1231,end:1270,lane:2,note:'침입 → 강화 천도 → 강화 → 개경 환도'},
    {slug:'goryeo-political-history',label:'LATE GORYEO',koreanLabel:'고려 후기',start:1270,end:1392,lane:3,note:'원 간섭기 → 공민왕 → 신진사대부'},
  ] as HorizontalHistoryBand[],
};

export const historyRelations = [
  {
    id:'goryeo-pressure', label:'RELATION 01', title:'GORYEO / EXTERNAL PRESSURE', koreanTitle:'고려 대외관계',
    nodes:[
      {slug:'goryeo-khitan-war',label:'KHITAN',ko:'거란'},
      {slug:'goryeo-jurchen-conflict',label:'JURCHEN',ko:'여진'},
      {slug:'goryeo-mongol-war',label:'MONGOL',ko:'몽골'},
      {slug:'goryeo-political-history',label:'LATE GORYEO',ko:'고려 후기'},
    ],
  },
  {
    id:'buddhist-network', label:'RELATION 02', title:'BUDDHIST FIGURES', koreanTitle:'불교 인물 연결',
    nodes:[
      {slug:'wonhyo',label:'WONHYO',ko:'원효'},
      {slug:'buddhist-figures',label:'COMPARE',ko:'인물 비교'},
      {slug:'goryeo-political-history',label:'GORYEO',ko:'고려'},
    ],
  },
];

export const historyArchive: HistoryArchiveItem[] = [
  {
    slug:'goguryeo-sui-war', archiveNo:'DOSSIER 001', title:'GOGURYEO–SUI WAR', koreanTitle:'고구려-수 전쟁',
    period:'THREE KINGDOMS', category:'WAR', format:'DOSSIER', dateLabel:'598—614',
    keywords:['고구려','수','을지문덕','살수대첩','영양왕','수 양제'], people:['을지문덕','영양왕','수 양제'], relatedEvents:['살수대첩'],
    seriesId:'my-own-history', subSeries:'내 좋대로 전쟁사',
    summary:'고구려와 수의 충돌을 단일 전투가 아니라 반복 원정, 보급, 산성 방어, 살수대첩이라는 흐름으로 연결해 읽는다.', access:'OPEN',
    sections:[
      {id:'overview',label:'01 — OVERVIEW',paragraphs:['수의 중국 재통일 이후 고구려는 요동과 만주 일대의 독자적 세력을 유지했다. 양국의 충돌은 국경 분쟁을 넘어 동북아 주도권 경쟁으로 확대되었다.']},
      {id:'background',label:'02 — BACKGROUND',points:['598년 수 문제의 원정','수 양제의 대규모 원정과 장거리 보급 문제','요동성 등 산성 중심의 방어체계']},
      {id:'timeline',label:'03 — TIMELINE',points:['598 — 수의 첫 대규모 원정 실패','612 — 수 양제의 대원정과 살수대첩','613·614 — 추가 원정과 수 내부의 정치적 부담 확대']},
      {id:'exam',label:'07 — EXAM POINT',points:['살수대첩 — 612년','고구려-수 전쟁과 이후 고구려-당 전쟁을 구분']},
    ],
    related:['king-gwanggaeto','goryeo-khitan-war','buddhist-figures'], crossLinks:[{label:'광개토대왕',slug:'king-gwanggaeto',relation:'PEOPLE'}],
    authorsNote:['598 → 612 → 613·614의 순서를 먼저 잡고, “수의 반복 원정”이라는 큰 구조 안에서 살수대첩을 위치시키면 전쟁 전체가 덜 섞인다.'],
    printEdition:{status:'PLANNED',label:'A4 / PRINT EDITION'},
  },
  {
    slug:'king-gwanggaeto', archiveNo:'PEOPLE 002', title:'KING GWANGGAETO', koreanTitle:'광개토대왕',
    period:'THREE KINGDOMS', category:'PEOPLE', format:'MICRO', dateLabel:'374—413',
    keywords:['고구려','광개토대왕','영락','광개토대왕릉비','백제','신라'], people:['광개토대왕'],
    summary:'고구려의 대외 팽창, 영락 연호, 광개토대왕릉비를 하나의 인물 기록으로 압축한다.', access:'OPEN',
    sections:[
      {id:'identity',label:'01 — IDENTITY',paragraphs:['광개토대왕은 391년 즉위해 고구려의 영역과 영향력을 크게 확장한 왕이다. 독자 연호인 영락을 사용했고, 사후 장수왕 때 세워진 광개토대왕릉비가 주요 사료다.']},
      {id:'points',label:'02 — KEY POINTS',points:['백제에 대한 공세','신라 구원과 남부 정세 개입','북방 세력과의 경쟁']},
    ], related:['goguryeo-sui-war','wonhyo'], printEdition:{status:'PLANNED',label:'A4 / PRINT EDITION'},
  },
  {
    slug:'wonhyo', archiveNo:'PEOPLE 003', title:'WONHYO', koreanTitle:'원효',
    period:'NORTH–SOUTH STATES', category:'PEOPLE', format:'MICRO', dateLabel:'617—686',
    keywords:['원효','신라','불교','화쟁','일심','정토'], people:['원효'],
    seriesId:'my-own-history', subSeries:'내 좋대로 문화사',
    summary:'원효의 화쟁·일심 사상과 불교 대중화 활동을 다른 승려와의 비교를 전제로 압축한 인물 자료.', access:'OPEN',
    sections:[
      {id:'overview',label:'01 — OVERVIEW',paragraphs:['원효는 삼국 통일 전후 신라에서 활동한 승려로, 다양한 불교 사상을 조화롭게 이해하려는 화쟁과 일심 사상으로 알려져 있다.']},
      {id:'compare',label:'02 — COMPARE',points:['원효 — 화쟁·일심','의상 — 화엄종·부석사','혜초 — 왕오천축국전']},
    ], related:['buddhist-figures','goryeo-political-history'], crossLinks:[{label:'삼국~고려 불교 인물',slug:'buddhist-figures',relation:'COMPARE'}],
    authorsNote:['원효는 “화쟁·일심”, 의상은 “화엄”, 의천은 “교관겸수”, 지눌은 “정혜쌍수·돈오점수”처럼 먼저 한 줄 키워드로 분리한 뒤 세부 내용을 붙이는 편이 기억하기 쉽다.'],
  },
  {
    slug:'goryeo-political-history', archiveNo:'TIMELINE 004', title:'GORYEO POLITICAL HISTORY', koreanTitle:'고려 정치사',
    period:'GORYEO', category:'TIMELINE', format:'TIMELINE', dateLabel:'918—1392',
    keywords:['고려','태조','광종','성종','무신정변','원 간섭기','공민왕'], people:['태조 왕건','광종','성종','공민왕'],
    seriesId:'my-own-history', subSeries:'내 좋대로 흥망성쇠',
    summary:'고려 건국부터 문벌사회, 무신정권, 원 간섭기, 개혁정치와 멸망까지 정치 변화를 하나의 긴 축으로 연결한다.', access:'OPEN',
    sections:[
      {id:'foundation',label:'01 — FOUNDATION',points:['918 — 왕건, 고려 건국','936 — 후삼국 통일','광종 — 노비안검법·과거제','성종 — 유교적 통치체제 정비']},
      {id:'military',label:'02 — MILITARY RULE',points:['1170 — 무신정변','최씨 무신정권','대몽 항쟁과 강화도 천도']},
      {id:'late',label:'03 — LATE GORYEO',points:['원 간섭기','공민왕의 반원 개혁','신진사대부 성장','1392 — 조선 건국']},
    ], related:['land-systems-goryeo','goryeo-khitan-war','goryeo-jurchen-conflict','goryeo-mongol-war'],
    authorsNote:['고려 정치사는 왕 이름을 전부 외우기보다 “건국·제도정비 → 문벌 → 무신 → 몽골·원 → 개혁·교체”의 다섯 덩어리로 먼저 잘라 두면 세부 사건의 위치가 보인다.'],
  },
  {
    slug:'land-systems-goryeo', archiveNo:'NOTE 005', title:'LAND SYSTEMS OF GORYEO', koreanTitle:'고려 토지제도',
    period:'GORYEO', category:'SYSTEM', format:'NOTE', dateLabel:'10C—14C',
    keywords:['전시과','고려','토지제도','공음전','민전','녹과전'], seriesId:'my-own-history', subSeries:'내 좋대로 행정사',
    summary:'전시과를 중심으로 고려 토지제도의 변화를 시기별로 비교하고 소유권과 수조권을 구분한다.', access:'OPEN',
    sections:[
      {id:'core',label:'01 — CORE',points:['전시과 — 관료에게 수조권 지급','시정전시과 → 개정전시과 → 경정전시과','지급 기준과 운영 방식의 변화']},
      {id:'compare',label:'02 — COMPARE',points:['공음전 — 문벌귀족의 경제 기반과 관련','민전 — 일반 백성의 사유지','녹과전 — 무신집권기 관료의 녹봉 보완']},
    ], related:['goryeo-political-history','daedong-law'], authorsNote:['토지 “소유권”과 세금을 거둘 “수조권”을 먼저 분리하면 전시과와 과전법을 비교할 때 혼동이 크게 줄어든다.'],
  },
  {
    slug:'imjin-war', archiveNo:'DOSSIER 006', title:'IMJIN WAR', koreanTitle:'임진왜란',
    period:'JOSEON', category:'WAR', format:'DOSSIER', dateLabel:'1592—1598',
    keywords:['임진왜란','정유재란','이순신','권율','의병','도요토미 히데요시'], people:['이순신','권율','곽재우'], relatedEvents:['한산도대첩','행주대첩','명량해전','노량해전'],
    seriesId:'my-own-history', subSeries:'내 좋대로 전쟁사',
    summary:'1592년 침략부터 정유재란과 전쟁 종결까지 육상·해상 전황과 국제관계, 전후 영향을 연결한다.', access:'OPEN',
    sections:[
      {id:'overview',label:'01 — OVERVIEW',paragraphs:['1592년 일본의 침략으로 시작된 전쟁은 조선·일본뿐 아니라 명까지 참여한 국제전으로 전개됐다. 초기 육상전의 위기, 조선 수군의 해상 작전, 의병, 명군 참전을 함께 읽어야 전체 전황이 보인다.']},
      {id:'timeline',label:'03 — TIMELINE',points:['1592 — 부산진·동래성 전투와 한양 함락','1592 — 옥포·한산도 등 조선 수군의 연속 작전','1593 — 행주대첩','1597 — 정유재란과 명량해전','1598 — 노량해전과 일본군 철수']},
      {id:'people',label:'04 — PEOPLE',points:['이순신 — 조선 수군 지휘','권율 — 행주대첩','곽재우 — 대표적 의병장']},
      {id:'map',label:'05 — MAP',paragraphs:['실제 지도 모듈에서는 일본군의 북상로, 전라도 방어선, 남해안 수군 작전해역을 한 좌표체계에서 비교한다.']},
    ], related:['naval-operations-1592','daedong-law','gabo-reform'], crossLinks:[{label:'1592년 조선 수군 작전',slug:'naval-operations-1592',relation:'MAP'}],
    authorsNote:['“1592 초기 육상 위기 / 수군·의병·명군 / 1597 정유재란 / 1598 종전”의 큰 블록을 먼저 잡고 전투 이름을 안에 넣는 방식이 전체 흐름을 기억하기 좋다.'], printEdition:{status:'PLANNED',label:'A4 / PRINT EDITION'},
  },
  {
    slug:'naval-operations-1592', archiveNo:'MAP 007', title:'NAVAL OPERATIONS / 1592', koreanTitle:'1592년 조선 수군 작전',
    period:'JOSEON', category:'WAR', format:'MAP', dateLabel:'1592',
    keywords:['이순신','옥포','사천','한산도','부산포','조선수군','임진왜란'], people:['이순신'], relatedEvents:['옥포해전','한산도대첩','부산포해전'],
    seriesId:'my-own-history', subSeries:'내 좋대로 전쟁사',
    summary:'1592년 주요 수군 작전을 남해안 공간축으로 연결해 일본군 보급로와 조선 수군의 작전 목적을 읽는 지도형 자료.', access:'OPEN',
    sections:[
      {id:'route',label:'01 — OPERATION ROUTE',points:['옥포 — 첫 승전','사천·당포·당항포 — 연속 작전','한산도 — 일본 수군 주력 격파','부산포 — 적 해상기지 압박']},
      {id:'reading',label:'02 — MAP READING',paragraphs:['개별 전투의 승패뿐 아니라 일본군의 서해 진출과 해상보급을 차단한 전략적 효과를 함께 읽는다.']},
    ], related:['imjin-war'], crossLinks:[{label:'임진왜란',slug:'imjin-war',relation:'DOSSIER'}],
  },
  {
    slug:'buddhist-figures', archiveNo:'NOTE 008', title:'BUDDHIST FIGURES', koreanTitle:'삼국~고려 불교 인물',
    period:'GORYEO', category:'CULTURE', format:'NOTE', dateLabel:'4C—14C',
    keywords:['원효','의상','혜초','지눌','의천','불교','교종','선종'], people:['원효','의상','혜초','의천','지눌'],
    seriesId:'my-own-history', subSeries:'내 좋대로 문화사',
    summary:'삼국~고려 주요 불교 인물을 시대·사상·저술·사찰을 기준으로 한 화면에서 비교하는 압축 노트.', access:'OPEN',
    sections:[
      {id:'silla',label:'01 — SILLA',points:['원효 — 화쟁·일심, 불교 대중화','의상 — 화엄종, 부석사','혜초 — 왕오천축국전']},
      {id:'goryeo',label:'02 — GORYEO',points:['의천 — 교관겸수, 천태종','지눌 — 정혜쌍수·돈오점수, 수선사 결사']},
      {id:'compare',label:'03 — EXAM COMPARE',points:['의천: 교종 중심 통합 시도','지눌: 선종 중심 개혁과 수행론']},
    ], related:['wonhyo','goryeo-political-history'], crossLinks:[{label:'원효',slug:'wonhyo',relation:'PEOPLE'}],
    authorsNote:['불교 인물은 시대순보다 “사상 키워드 → 종파/사찰 → 저술” 순서로 비교표를 만들면 시험 문제에서 이름을 역추적하기 쉽다.'], printEdition:{status:'PLANNED',label:'A4 / PRINT EDITION'},
  },
  {
    slug:'gabo-reform', archiveNo:'EVENTS 009', title:'GABO REFORM', koreanTitle:'갑오개혁',
    period:'KOREAN EMPIRE', category:'EVENTS', format:'NOTE', dateLabel:'1894—1896',
    keywords:['갑오개혁','군국기무처','신분제','과거제','홍범14조','을미개혁'], relatedEvents:['갑오개혁','을미개혁'],
    summary:'1894~1896년 개혁을 정치·사회·경제 제도의 변화와 일본의 영향이라는 두 축으로 정리한다.', access:'OPEN',
    sections:[
      {id:'first',label:'01 — FIRST REFORM',points:['군국기무처 설치','과거제 폐지','신분제 개혁','재정 일원화 추진']},
      {id:'later',label:'02 — LATER REFORMS',points:['홍범 14조','교육입국조서','단발령·태양력 등 을미개혁 조치']},
      {id:'reading',label:'03 — INTERPRETATION',paragraphs:['근대적 제도 개혁이라는 측면과 일본의 군사·정치적 압력 아래 추진된 한계를 함께 본다.']},
    ], related:['independence-movement'],
  },
  {
    slug:'independence-movement', archiveNo:'TIMELINE 010', title:'INDEPENDENCE MOVEMENT', koreanTitle:'독립운동사',
    period:'COLONIAL PERIOD', category:'TIMELINE', format:'TIMELINE', dateLabel:'1910—1945',
    keywords:['독립운동','3.1운동','대한민국 임시정부','의열단','한국광복군'], relatedEvents:['3·1운동','대한민국 임시정부','한국광복군'],
    seriesId:'my-own-history', subSeries:'내 좋대로 흥망성쇠',
    summary:'3·1운동, 임시정부, 무장투쟁, 의열투쟁, 광복군까지 독립운동의 여러 계열을 시간축에서 병렬로 연결한다.', access:'OPEN',
    sections:[
      {id:'1910s',label:'01 — 1910s',points:['국외 독립운동기지 건설','1919 — 3·1운동']},
      {id:'1920s',label:'02 — 1920s',points:['대한민국 임시정부','봉오동·청산리 전투','의열단']},
      {id:'late',label:'03 — 1930s—1945',points:['한인애국단','1940 — 한국광복군']},
    ], related:['gabo-reform'],
  },
  {
    slug:'daedong-law', archiveNo:'SYSTEM 011', title:'DAEDONG LAW', koreanTitle:'대동법',
    period:'JOSEON', category:'SYSTEM', format:'MICRO', dateLabel:'1608—1708',
    keywords:['대동법','공납','광해군','김육','공인'], people:['김육'],
    seriesId:'my-own-history', subSeries:'내 좋대로 행정사',
    summary:'공납의 부담 방식을 토지 결수 기준으로 전환한 대동법의 구조와 공인 성장의 관계를 확인한다.', access:'OPEN',
    sections:[{id:'core',label:'01 — CORE',points:['1608 — 경기도에서 시행 시작','공납의 폐단 완화','공인의 성장과 상품화폐경제의 진전과 연결']}], related:['imjin-war','land-systems-goryeo'],
    authorsNote:['세금 제도는 “무엇을 기준으로 걷는가 / 누가 부담하는가 / 누가 대신 납품하는가” 세 질문으로 쪼개면 제도명이 달라도 비교하기 쉽다.'],
  },
  {
    slug:'king-sejong', archiveNo:'EXAM 012', title:'KING SEJONG', koreanTitle:'세종',
    period:'JOSEON', category:'EXAM', format:'MICRO', dateLabel:'1397—1450',
    keywords:['세종','훈민정음','집현전','과학기술','4군6진','농사직설'], people:['세종'],
    summary:'세종대의 문자·과학기술·국방·정치 운영을 여러 출제축에서 교차 확인하는 시험용 MICRO.', access:'OPEN',
    sections:[
      {id:'governance',label:'01 — GOVERNANCE',points:['집현전 운영','의정부서사제','4군 6진']},
      {id:'culture',label:'02 — CULTURE / SCIENCE',points:['훈민정음','측우기 등 과학기술','농사직설']},
    ], related:['daedong-law','imjin-war'],
  },
  {
    slug:'goryeo-khitan-war', archiveNo:'TIMELINE 013', title:'GORYEO–KHITAN WAR', koreanTitle:'고려-거란 전쟁',
    period:'GORYEO', category:'WAR', format:'TIMELINE', dateLabel:'993—1019',
    keywords:['고려','거란','서희','소손녕','강동6주','양규','강감찬','귀주대첩'], people:['서희','양규','강감찬'], relatedEvents:['1차 침입','2차 침입','3차 침입','귀주대첩'],
    seriesId:'my-own-history', subSeries:'내 좋대로 전쟁사',
    summary:'세 차례의 거란 침입을 993·1010·1018/1019의 시간축에 놓고 외교, 방어, 반격을 연결한 핵심 TIMELINE.', access:'OPEN',
    sections:[
      {id:'first',label:'01 — 993',points:['거란 1차 침입','서희와 소손녕의 담판','강동 6주 확보']},
      {id:'second',label:'02 — 1010',points:['거란 2차 침입','개경 함락','양규 등 고려군의 후방 반격']},
      {id:'third',label:'03 — 1018 / 1019',points:['소배압의 3차 침입','강감찬 지휘','1019 — 귀주대첩']},
    ], related:['goryeo-political-history','goryeo-jurchen-conflict','goryeo-mongol-war'],
    authorsNote:['“993 서희 / 1010 양규 / 1018~19 강감찬”을 한 줄로 묶으면 세 차례 침입의 사람·결과가 뒤섞이지 않는다.'], printEdition:{status:'PLANNED',label:'A4 / PRINT EDITION'},
  },
  {
    slug:'goryeo-jurchen-conflict', archiveNo:'TIMELINE 014', title:'GORYEO–JURCHEN CONFLICT', koreanTitle:'고려-여진 관계',
    period:'GORYEO', category:'WAR', format:'TIMELINE', dateLabel:'11C—12C',
    keywords:['고려','여진','윤관','별무반','동북9성','예종'], people:['윤관','예종'], relatedEvents:['별무반','여진 정벌','동북 9성'],
    seriesId:'my-own-history', subSeries:'내 좋대로 전쟁사',
    summary:'여진 세력의 성장에 대한 고려의 대응을 별무반 편성, 1107년 정벌, 동북 9성 축조와 반환이라는 흐름으로 정리한다.', access:'OPEN',
    sections:[
      {id:'prepare',label:'01 — PREPARATION',points:['숙종대 윤관의 건의로 별무반 편성','기병·보병·승병 등을 포함한 군사 재편']},
      {id:'campaign',label:'02 — 1107',points:['예종대 윤관·오연총이 여진 정벌','확보 지역에 동북 9성 축조']},
      {id:'return',label:'03 — 1109',points:['지속적인 방어 부담과 여진의 반환 요구','동북 9성 반환']},
    ], related:['goryeo-khitan-war','goryeo-political-history','goryeo-mongol-war'],
    authorsNote:['별무반을 “군대 이름”으로만 외우기보다 “여진 대응을 위한 군사 재편 → 정벌 → 9성”이라는 작업 순서로 묶는 편이 자연스럽다.'],
  },
  {
    slug:'goryeo-mongol-war', archiveNo:'DOSSIER 015', title:'GORYEO–MONGOL WAR', koreanTitle:'고려-몽골 전쟁',
    period:'GORYEO', category:'WAR', format:'DOSSIER', dateLabel:'1231—1270',
    keywords:['고려','몽골','강화도','최우','김윤후','삼별초','개경환도'], people:['최우','김윤후'], relatedEvents:['몽골 침입','강화 천도','강화','개경 환도','삼별초 항쟁'],
    seriesId:'my-own-history', subSeries:'내 좋대로 전쟁사',
    summary:'1231년 침입에서 강화 천도, 장기 항쟁, 1259년 강화, 1270년 개경 환도와 삼별초 항쟁으로 이어지는 장기 구조를 DOSSIER로 읽는다.', access:'OPEN',
    sections:[
      {id:'overview',label:'01 — OVERVIEW',paragraphs:['1231년 몽골의 1차 침입 이후 고려는 반복되는 침입에 대응했다. 최씨 무신정권은 1232년 강화도로 천도했고, 항쟁은 장기간 이어졌다.']},
      {id:'timeline',label:'03 — TIMELINE',points:['1231 — 몽골 1차 침입','1232 — 강화도 천도','1259 — 고려와 몽골의 강화','1270 — 개경 환도','1270 이후 — 삼별초의 항쟁']},
      {id:'people',label:'04 — PEOPLE',points:['최우 — 강화 천도를 주도한 무신집권자','김윤후 — 처인성 전투 등 대몽 항쟁과 관련']},
      {id:'result',label:'08 — RESULT',paragraphs:['개경 환도 이후에도 삼별초가 항쟁을 이어 갔고, 고려와 원의 관계는 이후 원 간섭기로 연결된다.']},
    ], related:['goryeo-political-history','goryeo-khitan-war','goryeo-jurchen-conflict'],
    authorsNote:['1231 침입 → 1232 강화 천도 → 1259 강화 → 1270 환도라는 네 개의 기준점을 먼저 잡으면 긴 대몽 항쟁의 세부 전투가 어디쯤인지 정리하기 쉽다.'], printEdition:{status:'PLANNED',label:'A4 / PRINT EDITION'},
  },
];

export function historyBySlug(slug:string){ return historyArchive.find(item=>item.slug===slug); }
export function historySeriesById(id?:string){ return id ? historySeries.find(series=>series.id===id) : undefined; }
