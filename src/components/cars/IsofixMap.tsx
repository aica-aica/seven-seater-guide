import React from 'react';
import { SafetyAndIsofix } from '@/types/car';
import { ShieldCheck, Baby, CheckCircle, AlertTriangle } from 'lucide-react';

interface IsofixMapProps {
  safety: SafetyAndIsofix;
}

export default function IsofixMap({ safety }: IsofixMapProps) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl text-slate-200">
      <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Baby className="w-5 h-5 text-amber-400" />
            兒童安全座椅 (ISOFIX) 規格與主動防護
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            家有雙寶或多寶必看！ISOFIX 接口配置與三汽座相容度分析。
          </p>
        </div>
        <span className="px-3 py-1 rounded-full bg-slate-800 text-amber-400 border border-amber-500/30 text-xs font-bold">
          {safety.ncapRating}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
        {/* ISOFIX points details */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
              ISOFIX 錨點總數
            </span>
            <span className="text-xl font-black text-amber-400 font-mono">
              {safety.isofixPoints} 組標準卡扣
            </span>
          </div>

          <h5 className="text-xs font-bold text-slate-300 mb-2">具體分佈位置：</h5>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {safety.isofixLocations.map((loc, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>{loc}</span>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center gap-2">
            {safety.canFitThreeChildSeats ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                可同時乘載／安裝 3 組兒童安全座椅
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400">
                <AlertTriangle className="w-4 h-4" />
                建議最多同時安裝 2 組大型兒童安全座椅
              </span>
            )}
          </div>
        </div>

        {/* ADAS Safety Features */}
        <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block mb-3">
            標配 Level 2 主動駕駛安全輔助
          </span>
          <div className="flex flex-wrap gap-2">
            {safety.adasFeatures.map((feat, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 border border-slate-700/80 text-xs font-medium flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {feat}
              </span>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-4 leading-relaxed">
            * 滿載 7 人時車身煞車距離較長，全速域 ACC 與前方防碰撞預煞為載送全家出門之重要安全基石。
          </p>
        </div>
      </div>
    </div>
  );
}
