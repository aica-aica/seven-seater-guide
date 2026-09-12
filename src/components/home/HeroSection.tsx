import React from 'react';
import Link from 'next/link';
import { Search, Shield, Users, Layers, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onSelectScenario: (scenario: string) => void;
  selectedScenario: string | null;
}

export default function HeroSection({ onSelectScenario, selectedScenario }: HeroSectionProps) {
  const scenarios = [
    { id: '3-generation', label: '👨‍👩‍👧‍👦 三代同堂長途舒適', desc: '正 MPV、第三排舒適大空間' },
    { id: 'dual-isofix', label: '👶 雙汽座好上下車', desc: '雙側滑門、走道式 2+2+3' },
    { id: 'under-150w', label: '💰 150萬內高CP值', desc: '低稅金、配備齊全' },
    { id: 'camping-cargo', label: '⛺ 露營載物大容量', desc: '魔術折疊、行李箱破千公升' },
  ];

  return (
    <section className="relative overflow-hidden py-16 sm:py-24 border-b border-slate-200/80">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-72 bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-500/8 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Authority Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/90 text-sky-700 text-xs font-semibold mb-6 animate-in fade-in zoom-in duration-500 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
          <span>2024-2025 台灣七人座車款客觀規格與實測數據庫</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15]">
          告別應急第三排！
          <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-sky-800 to-cyan-700">
            找到真正裝得下全家人的七人座
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          不看廠商包裝型錄，只看<strong className="text-cyan-700 font-bold">真實腿部空間</strong>、<strong className="text-cyan-700 font-bold">雙側滑門動線</strong>、<strong className="text-cyan-700 font-bold">ISOFIX 數量</strong>與<strong className="text-cyan-700 font-bold">七人滿載行李箱容積</strong>。為台灣家庭打造的獨立客觀選購指南。
        </p>

        {/* Hero Quick CTA */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#split-compare"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-sm shadow-md shadow-cyan-600/20 transition-all hover:scale-105 hover:shadow-cyan-600/35"
          >
            <Sparkles className="w-4 h-4" />
            <span>立即體驗：左右分欄上下滑動對決器</span>
          </a>
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 font-semibold text-sm border border-slate-200/90 shadow-sm backdrop-blur-md transition-all"
          >
            <span>多車規格對比庫</span>
          </Link>
        </div>

        {/* Quick Scenario Buttons */}
        <div className="mt-10 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-slate-500 font-bold mb-3">
            快速依用車情境篩選合適車款：
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {scenarios.map((sc) => {
              const active = selectedScenario === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => onSelectScenario(sc.id)}
                  className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-xs font-semibold transition-all backdrop-blur-md ${
                    active
                      ? 'bg-sky-50 border-cyan-500 text-cyan-900 shadow-md shadow-cyan-500/10 scale-105 ring-1 ring-cyan-400/50'
                      : 'bg-white/80 border-slate-200 text-slate-700 hover:bg-white hover:text-slate-900 hover:border-cyan-400 shadow-sm'
                  }`}
                >
                  <span className="text-sm mb-1">{sc.label}</span>
                  <span className="text-[10px] text-slate-500 font-normal">{sc.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Highlights Pill Row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-600 border-t border-slate-200/80 pt-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-600" />
            <span>2+2+3 走道 vs 2+3+2 連體座位深度解析</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-600" />
            <span>滿載 7 人後行李箱實測容量與 28 吋箱數</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-600" />
            <span>完整 Schema.org 結構化數據與 AI Snippet 支援</span>
          </div>
        </div>
      </div>
    </section>
  );
}
