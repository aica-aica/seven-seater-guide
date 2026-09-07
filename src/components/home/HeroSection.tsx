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
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100 py-16 sm:py-24 border-b border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-amber-500/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-sky-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Authority Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold mb-6 animate-in fade-in zoom-in duration-500">
          <Sparkles className="w-3.5 h-3.5" />
          <span>2024-2025 台灣七人座車款客觀規格與實測數據庫</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15]">
          告別應急第三排！
          <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500">
            找到真正裝得下全家人的七人座
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          不看廠商包裝型錄，只看<strong>真實腿部空間</strong>、<strong>雙側滑門動線</strong>、<strong>ISOFIX 數量</strong>與<strong>七人滿載行李箱容積</strong>。為台灣家庭打造的獨立客觀選購指南。
        </p>

        {/* Quick Scenario Buttons */}
        <div className="mt-10 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">
            快速依用車情境篩選合適車款：
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {scenarios.map((sc) => {
              const active = selectedScenario === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => onSelectScenario(sc.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-semibold transition-all ${
                    active
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10 scale-105'
                      : 'bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600'
                  }`}
                >
                  <span className="text-sm mb-1">{sc.label}</span>
                  <span className="text-[10px] text-slate-400 font-normal">{sc.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Highlights Pill Row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400 border-t border-slate-800/80 pt-8 max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-400" />
            <span>2+2+3 走道 vs 2+3+2 連體座位深度解析</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>滿載 7 人後行李箱實測容量與 28 吋箱數</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber-400" />
            <span>完整 Schema.org 結構化數據與 AI Snippet 支援</span>
          </div>
        </div>
      </div>
    </section>
  );
}
