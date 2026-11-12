import { notFound } from 'next/navigation';
import CollectionProduct from '@/components/exercitus/CollectionProduct';
import { exercitusCollection } from '@/content/exercitus';
export function generateStaticParams(){return exercitusCollection.map(v=>({slug:v.slug}));}
export default async function Page({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=exercitusCollection.find(v=>v.slug===slug);if(!item)notFound();return <CollectionProduct item={item!}/>;}
