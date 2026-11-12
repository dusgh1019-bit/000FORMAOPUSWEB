import { notFound } from 'next/navigation';
import ObjectDetail from '@/components/machina/ObjectDetail';
import { getMachinaObject, machinaObjects } from '@/content/machina';
export function generateStaticParams(){ return machinaObjects.map((item)=>({slug:item.slug})); }
export default async function Page({params}:{params:Promise<{slug:string}>}){ const {slug}=await params; const item=getMachinaObject(slug); if(!item){ notFound(); return null; } return <ObjectDetail item={item}/>; }
