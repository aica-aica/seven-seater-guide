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
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 flex items-start gap-3 text-amber-900">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs">
            <strong className="font-bold text-amber-900 block mb-0.5">
              車身尺碼與停車警示：
            </strong>
            {heightWarning}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pros */}
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-200/80">
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
              <ThumbsUp className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-slate-900">真實車主與實測優點</h4>
          </div>

          <ul className="space-y-3 text-xs text-slate-700">
            {pros.map((pro, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{pro}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Cons */}
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-200/80">
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
              <ThumbsDown className="w-4 h-4" />
            </div>
            <h4 className="text-base font-bold text-slate-900">客觀缺點與妥協點（非充值）</h4>
          </div>

          <ul className="space-y-3 text-xs text-slate-700">
            {cons.map((con, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 flex-shrink-0" />
                <span className="leading-relaxed">{con}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Ideal Persona */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#eef5fc] to-[#f4f8fc] border border-slate-200/90 shadow-sm">
        <span className="text-xs font-bold text-cyan-800 uppercase tracking-widest block mb-1">
          🎯 最適使用情境畫像
        </span>
        <p className="text-sm font-semibold text-slate-800 leading-relaxed">
          {idealPersona}
        </p>
      </div>
    </div>
  );
}
