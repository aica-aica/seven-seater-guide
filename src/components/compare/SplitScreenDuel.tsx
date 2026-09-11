'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { CARS_DATA } from '@/data/cars';
import { CoreCategory } from '@/types/car';
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
} from 'lucide-react';

interface SplitScreenDuelProps {
  initialLeftId?: string;
  initialRightId?: string;
  className?: string;
  showTitle?: boolean;
}

// Predefined popular comparison duels
const PRESET_DUELS = [
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
    name: '德系歐風雙雄同場對比',
    desc: '全平整無段滑軌旗艦 vs 德系 MQB 靈活駕控長軸',
    leftId: 'volkswagen-multivan',
    rightId: 'volkswagen-tiguan-allspace',
  },
  {
    name: '頂級奢華旗艦巔峰對戰',
    desc: '層峰總裁移動行宮 vs 日系縱置直六後驅大七座',
    leftId: 'lexus-lm',
    rightId: 'mazda-cx-90',
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

  // Scroll active item into view in the reel
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
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>左右獨立上下滑動選車 • 雙欄即時對決視圖</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            正 7 人座 MPV <span className="text-amber-400">VS</span> 5+2 SUV 同場規格橫向對決
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            左邊與右邊皆可<strong className="text-white">自由上下滾動選車</strong>。全站車輛嚴格劃分為
            <strong className="text-emerald-400">「正7人座 (MPV)」</strong>與
            <strong className="text-sky-400">「5+2 SUV」</strong>兩大陣營，秒懂空間、滑門、第三排與稅金優勢！
          </p>
        </div>
      )}

      {/* Preset Duels Quick Bar */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-3 sm:p-4">
        <div className="flex items-center gap-2 mb-2.5 text-xs font-bold text-slate-300">
          <Layers className="w-3.5 h-3.5 text-amber-400" />
          <span>熱門快速對決組合：</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
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
                    ? 'bg-amber-500/15 border-amber-500/40 text-amber-300 ring-1 ring-amber-500/30'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-850 hover:border-slate-700'
                }`}
              >
                <div className="font-bold truncate">{preset.name}</div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">{preset.desc}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Switcher Tab (Visible on small screens) */}
      <div className="flex lg:hidden items-center justify-between p-1.5 rounded-xl bg-slate-900 border border-slate-800">
        <button
          onClick={() => setMobileTab('left')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'left'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>👈 左車：{leftCar.model}</span>
        </button>
        <button
          onClick={handleSwap}
          className="p-2 text-slate-400 hover:text-amber-400 transition-colors"
          title="對調左右車輛"
        >
          <ArrowLeftRight className="w-4 h-4" />
        </button>
        <button
          onClick={() => setMobileTab('right')}
          className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            mobileTab === 'right'
              ? 'bg-sky-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>👉 右車：{rightCar.model}</span>
        </button>
      </div>

      {/* Main Split Screen Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
        {/* Floating Center VS & Swap Badge (Desktop) */}
        <div className="hidden lg:flex absolute left-1/2 top-40 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-slate-950 border-2 border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.35)] flex items-center justify-center font-black text-white text-base tracking-wider">
            VS
          </div>
          <button
            onClick={handleSwap}
            className="px-3 py-1 rounded-full bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-amber-400 border border-slate-750 text-[11px] font-bold flex items-center gap-1 shadow-lg transition-all backdrop-blur"
            title="對調左右車輛比對"
          >
            <ArrowLeftRight className="w-3 h-3" />
            <span>對調</span>
          </button>
        </div>

        {/* ===================== LEFT VEHICLE COLUMN ===================== */}
        <div className={`space-y-4 ${mobileTab === 'right' ? 'hidden lg:block' : 'block'}`}>
          {/* Left Column Header & Controls */}
          <div className="p-4 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  左側對比座駕 (A)
                </h3>
              </div>
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
                <button
                  onClick={() => setLeftCategoryFilter('all')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                    leftCategoryFilter === 'all'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  全部 ({CARS_DATA.length})
                </button>
                <button
                  onClick={() => setLeftCategoryFilter('true-7-mpv')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors flex items-center gap-1 ${
                    leftCategoryFilter === 'true-7-mpv'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-emerald-300'
                  }`}
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  正7人座
                </button>
                <button
                  onClick={() => setLeftCategoryFilter('5-plus-2-suv')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors flex items-center gap-1 ${
                    leftCategoryFilter === '5-plus-2-suv'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'text-slate-400 hover:text-sky-300'
                  }`}
                >
                  <Zap className="w-3 h-3 text-sky-400" />
                  5+2 SUV
                </button>
              </div>
            </div>

            {/* Vertical Scroll Reel / Wheel */}
            <div className="relative">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 px-1">
                <span>上下滾動或點擊換車：</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => stepLeft('up')}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="上一款車"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => stepLeft('down')}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="下一款車"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Container */}
              <div
                ref={leftReelRef}
                className="flex gap-2 overflow-x-auto lg:overflow-y-auto lg:flex-col lg:max-h-52 p-1.5 rounded-xl bg-slate-950/80 border border-slate-850 scrollbar-thin scrollbar-thumb-slate-700"
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
                          ? 'bg-gradient-to-r from-amber-500/20 to-slate-900 border-amber-500/70 shadow-md ring-1 ring-amber-500/50'
                          : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                      }`}
                    >
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0 relative">
                        <img
                          src={car.heroImage}
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
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                            }`}
                          >
                            {car.coreCategoryLabel}
                          </span>
                          <span className="text-xs font-bold text-white truncate">
                            {car.brand} {car.model}
                          </span>
                        </div>
                        <div className="text-[11px] text-amber-400 font-mono mt-0.5">
                          {Math.round(car.priceRangeTwd[0] / 10000)} ~{' '}
                          {Math.round(car.priceRangeTwd[1] / 10000)} 萬
                        </div>
                      </div>
                      {isSelected && (
                        <div className="hidden lg:block text-amber-400 text-xs font-bold px-1.5">
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
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl space-y-4 p-5">
            {/* Image & Identity */}
            <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden bg-slate-950 group">
              <img
                src={leftCar.heroImage}
                alt={leftCar.model}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

              {/* Category Badge Over Image */}
              <div className="absolute top-3 left-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-lg backdrop-blur-md ${
                    leftCar.coreCategory === 'true-7-mpv'
                      ? 'bg-emerald-500/90 text-slate-950'
                      : 'bg-sky-500/90 text-slate-950'
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
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur border border-white/10 text-amber-400 font-mono font-bold text-sm">
                NT$ {priceLeftMinWan} ~ {Math.round(leftCar.priceRangeTwd[1] / 10000)} 萬
              </div>

              <div className="absolute bottom-3 left-3 text-white">
                <div className="text-xs text-slate-300 font-medium">{leftCar.brand}</div>
                <h4 className="text-xl font-black">{leftCar.model}</h4>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-850 leading-relaxed">
              💡 {leftCar.tagline}
            </p>

            {/* Key Comparison Highlights vs Right Car */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Third Row Metric */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-amber-400" />
                    第三排膝部空間
                  </span>
                  {legroomDiff > 0 && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                      +{legroomDiff} cm 領先
                    </span>
                  )}
                </div>
                <div className="text-base font-black text-white font-mono">
                  {leftCar.seating.thirdRowKneeClearanceCm} 公分
                </div>
                <div className="text-[11px] text-slate-400">
                  舒適評分：
                  <span className="text-amber-400 font-bold">
                    {leftCar.seating.thirdRowComfortRating}/10
                  </span>
                  （{leftCar.seating.thirdRowUsability === 'adult-long-haul' ? '成人長途' : '應急短途'}）
                </div>
              </div>

              {/* Luggage Metric */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Luggage className="w-3 h-3 text-amber-400" />
                    7人滿載行李箱
                  </span>
                  {luggageDiff > 0 && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                      +{luggageDiff}L 領先
                    </span>
                  )}
                </div>
                <div className="text-base font-black text-white font-mono">
                  {leftCar.luggage.litres7SeatMode} 公升
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  3排傾倒：{leftCar.luggage.litres3rdRowFolded}L
                </div>
              </div>

              {/* Door Type Metric */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-[11px] text-slate-400">側門與上下車台階</div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  {leftCar.doorType === 'dual-power-sliding' ? (
                    <span className="text-emerald-400">雙側電動滑門 ✨</span>
                  ) : leftCar.doorType === 'manual-sliding' ? (
                    <span className="text-emerald-400">雙側手動滑門 ✨</span>
                  ) : (
                    <span className="text-slate-300">傳統外開式車門</span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400">
                  離地高：{leftCar.dimensions.stepInHeightMm}mm（
                  {leftCar.dimensions.stepInHeightMm <= 400 ? '超低底盤長輩首選' : '標準休旅高底盤'}）
                </div>
              </div>

              {/* Tax & Powertrain */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Coins className="w-3 h-3 text-amber-400" />
                    每年牌照+燃料稅
                  </span>
                  {taxDiff < 0 && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                      省 ${Math.abs(taxDiff).toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="text-base font-black text-white font-mono">
                  NT$ {leftCar.powertrain.annualTaiwanTaxTwd.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400">
                  平均油耗：{leftCar.powertrain.fuelConsumptionKmL} km/L
                </div>
              </div>
            </div>

            {/* Seating Layout & Isofix */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-850 space-y-1 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">座椅排列佈局：</span>
                <span className="font-bold text-amber-400">{leftCar.seating.layout} 格局</span>
              </div>
              <div className="text-[11px] text-slate-400 leading-relaxed">
                {leftCar.seating.layoutDescription}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-850">
                <span>ISOFIX 兒童汽座：</span>
                <span className="font-bold text-white">
                  標配 {leftCar.safety.isofixPoints} 組固定扣
                </span>
              </div>
            </div>

            {/* Direct Link to Car Details */}
            <div className="pt-2">
              <Link
                href={`/cars/${leftCar.slug}`}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-amber-500 text-slate-200 hover:text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md group"
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
          <div className="p-4 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-pulse" />
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  右側對比座駕 (B)
                </h3>
              </div>
              {/* Category Filter Pills */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px]">
                <button
                  onClick={() => setRightCategoryFilter('all')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors ${
                    rightCategoryFilter === 'all'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  全部 ({CARS_DATA.length})
                </button>
                <button
                  onClick={() => setRightCategoryFilter('true-7-mpv')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors flex items-center gap-1 ${
                    rightCategoryFilter === 'true-7-mpv'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'text-slate-400 hover:text-emerald-300'
                  }`}
                >
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  正7人座
                </button>
                <button
                  onClick={() => setRightCategoryFilter('5-plus-2-suv')}
                  className={`px-2 py-0.5 rounded-md font-bold transition-colors flex items-center gap-1 ${
                    rightCategoryFilter === '5-plus-2-suv'
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                      : 'text-slate-400 hover:text-sky-300'
                  }`}
                >
                  <Zap className="w-3 h-3 text-sky-400" />
                  5+2 SUV
                </button>
              </div>
            </div>

            {/* Vertical Scroll Reel / Wheel */}
            <div className="relative">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 px-1">
                <span>上下滾動或點擊換車：</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => stepRight('up')}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="上一款車"
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => stepRight('down')}
                    className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="下一款車"
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Scrollable Container */}
              <div
                ref={rightReelRef}
                className="flex gap-2 overflow-x-auto lg:overflow-y-auto lg:flex-col lg:max-h-52 p-1.5 rounded-xl bg-slate-950/80 border border-slate-855 scrollbar-thin scrollbar-thumb-slate-700"
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
                          ? 'bg-gradient-to-r from-sky-500/20 to-slate-900 border-sky-500/70 shadow-md ring-1 ring-sky-500/50'
                          : 'bg-slate-900/60 border-slate-800/80 hover:bg-slate-850 hover:border-slate-700'
                      }`}
                    >
                      <div className="w-14 h-10 rounded-lg overflow-hidden bg-slate-950 flex-shrink-0 relative">
                        <img
                          src={car.heroImage}
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
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                                : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                            }`}
                          >
                            {car.coreCategoryLabel}
                          </span>
                          <span className="text-xs font-bold text-white truncate">
                            {car.brand} {car.model}
                          </span>
                        </div>
                        <div className="text-[11px] text-sky-400 font-mono mt-0.5">
                          {Math.round(car.priceRangeTwd[0] / 10000)} ~{' '}
                          {Math.round(car.priceRangeTwd[1] / 10000)} 萬
                        </div>
                      </div>
                      {isSelected && (
                        <div className="hidden lg:block text-sky-400 text-xs font-bold px-1.5">
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
          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl space-y-4 p-5">
            {/* Image & Identity */}
            <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden bg-slate-950 group">
              <img
                src={rightCar.heroImage}
                alt={rightCar.model}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-black/40" />

              {/* Category Badge Over Image */}
              <div className="absolute top-3 left-3">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black shadow-lg backdrop-blur-md ${
                    rightCar.coreCategory === 'true-7-mpv'
                      ? 'bg-emerald-500/90 text-slate-950'
                      : 'bg-sky-500/90 text-slate-950'
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
              <div className="absolute bottom-3 right-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur border border-white/10 text-sky-400 font-mono font-bold text-sm">
                NT$ {priceRightMinWan} ~ {Math.round(rightCar.priceRangeTwd[1] / 10000)} 萬
              </div>

              <div className="absolute bottom-3 left-3 text-white">
                <div className="text-xs text-slate-300 font-medium">{rightCar.brand}</div>
                <h4 className="text-xl font-black">{rightCar.model}</h4>
              </div>
            </div>

            {/* Tagline */}
            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-850 leading-relaxed">
              💡 {rightCar.tagline}
            </p>

            {/* Key Comparison Highlights vs Left Car */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Third Row Metric */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-sky-400" />
                    第三排膝部空間
                  </span>
                  {legroomDiff < 0 && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                      +{Math.abs(legroomDiff)} cm 領先
                    </span>
                  )}
                </div>
                <div className="text-base font-black text-white font-mono">
                  {rightCar.seating.thirdRowKneeClearanceCm} 公分
                </div>
                <div className="text-[11px] text-slate-400">
                  舒適評分：
                  <span className="text-sky-400 font-bold">
                    {rightCar.seating.thirdRowComfortRating}/10
                  </span>
                  （{rightCar.seating.thirdRowUsability === 'adult-long-haul' ? '成人長途' : '應急短途'}）
                </div>
              </div>

              {/* Luggage Metric */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Luggage className="w-3 h-3 text-sky-400" />
                    7人滿載行李箱
                  </span>
                  {luggageDiff < 0 && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                      +{Math.abs(luggageDiff)}L 領先
                    </span>
                  )}
                </div>
                <div className="text-base font-black text-white font-mono">
                  {rightCar.luggage.litres7SeatMode} 公升
                </div>
                <div className="text-[11px] text-slate-400 truncate">
                  3排傾倒：{rightCar.luggage.litres3rdRowFolded}L
                </div>
              </div>

              {/* Door Type Metric */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="text-[11px] text-slate-400">側門與上下車台階</div>
                <div className="text-xs font-bold text-white flex items-center gap-1">
                  {rightCar.doorType === 'dual-power-sliding' ? (
                    <span className="text-emerald-400">雙側電動滑門 ✨</span>
                  ) : rightCar.doorType === 'manual-sliding' ? (
                    <span className="text-emerald-400">雙側手動滑門 ✨</span>
                  ) : (
                    <span className="text-slate-300">傳統外開式車門</span>
                  )}
                </div>
                <div className="text-[11px] text-slate-400">
                  離地高：{rightCar.dimensions.stepInHeightMm}mm（
                  {rightCar.dimensions.stepInHeightMm <= 400 ? '超低底盤長輩首選' : '標準休旅高底盤'}）
                </div>
              </div>

              {/* Tax & Powertrain */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Coins className="w-3 h-3 text-sky-400" />
                    每年牌照+燃料稅
                  </span>
                  {taxDiff > 0 && (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded">
                      省 ${taxDiff.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="text-base font-black text-white font-mono">
                  NT$ {rightCar.powertrain.annualTaiwanTaxTwd.toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400">
                  平均油耗：{rightCar.powertrain.fuelConsumptionKmL} km/L
                </div>
              </div>
            </div>

            {/* Seating Layout & Isofix */}
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-855 space-y-1 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span className="text-slate-400">座椅排列佈局：</span>
                <span className="font-bold text-sky-400">{rightCar.seating.layout} 格局</span>
              </div>
              <div className="text-[11px] text-slate-400 leading-relaxed">
                {rightCar.seating.layoutDescription}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-850">
                <span>ISOFIX 兒童汽座：</span>
                <span className="font-bold text-white">
                  標配 {rightCar.safety.isofixPoints} 組固定扣
                </span>
              </div>
            </div>

            {/* Direct Link to Car Details */}
            <div className="pt-2">
              <Link
                href={`/cars/${rightCar.slug}`}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-sky-500 text-slate-200 hover:text-slate-950 text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md group"
              >
                <span>查看 {rightCar.model} 完整規格與詳細車評</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Verdict Callout: 正7人座 vs 5+2 SUV 核心差異指引 */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-sky-950/40 border border-slate-800 text-xs space-y-3">
        <div className="flex items-center gap-2 font-bold text-white text-sm">
          <Award className="w-4 h-4 text-amber-400" />
          <span>專家導購結論：買正 7 人座 MPV 還是 5+2 SUV？</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300 leading-relaxed">
          <div className="p-3 rounded-xl bg-slate-950/60 border border-emerald-500/20">
            <strong className="text-emerald-400 font-bold block mb-1">
              🛡️ 何時必選「正 7 人座 (MPV)」？
            </strong>
            家中經常需要三代同堂全員出動、第三排常態需要搭乘 165 公分以上長輩或成年人、每週都需要載嬰幼兒出門（雙側電動滑門可從容抱小孩上下汽座），或是經常滿載 7 人出遠門過夜旅遊（需要 400L+ 滿載行李箱）。
          </div>
          <div className="p-3 rounded-xl bg-slate-950/60 border border-sky-500/20">
            <strong className="text-sky-400 font-bold block mb-1">
              ⚡ 何時適合「5+2 SUV」？
            </strong>
            平日 80% 時間只有 1~4 人用車、喜愛高底盤視野與帥氣運動外型、經常露營走碎石林道需要四輪驅動（AWD），第三排僅供國小學童或 20 分鐘短程聚餐應急，且第三排收折後追求大行李廂空間。
          </div>
        </div>
      </div>
    </div>
  );
}
