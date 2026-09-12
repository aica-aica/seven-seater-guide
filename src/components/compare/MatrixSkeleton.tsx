'use client';

import React from 'react';

export default function MatrixSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-label="規格矩陣表載入中...">
      {/* Top Bar Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/90 p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="h-6 w-24 bg-slate-200 rounded-full" />
          <div className="h-6 w-28 bg-slate-200 rounded-full" />
          <div className="h-6 w-24 bg-slate-200 rounded-full" />
        </div>
        <div className="h-9 w-32 bg-slate-200 rounded-xl" />
      </div>

      {/* Table Skeleton */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white/95 shadow-md">
        <div className="min-w-[700px]">
          {/* Table Header Row Skeleton */}
          <div className="grid grid-cols-4 border-b border-slate-200 bg-slate-50 p-4 gap-4">
            <div className="h-8 w-24 bg-slate-200 rounded-md" />
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-28 bg-slate-200/80 rounded-xl border border-slate-200" />
                <div className="h-4 w-3/4 bg-slate-200 rounded" />
                <div className="h-3 w-1/2 bg-slate-200/60 rounded" />
              </div>
            ))}
          </div>

          {/* Table Body Rows Skeleton */}
          <div className="divide-y divide-slate-200/70 p-4 space-y-4">
            {[1, 2, 3, 4, 5, 6, 7].map((row) => (
              <div key={row} className="grid grid-cols-4 gap-4 pt-4 items-center">
                <div className="h-4 w-28 bg-slate-200 rounded" />
                <div className="h-6 w-3/4 mx-auto bg-slate-200/70 rounded-md" />
                <div className="h-6 w-3/4 mx-auto bg-slate-200/70 rounded-md" />
                <div className="h-6 w-3/4 mx-auto bg-slate-200/70 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
