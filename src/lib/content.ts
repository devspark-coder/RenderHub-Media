import { getCollection } from 'astro:content';
import siteJson from '../content/site.json';

export type SiteSettings = {
  name: string;
  tagline: string;
  supporting: string;
  location: string;
  url: string;
  email: string;
  whatsapp: string;
  whatsappDisplay: string;
  formspreeEndpoint: string;
};

export async function getSite(): Promise<SiteSettings> {
  return siteJson as SiteSettings;
}

export async function getFormats() {
  const items = await getCollection('formats');
  return items
    .map((entry) => ({ id: entry.id, ...entry.data }))
    .sort((a, b) => a.order - b.order);
}

export async function getWork() {
  const items = await getCollection('work');
  return items
    .map((entry) => ({ id: entry.id, ...entry.data }))
    .sort((a, b) => a.order - b.order);
}

export async function getProcess() {
  const items = await getCollection('process');
  return items
    .map((entry) => ({ id: entry.id, ...entry.data }))
    .sort((a, b) => a.order - b.order);
}
