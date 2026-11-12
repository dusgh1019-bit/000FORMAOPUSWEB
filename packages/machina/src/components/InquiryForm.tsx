'use client';

import { FormEvent, useState } from 'react';

const workTypes = ['기계설계','CAD','자동화','치공구','제작','조립','기타'];

export default function InquiryForm() {
  const [sent,setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); setSent(true); }
  if (sent) return <div className="machinaInquiryReceived" role="status"><span>REQUEST RECEIVED</span><strong>검토 요청이 접수된 상태의 UI 예시입니다.</strong><p>실제 배포에서는 안전한 서버·파일 저장소와 연결한 뒤 등록하신 연락처 또는 이메일로 회신하는 구조로 전환합니다.</p><button onClick={()=>setSent(false)}>새 요청 작성</button></div>;
  return (
    <form className="machinaInquiryForm" onSubmit={submit}>
      <div className="machinaFormPair"><label>회사 / 담당자<input name="contact" required /></label><label>연락처<input name="phone" inputMode="tel" required /></label></div>
      <label>이메일<input name="email" type="email" required /></label>
      <fieldset><legend>요청 업무</legend><div className="machinaWorkTypeGrid">{workTypes.map((type)=><label key={type}><input type="checkbox" name="work" value={type}/><span>{type}</span></label>)}</div></fieldset>
      <label>프로젝트 설명<textarea name="description" rows={7} required placeholder="설계 대상, 현재 상태, 필요한 범위 등을 간단히 적어주십시오." /></label>
      <label className="machinaFileInput">참고자료<input type="file" multiple accept=".pdf,.dwg,.dxf,.step,.stp,.iges,.igs,.jpg,.jpeg,.png,.zip"/><small>PDF · DWG · DXF · STEP · STP · IGES · JPG · PNG · ZIP</small></label>
      <label>희망 일정<input name="schedule" placeholder="예: 2027년 4월 검토 희망" /></label>
      <div className="machinaInquiryFoot"><small>DEV 1.6에서는 전송하지 않습니다. 실제 파일 업로드는 Private Storage / 확장자·용량 검사 / 악성파일 검사 적용 후 연결합니다.</small><button type="submit">검토 요청</button></div>
    </form>
  );
}
