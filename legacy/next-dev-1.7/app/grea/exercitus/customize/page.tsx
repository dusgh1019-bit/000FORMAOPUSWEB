import type { Metadata } from 'next';
import CustomizerWorkspace from '@/components/exercitus/CustomizerWorkspace';

export const metadata: Metadata = {
  title: 'Customize — EXERCITUS',
  description: 'Design an EXERCITUS DTG garment using approved unit marks, equipment and typography.',
  robots: { index: false, follow: false },
};

export default function ExercitusCustomizePage() {
  return <CustomizerWorkspace />;
}
