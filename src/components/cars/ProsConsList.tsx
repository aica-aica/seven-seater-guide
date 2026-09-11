import React from 'react';
import { ThumbsUp, ThumbsDown, AlertCircle } from 'lucide-react';

interface ProsConsListProps {
  pros: string[];
  cons: string[];
  idealPersona: string;
  heightWarning?: string;
}

export default function ProsConsList({
  pros,
  cons,
  idealPersona,
  heightWarning,
}: ProsConsListProps) {
  return (
    <div className="space-y-6">
      {/* Height warning banner if exists */}
      {heightWarning && (
        <div className="p-4 rounded-xl bg-amber-950/40 border border-cyan-500/40 flex items-start gap-3 text-amber-200">
          <AlertCircle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
          <div className="text-xs">
            <strong className="font-bold text-amber-300 block mb-0.5">
              車身尺碼與停車警示：
            </strong>
            {heightWarning}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="bg-[#0e1424]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-800">
            <div className="p-1.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
              <ThumbsUp className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">真實車主與實測優點</h4>
          </div>

          <ul className="space-y-3 text-xs text-slate-300">
            {pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="bg-[#0e1424]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xl">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-800">
            <div className="p-1.5 rounded-lg bg-rose-950 text-rose-400 border border-rose-800">
              <ThumbsDown className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-white">客觀缺點與妥協點（非充值）</h4>
          </div>

          <ul className="space-y-3 text-xs text-slate-300">
            {cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ideal Persona */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-850 border border-slate-800">
        <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-1">
          🎯 最適使用情境畫像
        </span>
        <p className="text-sm font-semibold text-slate-100 leading-relaxed">
          {idealPersona}
        </p>
      </div>
    </div>
  );
}
