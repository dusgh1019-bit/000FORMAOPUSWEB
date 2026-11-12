import { notFound } from 'next/navigation';
import GreaNav from '@/components/grea/GreaNav';
import FaberStudy from '@/components/grea/FaberStudy';
import { getGreaProduct } from '@/content/grea';
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const p=getGreaProduct(slug);if(!p||p.id!=='GF-001')notFound();return <main className="greaV2Page faberPage"><GreaNav current={`FABER / ${p.id}`}/><FaberStudy product={p}/></main>}
