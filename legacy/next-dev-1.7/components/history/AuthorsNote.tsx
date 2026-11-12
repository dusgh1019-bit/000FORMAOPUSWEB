'use client';

import { useState } from 'react';

export default function AuthorsNote({notes}:{notes:string[]}){
  const [open,setOpen]=useState(false);
  return <section className={`historyAuthorsNote ${open?'isOpen':''}`}>
    <button type="button" aria-expanded={open} onClick={()=>setOpen(value=>!value)}>
      <span>AUTHOR&apos;S NOTE</span><small>비공식 학습 메모</small><b>{open?'×':'↗'}</b>
    </button>
    <div className="historyAuthorsNoteBody" hidden={!open}>
      <div><strong>EDITORIAL SEPARATION</strong><span>ARCHIVE TEXT와 분리된 작성자의 암기법·직관적 설명입니다.</span></div>
      {notes.map((note,index)=><p key={index}>{note}</p>)}
    </div>
  </section>;
}
