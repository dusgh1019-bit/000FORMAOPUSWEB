import { notFound } from 'next/navigation';
import ParvusProjectDetail from '@/components/parvus/ParvusProjectDetail';
import { getParvusProject, parvusProjects } from '@/content/parvus';
export function generateStaticParams(){ return parvusProjects.map(p=>({slug:p.slug})); }
export default async function Page({params}:{params:Promise<{slug:string}>}){ const {slug}=await params; const project=getParvusProject(slug); if(!project) notFound(); return <ParvusProjectDetail project={project}/>; }
