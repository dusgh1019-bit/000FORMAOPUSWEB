import type { Metadata } from 'next';
import CollectionIndex from '@/components/exercitus/CollectionIndex';
export const metadata:Metadata={title:'Collection — EXERCITUS',description:'Curated EXERCITUS apparel issues.'};
export default function Page(){return <CollectionIndex/>}
