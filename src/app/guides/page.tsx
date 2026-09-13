import React from 'react';
import { Metadata } from 'next';
import { GUIDES_DATA } from '@/data/guides';
import GuideCard from '@/components/guides/GuideCard';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: '七人座選購攻略與年度推薦專題 | 2025 台灣 7 人座評選指南',
  description:
    '由專業車輛工程團隊撰寫：正 MPV 與 5+2 致命盲區、雙側電動滑門防撞實測、2+2+3 vs 2+3+2 座椅動線以及 2025 年台灣 9 款主力七人座休旅車與 MPV 評選推薦矩陣。',
  keywords: [
    '七人座選購攻略',
    '七人座推薦2025',
    '正MPV與5+2優缺點',
    '雙側滑門評測',
    '2+2+3座椅動線',
    '油電與柴油七人座',
  ],
  alternates: {
    canonical: 'https://7seater-guide.tw/guides',
  },
  openGraph: {
    title: '七人座選購攻略與年度推薦專題 | 2025 台灣 7 人座評選指南',
    description:
      '深入剖析七人座空間真相：正 MPV 與 5+2 盲區、側滑門防撞、座椅動線與 9 款熱門車橫向評選。',
    url: 'https://7seater-guide.tw/guides',
    type: 'website',
  },
};

export default function GuidesIndexPage() {
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://7seater-guide.tw/guides#collection',
    name: '七人座選購攻略與年度推薦專題',
    url: 'https://7seater-guide.tw/guides',
    description: '深入剖析七人座空間真相、安全緩衝、滑門機構與年度推薦專題。',
    hasPart: GUIDES_DATA.map((guide) => ({
      '@type': 'TechArticle',
      name: guide.title,
      url: `https://7seater-guide.tw/guides/${guide.slug}`,
      headline: guide.title,
      description: guide.summary,
      datePublished: guide.publishedAt,
    })),
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

      <div className="pb-6 border-b border-slate-200/90">
        <div className="flex items-center gap-2 text-xs font-bold text-cyan-600 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>深度分析專欄</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          七人座選車深度評測專欄
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          拒絕官腔與話術，從車體結構、安全緩衝縱深到日常生活動線進行全方位客觀解讀。
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {GUIDES_DATA.map((guide) => (
          <GuideCard key={guide.slug} guide={guide} />
        ))}
      </div>
    </div>
  );
}
