'use client';

import React from 'react';

export default function DuelSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="規格對決器載入中...">
      {/* Header & Presets Skeleton */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="h-4 w-32 bg-slate-200/90 rounded-full" />
            <div className="h-8 w-64 sm:w-80 bg-slate-200 rounded-xl" />
            <div className="h-4 w-72 sm:w-96 bg-slate-200/70 rounded-md" />
          </div>
          <div className="flex gap-2">
            <div className="h-9 w-28 bg-slate-200/90 rounded-xl" />
            <div className="h-9 w-28 bg-slate-200/90 rounded-xl" />
          </div>
        </div>

        {/* Preset Duel Pills Skeleton */}
        <div className="flex flex-wrap gap-2 pt-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-36 bg-slate-200/70 rounded-full border border-slate-300/60" />
          ))}
        </div>
      </div>

      {/* Main Duel Box Skeleton */}
      <div className="rounded-3xl border border-slate-200/90 bg-white/95 overflow-hidden shadow-xl p-4 sm:p-6 space-y-6">
        {/* Car Selectors Top Bar */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
          {/* Left Car Header */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-5 w-24 bg-cyan-100 rounded-md" />
              <div className="h-4 w-16 bg-slate-200 rounded-md" />
            </div>
            <div className="h-10 w-full bg-slate-200/80 rounded-xl" />
          </div>

          {/* Center VS Indicator */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-cyan-400 shadow-sm items-center justify-center z-10">
            <div className="w-3 h-3 bg-cyan-500 rounded-full" />
          </div>

          {/* Right Car Header */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="h-5 w-24 bg-sky-100 rounded-md" />
              <div className="h-4 w-16 bg-slate-200 rounded-md" />
            </div>
            <div className="h-10 w-full bg-slate-200/80 rounded-xl" />
          </div>
        </div>

        {/* 1:1 True Scale Stage Skeleton */}
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="h-4 w-44 bg-slate-200 rounded-md" />
            <div className="h-4 w-28 bg-slate-200 rounded-md" />
          </div>
          <div className="h-48 sm:h-64 w-full bg-gradient-to-b from-white to-slate-100 rounded-xl flex items-end justify-center p-4 gap-6 border border-slate-200">
            <div className="h-36 w-2/5 bg-slate-200/70 rounded-xl border border-slate-200" />
            <div className="h-36 w-2/5 bg-slate-200/70 rounded-xl border border-slate-200" />
          </div>
        </div>

        {/* Spec Comparison Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="h-4 w-32 bg-slate-200 rounded" />
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="h-12 bg-slate-200/80 rounded-xl" />
                <div className="h-12 bg-slate-200/80 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
