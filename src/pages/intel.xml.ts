import rss from '@astrojs/rss';
import { readFileSync, existsSync } from 'node:fs';
import type { APIContext } from 'astro';

interface FeedItem {
  id: string;
  title: string;
  link: string;
  source: string;
  source_url: string;
  category: string;
  published: string;
  summary: string;
}

interface FeedData {
  updated_at: string;
  categories: {
    [key: string]: FeedItem[];
  };
}

export function GET(context: APIContext) {
  const feedPath = '/var/lib/sentinel-nexus/data/intel/feeds.json';
  let allItems: (FeedItem & { _cat: string })[] = [];

  if (existsSync(feedPath)) {
    const data: FeedData = JSON.parse(readFileSync(feedPath, 'utf-8'));
    const categories = data.categories ?? {};
    for (const [cat, items] of Object.entries(categories)) {
      allItems.push(...items.map(item => ({ ...item, _cat: cat })));
    }
    allItems.sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
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
      categories: [item._cat, item.source],
    })),
    customData: `<language>en-us</language>`,
  });
}
