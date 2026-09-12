import React from 'react';
import { SeatingModularity } from '@/types/car';
import { Users, MoveHorizontal, CheckCircle2, Star, Ruler } from 'lucide-react';

interface SeatingDiagramProps {
  seating: SeatingModularity;
  modelName: string;
}

export default function SeatingDiagram({ seating, modelName }: SeatingDiagramProps) {
  const is223 = seating.layout === '2+2+3';

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm text-slate-700">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-slate-200/80 gap-3">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>💺</span> 7人座座艙佈局與無段滑軌走道實測
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            佈局規格：<strong className="text-cyan-700">{seating.layout}</strong> ({seating.layoutDescription})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 text-xs font-bold flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-cyan-500 text-cyan-600" />
            第三排舒適度：{seating.thirdRowComfortRating} / 10
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              seating.thirdRowUsability === 'adult-long-haul'
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                : seating.thirdRowUsability === 'adult-short-haul'
                ? 'bg-amber-50 text-amber-800 border border-amber-300'
                : 'bg-rose-50 text-rose-800 border border-rose-300'
            }`}
          >
            {seating.thirdRowUsability === 'adult-long-haul'
              ? '成人長途舒適'
              : seating.thirdRowUsability === 'adult-short-haul'
              ? '成人中短途'
              : '兒童/應急專用'}
          </span>
        </div>
      </div>

      {/* Rail Type Banner */}
      <div className="my-4 p-3 rounded-xl bg-[#f4f8fc] border border-slate-200/90 text-xs text-slate-700 flex items-center gap-2">
        <span className="text-cyan-700 font-bold">滑軌機構：</span>
        <span>{seating.railType}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2 items-center">
        {/* Visual Seating Graphic (CSS/SVG Mock representation) */}
        <div className="bg-gradient-to-b from-[#eef5fc] to-[#f4f9fe] p-6 rounded-2xl border border-slate-200/90 flex flex-col items-center">
          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mb-3">
            ↑ 車頭方向 (Front)
          </span>

          {/* Row 1: Driver + Passenger (2 Seats) */}
          <div className="flex justify-between w-48 gap-4 mb-4">
            <div className="w-20 h-14 bg-white rounded-xl border border-slate-300 flex flex-col items-center justify-center text-[10px] text-slate-700 font-bold shadow-xs">
              駕駛座
            </div>
            <div className="w-20 h-14 bg-white rounded-xl border border-slate-300 flex flex-col items-center justify-center text-[10px] text-slate-700 font-bold shadow-xs">
              副駕駛
            </div>
          </div>

          {/* Row 2: 2 Captain Chairs or 3-seat Bench */}
          {is223 ? (
            <div className="flex justify-between w-48 gap-4 mb-4 relative">
              <div className="w-20 h-16 bg-cyan-50 rounded-xl border border-cyan-300 flex flex-col items-center justify-center text-[10px] text-cyan-900 font-bold shadow-xs">
                獨立座
                <span className="text-[8px] text-cyan-700 font-normal">ISOFIX</span>
              </div>
              {/* Walk-through Aisle */}
              <div className="flex flex-col items-center justify-center text-[9px] text-cyan-700 font-mono font-bold">
                <span>走道</span>
                <span className="text-[10px] font-bold">{seating.secondRowWalkThroughWidthMm}mm</span>
              </div>
              <div className="w-20 h-16 bg-cyan-50 rounded-xl border border-cyan-300 flex flex-col items-center justify-center text-[10px] text-cyan-900 font-bold shadow-xs">
                獨立座
                <span className="text-[8px] text-cyan-700 font-normal">ISOFIX</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center w-52 gap-1.5 mb-4">
              <div className="w-16 h-16 bg-white rounded-xl border border-slate-300 flex flex-col items-center justify-center text-[10px] text-slate-700 font-semibold shadow-xs">
                二排左
                <span className="text-[8px] text-cyan-700">ISOFIX</span>
              </div>
              <div className="w-14 h-16 bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-[9px] text-slate-500">
                中央座
              </div>
              <div className="w-16 h-16 bg-white rounded-xl border border-slate-300 flex flex-col items-center justify-center text-[10px] text-slate-700 font-semibold shadow-xs">
                二排右
                <span className="text-[8px] text-cyan-700">ISOFIX</span>
              </div>
            </div>
          )}

          {/* Row 3: 3 Seats or 2 Seats */}
          {is223 ? (
            <div className="flex justify-center w-52 gap-1.5">
              <div className="w-16 h-14 bg-white/80 rounded-xl border border-slate-300 flex flex-col items-center justify-center text-[9px] text-slate-700 font-medium">
                三排左
              </div>
              <div className="w-14 h-14 bg-slate-100 rounded-xl border border-slate-200 flex flex-col items-center justify-center text-[9px] text-slate-500">
                三排中
              </div>
              <div className="w-16 h-14 bg-white/80 rounded-xl border border-slate-300 flex flex-col items-center justify-center text-[9px] text-slate-700 font-medium">
                三排右
              </div>
            </div>
          ) : (
            <div className="flex justify-between w-44 gap-3">
              <div className="w-20 h-14 bg-white/80 rounded-xl border border-slate-300 flex flex-col items-center justify-center text-[9px] text-slate-700 font-medium">
                三排左 (2座)
              </div>
              <div className="w-20 h-14 bg-white/80 rounded-xl border border-slate-300 flex flex-col items-center justify-center text-[9px] text-slate-700 font-medium">
                三排右 (2座)
              </div>
            </div>
          )}

          <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-4">
            ↓ 後行李箱空間 (Trunk)
          </span>
        </div>

        {/* Dimension & Clearance Metrics */}
        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-[#f4f8fc] border border-slate-200/90">
            <h4 className="font-bold text-slate-900 text-sm mb-2 flex items-center gap-1.5">
              <MoveHorizontal className="w-4 h-4 text-cyan-600" />
              第二排中央走道淨寬
            </h4>
            <p className="text-slate-600 leading-relaxed">
              {seating.secondRowWalkThroughWidthMm > 0 ? (
                <>
                  走道淨寬達 <strong className="text-cyan-700 font-mono text-sm">{seating.secondRowWalkThroughWidthMm} mm</strong>。即使第二排固定安裝兩張大型兒童安全座椅，成人仍可直接穿過中央走道進入第三排，完全不需前翻座椅。
                </>
              ) : (
                <>
                  無走道設計（2+3+2）。進入第三排需拉動第二排側邊拉柄前翻座椅；若第二排安裝了 ISOFIX 汽座，將無法順利翻折。
                </>
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-[#f4f8fc] border border-slate-200/90">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                <Ruler className="w-3.5 h-3.5 text-cyan-600" />
                <span className="text-[11px]">第三排膝部餘裕</span>
              </div>
              <span className="text-lg font-black font-mono text-cyan-700">
                {seating.thirdRowKneeClearanceCm} cm
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                (標準成人膝前距離)
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#f4f8fc] border border-slate-200/90">
              <div className="flex items-center gap-1.5 text-slate-500 mb-1">
                <Star className="w-3.5 h-3.5 text-cyan-600" />
                <span className="text-[11px]">長途舒適度評分</span>
              </div>
              <span className="text-lg font-black font-mono text-emerald-700">
                {seating.thirdRowComfortRating} / 10
              </span>
              <span className="text-[10px] text-slate-500 block mt-0.5">
                (實測大腿承托與椅墊厚度)
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-[#f4f8fc] border border-slate-200/90 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div>
              <span className="font-bold text-slate-900 block mb-0.5">第三排收折方式</span>
              <span className="text-slate-600">
                {seating.thirdRowFoldingType === 'underfloor-sink' && '下沉式完全收納到底盤下方，形成超平整裝載空間。'}
                {seating.thirdRowFoldingType === 'split-fold-flat' && '50:50 分離向前折平，裝載平整度佳。'}
                {seating.thirdRowFoldingType === 'tumble-forward' && '座椅向前翻立或可完全快拆離車，垂直載物高度極大。'}
                {seating.thirdRowFoldingType === 'side-hang' && '向兩側車窗懸掛折疊，操作省力但會微幅佔據橫向裝載寬度。'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
