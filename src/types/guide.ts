export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export interface GuideArticle {
  slug: string;
  title: string;
  subtitle: string;
  category: 'space-and-safety' | 'doors-and-seats' | 'powertrain' | 'buying-advice';
  categoryLabel: string;
  publishedAt: string;
  updatedAt: string;
  readTimeMinutes: number;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  summary: string;
  heroImage: string;
  tableOfContents: TableOfContentsItem[];
  contentHtml: string;
  keyTakeaways: string[];
  relatedCarSlugs: string[];
}
