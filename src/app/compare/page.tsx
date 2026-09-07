import React, { Suspense } from 'react';
import { Metadata } from 'next';
import CompareSelector from '@/components/compare/CompareSelector';
import { Scale } from 'lucide-react';

export const metadata: Metadata = {
  title: '七人座多車規格橫向比較器 | 空間、滑門、第三排、行李箱對比',
  description:
    '自由挑選 2 至 4 款台灣熱門 7 人座 MPV 與 5+2 SUV 進行同場規格橫向對決。聚焦第三排成人乘坐膝部空間、雙側電動滑門、ISOFIX 數量、7人滿載行李箱公升數與台灣年度稅金差異。',
};

export default function ComparePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
          <Scale className="w-4 h-4" />
          <span>互動式多車比對工具</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          七人座車型 深度規格橫向對決
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          直接切換與標註關鍵差異，找出真正契合您家乘載需求的座駕。
        </p>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-slate-400">載入規格對比器中...</div>}>
        <CompareSelector />
      </Suspense>
    </div>
  );
}
