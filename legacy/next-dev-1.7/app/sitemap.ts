import type { MetadataRoute } from 'next';
import { exercitusCollection } from '@/content/exercitus';
import { historyArchive } from '@/content/history';
import { machinaObjects, machinaSystems } from '@/content/machina';
import { parvusProjects } from '@/content/parvus';
const base = 'https://example.com';
export default function sitemap(): MetadataRoute.Sitemap {
  const fixed = ['', '/grea', '/grea/projects', '/grea/archive', '/grea/exercitus', '/grea/exercitus/collection', '/grea/faber', '/grea/faber/field-pouch-01', '/grea/vestis', '/grea/insignia', '/grea/custom', '/parvus', '/parvus/projects', '/parvus/contact', '/machina', '/machina/objects', '/machina/systems', '/machina/capabilities', '/machina/contact', '/about', '/archive', '/contact', '/academia/history', '/academia/cad'];
  const collection = exercitusCollection.map(p=>`/grea/exercitus/collection/${p.slug}`);
  const history = historyArchive.map(p=>`/academia/history/${p.slug}`);
  const parvusProjectRoutes = parvusProjects.map(p=>`/parvus/projects/${p.slug}`);
  const machinaObjectRoutes = machinaObjects.map(p=>`/machina/objects/${p.slug}`);
  const machinaSystemRoutes = machinaSystems.map(p=>`/machina/systems/${p.slug}`);
  return [...fixed,...collection,...history,...parvusProjectRoutes,...machinaObjectRoutes,...machinaSystemRoutes].map(path=>({ url: `${base}${path}`, changeFrequency:'monthly' as const, priority: path===''?1:0.7 }));
}
