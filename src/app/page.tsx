'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CARS_DATA } from '@/data/cars';
import { GUIDES_DATA } from '@/data/guides';
import { FAQS_DATA } from '@/data/faqs';
import { FilterOptions } from '@/types/filter';
import HeroSection from '@/components/home/HeroSection';
import TopPicks from '@/components/home/TopPicks';
import VehicleFilter from '@/components/home/VehicleFilter';
import CarCard from '@/components/home/CarCard';
import ComparisonMatrixPreview from '@/components/home/ComparisonMatrixPreview';
import SplitScreenDuel from '@/components/compare/SplitScreenDuel';
import GuideCard from '@/components/guides/GuideCard';
import JsonLdFaq from '@/components/seo/JsonLdFaq';
import { ArrowRight, HelpCircle, ChevronDown } from 'lucide-react';

const initialFilters: FilterOptions = {
  searchQuery: '',
  priceRange: [100, 500],
  seatingLayouts: [],
  doorTypes: [],
  engineTypes: [],
  categories: [],
  sortBy: 'price-asc',
};

export default function HomePage() {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS_DATA[0].id);

  // Scenario quick filter presets
  const handleSelectScenario = (scenarioId: string) => {
    if (selectedScenario === scenarioId) {
      // Toggle off
      setSelectedScenario(null);
      setFilters(initialFilters);
      return;
    }

    setSelectedScenario(scenarioId);

    if (scenarioId === '3-generation') {
      // Third row long haul comfort + 2+2+3
      setFilters({
        ...initialFilters,
        seatingLayouts: ['2+2+3'],
        priceRange: [100, 500],
      });
    } else if (scenarioId === 'dual-isofix') {
      // Dual sliding doors
      setFilters({
        ...initialFilters,
        doorTypes: ['dual-power-sliding', 'manual-sliding'],
      });
    } else if (scenarioId === 'under-150w') {
      // Budget <= 150
      setFilters({
        ...initialFilters,
        priceRange: [100, 150],
      });
    } else if (scenarioId === 'camping-cargo') {
      // High luggage capacity mode
      setFilters({
        ...initialFilters,
        sortBy: 'luggage-desc',
      });
    }
  };

  // Filtered and sorted cars list
  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      // Search query (Brand or Model)
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const brandMatches = car.brand.toLowerCase().includes(query);
        const modelMatches = car.model.toLowerCase().includes(query);
        if (!brandMatches && !modelMatches) return false;
      }

      // Price Range (in Wan TWD)
      const carMinWan = car.priceRangeTwd[0] / 10000;
      if (carMinWan > filters.priceRange[1]) return false;

      // Seating Layout
      if (filters.seatingLayouts.length > 0) {
        if (!filters.seatingLayouts.includes(car.seating.layout)) return false;
      }

      // Door Type
      if (filters.doorTypes.length > 0) {
        if (!filters.doorTypes.includes(car.doorType)) return false;
      }

      // Engine Type
      if (filters.engineTypes.length > 0) {
        if (!filters.engineTypes.includes(car.powertrain.engineType)) return false;
      }

      // Category
      if (filters.categories.length > 0) {
        if (!filters.categories.includes(car.category)) return false;
      }

      // Core Category (正7人座 MPV vs 5+2 SUV)
      if (filters.coreCategory && filters.coreCategory !== 'all') {
        if (car.coreCategory !== filters.coreCategory) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.priceRangeTwd[0] - b.priceRangeTwd[0];
      if (filters.sortBy === 'price-desc') return b.priceRangeTwd[1] - a.priceRangeTwd[1];
      if (filters.sortBy === 'luggage-desc') return b.luggage.litres7SeatMode - a.luggage.litres7SeatMode;
      if (filters.sortBy === 'length-desc') return b.dimensions.lengthMm - a.dimensions.lengthMm;
      if (filters.sortBy === 'fuel-desc') return b.powertrain.fuelConsumptionKmL - a.powertrain.fuelConsumptionKmL;
      return 0;
    });
  }, [filters]);

  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection
        onSelectScenario={handleSelectScenario}
        selectedScenario={selectedScenario}
      />

      {/* 2. Core Interactive Split-Screen Duel Section (左右分欄上下滑動對決) */}
      <section className="py-12 border-y border-slate-200/80 relative overflow-hidden" id="split-compare">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SplitScreenDuel />
        </div>
      </section>

      {/* 3. Curated Top Picks */}
      <TopPicks />

      {/* 4. Interactive Vehicle Finder & Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="car-finder">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest block mb-2">
              智慧規格選車器
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              台灣現行七人座車款規格資料庫
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              依預算、滑門型式、座椅格局與動力自由組合篩選。
            </p>
          </div>
          <Link
            href="/compare"
            className="text-xs font-bold text-cyan-700 hover:text-cyan-600 flex items-center gap-1"
          >
            直接進入多車對比表
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Filter Bar */}
        <VehicleFilter
          filters={filters}
          onChange={setFilters}
          onReset={() => {
            setFilters(initialFilters);
            setSelectedScenario(null);
          }}
          totalResults={filteredCars.length}
        />

        {/* Cars Grid */}
        <div className="mt-8">
          {filteredCars.length === 0 ? (
            <div className="text-center py-16 bg-white/90 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-sm">
              <p className="text-slate-800 text-sm font-semibold mb-2">
                查無符合目前篩選條件的七人座車型。
              </p>
              <p className="text-xs text-slate-500 mb-4">
                請放寬預算上限或重設座椅格局條件再試一次。
              </p>
              <button
                onClick={() => {
                  setFilters(initialFilters);
                  setSelectedScenario(null);
                }}
                className="px-4 py-2 rounded-xl bg-cyan-600 text-white text-xs font-bold shadow-md shadow-cyan-600/20"
              >
                重設所有條件
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Comparison Matrix Table Section */}
      <ComparisonMatrixPreview />

      {/* 6. In-Depth Editorial Guides Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-200/80">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-cyan-700 uppercase tracking-widest block mb-2">
              深度評測專題
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              七人座選購攻略與年度推薦專題
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              結合國王車訊權威選車評鑑與資深工程師客觀數據，破解展間銷售員不會告訴你的空間真相。
            </p>
          </div>
          <Link
            href="/guides"
            className="text-xs font-bold text-cyan-700 hover:text-cyan-600 flex items-center gap-1"
          >
            查看全部指南文章 ({GUIDES_DATA.length} 篇)
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDES_DATA.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>

      {/* 7. AI Overviews Optimized FAQ Section */}
      <section className="py-16 border-b border-slate-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-semibold border border-sky-200/90 shadow-sm mb-3">
              <HelpCircle className="w-3.5 h-3.5 text-cyan-600" />
              <span>AI Overviews 結構化知識精要</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              七人座購車常見疑問與權威解答
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              高密度重點摘要，專為 Google AI 搜尋摘要與精選片段索引設計。
            </p>
          </div>

          {/* Structured Accordion */}
          <div className="space-y-4">
            {FAQS_DATA.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xl overflow-hidden transition-all shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-sm sm:text-base text-slate-900 hover:text-cyan-700 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 flex-shrink-0 ml-4 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-cyan-600' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm border-t border-slate-100 space-y-3">
                      {/* AI Snippet Direct Answer Box */}
                      <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200 text-sky-900 leading-relaxed">
                        <strong className="font-bold text-sky-900 block mb-1">
                          ⚡ AI 核心精華摘要：
                        </strong>
                        {faq.shortAnswer}
                      </div>

                      <p className="text-slate-600 leading-relaxed">
                        {faq.detailedAnswer}
                      </p>

                      <ul className="space-y-1.5 pt-2 text-xs text-slate-500">
                        {faq.keyPoints.map((kp, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                            <span>{kp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-700 hover:text-cyan-600"
            >
              進入完整 FAQ 知識庫（含停車限高與稅金試算）
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Injected FAQ Schema.org for Google & AI Overviews */}
      <JsonLdFaq faqs={FAQS_DATA} canonicalUrl="https://7seater-guide.tw" />

      {/* Injected ItemList Schema.org for AI & Knowledge Graph */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            '@id': 'https://7seater-guide.tw/#car-catalog',
            name: '2025 台灣市售熱門七人座休旅車與 MPV 車款評測清單',
            description: '收錄 13 款台灣市售 7 人座 MPV 與 5+2 SUV：價格、座椅佈局、第三排成人實用性評等與滿載行李箱公升數。',
            numberOfItems: CARS_DATA.length,
            itemListElement: CARS_DATA.map((car, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: `${car.brand} ${car.model} (${car.year}) 七人座`,
              url: `https://7seater-guide.tw/cars/${car.slug}`,
              image: car.heroImage.startsWith('http')
                ? car.heroImage
                : `https://7seater-guide.tw${car.heroImage.startsWith('/') ? car.heroImage : `/${car.heroImage}`}`,
            })),
          }),
        }}
      />
    </div>
  );
}
