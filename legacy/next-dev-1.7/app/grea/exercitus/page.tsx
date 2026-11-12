import type { Metadata } from 'next';
import ExercitusEntry from '@/components/exercitus/ExercitusEntry';

export const metadata: Metadata = {
  title: 'EXERCITUS — GREA',
  description: 'EXERCITUS military graphic apparel customization system within GREA / FORMA OPUS.',
};

export default function ExercitusPage() {
  return <ExercitusEntry />;
}
