import MachinaNav, { MachinaMobileNav } from './MachinaNav';
import InquiryForm from './InquiryForm';

export default function ContactPage() {
  return <main className="machinaPage machinaContactPage"><MachinaNav mode="systems"/><section className="machinaSectionHero compact"><div><span>MACHINA / CONTACT</span><h1>PROJECT<br/>INQUIRY</h1></div><p>온라인에서 가격을 확정하지 않습니다.<br/>자료 확인과 기술검토 후 연락드리는 방식을 기본으로 합니다.</p></section><section className="machinaInquirySection" id="inquiry"><header><span>REQUEST FORM</span><h2>설계·제작 검토 요청</h2></header><InquiryForm/></section><section className="machinaContactFacts" id="contact"><div><span>CONTACT</span><strong>전화 / 이메일 / 대면협의</strong><p>실제 사업자 정보 확정 후 대표 연락처와 업무시간을 연결합니다.</p></div><div><span>FILE REVIEW</span><strong>CAD / DRAWING / PHOTO</strong><p>기존 도면, 사진, STEP 등 참고자료 기반의 검토 흐름을 준비합니다.</p></div><div><span>RESPONSE</span><strong>HUMAN TECHNICAL REVIEW</strong><p>자동 견적이 아닌 사람의 기술 검토를 기준으로 합니다.</p></div></section><MachinaMobileNav/></main>;
}
