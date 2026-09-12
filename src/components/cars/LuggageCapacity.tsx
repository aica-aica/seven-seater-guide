import React from 'react';
import { LuggageSpecs } from '@/types/car';
import { Briefcase, Box, ArrowRight } from 'lucide-react';

interface LuggageCapacityProps {
  luggage: LuggageSpecs;
}

export default function LuggageCapacity({ luggage }: LuggageCapacityProps) {
  return (
    <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm text-slate-700">
      <div className="pb-4 border-b border-slate-200/80">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>🧳</span> 行李廂裝載容積與 28 吋行李箱實測
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          七人座車款最殘酷的考驗：七人滿載時，後行李箱是否能裝下全家人的行李？
        </p>
      </div>

      {/* Litres Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
        <div className="p-4 rounded-xl bg-cyan-50/50 border border-cyan-300 relative overflow-hidden">
          <div className="absolute -top-1 -right-1 bg-cyan-600 text-white font-bold text-[9px] px-2 py-0.5 rounded-bl">
            7人滿載模式
          </div>
          <span className="text-xs text-slate-500 block mb-1">標準七座狀態</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-cyan-700 font-mono">
              {luggage.litres7SeatMode}
            </span>
            <span className="text-xs font-semibold text-slate-500">公升 (L)</span>
          </div>
          <span className="text-[11px] text-slate-600 mt-2 block font-medium">
            {luggage.litres7SeatMode >= 600
              ? '🟢 巨量裝載（可放多件大行李箱）'
              : luggage.litres7SeatMode >= 350
              ? '🟡 標準實用（可放登機箱與背包）'
              : '🔴 空間緊繃（需留意行李數量）'}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#f4f8fc] border border-slate-200/90">
          <span className="text-xs text-slate-500 block mb-1">第三排收折模式 (5座)</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-slate-900 font-mono">
              {luggage.litres3rdRowFolded}
            </span>
            <span className="text-xs font-semibold text-slate-500">公升 (L)</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-2 block">
            露營或大型購物時的日常狀態
          </span>
        </div>

        <div className="p-4 rounded-xl bg-[#f4f8fc] border border-slate-200/90">
          <span className="text-xs text-slate-500 block mb-1">第二+三排全平整最大容積</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-slate-900 font-mono">
              {luggage.maxLitres}
            </span>
            <span className="text-xs font-semibold text-slate-500">公升 (L)</span>
          </div>
          <span className="text-[11px] text-slate-500 mt-2 block">
            極限車泊車宿或載運家具
          </span>
        </div>
      </div>

      {/* Real-world Suitcase Packing Test */}
      <div className="p-4 rounded-xl bg-[#f4f8fc] border border-slate-200/90">
        <div className="flex items-center gap-2 mb-2">
          <Briefcase className="w-4 h-4 text-cyan-600" />
          <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
            真實出遊裝載情境實測解讀
          </h4>
        </div>
        <p className="text-sm font-semibold text-slate-900 leading-relaxed">
          {luggage.realWorldCapacityDescription}
        </p>
        {luggage.underfloorStorageLitres && (
          <p className="text-xs text-slate-600 mt-2">
            💡 <strong>底板下潛藏儲物格：</strong> 原廠具備約 {luggage.underfloorStorageLitres} 公升隱藏儲物槽，可收納折疊雨傘、隨車工具與鞋子。
          </p>
        )}
      </div>
    </div>
  );
}
