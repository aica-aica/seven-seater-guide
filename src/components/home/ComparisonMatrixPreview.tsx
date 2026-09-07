import React from 'react';
import Link from 'next/link';
import { CARS_DATA } from '@/data/cars';
import { Check, X, ArrowUpRight } from 'lucide-react';

export default function ComparisonMatrixPreview() {
  // Select 5 key representative cars for quick matrix
  const matrixCars = CARS_DATA.filter((c) =>
    ['toyota-sienna', 'kia-carnival', 'hyundai-custin', 'volkswagen-caddy-maxi', 'skoda-kodiaq'].includes(c.id)
  );

  return (
    <section className="py-16 bg-slate-950 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-2">
              快速規格透視
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              主流 7 人座代表車款 核心空間與規格橫向對比
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              聚焦第三排成人乘坐體驗、雙側滑門機構、滿載行李容積與台灣年度稅金。
            </p>
          </div>
          <Link
            href="/compare"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-bold transition-all"
          >
            開啟完整自選比較器
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* HTML Semantic Table for GEO / AI Overviews */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
          <table className="w-full text-left border-collapse text-xs">
            <caption className="sr-only">台灣主流七人座車款核心空間與配備比較表</caption>
            <thead>
              <tr className="bg-slate-850 border-b border-slate-800 text-slate-300">
                <th scope="col" className="p-4 font-bold sticky left-0 bg-slate-900 z-10 w-44 min-w-40 border-r border-slate-800">
                  車型與級距
                </th>
                {matrixCars.map((car) => (
                  <th key={car.id} scope="col" className="p-4 font-bold text-center min-w-44 border-r border-slate-800/60 last:border-r-0">
                    <Link href={`/cars/${car.slug}`} className="hover:text-amber-400 transition-colors">
                      <span className="text-sm font-black text-white block">{car.brand} {car.model}</span>
                      <span className="text-[10px] text-amber-400/90 font-medium">{car.categoryName}</span>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {/* Price Range */}
              <tr>
                <th scope="row" className="p-4 font-semibold sticky left-0 bg-slate-900 z-10 text-slate-200 border-r border-slate-800">
                  新車價格區間
                </th>
                {matrixCars.map((car) => (
                  <td key={car.id} className="p-4 text-center font-bold text-amber-400 border-r border-slate-800/60 last:border-r-0">
                    {(car.priceRangeTwd[0] / 10000).toFixed(0)} ~ {(car.priceRangeTwd[1] / 10000).toFixed(0)} 萬
                  </td>
                ))}
              </tr>

              {/* Seating Layout */}
              <tr className="bg-slate-900/40">
                <th scope="row" className="p-4 font-semibold sticky left-0 bg-slate-900 z-10 text-slate-200 border-r border-slate-800">
                  座椅佈局與走道
                </th>
                {matrixCars.map((car) => (
                  <td key={car.id} className="p-4 text-center border-r border-slate-800/60 last:border-r-0">
                    <span className="font-bold text-slate-100 block">{car.seating.layout}</span>
                    <span className="text-[11px] text-slate-400">
                      {car.seating.secondRowWalkThroughWidthMm > 0
                        ? `中央走道 ${car.seating.secondRowWalkThroughWidthMm}mm`
                        : '無走道 (連體翻折)'}
                    </span>
                  </td>
                ))}
              </tr>

              {/* Third Row Usability */}
              <tr>
                <th scope="row" className="p-4 font-semibold sticky left-0 bg-slate-900 z-10 text-slate-200 border-r border-slate-800">
                  第三排成人舒適度
                </th>
                {matrixCars.map((car) => (
                  <td key={car.id} className="p-4 text-center border-r border-slate-800/60 last:border-r-0">
                    {car.seating.thirdRowUsability === 'adult-long-haul' && (
                      <span className="inline-block px-2 py-1 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 font-semibold text-[11px]">
                        成人長途舒適 (大腿有支撐)
                      </span>
                    )}
                    {car.seating.thirdRowUsability === 'adult-short-haul' && (
                      <span className="inline-block px-2 py-1 rounded bg-amber-950/70 text-amber-400 border border-amber-800/60 font-semibold text-[11px]">
                        成人中短途 (頭部稍緊湊)
                      </span>
                    )}
                    {car.seating.thirdRowUsability === 'emergency-child' && (
                      <span className="inline-block px-2 py-1 rounded bg-rose-950/70 text-rose-400 border border-rose-800/60 font-semibold text-[11px]">
                        兒童／短途應急 (板凳感)
                      </span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Door Mechanism */}
              <tr className="bg-slate-900/40">
                <th scope="row" className="p-4 font-semibold sticky left-0 bg-slate-900 z-10 text-slate-200 border-r border-slate-800">
                  車門開啟方式
                </th>
                {matrixCars.map((car) => (
                  <td key={car.id} className="p-4 text-center font-medium border-r border-slate-800/60 last:border-r-0">
                    {car.doorType === 'dual-power-sliding' ? (
                      <span className="text-emerald-400 font-bold">雙側電動滑門 ✓</span>
                    ) : car.doorType === 'manual-sliding' ? (
                      <span className="text-sky-400 font-bold">雙側手動滑門</span>
                    ) : (
                      <span className="text-slate-400">傳統外推門</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Luggage Volume 7 Seats */}
              <tr>
                <th scope="row" className="p-4 font-semibold sticky left-0 bg-slate-900 z-10 text-slate-200 border-r border-slate-800">
                  七座滿載行李箱
                </th>
                {matrixCars.map((car) => (
                  <td key={car.id} className="p-4 text-center border-r border-slate-800/60 last:border-r-0">
                    <span className="text-sm font-bold text-white block">{car.luggage.litres7SeatMode} L</span>
                    <span className="text-[10px] text-slate-400 block line-clamp-1">{car.luggage.realWorldCapacityDescription}</span>
                  </td>
                ))}
              </tr>

              {/* ISOFIX Points */}
              <tr className="bg-slate-900/40">
                <th scope="row" className="p-4 font-semibold sticky left-0 bg-slate-900 z-10 text-slate-200 border-r border-slate-800">
                  ISOFIX 汽座卡扣
                </th>
                {matrixCars.map((car) => (
                  <td key={car.id} className="p-4 text-center font-bold text-slate-200 border-r border-slate-800/60 last:border-r-0">
                    {car.safety.isofixPoints} 組固定點
                  </td>
                ))}
              </tr>

              {/* Annual Taiwan Tax */}
              <tr>
                <th scope="row" className="p-4 font-semibold sticky left-0 bg-slate-900 z-10 text-slate-200 border-r border-slate-800">
                  每年台灣稅金 (牌+燃)
                </th>
                {matrixCars.map((car) => (
                  <td key={car.id} className="p-4 text-center font-mono font-semibold text-slate-200 border-r border-slate-800/60 last:border-r-0">
                    {car.powertrain.annualTaiwanTaxTwd.toLocaleString()} 元
                  </td>
                ))}
              </tr>

              {/* Quick Link Action */}
              <tr className="bg-slate-850">
                <th scope="row" className="p-4 font-semibold sticky left-0 bg-slate-900 z-10 text-slate-300 border-r border-slate-800">
                  完整深入解析
                </th>
                {matrixCars.map((car) => (
                  <td key={car.id} className="p-4 text-center border-r border-slate-800/60 last:border-r-0">
                    <Link
                      href={`/cars/${car.slug}`}
                      className="inline-block px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors"
                    >
                      查看詳細實測
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
