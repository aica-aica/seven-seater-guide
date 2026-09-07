import { GuideArticle } from '@/types/guide';

interface JsonLdArticleProps {
  article: GuideArticle;
  canonicalUrl: string;
}

export default function JsonLdArticle({ article, canonicalUrl }: JsonLdArticleProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    headline: article.title,
    description: article.summary,
    image: [article.heroImage],
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
    },
    publisher: {
      '@type': 'Organization',
      name: '七人座選車指南 (7-Seater Guide Taiwan)',
      logo: {
        '@type': 'ImageObject',
        url: 'https://7seater-guide.tw/logo.png',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
