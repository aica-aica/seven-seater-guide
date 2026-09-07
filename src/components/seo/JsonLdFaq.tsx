import { FAQItem } from '@/types/faq';

interface JsonLdFaqProps {
  faqs: FAQItem[];
  canonicalUrl?: string;
}

export default function JsonLdFaq({ faqs }: JsonLdFaqProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${faq.shortAnswer} ${faq.detailedAnswer}`,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
