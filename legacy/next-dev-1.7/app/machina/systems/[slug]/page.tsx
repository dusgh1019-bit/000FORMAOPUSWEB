import { notFound } from 'next/navigation';
import ProjectDetail from '@/components/machina/ProjectDetail';
import { getMachinaSystem, machinaSystems } from '@/content/machina';
export function generateStaticParams(){ return machinaSystems.map((item)=>({slug:item.slug})); }
export default async function Page({params}:{params:Promise<{slug:string}>}){ const {slug}=await params; const project=getMachinaSystem(slug); if(!project){ notFound(); return null; } return <ProjectDetail project={project}/>; }
