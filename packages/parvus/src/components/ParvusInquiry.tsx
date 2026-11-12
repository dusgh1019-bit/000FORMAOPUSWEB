'use client';
import { FormEvent, useState } from 'react';
import ParvusNav from './ParvusNav';

const subjectTypes = ['PERSON','ANIMAL','OBJECT','PLACE','COMPANY','EVENT','OTHER'] as const;

type SubjectType = typeof subjectTypes[number];

export default function ParvusInquiry() {
  const [subject,setSubject]=useState<SubjectType|null>(null);
  const [sent,setSent]=useState(false);
  const submit=(e:FormEvent)=>{e.preventDefault();setSent(true);};
  return <main className="parvusPage parvusContactPage"><ParvusNav />
    <section className="parvusSectionHero parvusContactHero"><div><span>PARVUS / CUSTOM</span><h1>YOUR<br/>SUBJECT</h1></div><div><strong>WHAT DO YOU WANT TO BUILD?</strong><p>복잡한 견적 Form보다 먼저 Subject를 정합니다. 이후 필요한 자료만 단계적으로 안내합니다.</p></div></section>
    <section className="parvusInquirySection" id="inquiry"><header><span>YOUR SUBJECT → REQUEST → REVIEW → INTERPRET → DESIGN → BUILD → DELIVER</span><h2>START WITH<br/>ONE SUBJECT.</h2><p>현재 DEV에서는 실제 개인정보와 첨부파일을 전송하거나 저장하지 않습니다.</p></header>
    <div className="parvusInquiryFlow">
      {!subject && !sent ? <div className="parvusSubjectChooser"><span>01 / SUBJECT TYPE</span><div>{subjectTypes.map(type=><button type="button" key={type} onClick={()=>setSubject(type)}><strong>{type}</strong><small>SELECT →</small></button>)}</div></div> : null}
      {sent?<div className="parvusInquiryReceived"><span>DEV / REQUEST PREVIEW</span><strong>{subject} 요청이 검토 대기 상태가 된 UI 예시입니다.</strong><p>실제 배포 시 Private Upload Storage와 서버 검증을 별도로 연결합니다.</p><button onClick={()=>{setSent(false);setSubject(null)}}>새 요청 작성</button></div>:null}
      {subject && !sent ? <form className="parvusInquiryForm" onSubmit={submit}><div className="parvusSelectedSubject"><span>01 / SUBJECT</span><strong>{subject}</strong><button type="button" onClick={()=>setSubject(null)}>CHANGE</button></div><div className="parvusFormPair"><label>회사 / 기관명<input /></label><label>담당자<input /></label></div><div className="parvusFormPair"><label>연락처<input type="tel" /></label><label>이메일<input type="email" /></label></div><label>제작 대상 설명<input required placeholder={`${subject}의 이름, 특징, 목적 등`} /></label><div className="parvusFormPair"><label>예상 수량<input type="number" min="1" /></label><label>희망 일정<input type="text" placeholder="예: 2027년 5월" /></label></div><label>사용 목적<textarea rows={5} placeholder="소장, 기념, 전시, 행사, 교육, 기업 선물 등" /></label><label className="parvusFileInput">참고자료<input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.zip,.step,.stp,.dxf,.dwg" /><small>DEV에서는 선택된 파일을 전송하지 않습니다.</small></label><div className="parvusInquiryFoot"><small>제작 가능성, 가격, 일정은 사람이 자료를 검토한 뒤 확정합니다.</small><button type="submit">검토 요청</button></div></form> : null}
    </div></section>
  </main>;
}
