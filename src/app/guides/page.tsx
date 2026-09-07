import React from 'react';
import { Metadata } from 'next';
import { GUIDES_DATA } from '@/data/guides';
import GuideCard from '@/components/guides/GuideCard';
import { BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: '七人座選購攻略專題 | 正MPV vs 5+2、滑門與汽座深度評測',
  description:
    '深入剖析七人座空間真相：正 MPV 與 5+2 致命盲區、雙側電動滑門防撞、2+2+3 vs 2+3+2 座椅動線以及油電與柴油動力評比。',
};

export default function GuidesIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="pb-6 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
          <BookOpen className="w-4 h-4" />
          <span>深度分析專欄</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          七人座選車深度評測專欄
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
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
