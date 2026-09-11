import React from 'react';
import Link from 'next/link';
import { CARS_DATA } from '@/data/cars';
import { getCarImageUrl } from '@/utils/image';
import { Trophy, CheckCircle2, ArrowRight } from 'lucide-react';

export default function TopPicks() {
  const topPicks = [
    {
      carId: 'toyota-sienna',
      badge: '👑 三代同堂家庭無腦首選',
      badgeColor: 'from-amber-500 to-amber-600',
      reason: '第三排為真正成人級別舒適度，七人滿載時行李廂高達 1,107 公升，兼顧 17.7km/L 油電極致低油耗。',
      targetAudience: '家中有 2 位長輩 + 2 個小孩，經常舉家跨縣市旅遊之家庭。',
    },
    {
      carId: 'kia-carnival',
      badge: '⛰️ 爬坡扭力與豪華科技首選',
      badgeColor: 'from-blue-500 to-indigo-600',
      reason: '2.2L 柴油 45kgm 龐大扭力滿載山路毫不費力，2.2L 柴油每年稅金僅 14,938 元，科技曲面儀表質感出眾。',
      targetAudience: '熱愛清境、合歡山或花東山區，重視科技氛圍與年度稅金節省之家庭。',
    },
    {
      carId: 'hyundai-custin',
      badge: '💰 150萬內高 CP 側滑門王',
      badgeColor: 'from-emerald-500 to-teal-600',
      reason: '150萬內唯一具備第二排皇家通風加熱腿靠座與雙側電動滑門，1.5T 稅金僅 11,920 元，市區尺寸適中好停。',
      targetAudience: '預算鎖定 130~150 萬、重視長輩上下車與乘坐尊榮感，平日需市區通勤接送者。',
    },
    {
      carId: 'volkswagen-caddy-maxi',
      badge: '⛺ 露營車泊與多寶汽座首選',
      badgeColor: 'from-purple-500 to-indigo-600',
      reason: '全車同級最多 5 組 ISOFIX（第二排可並排 3 張汽座），挑高車室與第三排可完整拆卸，柴油油耗 20.2 km/L。',
      targetAudience: '有 2~3 個學齡前幼兒需安全座椅、熱愛自駕露營車泊、追求極致耐操與省油者。',
    },
  ];

  return (
    <section className="py-16 border-b border-white/[0.08] text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-300 text-xs font-semibold border border-cyan-500/25 mb-3 shadow-sm shadow-cyan-500/10">
            <Trophy className="w-3.5 h-3.5 text-cyan-400" />
            <span>編輯部實測推薦</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            2024-2025 台灣各用車場景 精選年度最佳七人座
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2">
            沒有最好的車，只有最適合你家人口結構與停車條件的車。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topPicks.map((pick) => {
            const car = CARS_DATA.find((c) => c.id === pick.carId);
            if (!car) return null;

            return (
              <div
                key={pick.carId}
                className="bg-[#0e1424]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-500/30 transition-all hover:-translate-y-1 shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.3)] group"
              >
                <div>
                  <div className="inline-block px-3 py-1 rounded-lg text-xs font-bold text-white bg-gradient-to-r mb-4 shadow-sm">
                    {pick.badge}
                  </div>

                  <div className="h-36 rounded-xl overflow-hidden mb-4 bg-slate-900/60 border border-slate-800/80">
                    <img
                      src={getCarImageUrl(car.heroImage)}
                      alt={car.model}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-xs text-cyan-400 font-bold font-mono mb-3">
                    {(car.priceRangeTwd[0] / 10000).toFixed(0)} ~ {(car.priceRangeTwd[1] / 10000).toFixed(0)} 萬元
                  </p>

                  <div className="space-y-2 text-xs text-slate-300 mb-4">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      <p className="leading-relaxed">{pick.reason}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <span className="text-[11px] text-slate-400 block mb-3 leading-tight">
                    <strong className="text-slate-300">適合對象：</strong> {pick.targetAudience}
                  </span>
                  <Link
                    href={`/cars/${car.slug}`}
                    className="w-full py-2 px-3 rounded-xl bg-white/[0.05] hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white text-cyan-300 border border-white/[0.08] text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-sm"
                  >
                    查看完整實測
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
