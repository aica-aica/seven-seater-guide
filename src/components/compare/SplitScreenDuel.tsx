'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { CARS_DATA } from '@/data/cars';
import { CoreCategory } from '@/types/car';
import { getCarImageUrl } from '@/utils/image';
import {
  ArrowLeftRight,
  ChevronUp,
  ChevronDown,
  ShieldCheck,
  Zap,
  Luggage,
  Users,
  Coins,
  ExternalLink,
  Sparkles,
  Layers,
  Award,
  Ruler,
  Maximize2,
} from 'lucide-react';
import TrueScaleDimensionDuel from './TrueScaleDimensionDuel';

interface SplitScreenDuelProps {
  initialLeftId?: string;
  initialRightId?: string;
  className?: string;
  showTitle?: boolean;
}

// Predefined popular comparison duels
const PRESET_DUELS = [
  {
    name: '德系純電 vs 日系油電旗艦對決',
    desc: '福斯復古純電 91kWh 大空間 vs 豐田油電省油全尺寸 MPV',
    leftId: 'volkswagen-id-buzz',
    rightId: 'toyota-sienna',
  },
  {
    name: '正7座 MPV vs 5+2 SUV 經典對決',
    desc: '北美全尺寸滑門霸主 vs 歐洲進口熱銷七座休旅',
    leftId: 'toyota-sienna',
    rightId: 'skoda-kodiaq',
  },
  {
    name: '百萬級國產正7座 vs 韓系科技休旅',
    desc: '雙側電動滑門低稅金 vs 渦輪油電美型 5+2',
    leftId: 'hyundai-custin',
    rightId: 'kia-sorento',
  },
  {
    name: '德系純電 vs 燃油旗艦對決',
    desc: 'MEB 純電潮玩正7座 vs 全平整無段滑軌商務旗艦',
    leftId: 'volkswagen-id-buzz',
    rightId: 'volkswagen-multivan',
  },
  {
    name: '頂級奢華旗艦巔峰對戰',
    desc: '日系霸主旗艦 MPV vs 層峰總裁移動行宮',
    leftId: 'toyota-alphard',
    rightId: 'lexus-lm',
  },
  {
    name: '純電雙雄跨界大七座對抗',
    desc: '800V 科技純電大7座 vs MEB 潮玩純電七座廂車',
    leftId: 'kia-ev9',
    rightId: 'volkswagen-id-buzz',
  },
];

export default function SplitScreenDuel({
  initialLeftId = 'toyota-sienna',
  initialRightId = 'skoda-kodiaq',
  className = '',
  showTitle = true,
}: SplitScreenDuelProps) {
  const [leftCarId, setLeftCarId] = useState<string>(initialLeftId);
  const [rightCarId, setRightCarId] = useState<string>(initialRightId);

  // Filter category independently for left & right
  const [leftCategoryFilter, setLeftCategoryFilter] = useState<'all' | CoreCategory>('all');
  const [rightCategoryFilter, setRightCategoryFilter] = useState<'all' | CoreCategory>('all');

  // Mobile active tab ('left' or 'right')
  const [mobileTab, setMobileTab] = useState<'left' | 'right'>('left');

  // Scale presentation mode: 'proportional' (1:1 true physical scale) or 'fill' (traditional full-bleed)
  const [scaleMode, setScaleMode] = useState<'proportional' | 'fill'>('proportional');

  // Refs for scrolling containers
  const leftReelRef = useRef<HTMLDivElement>(null);
  const rightReelRef = useRef<HTMLDivElement>(null);

  // Filtered lists
  const leftPool = useMemo(() => {
    if (leftCategoryFilter === 'all') return CARS_DATA;
    return CARS_DATA.filter((c) => c.coreCategory === leftCategoryFilter);
  }, [leftCategoryFilter]);

  const rightPool = useMemo(() => {
    if (rightCategoryFilter === 'all') return CARS_DATA;
    return CARS_DATA.filter((c) => c.coreCategory === rightCategoryFilter);
  }, [rightCategoryFilter]);

  // Active cars
  const leftCar = useMemo(() => {
    return CARS_DATA.find((c) => c.id === leftCarId) || leftPool[0] || CARS_DATA[0];
  }, [leftCarId, leftPool]);

  const rightCar = useMemo(() => {
    return CARS_DATA.find((c) => c.id === rightCarId) || rightPool[1] || CARS_DATA[1];
  }, [rightCarId, rightPool]);

  // Swap Left & Right
  const handleSwap = () => {
    const temp = leftCarId;
    setLeftCarId(rightCarId);
    setRightCarId(temp);
  };

  // Step Previous / Next
  const stepLeft = (direction: 'up' | 'down') => {
    const currentIndex = leftPool.findIndex((c) => c.id === leftCar.id);
    if (currentIndex === -1) return;
    let nextIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (nextIndex < 0) nextIndex = leftPool.length - 1;
    if (nextIndex >= leftPool.length) nextIndex = 0;
    setLeftCarId(leftPool[nextIndex].id);
  };

  const stepRight = (direction: 'up' | 'down') => {
    const currentIndex = rightPool.findIndex((c) => c.id === rightCar.id);
    if (currentIndex === -1) return;
    let nextIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (nextIndex < 0) nextIndex = rightPool.length - 1;
    if (nextIndex >= rightPool.length) nextIndex = 0;
    setRightCarId(rightPool[nextIndex].id);
  };

  // Scroll active item into view inside the reels
  useEffect(() => {
    const el = leftReelRef.current?.querySelector(`[data-car-id="${leftCar.id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [leftCar.id]);

  useEffect(() => {
    const el = rightReelRef.current?.querySelector(`[data-car-id="${rightCar.id}"]`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [rightCar.id]);

  // Differential computations
  const luggageDiff = leftCar.luggage.litres7SeatMode - rightCar.luggage.litres7SeatMode;
  const legroomDiff = leftCar.seating.thirdRowKneeClearanceCm - rightCar.seating.thirdRowKneeClearanceCm;
  const taxDiff = leftCar.powertrain.annualTaiwanTaxTwd - rightCar.powertrain.annualTaiwanTaxTwd;
  const priceLeftMinWan = Math.round(leftCar.priceRangeTwd[0] / 10000);
  const priceRightMinWan = Math.round(rightCar.priceRangeTwd[0] / 10000);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header & Concept Explanation */}
      {showTitle && (
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-sky-700 text-xs font-semibold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
            <span>左右獨立上下滑動選車 • 雙欄即時對決視圖</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
            正 7 人座 MPV <span className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 bg-clip-text text-transparent font-black">VS</span> 5+2 SUV 同場規格橫向對決
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            左邊與右邊皆可<strong className="text-slate-800">自由上下滾動選車</strong>。全站車輛嚴格劃分為
            <strong className="text-emerald-700">「正7人座 (MPV)」</strong>與
            <strong className="text-sky-700">「5+2 SUV」</strong>兩大陣營，秒懂空間、滑門、第三排與稅金優勢！
          </p>
        </div>
      )}

      {/* Preset Duels Quick Bar */}
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/90 p-3 sm:p-4 shadow-sm">
        <div className="flex items-center gap-2 mb-2.5 text-xs font-bold text-slate-800">
          <Layers className="w-3.5 h-3.5 text-cyan-600" />
          <span>熱門快速對決組合：</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-2">
          {PRESET_DUELS.map((preset, idx) => {
            const isCurrent =
              (leftCarId === preset.leftId && rightCarId === preset.rightId) ||
              (leftCarId === preset.rightId && rightCarId === preset.leftId);
            return (
              <button
                key={idx}
                onClick={() => {
                  setLeftCarId(preset.leftId);
                  setRightCarId(preset.rightId);
                }}
                className={`p-2.5 rounded-xl text-left transition-all border text-xs ${
                  isCurrent
                    ? 'bg-sky-50 border-cyan-500 text-cyan-950 ring-1 ring-cyan-400/50 shadow-sm font-bold'
                    : 'bg-slate-50 border-slate-200/90 text-slate-700 hover:bg-white hover:border-cyan-400 hover:text-slate-900 shadow-xs'
                }`}
              >
                <div className="font-bold truncate">{preset.name}</div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">{preset.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Scale Mode Switcher Strip */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 p-3 rounded-2xl bg-white/95 border border-slate-200/90 text-xs shadow-sm">
        <div className="flex items-center gap-2">
          <Ruler className="w-4 h-4 text-cyan-600" />
          <span className="font-bold text-slate-900">車身大小呈現模式：</span>
          <span className="text-[11px] text-slate-500">
            {scaleMode === 'proportional'
              ? '依原廠長寬高公釐 (mm) 數據 1:1 等比例真實展現'
              : '滿版填滿模式'}
          </span>
        </div>
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-end sm:self-auto">
          <button
            onClick={() => setScaleMode('proportional')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              scaleMode === 'proportional'
                ? 'bg-white border border-cyan-400 text-cyan-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Ruler className="w-3.5 h-3.5 text-cyan-600" />
            <span>📐 1:1 等比例真實尺寸</span>
          </button>
          <button
            onClick={() => setScaleMode('fill')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1.5 ${
              scaleMode === 'fill'
                ? 'bg-white border border-slate-300 text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>🖼️ 滿版圖片</span>
          </button>
        </div>
      </div>

      {/* Mobile Switcher Tab (Visible on small screens) */}
      <div className="flex lg:hidden items-center justify-between p-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
        <button
          onClick={() => setMobileTab('left')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'left'
              ? 'bg-cyan-600 text-white shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>👈 左車：{leftCar.model}</span>
        </button>
        <button
          onClick={handleSwap}
          className="p-2 text-slate-500 hover:text-cyan-600 transition-colors"
          title="對調左右車輛"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => setMobileTab('right')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'right'
              ? 'bg-violet-600 text-white shadow-sm font-bold'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <span>👉 右車：{rightCar.model}</span>
        </button>
      </div>

      {/* Main Split Screen Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        {/* Floating Center VS & Swap Badge (Desktop) */}
        <div className="hidden lg:flex absolute left-1/2 top-40 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-white border-2 border-cyan-500 shadow-lg flex items-center justify-center font-black text-slate-900 text-base tracking-wider">
            VS
          </div>
          <button
            onClick={handleSwap}
            className="px-3 py-1 rounded-full bg-white hover:bg-slate-50 text-slate-700 hover:text-cyan-700 border border-slate-200 text-[11px] font-bold flex items-center gap-1 shadow-md transition-all backdrop-blur"
            title="對調左右車輛比對"
          >
            <ArrowLeftRight className="w-3 h-3" />
            <span>對調</span>
          </button>
        </div>

        {/* ===================== LEFT VEHICLE COLUMN ===================== */}
        <div className={`space-y-4 ${mobileTab === 'right' ? 'hidden lg:block' : 'block'}`}>
          {/* Left Column Header & Controls */}
          <div className="p-4 rounded-2xl bg-white/95 border border-slate-200/90 shadow-md space-y-3 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-600 tech-glow-cyan animate-pulse" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  左側對比座駕 (A)
                </h3>
              </div>
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-[11px]">
                <button
                  onClick={() => setLeftCategoryFilter('all')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                    leftCategoryFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  全部 ({CARS_DATA.length})
                </button>
                <button
                  onClick={() => setLeftCategoryFilter('true-7-mpv')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors flex items-center gap-1 ${
                    leftCategoryFilter === 'true-7-mpv'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  正7人座
                </button>
                <button
                  onClick={() => setLeftCategoryFilter('5-plus-2-suv')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors flex items-center gap-1 ${
                    leftCategoryFilter === '5-plus-2-suv'
                      ? 'bg-sky-100 text-sky-800 border border-sky-300'
                      : 'text-slate-600 hover:text-sky-700'
                  }`}
                >
                  <Zap className="w-3 h-3 text-sky-600" />
                  5+2 SUV
                </button>
              </div>
            </div>

            {/* Vertical Scroll Reel / Wheel */}
            <div className="relative">
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1 px-1">
                <span>上下滾動或點擊換車：</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => stepLeft('up')}
                    className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
                    title="上一款車"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => stepLeft('down')}
                    className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
                    title="下一款車"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Container */}
              <div
                ref={leftReelRef}
                className="flex gap-2 overflow-x-auto lg:overflow-y-auto lg:flex-col lg:max-h-52 p-1.5 rounded-xl bg-slate-50 border border-slate-200 scrollbar-thin scrollbar-thumb-slate-300"
              >
                {leftPool.map((car) => {
                  const isSelected = car.id === leftCar.id;
                  const isTrueMpv = car.coreCategory === 'true-7-mpv';
                  return (
                    <button
                      key={car.id}
                      data-car-id={car.id}
                      onClick={() => setLeftCarId(car.id)}
                      className={`flex-shrink-0 lg:w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all border ${
                        isSelected
                          ? 'bg-sky-50 border-cyan-500 shadow-sm ring-1 ring-cyan-400/50'
                          : 'bg-white border-slate-200/90 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 relative border border-slate-200">
                        <img
                          src={getCarImageUrl(car.heroImage)}
                          alt={car.model}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-black px-1.5 py-0.2 rounded ${
                              isTrueMpv
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-sky-100 text-sky-800 border border-sky-300'
                            }`}
                          >
                            {car.coreCategoryLabel}
                          </span>
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {car.brand} {car.model}
                          </span>
                        </div>
                        <div className="text-[11px] text-cyan-700 font-mono font-bold mt-0.5">
                          {Math.round(car.priceRangeTwd[0] / 10000)} ~{' '}
                          {Math.round(car.priceRangeTwd[1] / 10000)} 萬
                        </div>
                      </div>
                      {isSelected && (
                        <div className="hidden lg:block text-cyan-700 text-xs font-bold px-1.5">
                          ✓ 已選定
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Car In-Depth Specification Card */}
          <div className="rounded-2xl bg-white/95 border border-slate-200/90 hover:border-cyan-500/40 overflow-hidden shadow-xl space-y-4 p-5 backdrop-blur-xl transition-colors">
            {/* Image & Identity */}
            {scaleMode === 'proportional' ? (
              <div className="relative h-56 sm:h-64 rounded-xl overflow-hidden bg-gradient-to-b from-sky-50/40 to-slate-50 border border-cyan-200/80 flex flex-col justify-between p-3.5 group shadow-inner">
                {/* Top Badges & Real Dimensions */}
                <div className="flex items-center justify-between z-10">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black shadow-sm ${
                      leftCar.coreCategory === 'true-7-mpv'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-sky-600 text-white'
                    }`}
                  >
                    {leftCar.coreCategory === 'true-7-mpv' ? (
                      <ShieldCheck className="w-3 h-3" />
                    ) : (
                      <Zap className="w-3 h-3" />
                    )}
                    {leftCar.coreCategoryLabel}
                  </span>
                  <div className="text-[11px] font-mono font-bold text-cyan-900 bg-white/95 border border-cyan-300 px-2 py-0.5 rounded-md shadow-xs">
                    長 {leftCar.dimensions.lengthMm} × 寬 {leftCar.dimensions.widthMm} × 高 {leftCar.dimensions.heightMm} mm
                  </div>
                </div>

                {/* Stage with ground line & height limit benchmarks */}
                <div className="relative h-36 sm:h-44 w-full flex items-end justify-center">
                  {/* 1.8m guideline */}
                  <div
                    className="absolute w-full border-t border-dashed border-amber-500/50 z-10 flex items-center justify-end text-[9px] text-amber-700 pr-1 pointer-events-none"
                    style={{ bottom: `${(1800 / 2050) * 100}%` }}
                  >
                    <span className="bg-white/90 px-1 rounded shadow-xs">1.8m 限高</span>
                  </div>
                  {/* 1.85m guideline */}
                  <div
                    className="absolute w-full border-t border-dashed border-rose-500/50 z-10 flex items-center justify-end text-[9px] text-rose-700 pr-1 pointer-events-none"
                    style={{ bottom: `${(1850 / 2050) * 100}%` }}
                  >
                    <span className="bg-white/90 px-1 rounded shadow-xs">1.85m 限高</span>
                  </div>
                  {/* Ground Baseline */}
                  <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-cyan-600 to-slate-500 z-10 shadow-xs" />
                  <div className="absolute bottom-1.5 left-2 z-10 pointer-events-none">
                    <span className="text-[9px] font-mono font-bold text-cyan-900 bg-white/95 px-1.5 py-0.2 rounded border border-cyan-300 shadow-2xs">
                      地面 0mm
                    </span>
                  </div>

                  {/* Proportional Car Image */}
                  <div
                    className="relative z-0 transition-all duration-500 flex items-end justify-center"
                    style={{
                      height: `${(leftCar.dimensions.heightMm / 2050) * 100}%`,
                      width: 'auto',
                      maxWidth: '92%',
                    }}
                  >
                    <img
                      src={getCarImageUrl(leftCar.heroImage)}
                      alt={leftCar.model}
                      className="h-full w-auto max-w-full object-contain object-bottom drop-shadow-[0_8px_20px_rgba(6,182,212,0.22)] group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Tire Contact Shadow */}
                    <div className="absolute -bottom-0.5 inset-x-2 h-2 bg-slate-950/30 blur-xs rounded-full -z-10" />
                  </div>
                </div>

                {/* Bottom Identity & Price */}
                <div className="flex items-end justify-between z-10 pt-2 border-t border-slate-200">
                  <div>
                    <div className="text-xs text-slate-500 font-medium">{leftCar.brand}</div>
                    <h4 className="text-xl font-black text-slate-900">{leftCar.model}</h4>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-white/95 border border-slate-200 text-cyan-800 font-mono font-bold text-sm shadow-sm">
                    NT$ {priceLeftMinWan} ~ {Math.round(leftCar.priceRangeTwd[1] / 10000)} 萬
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden bg-slate-100 group">
                <img
                  src={getCarImageUrl(leftCar.heroImage)}
                  alt={leftCar.model}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-black/20" />

                {/* Category Badge Over Image */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-sm backdrop-blur-md ${
                      leftCar.coreCategory === 'true-7-mpv'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-sky-600 text-white'
                    }`}
                  >
                    {leftCar.coreCategory === 'true-7-mpv' ? (
                      <ShieldCheck className="w-3.5 h-3.5" />
                    ) : (
                      <Zap className="w-3.5 h-3.5" />
                    )}
                    {leftCar.coreCategoryLabel}
                  </span>
                </div>

                {/* Price Tag Over Image */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-white/95 backdrop-blur border border-slate-200 text-cyan-800 font-mono font-bold text-sm shadow-sm">
                  NT$ {priceLeftMinWan} ~ {Math.round(leftCar.priceRangeTwd[1] / 10000)} 萬
                </div>

                <div className="absolute bottom-3 left-3 text-slate-900">
                  <div className="text-xs text-slate-600 font-medium">{leftCar.brand}</div>
                  <h4 className="text-xl font-black">{leftCar.model}</h4>
                </div>
              </div>
            )}

            {/* Tagline */}
            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
              💡 {leftCar.tagline}
            </p>

            {/* Key Comparison Highlights vs Right Car */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Third Row Metric */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-cyan-600" />
                    第三排膝部空間
                  </span>
                  {legroomDiff > 0 && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                      +{legroomDiff} cm 領先
                    </span>
                  )}
                </div>
                <div className="text-base font-black text-slate-900 font-mono">
                  {leftCar.seating.thirdRowKneeClearanceCm} 公分
                </div>
                <div className="text-[11px] text-slate-500">
                  舒適評分：
                  <span className="text-cyan-700 font-bold">
                    {leftCar.seating.thirdRowComfortRating}/10
                  </span>
                  （{leftCar.seating.thirdRowUsability === 'adult-long-haul' ? '成人長途' : '應急短途'}）
                </div>
              </div>

              {/* Luggage Metric */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Luggage className="w-3 h-3 text-cyan-600" />
                    7人滿載行李箱
                  </span>
                  {luggageDiff > 0 && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                      +{luggageDiff}L 領先
                    </span>
                  )}
                </div>
                <div className="text-base font-black text-slate-900 font-mono">
                  {leftCar.luggage.litres7SeatMode} 公升
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  3排傾倒：{leftCar.luggage.litres3rdRowFolded}L
                </div>
              </div>

              {/* Door Type Metric */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[11px] text-slate-500">側門與上下車台階</div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  {leftCar.doorType === 'dual-power-sliding' ? (
                    <span className="text-emerald-700">雙側電動滑門 ✨</span>
                  ) : leftCar.doorType === 'manual-sliding' ? (
                    <span className="text-emerald-700">雙側手動滑門 ✨</span>
                  ) : (
                    <span className="text-slate-600">傳統外開式車門</span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500">
                  離地高：{leftCar.dimensions.stepInHeightMm}mm（
                  {leftCar.dimensions.stepInHeightMm <= 400 ? '超低底盤長輩首選' : '標準休旅高底盤'}）
                </div>
              </div>

              {/* Tax & Powertrain */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Coins className="w-3 h-3 text-cyan-600" />
                    每年牌照+燃料稅
                  </span>
                  {taxDiff < 0 && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                      省 ${Math.abs(taxDiff).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="text-base font-black text-slate-900 font-mono">
                  NT$ {leftCar.powertrain.annualTaiwanTaxTwd.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500">
                  平均油耗：{leftCar.powertrain.fuelConsumptionKmL} km/L
                </div>
              </div>
            </div>

            {/* Seating Layout & Isofix */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <div className="flex items-center justify-between text-slate-700">
                <span className="text-slate-500">座椅排列佈局：</span>
                <span className="font-bold text-cyan-700">{leftCar.seating.layout} 格局</span>
              </div>
              <div className="text-[11px] text-slate-500 leading-relaxed">
                {leftCar.seating.layoutDescription}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                <span>ISOFIX 兒童汽座：</span>
                <span className="font-bold text-slate-900">
                  標配 {leftCar.safety.isofixPoints} 組固定扣
                </span>
              </div>
            </div>

            {/* Direct Link to Car Details */}
            <div className="pt-2">
              <Link
                href={`/cars/${leftCar.slug}`}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-blue-600 hover:text-white text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm group border border-slate-200"
              >
                <span>查看 {leftCar.model} 完整規格與詳細車評</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* ===================== RIGHT VEHICLE COLUMN ===================== */}
        <div className={`space-y-4 ${mobileTab === 'left' ? 'hidden lg:block' : 'block'}`}>
          {/* Right Column Header & Controls */}
          <div className="p-4 rounded-2xl bg-white/95 border border-slate-200/90 shadow-md space-y-3 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-600 tech-glow-violet animate-pulse" />
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
                  右側對比座駕 (B)
                </h3>
              </div>
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200 text-[11px]">
                <button
                  onClick={() => setRightCategoryFilter('all')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                    rightCategoryFilter === 'all'
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  全部 ({CARS_DATA.length})
                </button>
                <button
                  onClick={() => setRightCategoryFilter('true-7-mpv')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors flex items-center gap-1 ${
                    rightCategoryFilter === 'true-7-mpv'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'text-slate-600 hover:text-emerald-700'
                  }`}
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  正7人座
                </button>
                <button
                  onClick={() => setRightCategoryFilter('5-plus-2-suv')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors flex items-center gap-1 ${
                    rightCategoryFilter === '5-plus-2-suv'
                      ? 'bg-sky-100 text-sky-800 border border-sky-300'
                      : 'text-slate-600 hover:text-sky-700'
                  }`}
                >
                  <Zap className="w-3 h-3 text-sky-600" />
                  5+2 SUV
                </button>
              </div>
            </div>

            {/* Vertical Scroll Reel / Wheel */}
            <div className="relative">
              <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1 px-1">
                <span>上下滾動或點擊換車：</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => stepRight('up')}
                    className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
                    title="上一款車"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => stepRight('down')}
                    className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
                    title="下一款車"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Container */}
              <div
                ref={rightReelRef}
                className="flex gap-2 overflow-x-auto lg:overflow-y-auto lg:flex-col lg:max-h-52 p-1.5 rounded-xl bg-slate-50 border border-slate-200 scrollbar-thin scrollbar-thumb-slate-300"
              >
                {rightPool.map((car) => {
                  const isSelected = car.id === rightCar.id;
                  const isTrueMpv = car.coreCategory === 'true-7-mpv';
                  return (
                    <button
                      key={car.id}
                      data-car-id={car.id}
                      onClick={() => setRightCarId(car.id)}
                      className={`flex-shrink-0 lg:w-full flex items-center gap-2.5 p-2 rounded-xl text-left transition-all border ${
                        isSelected
                          ? 'bg-violet-50 border-violet-500 shadow-sm ring-1 ring-violet-400/50'
                          : 'bg-white border-slate-200/90 hover:bg-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0 relative border border-slate-200">
                        <img
                          src={getCarImageUrl(car.heroImage)}
                          alt={car.model}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`text-[10px] font-black px-1.5 py-0.2 rounded ${
                              isTrueMpv
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                : 'bg-sky-100 text-sky-800 border border-sky-300'
                            }`}
                          >
                            {car.coreCategoryLabel}
                          </span>
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {car.brand} {car.model}
                          </span>
                        </div>
                        <div className="text-[11px] text-violet-700 font-mono font-bold mt-0.5">
                          {Math.round(car.priceRangeTwd[0] / 10000)} ~{' '}
                          {Math.round(car.priceRangeTwd[1] / 10000)} 萬
                        </div>
                      </div>
                      {isSelected && (
                        <div className="hidden lg:block text-violet-700 text-xs font-bold px-1.5">
                          ✓ 已選定
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Car In-Depth Specification Card */}
          <div className="rounded-2xl bg-white/95 border border-slate-200/90 hover:border-violet-500/40 overflow-hidden shadow-xl space-y-4 p-5 backdrop-blur-xl transition-colors">
            {/* Image & Identity */}
            {scaleMode === 'proportional' ? (
              <div className="relative h-56 sm:h-64 rounded-xl overflow-hidden bg-gradient-to-b from-purple-50/40 to-slate-50 border border-violet-200/80 flex flex-col justify-between p-3.5 group shadow-inner">
                {/* Top Badges & Real Dimensions */}
                <div className="flex items-center justify-between z-10">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black shadow-sm ${
                      rightCar.coreCategory === 'true-7-mpv'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-sky-600 text-white'
                    }`}
                  >
                    {rightCar.coreCategory === 'true-7-mpv' ? (
                      <ShieldCheck className="w-3 h-3" />
                    ) : (
                      <Zap className="w-3 h-3" />
                    )}
                    {rightCar.coreCategoryLabel}
                  </span>
                  <div className="text-[11px] font-mono font-bold text-violet-900 bg-white/95 border border-violet-300 px-2 py-0.5 rounded-md shadow-xs">
                    長 {rightCar.dimensions.lengthMm} × 寬 {rightCar.dimensions.widthMm} × 高 {rightCar.dimensions.heightMm} mm
                  </div>
                </div>

                {/* Stage with ground line & height limit benchmarks */}
                <div className="relative h-36 sm:h-44 w-full flex items-end justify-center">
                  {/* 1.8m guideline */}
                  <div
                    className="absolute w-full border-t border-dashed border-amber-500/50 z-10 flex items-center justify-end text-[9px] text-amber-700 pr-1 pointer-events-none"
                    style={{ bottom: `${(1800 / 2050) * 100}%` }}
                  >
                    <span className="bg-white/90 px-1 rounded shadow-xs">1.8m 限高</span>
                  </div>
                  {/* 1.85m guideline */}
                  <div
                    className="absolute w-full border-t border-dashed border-rose-500/50 z-10 flex items-center justify-end text-[9px] text-rose-700 pr-1 pointer-events-none"
                    style={{ bottom: `${(1850 / 2050) * 100}%` }}
                  >
                    <span className="bg-white/90 px-1 rounded shadow-xs">1.85m 限高</span>
                  </div>
                  {/* Ground Baseline */}
                  <div className="absolute bottom-0 inset-x-0 h-1.5 bg-gradient-to-r from-slate-500 to-violet-600 z-10 shadow-xs" />
                  <div className="absolute bottom-1.5 right-2 z-10 pointer-events-none">
                    <span className="text-[9px] font-mono font-bold text-violet-900 bg-white/95 px-1.5 py-0.2 rounded border border-violet-300 shadow-2xs">
                      地面 0mm
                    </span>
                  </div>

                  {/* Proportional Car Image */}
                  <div
                    className="relative z-0 transition-all duration-500 flex items-end justify-center"
                    style={{
                      height: `${(rightCar.dimensions.heightMm / 2050) * 100}%`,
                      width: 'auto',
                      maxWidth: '92%',
                    }}
                  >
                    <img
                      src={getCarImageUrl(rightCar.heroImage)}
                      alt={rightCar.model}
                      className="h-full w-auto max-w-full object-contain object-bottom drop-shadow-[0_8px_20px_rgba(139,92,246,0.22)] group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Tire Contact Shadow */}
                    <div className="absolute -bottom-0.5 inset-x-2 h-2 bg-slate-950/30 blur-xs rounded-full -z-10" />
                  </div>
                </div>

                {/* Bottom Identity & Price */}
                <div className="flex items-end justify-between z-10 pt-2 border-t border-slate-200">
                  <div>
                    <div className="text-xs text-slate-500 font-medium">{rightCar.brand}</div>
                    <h4 className="text-xl font-black text-slate-900">{rightCar.model}</h4>
                  </div>
                  <div className="px-2.5 py-1 rounded-lg bg-white/95 border border-slate-200 text-violet-800 font-mono font-bold text-sm shadow-sm">
                    NT$ {priceRightMinWan} ~ {Math.round(rightCar.priceRangeTwd[1] / 10000)} 萬
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden bg-slate-100 group">
                <img
                  src={getCarImageUrl(rightCar.heroImage)}
                  alt={rightCar.model}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-black/20" />

                {/* Category Badge Over Image */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-sm backdrop-blur-md ${
                      rightCar.coreCategory === 'true-7-mpv'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-sky-600 text-white'
                    }`}
                  >
                    {rightCar.coreCategory === 'true-7-mpv' ? (
                      <ShieldCheck className="w-3.5 h-3.5" />
                    ) : (
                      <Zap className="w-3.5 h-3.5" />
                    )}
                    {rightCar.coreCategoryLabel}
                  </span>
                </div>

                {/* Price Tag Over Image */}
                <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-white/95 backdrop-blur border border-slate-200 text-violet-800 font-mono font-bold text-sm shadow-sm">
                  NT$ {priceRightMinWan} ~ {Math.round(rightCar.priceRangeTwd[1] / 10000)} 萬
                </div>

                <div className="absolute bottom-3 left-3 text-slate-900">
                  <div className="text-xs text-slate-600 font-medium">{rightCar.brand}</div>
                  <h4 className="text-xl font-black">{rightCar.model}</h4>
                </div>
              </div>
            )}

            {/* Tagline */}
            <p className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
              💡 {rightCar.tagline}
            </p>

            {/* Key Comparison Highlights vs Left Car */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Third Row Metric */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-violet-600" />
                    第三排膝部空間
                  </span>
                  {legroomDiff < 0 && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                      +{Math.abs(legroomDiff)} cm 領先
                    </span>
                  )}
                </div>
                <div className="text-base font-black text-slate-900 font-mono">
                  {rightCar.seating.thirdRowKneeClearanceCm} 公分
                </div>
                <div className="text-[11px] text-slate-500">
                  舒適評分：
                  <span className="text-sky-700 font-bold">
                    {rightCar.seating.thirdRowComfortRating}/10
                  </span>
                  （{rightCar.seating.thirdRowUsability === 'adult-long-haul' ? '成人長途' : '應急短途'}）
                </div>
              </div>

              {/* Luggage Metric */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Luggage className="w-3 h-3 text-violet-600" />
                    7人滿載行李箱
                  </span>
                  {luggageDiff < 0 && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                      +{Math.abs(luggageDiff)}L 領先
                    </span>
                  )}
                </div>
                <div className="text-base font-black text-slate-900 font-mono">
                  {rightCar.luggage.litres7SeatMode} 公升
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  3排傾倒：{rightCar.luggage.litres3rdRowFolded}L
                </div>
              </div>

              {/* Door Type Metric */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="text-[11px] text-slate-500">側門與上下車台階</div>
                <div className="text-xs font-bold text-slate-900 flex items-center gap-1">
                  {rightCar.doorType === 'dual-power-sliding' ? (
                    <span className="text-emerald-700">雙側電動滑門 ✨</span>
                  ) : rightCar.doorType === 'manual-sliding' ? (
                    <span className="text-emerald-700">雙側手動滑門 ✨</span>
                  ) : (
                    <span className="text-slate-600">傳統外開式車門</span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500">
                  離地高：{rightCar.dimensions.stepInHeightMm}mm（
                  {rightCar.dimensions.stepInHeightMm <= 400 ? '超低底盤長輩首選' : '標準休旅高底盤'}）
                </div>
              </div>

              {/* Tax & Powertrain */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Coins className="w-3 h-3 text-violet-600" />
                    每年牌照+燃料稅
                  </span>
                  {taxDiff > 0 && (
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded">
                      省 ${taxDiff.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="text-base font-black text-slate-900 font-mono">
                  NT$ {rightCar.powertrain.annualTaiwanTaxTwd.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-500">
                  平均油耗：{rightCar.powertrain.fuelConsumptionKmL} km/L
                </div>
              </div>
            </div>

            {/* Seating Layout & Isofix */}
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
              <div className="flex items-center justify-between text-slate-700">
                <span className="text-slate-500">座椅排列佈局：</span>
                <span className="font-bold text-violet-700">{rightCar.seating.layout} 格局</span>
              </div>
              <div className="text-[11px] text-slate-500 leading-relaxed">
                {rightCar.seating.layoutDescription}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
                <span>ISOFIX 兒童汽座：</span>
                <span className="font-bold text-slate-900">
                  標配 {rightCar.safety.isofixPoints} 組固定扣
                </span>
              </div>
            </div>

            {/* Direct Link to Car Details */}
            <div className="pt-2">
              <Link
                href={`/cars/${rightCar.slug}`}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-gradient-to-r hover:from-violet-600 hover:to-indigo-600 hover:text-white text-slate-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm group border border-slate-200"
              >
                <span>查看 {rightCar.model} 完整規格與詳細車評</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===================== TRUE SCALE DIMENSION DUEL (1:1 車身真實比例對照) ===================== */}
      <TrueScaleDimensionDuel leftCar={leftCar} rightCar={rightCar} />

      {/* Summary Verdict Callout: 正7人座 vs 5+2 SUV 核心差異指引 */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-md text-xs space-y-3">
        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
          <Award className="w-4 h-4 text-cyan-600" />
          <span>專家導購結論：買正 7 人座 MPV 還是 5+2 SUV？</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-600 leading-relaxed">
          <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
            <strong className="text-emerald-800 font-bold block mb-1">
              🛡️ 何時必選「正 7 人座 (MPV)」？
            </strong>
            家中經常需要三代同堂全員出動、第三排常態需要搭乘 165 公分以上長輩或成年人、每週都需要載嬰幼兒出門（雙側電動滑門可從容抱小孩上下汽座），或是經常滿載 7 人出遠門過夜旅遊（需要 400L+ 滿載行李箱）。
          </div>
          <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200">
            <strong className="text-sky-800 font-bold block mb-1">
              ⚡ 何時適合「5+2 SUV」？
            </strong>
            平日 80% 時間只有 1~4 人用車、喜愛高底盤視野與帥氣運動外型、經常露營走碎石林道需要四輪驅動（AWD），第三排僅供國小學童或 20 分鐘短程聚餐應急，且第三排收折後追求大行李廂空間。
          </div>
        </div>
      </div>
    </div>
  );
}
