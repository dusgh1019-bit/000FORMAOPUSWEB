import { notFound, redirect } from 'next/navigation';
import { greaProjects } from '@/content/model';
export default async function GreaProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = greaProjects.find(project => project.slug === slug);
  if (!p) notFound();
  if (slug === 'exercitus') redirect('/grea/exercitus');
  if (slug === 'faber') redirect('/grea/faber');
  if (slug === 'vestis') redirect('/grea/vestis');
  notFound();
}
