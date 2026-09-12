import React from 'react';
import { SafetyAndIsofix } from '@/types/car';
import { ShieldCheck, Baby, CheckCircle, AlertTriangle } from 'lucide-react';

interface IsofixMapProps {
  safety: SafetyAndIsofix;
}

export default function IsofixMap({ safety }: IsofixMapProps) {
  return (
    <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm text-slate-700">
      <div className="pb-4 border-b border-slate-200/80 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Baby className="w-5 h-5 text-cyan-600" />
            兒童安全座椅 (ISOFIX) 規格與主動防護
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            家有雙寶或多寶必看！ISOFIX 接口配置與三汽座相容度分析。
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 border border-cyan-200 text-xs font-bold">
          {safety.ncapRating}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* ISOFIX points details */}
        <div className="p-4 rounded-xl bg-[#f4f8fc] border border-slate-200/90">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
              ISOFIX 錨點總數
            </span>
            <span className="text-xl font-black text-cyan-700 font-mono">
              {safety.isofixPoints} 組標準卡扣
            </span>
          </div>

          <h5 className="text-xs font-bold text-slate-800 mb-2">具體分佈位置：</h5>
          <ul className="space-y-1.5 text-xs text-slate-700">
            {safety.isofixLocations.map((loc, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-600" />
                <span>{loc}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-2">
            {safety.canFitThreeChildSeats ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                可同時乘載／安裝 3 組兒童安全座椅
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                建議最多同時安裝 2 組大型兒童安全座椅
              </span>
            )}
          </div>
        </div>

        {/* ADAS Safety Features */}
        <div className="p-4 rounded-xl bg-[#f4f8fc] border border-slate-200/90">
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider block mb-3">
            標配 Level 2 主動駕駛安全輔助
          </span>
          <div className="flex flex-wrap gap-2">
            {safety.adasFeatures.map((feat, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-white text-slate-700 border border-slate-300/80 text-xs font-medium flex items-center gap-1.5 shadow-xs"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {feat}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-500 mt-4 leading-relaxed">
            * 滿載 7 人時車身煞車距離較長，全速域 ACC 與前方防碰撞預煞為載送全家出門之重要安全基石。
          </p>
        </div>
      </div>
    </div>
  );
}
