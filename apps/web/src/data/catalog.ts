
export const projectGroups = {
  GREA: [
    {title:'PJT.TELA', description:'알루미늄 프로파일 기반 가구 및 산업용 데크.', slug:'tela'},
    {title:'PJT.EXERCITUS', description:'커스텀 의류와 그래픽 컬렉션.', slug:'exercitus'},
    {title:'VESTIS', description:'그래픽 의류 콘셉트.', slug:'vestis'},
    {title:'INSIGNIA', description:'마크·패치·아이덴티티 구성.', slug:'insignia'},
  ],
  PARVUS: [
    {title:'PJT.DOMUS', description:'상업공간·건축 디오라마.', slug:'domus'},
    {title:'PJT.PERSONA', description:'맞춤 피규어와 소형 모형.', slug:'persona'},
    {title:'PJT.ARMATURA', description:'무한궤도 RC 모형 및 완구.', slug:'armatura'},
    {title:'PJT.VECTA', description:'이동식 작업실 및 현장 CAD.', slug:'vecta'},
  ],
  MACHINA: [
    {title:'OBJECTS', description:'정밀 모델링과 포트폴리오.', slug:'objects'},
    {title:'SYSTEMS', description:'산업 공정 및 업무 자동화.', slug:'systems'},
  ],
  ACADEMIA: [
    {title:'HISTORY', description:'역사 자료와 시각 아카이브.', slug:'history'},
    {title:'CERTAMEN', description:'기능경기 및 CAD 대회 교육.', slug:'certamen'},
    {title:'DUCTUS', description:'CAD 자격·실무·심화 교육.', slug:'ductus'},
  ],
  SYSTEM: [
    {title:'PJT.QUAERO', description:'기억·감각·장치를 연결하는 분산 AI.', slug:'quaero'},
  ],
} as const;
export const projectItems = Object.values(projectGroups).flat();
