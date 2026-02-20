import rss from '@astrojs/rss';
import { readFileSync, existsSync } from 'node:fs';
import type { APIContext } from 'astro';

interface FeedItem {
  title: string;
  link: string;
  source: string;
  category: string;
  published: string;
  summary: string;
}

interface FeedData {
  updated_at: string;
  items?: FeedItem[];
  categories?: { [key: string]: FeedItem[] }; // legacy support
}

export function GET(context: APIContext) {
  const feedPath = '/var/lib/sentinel-nexus/data/intel/feeds.json';
  let allItems: FeedItem[] = [];

  if (existsSync(feedPath)) {
    const data: FeedData = JSON.parse(readFileSync(feedPath, 'utf-8'));
    if (data.items) {
      allItems = data.items;
    } else if (data.categories) {
      // Legacy: flatten old category structure
      allItems = Object.values(data.categories).flat();
      allItems.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
    }
  }

  return rss({
    title: 'Sentinel Nexus Intel Feed',
    description: 'Curated security, AI, and governance news from trusted sources.',
    site: context.site!,
    items: allItems.map(item => ({
      title: item.title,
      link: item.link,
      pubDate: new Date(item.published),
      description: item.summary || '',
      categories: [item.category, item.source].filter(Boolean),
    })),
    customData: `<language>en-us</language>`,
  });
}
