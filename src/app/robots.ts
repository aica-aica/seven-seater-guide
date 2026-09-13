import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      // Explicitly allow Google, OpenAI, Perplexity, Anthropic, Apple, and Bing AI crawlers
      {
        userAgent: [
          'Googlebot',
          'Google-Extended',
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'PerplexityBot',
          'ClaudeBot',
          'anthropic-ai',
          'Bingbot',
          'Applebot',
          'Applebot-Extended',
          'Bytespider',
          'CCBot',
        ],
        allow: '/',
      },
    ],
    sitemap: 'https://7seater-guide.tw/sitemap.xml',
    host: 'https://7seater-guide.tw',
  };
}
