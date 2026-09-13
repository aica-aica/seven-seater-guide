import { GuideArticle } from '@/types/guide';

interface JsonLdArticleProps {
  article: GuideArticle;
  canonicalUrl: string;
}

export default function JsonLdArticle({ article, canonicalUrl }: JsonLdArticleProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${canonicalUrl}#article`,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': canonicalUrl,
        },
        headline: article.title,
        description: article.summary,
        image: [article.heroImage],
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        inLanguage: 'zh-TW',
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['h1', 'h2', 'p'],
        },
        keywords: [
          '七人座',
          '七人座休旅車推薦',
          '七人座MPV',
          article.categoryLabel,
          '第三排空間',
        ],
        author: {
          '@type': 'Person',
          name: article.author.name,
          jobTitle: article.author.role,
        },
        publisher: {
          '@type': 'Organization',
          '@id': 'https://7seater-guide.tw/#organization',
          name: '七人座選車指南 (7-Seater Guide Taiwan)',
          url: 'https://7seater-guide.tw',
          logo: {
            '@type': 'ImageObject',
            url: 'https://7seater-guide.tw/logo.png',
          },
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumbs`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: '首頁',
            item: 'https://7seater-guide.tw/',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: '深度選購指南',
            item: 'https://7seater-guide.tw/guides',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: article.title,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
