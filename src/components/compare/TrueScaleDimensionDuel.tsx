'use client';

import React, { useState } from 'react';
import { Car } from '@/types/car';
import { getCarImageUrl } from '@/utils/image';
import {
  Ruler,
  Layers,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Maximize2,
} from 'lucide-react';

interface TrueScaleDimensionDuelProps {
  leftCar: Car;
  rightCar: Car;
  className?: string;
}

// Reference maximum dimensions for 1:1 scale normalization
const REF_MAX_LENGTH = 5300; // mm (Sienna is 5175mm)
const REF_MAX_HEIGHT = 2050; // mm (Lexus LM is 1955mm)
const REF_MAX_WIDTH = 2100;  // mm (Sienna/Carnival are 1995mm)

export default function TrueScaleDimensionDuel({
  leftCar,
  rightCar,
  className = '',
}: TrueScaleDimensionDuelProps) {
  const [viewMode, setViewMode] = useState<'side-by-side' | 'overlay' | 'parking'>('side-by-side');
  const [overlayOpacity, setOverlayOpacity] = useState<number>(50); // 0 = 100% Left, 100 = 100% Right
  const [alignOrigin, setAlignOrigin] = useState<'front' | 'rear'>('front');

  // Differences
  const lengthDiff = leftCar.dimensions.lengthMm - rightCar.dimensions.lengthMm;
  const widthDiff = leftCar.dimensions.widthMm - rightCar.dimensions.widthMm;
  const heightDiff = leftCar.dimensions.heightMm - rightCar.dimensions.heightMm;
  const stepInDiff = leftCar.dimensions.stepInHeightMm - rightCar.dimensions.stepInHeightMm;

  // Proportional percentages (relative to reference maximums)
  const leftLengthPct = (leftCar.dimensions.lengthMm / REF_MAX_LENGTH) * 100;
  const rightLengthPct = (rightCar.dimensions.lengthMm / REF_MAX_LENGTH) * 100;

  const leftHeightPct = (leftCar.dimensions.heightMm / REF_MAX_HEIGHT) * 100;
  const rightHeightPct = (rightCar.dimensions.heightMm / REF_MAX_HEIGHT) * 100;

  // Height limits percentages on the canvas
  const limit1800Pct = (1800 / REF_MAX_HEIGHT) * 100;
  const limit1850Pct = (1850 / REF_MAX_HEIGHT) * 100;

  return (
    <div className={`rounded-2xl bg-[#0e1424]/90 backdrop-blur-xl border border-white/[0.08] shadow-2xl p-4 sm:p-6 space-y-6 ${className}`}>
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold">
            <Ruler className="w-3.5 h-3.5" />
            <span>原廠數據 1:1 等比例尺車身真實幾何比對</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <span>車身長度、寬度與高度真實比例對決</span>
          </h3>
          <p className="text-xs text-slate-400">
            精準依據公釐 (mm) 縮放，地面基準線對齊，真實還原兩車體型差距與停車場穿透力。
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-xl border border-slate-800 text-xs self-start md:self-auto">
          <button
            onClick={() => setViewMode('side-by-side')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'side-by-side'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>側視並排</span>
          </button>
          <button
            onClick={() => setViewMode('overlay')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'overlay'
                ? 'bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>透視重疊</span>
          </button>
          <button
            onClick={() => setViewMode('parking')}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              viewMode === 'parking'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>車位與限高</span>
          </button>
        </div>
      </div>

      {/* Mode Specific Controller Sub-Bar */}
      {viewMode === 'overlay' && (
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">重疊對齊基準點：</span>
            <div className="inline-flex rounded-lg bg-slate-900 border border-slate-750 p-0.5">
              <button
                onClick={() => setAlignOrigin('front')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  alignOrigin === 'front'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                車頭對齊 (Front Bumper)
              </button>
              <button
                onClick={() => setAlignOrigin('rear')}
                className={`px-2.5 py-1 rounded-md font-bold transition-all ${
                  alignOrigin === 'rear'
                    ? 'bg-violet-500/20 text-violet-300 border border-violet-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                車尾對齊 (Rear Bumper)
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 min-w-48 flex-1 max-w-xs">
            <span className="text-[11px] text-cyan-400 font-bold whitespace-nowrap">
              {leftCar.model}
            </span>
            <input
              type="range"
              min="0"
              max="100"
              value={overlayOpacity}
              onChange={(e) => setOverlayOpacity(Number(e.target.value))}
              className="w-full accent-cyan-400 bg-slate-800 h-1.5 rounded-lg cursor-pointer"
              title="調整左右車透視權重"
            />
            <span className="text-[11px] text-violet-400 font-bold whitespace-nowrap">
              {rightCar.model}
            </span>
          </div>
        </div>
      )}

      {/* ======================= VIEW CANVAS 1: SIDE-BY-SIDE ======================= */}
      {viewMode === 'side-by-side' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Car Scale Box */}
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/90 border border-cyan-500/30 p-4 pt-6 flex flex-col justify-between overflow-hidden shadow-lg">
              {/* Top Tag & Identity */}
              <div className="flex items-start justify-between z-10">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold">
                    <span>左車 (A)</span>
                    <span>•</span>
                    <span>{leftCar.coreCategoryLabel}</span>
                  </div>
                  <h4 className="text-base font-black text-white mt-1">
                    {leftCar.brand} {leftCar.model}
                  </h4>
                </div>
                <div className="text-right font-mono text-xs text-slate-300 space-y-0.5">
                  <div>長 <span className="font-bold text-white">{leftCar.dimensions.lengthMm}</span> mm</div>
                  <div>高 <span className="font-bold text-cyan-300">{leftCar.dimensions.heightMm}</span> mm</div>
                  <div className="text-[11px] text-slate-400">軸距 {leftCar.dimensions.wheelbaseMm} mm</div>
                </div>
              </div>

              {/* Scaled Vehicle Display Canvas */}
              <div className="relative h-48 sm:h-56 mt-4 flex items-end justify-center w-full">
                {/* Height Benchmark lines */}
                <div
                  className="absolute w-full border-t border-dashed border-amber-500/50 z-10 flex items-center justify-between text-[10px] text-amber-400/80 pr-1 pointer-events-none"
                  style={{ bottom: `${limit1800Pct}%` }}
                >
                  <span className="bg-slate-950/80 px-1 rounded">1.80m 地下室警戒線</span>
                </div>
                <div
                  className="absolute w-full border-t border-dashed border-rose-500/40 z-10 flex items-center justify-between text-[10px] text-rose-400/80 pr-1 pointer-events-none"
                  style={{ bottom: `${limit1850Pct}%` }}
                >
                  <span className="bg-slate-950/80 px-1 rounded">1.85m 大樓限高線</span>
                </div>

                {/* Ground Line */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent z-10" />

                {/* Vehicle Image Scaled According to Length & Height */}
                <div
                  className="relative z-0 transition-all duration-500 flex items-end justify-center"
                  style={{
                    height: `${leftHeightPct}%`,
                    width: `${leftLengthPct}%`,
                    maxWidth: '96%',
                  }}
                >
                  <img
                    src={getCarImageUrl(leftCar.heroImage)}
                    alt={leftCar.model}
                    className="w-full h-full object-contain object-bottom drop-shadow-[0_8px_16px_rgba(6,182,212,0.15)] filter brightness-105"
                  />
                  {/* Step-in height indicator */}
                  <div className="absolute -bottom-1 left-4 flex items-center gap-1 text-[10px] text-cyan-300 bg-slate-950/90 px-1.5 py-0.5 rounded border border-cyan-500/30">
                    <span>門檻 {leftCar.dimensions.stepInHeightMm}mm</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Badge */}
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">台灣地下停車場適應性：</span>
                {leftCar.dimensions.heightMm > 1850 ? (
                  <span className="font-bold text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> 嚴禁進入 1.85m 地下室
                  </span>
                ) : (
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 可順暢進出 1.8m 地下室
                  </span>
                )}
              </div>
            </div>

            {/* Right Car Scale Box */}
            <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/60 to-slate-950/90 border border-violet-500/30 p-4 pt-6 flex flex-col justify-between overflow-hidden shadow-lg">
              {/* Top Tag & Identity */}
              <div className="flex items-start justify-between z-10">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-violet-500/15 border border-violet-500/30 text-violet-300 text-[11px] font-bold">
                    <span>右車 (B)</span>
                    <span>•</span>
                    <span>{rightCar.coreCategoryLabel}</span>
                  </div>
                  <h4 className="text-base font-black text-white mt-1">
                    {rightCar.brand} {rightCar.model}
                  </h4>
                </div>
                <div className="text-right font-mono text-xs text-slate-300 space-y-0.5">
                  <div>長 <span className="font-bold text-white">{rightCar.dimensions.lengthMm}</span> mm</div>
                  <div>高 <span className="font-bold text-violet-300">{rightCar.dimensions.heightMm}</span> mm</div>
                  <div className="text-[11px] text-slate-400">軸距 {rightCar.dimensions.wheelbaseMm} mm</div>
                </div>
              </div>

              {/* Scaled Vehicle Display Canvas */}
              <div className="relative h-48 sm:h-56 mt-4 flex items-end justify-center w-full">
                {/* Height Benchmark lines */}
                <div
                  className="absolute w-full border-t border-dashed border-amber-500/50 z-10 flex items-center justify-between text-[10px] text-amber-400/80 pr-1 pointer-events-none"
                  style={{ bottom: `${limit1800Pct}%` }}
                >
                  <span className="bg-slate-950/80 px-1 rounded">1.80m 地下室警戒線</span>
                </div>
                <div
                  className="absolute w-full border-t border-dashed border-rose-500/40 z-10 flex items-center justify-between text-[10px] text-rose-400/80 pr-1 pointer-events-none"
                  style={{ bottom: `${limit1850Pct}%` }}
                >
                  <span className="bg-slate-950/80 px-1 rounded">1.85m 大樓限高線</span>
                </div>

                {/* Ground Line */}
                <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent z-10" />

                {/* Vehicle Image Scaled According to Length & Height */}
                <div
                  className="relative z-0 transition-all duration-500 flex items-end justify-center"
                  style={{
                    height: `${rightHeightPct}%`,
                    width: `${rightLengthPct}%`,
                    maxWidth: '96%',
                  }}
                >
                  <img
                    src={getCarImageUrl(rightCar.heroImage)}
                    alt={rightCar.model}
                    className="w-full h-full object-contain object-bottom drop-shadow-[0_8px_16px_rgba(139,92,246,0.15)] filter brightness-105"
                  />
                  {/* Step-in height indicator */}
                  <div className="absolute -bottom-1 left-4 flex items-center gap-1 text-[10px] text-violet-300 bg-slate-950/90 px-1.5 py-0.5 rounded border border-violet-500/30">
                    <span>門檻 {rightCar.dimensions.stepInHeightMm}mm</span>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Badge */}
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                <span className="text-slate-400">台灣地下停車場適應性：</span>
                {rightCar.dimensions.heightMm > 1850 ? (
                  <span className="font-bold text-rose-400 flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" /> 嚴禁進入 1.85m 地下室
                  </span>
                ) : (
                  <span className="font-bold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 可順暢進出 1.8m 地下室
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= VIEW CANVAS 2: GHOST OVERLAY ======================= */}
      {viewMode === 'overlay' && (
        <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-black border border-white/[0.1] p-4 sm:p-6 overflow-hidden">
          {/* Overlay Stage Info */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 font-bold text-cyan-400">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                {leftCar.brand} {leftCar.model} (長 {leftCar.dimensions.lengthMm} / 高 {leftCar.dimensions.heightMm}mm)
              </span>
              <span className="text-slate-500">VS</span>
              <span className="inline-flex items-center gap-1 font-bold text-violet-400">
                <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
                {rightCar.brand} {rightCar.model} (長 {rightCar.dimensions.lengthMm} / 高 {rightCar.dimensions.heightMm}mm)
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              基準原點：{alignOrigin === 'front' ? '前保險桿 0mm' : '後保險桿 0mm'}
            </span>
          </div>

          {/* Superimposed Scaled Stage */}
          <div className="relative h-64 sm:h-72 w-full flex items-end justify-center border-b border-cyan-400/40">
            {/* Height Benchmark lines */}
            <div
              className="absolute w-full border-t border-dashed border-amber-500/50 z-20 flex items-center justify-between text-[10px] text-amber-400/90 px-2 pointer-events-none"
              style={{ bottom: `${limit1800Pct}%` }}
            >
              <span className="bg-slate-950/80 px-1 rounded">⚠️ 1.80m 地下室限高警戒線</span>
            </div>
            <div
              className="absolute w-full border-t border-dashed border-rose-500/40 z-20 flex items-center justify-between text-[10px] text-rose-400/90 px-2 pointer-events-none"
              style={{ bottom: `${limit1850Pct}%` }}
            >
              <span className="bg-slate-950/80 px-1 rounded">⛔ 1.85m 限高線</span>
            </div>

            {/* Left Car Overlay Layer */}
            <div
              className="absolute bottom-0 transition-all duration-300 flex items-end pointer-events-none"
              style={{
                height: `${leftHeightPct}%`,
                width: `${leftLengthPct}%`,
                left: alignOrigin === 'front' ? '6%' : 'auto',
                right: alignOrigin === 'rear' ? '6%' : 'auto',
                opacity: 1 - (overlayOpacity / 100) * 0.65,
                zIndex: overlayOpacity < 50 ? 10 : 5,
              }}
            >
              <img
                src={getCarImageUrl(leftCar.heroImage)}
                alt={leftCar.model}
                className="w-full h-full object-contain object-bottom filter drop-shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              />
              <div className="absolute top-0 left-2 text-[10px] font-mono font-bold text-cyan-300 bg-cyan-950/90 border border-cyan-400/40 px-1.5 py-0.5 rounded shadow">
                A 車頂: {leftCar.dimensions.heightMm}mm
              </div>
            </div>

            {/* Right Car Overlay Layer */}
            <div
              className="absolute bottom-0 transition-all duration-300 flex items-end pointer-events-none"
              style={{
                height: `${rightHeightPct}%`,
                width: `${rightLengthPct}%`,
                left: alignOrigin === 'front' ? '6%' : 'auto',
                right: alignOrigin === 'rear' ? '6%' : 'auto',
                opacity: 0.35 + (overlayOpacity / 100) * 0.65,
                zIndex: overlayOpacity >= 50 ? 10 : 5,
              }}
            >
              <img
                src={getCarImageUrl(rightCar.heroImage)}
                alt={rightCar.model}
                className="w-full h-full object-contain object-bottom filter drop-shadow-[0_0_20px_rgba(139,92,246,0.4)]"
              />
              <div className="absolute top-0 right-2 text-[10px] font-mono font-bold text-violet-300 bg-violet-950/90 border border-violet-400/40 px-1.5 py-0.5 rounded shadow">
                B 車頂: {rightCar.dimensions.heightMm}mm
              </div>
            </div>

            {/* Length Delta Measurement Marker */}
            {lengthDiff !== 0 && (
              <div
                className="absolute -bottom-6 z-20 font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-white/20 text-white shadow-lg"
                style={{
                  right: alignOrigin === 'front' ? '6%' : 'auto',
                  left: alignOrigin === 'rear' ? '6%' : 'auto',
                }}
              >
                長度差：{Math.abs(lengthDiff)} mm (
                {lengthDiff > 0 ? `${leftCar.model} 較長` : `${rightCar.model} 較長`})
              </div>
            )}
          </div>

          <div className="mt-8 text-center text-xs text-slate-400">
            💡 提示：滑動上方控制條可切換透視權重，觀察兩車車頭線條、後懸延伸長度與車頂曲線差異。
          </div>
        </div>
      )}

      {/* ======================= VIEW CANVAS 3: PARKING & GARAGE SIMULATION ======================= */}
      {viewMode === 'parking' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Car Parking Bay */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{leftCar.brand} {leftCar.model}</span>
                <span className="font-mono text-cyan-300">
                  寬 {leftCar.dimensions.widthMm} × 高 {leftCar.dimensions.heightMm} mm
                </span>
              </div>

              {/* Parking Garage Cross-Section */}
              <div className="relative h-56 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-end items-center p-3">
                {/* Ceiling Limit Beam */}
                <div className="absolute top-4 inset-x-0 border-b-2 border-amber-500 flex items-center justify-between px-3 text-[10px] text-amber-400 font-mono font-bold bg-amber-950/20 py-1">
                  <span>地下室限高天花板 (1,850 mm)</span>
                  <span>{leftCar.dimensions.heightMm > 1850 ? '⚠️ 超標會撞管線' : `剩餘餘裕 +${1850 - leftCar.dimensions.heightMm}mm`}</span>
                </div>

                {/* Parking Bay Box */}
                <div className="relative w-4/5 h-44 border-x-2 border-dashed border-slate-600 flex flex-col justify-end items-center">
                  <div className="absolute -top-4 text-[10px] text-slate-400 font-mono">
                    台灣標準車位寬 (2,500 mm)
                  </div>

                  {/* Car Front Silhouette Box */}
                  <div
                    className={`rounded-t-2xl flex flex-col items-center justify-center p-2 text-center transition-all ${
                      leftCar.dimensions.heightMm > 1850
                        ? 'bg-rose-500/20 border-2 border-rose-500 text-rose-200'
                        : 'bg-cyan-500/20 border-2 border-cyan-400 text-cyan-100'
                    }`}
                    style={{
                      width: `${(leftCar.dimensions.widthMm / 2500) * 100}%`,
                      height: `${(leftCar.dimensions.heightMm / 2050) * 100}%`,
                    }}
                  >
                    <div className="text-[11px] font-black truncate">{leftCar.model}</div>
                    <div className="text-[10px] font-mono mt-0.5">車寬 {leftCar.dimensions.widthMm}mm</div>
                    <div className="text-[9px] text-slate-300 mt-1">
                      {leftCar.doorType === 'dual-power-sliding'
                        ? '雙側電動滑門 (免開門空間)'
                        : '傳統外開門 (需預留60cm)'}
                    </div>
                  </div>
                </div>

                {/* Ground */}
                <div className="w-full h-1 bg-slate-700 mt-0" />
              </div>

              {/* Parking Assessment */}
              <div className="text-xs text-slate-300 space-y-1">
                <div className="flex items-center justify-between">
                  <span>機械車位寬度 (限寬 2,200mm)：</span>
                  <span className={`font-bold ${leftCar.dimensions.widthMm >= 1990 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {leftCar.dimensions.widthMm >= 1990 ? '⚠️ 兩側僅剩 10cm 易刮輪胎' : '✓ 順暢進出'}
                  </span>
                </div>
              </div>
            </div>

            {/* Right Car Parking Bay */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-violet-500/30 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-white">{rightCar.brand} {rightCar.model}</span>
                <span className="font-mono text-violet-300">
                  寬 {rightCar.dimensions.widthMm} × 高 {rightCar.dimensions.heightMm} mm
                </span>
              </div>

              {/* Parking Garage Cross-Section */}
              <div className="relative h-56 rounded-xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 overflow-hidden flex flex-col justify-end items-center p-3">
                {/* Ceiling Limit Beam */}
                <div className="absolute top-4 inset-x-0 border-b-2 border-amber-500 flex items-center justify-between px-3 text-[10px] text-amber-400 font-mono font-bold bg-amber-950/20 py-1">
                  <span>地下室限高天花板 (1,850 mm)</span>
                  <span>{rightCar.dimensions.heightMm > 1850 ? '⚠️ 超標會撞管線' : `剩餘餘裕 +${1850 - rightCar.dimensions.heightMm}mm`}</span>
                </div>

                {/* Parking Bay Box */}
                <div className="relative w-4/5 h-44 border-x-2 border-dashed border-slate-600 flex flex-col justify-end items-center">
                  <div className="absolute -top-4 text-[10px] text-slate-400 font-mono">
                    台灣標準車位寬 (2,500 mm)
                  </div>

                  {/* Car Front Silhouette Box */}
                  <div
                    className={`rounded-t-2xl flex flex-col items-center justify-center p-2 text-center transition-all ${
                      rightCar.dimensions.heightMm > 1850
                        ? 'bg-rose-500/20 border-2 border-rose-500 text-rose-200'
                        : 'bg-violet-500/20 border-2 border-violet-400 text-violet-100'
                    }`}
                    style={{
                      width: `${(rightCar.dimensions.widthMm / 2500) * 100}%`,
                      height: `${(rightCar.dimensions.heightMm / 2050) * 100}%`,
                    }}
                  >
                    <div className="text-[11px] font-black truncate">{rightCar.model}</div>
                    <div className="text-[10px] font-mono mt-0.5">車寬 {rightCar.dimensions.widthMm}mm</div>
                    <div className="text-[9px] text-slate-300 mt-1">
                      {rightCar.doorType === 'dual-power-sliding'
                        ? '雙側電動滑門 (免開門空間)'
                        : '傳統外開門 (需預留60cm)'}
                    </div>
                  </div>
                </div>

                {/* Ground */}
                <div className="w-full h-1 bg-slate-700 mt-0" />
              </div>

              {/* Parking Assessment */}
              <div className="text-xs text-slate-300 space-y-1">
                <div className="flex items-center justify-between">
                  <span>機械車位寬度 (限寬 2,200mm)：</span>
                  <span className={`font-bold ${rightCar.dimensions.widthMm >= 1990 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {rightCar.dimensions.widthMm >= 1990 ? '⚠️ 兩側僅剩 10cm 易刮輪胎' : '✓ 順暢進出'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================= METRICS DELTA CARDS ======================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2">
        {/* Length Delta */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>車身長度差距</span>
            {lengthDiff !== 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                lengthDiff > 0 ? 'bg-cyan-500/20 text-cyan-300' : 'bg-violet-500/20 text-violet-300'
              }`}>
                {lengthDiff > 0 ? `左車長 ${lengthDiff}mm` : `右車長 ${Math.abs(lengthDiff)}mm`}
              </span>
            )}
          </div>
          <div className="flex items-baseline justify-between font-mono">
            <span className="text-sm font-bold text-white">{leftCar.dimensions.lengthMm} mm</span>
            <span className="text-xs text-slate-500">vs</span>
            <span className="text-sm font-bold text-white">{rightCar.dimensions.lengthMm} mm</span>
          </div>
          <div className="text-[10px] text-slate-400">
            {Math.abs(lengthDiff) >= 200 ? '車長相差 20 公分以上，巷弄會車與路邊車位體感顯著' : '兩車長度相仿，停車難度相近'}
          </div>
        </div>

        {/* Height Delta */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>車身高度差距</span>
            {heightDiff !== 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                heightDiff > 0 ? 'bg-cyan-500/20 text-cyan-300' : 'bg-violet-500/20 text-violet-300'
              }`}>
                {heightDiff > 0 ? `左車高 ${heightDiff}mm` : `右車高 ${Math.abs(heightDiff)}mm`}
              </span>
            )}
          </div>
          <div className="flex items-baseline justify-between font-mono">
            <span className="text-sm font-bold text-white">{leftCar.dimensions.heightMm} mm</span>
            <span className="text-xs text-slate-500">vs</span>
            <span className="text-sm font-bold text-white">{rightCar.dimensions.heightMm} mm</span>
          </div>
          <div className="text-[10px] text-slate-400">
            {leftCar.dimensions.heightMm > 1850 || rightCar.dimensions.heightMm > 1850
              ? '⚠️ 部分車款超過 1.85m，需嚴選 2.0m 以上停車場'
              : '✓ 兩車皆在 1.85m 安全限高範圍內'}
          </div>
        </div>

        {/* Width Delta */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>車身寬度差距</span>
            {widthDiff !== 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                widthDiff > 0 ? 'bg-cyan-500/20 text-cyan-300' : 'bg-violet-500/20 text-violet-300'
              }`}>
                {widthDiff > 0 ? `左車寬 ${widthDiff}mm` : `右車寬 ${Math.abs(widthDiff)}mm`}
              </span>
            )}
          </div>
          <div className="flex items-baseline justify-between font-mono">
            <span className="text-sm font-bold text-white">{leftCar.dimensions.widthMm} mm</span>
            <span className="text-xs text-slate-500">vs</span>
            <span className="text-sm font-bold text-white">{rightCar.dimensions.widthMm} mm</span>
          </div>
          <div className="text-[10px] text-slate-400">
            {Math.max(leftCar.dimensions.widthMm, rightCar.dimensions.widthMm) >= 1990
              ? '寬度逼近 2 米，標準機械車位極易擦傷輪圈'
              : '車寬適中，一般市區停車無壓力'}
          </div>
        </div>

        {/* Step-in Height Delta */}
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>登車階梯離地高 (長輩友善)</span>
            {stepInDiff !== 0 && (
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                stepInDiff < 0 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-800 text-slate-300'
              }`}>
                {stepInDiff < 0 ? `左車低 ${Math.abs(stepInDiff)}mm (長輩首選)` : `右車低 ${stepInDiff}mm (長輩首選)`}
              </span>
            )}
          </div>
          <div className="flex items-baseline justify-between font-mono">
            <span className="text-sm font-bold text-cyan-400">{leftCar.dimensions.stepInHeightMm} mm</span>
            <span className="text-xs text-slate-500">vs</span>
            <span className="text-sm font-bold text-violet-400">{rightCar.dimensions.stepInHeightMm} mm</span>
          </div>
          <div className="text-[10px] text-slate-400">
            底盤越低，幼童與年邁長輩膝蓋受力越小，上下車越省力
          </div>
        </div>
      </div>
    </div>
  );
}
