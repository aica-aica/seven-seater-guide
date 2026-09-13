import React, { Suspense } from 'react';
import { Metadata } from 'next';
import CompareSelector from '@/components/compare/CompareSelector';
import SplitScreenDuel from '@/components/compare/SplitScreenDuel';
import DuelSkeleton from '@/components/compare/DuelSkeleton';
import MatrixSkeleton from '@/components/compare/MatrixSkeleton';
import { Layers } from 'lucide-react';

export const metadata: Metadata = {
  title: '七人座規格對決與 1:1 等比例真實尺寸比對器 | 雙車並排與 X 光透視',
  description:
    '自由挑選 2 至 4 款台灣熱門 7 人座 MPV 與 5+2 SUV 進行同場規格橫向對決。首創 1:1 等比例真實車身長寬高對比、同地面側視重疊 X 光透視、1.8m 地下停車場限高警示、第三排膝部空間與台灣年度稅金差異。',
  keywords: [
    '七人座比較',
    '七人座休旅車比較',
    '七人座MPV對比',
    'Sienna vs Carnival',
    'Custin vs Kodiaq',
    '七人座尺寸比較',
    '七人座第三排比較',
    '七人座行李箱比較',
  ],
  alternates: {
    canonical: 'https://7seater-guide.tw/compare',
  },
  openGraph: {
    title: '七人座規格對決與 1:1 等比例真實尺寸比對器 | 雙車並排與 X 光透視',
    description:
      '首創 1:1 等比例真實車身尺寸對比，深入分析第三排成人乘坐膝部空間、雙側電動滑門、ISOFIX 數量與滿載行李箱容積。',
    url: 'https://7seater-guide.tw/compare',
    type: 'website',
  },
};

export default function ComparePage() {
  const compareJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://7seater-guide.tw/compare#webpage',
    name: '七人座規格對決與 1:1 等比例真實尺寸比對器',
    url: 'https://7seater-guide.tw/compare',
    description: '提供 1:1 等比例真實車身尺寸比對、X 光透視重疊與 4 車同場規格橫向對決。',
    isPartOf: {
      '@type': 'WebSite',
      '@id': 'https://7seater-guide.tw/#website',
      name: '七人座選車指南',
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(compareJsonLd) }}
      />

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
