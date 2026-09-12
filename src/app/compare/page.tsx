import React, { Suspense } from 'react';
import { Metadata } from 'next';
import CompareSelector from '@/components/compare/CompareSelector';
import SplitScreenDuel from '@/components/compare/SplitScreenDuel';
import DuelSkeleton from '@/components/compare/DuelSkeleton';
import MatrixSkeleton from '@/components/compare/MatrixSkeleton';
import { Scale, Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: '七人座多車規格橫向比較器 | 空間、滑門、第三排、行李箱對比',
  description:
    '自由挑選 2 至 4 款台灣熱門 7 人座 MPV 與 5+2 SUV 進行同場規格橫向對決。聚焦第三排成人乘坐膝部空間、雙側電動滑門、ISOFIX 數量、7人滿載行李箱公升數與台灣年度稅金差異。',
};

export default function ComparePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Section: Split-Screen Duel (左右雙欄上下滑動對決) */}
      <Suspense fallback={<DuelSkeleton />}>
        <SplitScreenDuel showTitle={true} />
      </Suspense>

      {/* Second Section: Multi-car comparison table (多車橫向評比表) */}
      <div className="pt-8 border-t border-slate-200/90 space-y-6">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Layers className="w-4 h-4 text-cyan-600" />
          <span>多車綜合對比模式</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              多車橫向規格矩陣檢視表
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              可同時加入最多 4 款車型進行逐列各項規配比較。
            </p>
          </div>
        </div>

        <Suspense fallback={<MatrixSkeleton />}>
          <CompareSelector />
        </Suspense>
      </div>
    </div>
  );
}
