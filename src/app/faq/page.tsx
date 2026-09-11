'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { FAQS_DATA } from '@/data/faqs';
import { FaqCategory } from '@/types/faq';
import JsonLdFaq from '@/components/seo/JsonLdFaq';
import { HelpCircle, ChevronDown, Sparkles, Filter, Car as CarIcon } from 'lucide-react';

export default function FAQHubPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<string[]>(FAQS_DATA.map((f) => f.id)); // Default open all for fast AI/User scanning

  const toggleOpen = (id: string) => {
    if (openIds.includes(id)) {
      setOpenIds(openIds.filter((item) => item !== id));
    } else {
      setOpenIds([...openIds, id]);
    }
  };

  const categories = [
    { id: 'all', label: '全部常見問題' },
    { id: 'space-and-seating', label: '空間與第三排' },
    { id: 'isofix-and-child-safety', label: '汽座與安全防護' },
    { id: 'parking-and-dimensions', label: '停車與車身尺碼' },
    { id: 'budget-and-tax', label: '購車預算與稅金' },
  ];

  const filteredFaqs =
    selectedCategory === 'all'
      ? FAQS_DATA
      : FAQS_DATA.filter((f) => f.category === selectedCategory);

  return (
    <div className="text-slate-100 min-h-screen py-10">
      {/* Schema.org FAQPage for Google & AI Overviews */}
      <JsonLdFaq faqs={filteredFaqs} canonicalUrl="https://7seater-guide.tw/faq" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="text-center space-y-3 pb-6 border-b border-white/[0.08]">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-500/25 shadow-sm shadow-cyan-500/10">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>AI Overviews 結構化知識精華</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            七人座選購與使用 高頻痛點常見問答
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            依據真實台灣車主回饋與法規數據整理，精煉最權威、最高資訊密度的解答。
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  active
                    ? 'bg-cyan-500 text-slate-950 border-cyan-500 shadow-sm font-bold'
                    : 'bg-white/[0.05] border-white/[0.08] text-slate-300 hover:border-slate-700 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <article
                key={faq.id}
                className="rounded-2xl border border-white/[0.08] bg-[#0e1424]/80 backdrop-blur-xl overflow-hidden shadow-xl transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleOpen(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-white hover:text-cyan-400 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-cyan-400 font-mono text-sm">Q:</span>
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 ml-4 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 pt-1 text-xs sm:text-sm border-t border-white/[0.06] space-y-4">
                    {/* Google AI Overviews Target Snippet Box */}
                    <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/25 text-cyan-200 leading-relaxed">
                      <div className="flex items-center gap-1.5 font-bold text-cyan-400 text-xs mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>AI 精選重點摘要（Direct Answer Snippet）：</span>
                      </div>
                      <p className="font-semibold text-white">
                        {faq.shortAnswer}
                      </p>
                    </div>

                    {/* Detailed Answer */}
                    <div className="text-slate-300 leading-relaxed">
                      <p>{faq.detailedAnswer}</p>
                    </div>

                    {/* Bullet Points */}
                    <div className="pt-2 border-t border-white/[0.06]">
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                        關鍵數據要點：
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-300">
                        {faq.keyPoints.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 flex-shrink-0" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Related Cars Link if available */}
                    {faq.relatedCarSlugs && faq.relatedCarSlugs.length > 0 && (
                      <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                        <span className="text-slate-400">相關評測車型：</span>
                        {faq.relatedCarSlugs.map((slug) => (
                          <Link
                            key={slug}
                            href={`/cars/${slug}`}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-750 text-cyan-400 border border-slate-700 font-medium transition-colors"
                          >
                            <CarIcon className="w-3 h-3" />
                            <span>{slug}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
