'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CARS_DATA } from '@/data/cars';
import { Car } from '@/types/car';
import { getCarImageUrl } from '@/utils/image';
import { Plus, X, ArrowLeft, Check, Sparkles } from 'lucide-react';

interface CompareSelectorProps {
  initialCarIds?: string[];
}

export default function CompareSelector({ initialCarIds = ['toyota-sienna', 'kia-carnival', 'hyundai-custin'] }: CompareSelectorProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>(initialCarIds);
  const [highlightDiff, setHighlightDiff] = useState<boolean>(false);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const selectedCars: Car[] = selectedIds
    .map((id) => CARS_DATA.find((c) => c.id === id))
    .filter((c): c is Car => Boolean(c));

  const handleRemoveCar = (id: string) => {
    if (selectedIds.length <= 2) {
      alert('請至少保留兩款車輛進行規格對比！');
      return;
    }
    setSelectedIds(selectedIds.filter((carId) => carId !== id));
  };

  const handleAddCar = (id: string) => {
    if (selectedIds.length >= 4) {
      alert('最多同時比對 4 款車型，請先移除一款！');
      return;
    }
    if (!selectedIds.includes(id)) {
      setSelectedIds([...selectedIds, id]);
    }
    setShowAddModal(false);
  };

  const availableToAdd = CARS_DATA.filter((c) => !selectedIds.includes(c.id));

  return (
    <div className="space-y-6">
      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/95 border border-slate-200 shadow-sm text-slate-800">
        <div className="flex items-center gap-3">
          <Link
            href="/cars"
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors"
            title="返回車庫"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              已選取 <span className="text-cyan-700 font-mono font-bold">{selectedCars.length}</span> 款車型對比
            </h2>
            <p className="text-xs text-slate-500">最多可同時納入 4 款車型橫向檢視</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={highlightDiff}
              onChange={(e) => setHighlightDiff(e.target.checked)}
              className="rounded border-slate-300 text-cyan-600 focus:ring-cyan-500 bg-white"
            />
            <span>標註規格顯著差異</span>
          </label>

          {selectedIds.length < 4 && (
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-600/20"
            >
              <Plus className="w-4 h-4" />
              新增比對車型
            </button>
          )}
        </div>
      </div>

      {/* Mobile horizontal swipe cue */}
      <div className="sm:hidden flex items-center justify-between px-3.5 py-2 rounded-xl bg-sky-50 border border-sky-300 text-[11px] text-sky-900 shadow-sm">
        <span className="flex items-center gap-1.5 font-bold">
          <span>👈</span>
          <span>左右滑動查看多車規配（評比項目已鎖定）</span>
          <span>👉</span>
        </span>
        <span className="text-[10px] text-slate-500 font-mono">共 {selectedCars.length} 款</span>
      </div>

      {/* Comparison Matrix Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-xl shadow-lg">
        <table className="w-full text-left border-collapse text-xs">
          <caption className="sr-only">選定七人座車輛詳細規格橫向對比表</caption>
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th scope="col" className="p-2.5 sm:p-4 font-bold sticky left-0 bg-white z-20 w-28 sm:w-44 min-w-[7rem] sm:min-w-[11rem] border-r border-slate-200 shadow-[4px_0_12px_rgba(15,23,42,0.06)] text-slate-800 text-xs sm:text-sm">
                評比維度
              </th>
              {selectedCars.map((car) => (
                <th key={car.id} scope="col" className="p-3 sm:p-4 min-w-[155px] sm:min-w-[210px] border-r border-slate-200/80 last:border-r-0 relative group">
                  <button
                    onClick={() => handleRemoveCar(car.id)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-slate-100 hover:bg-rose-100 text-slate-400 hover:text-rose-600 border border-slate-200 transition-colors"
                    title="移除此車型"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                  <div className="h-28 sm:h-32 rounded-xl overflow-hidden mb-3 bg-gradient-to-b from-slate-50 to-white border border-slate-200 p-2 flex flex-col justify-between relative shadow-inner">
                    <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono px-0.5 z-10">
                      <span>長 {car.dimensions.lengthMm}</span>
                      <span className="text-cyan-700 font-bold">高 {car.dimensions.heightMm}</span>
                    </div>
                    <div className="relative h-18 sm:h-20 w-full flex items-end justify-center">
                      {/* Ground line */}
                      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-cyan-500 to-slate-400" />
                      <div
                        className="relative flex items-end justify-center transition-all duration-300"
                        style={{
                          height: `${(car.dimensions.heightMm / 2050) * 100}%`,
                          width: 'auto',
                          maxWidth: '92%',
                        }}
                      >
                        <img
                          src={getCarImageUrl(car.heroImage)}
                          alt={car.model}
                          className="h-full w-auto max-w-full object-contain object-bottom filter drop-shadow-[0_4px_10px_rgba(6,182,212,0.18)]"
                        />
                        {/* Tire Contact Shadow */}
                        <div className="absolute -bottom-0.5 inset-x-1.5 h-1.5 bg-slate-950/25 blur-xs rounded-full -z-10" />
                      </div>
                    </div>
                  </div>
                  <span className="text-sm sm:text-base font-black text-slate-900 block truncate">{car.brand} {car.model}</span>
                  <span className="text-[10px] sm:text-[11px] text-cyan-700 font-bold block truncate">{car.categoryName}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80 text-slate-700">
            {/* Price */}
            <tr className={highlightDiff ? 'bg-sky-50/60' : ''}>
              <th scope="row" className="p-2.5 sm:p-4 font-bold sticky left-0 bg-white z-10 w-28 sm:w-44 min-w-[7rem] sm:min-w-[11rem] border-r border-slate-200 shadow-[4px_0_12px_rgba(15,23,42,0.06)] text-slate-900 text-xs sm:text-sm break-words">
                售價區間 (萬元)
              </th>
              {selectedCars.map((car) => (
                <td key={car.id} className="p-3 sm:p-4 text-center font-bold text-cyan-700 text-xs sm:text-sm border-r border-slate-200/80 last:border-r-0 min-w-[155px] sm:min-w-[210px] font-mono">
                  {(car.priceRangeTwd[0] / 10000).toFixed(0)} ~ {(car.priceRangeTwd[1] / 10000).toFixed(0)} 萬
                </td>
              ))}
            </tr>

            {/* Layout */}
            <tr className={highlightDiff ? 'bg-sky-50/60' : 'bg-slate-50/40'}>
              <th scope="row" className="p-2.5 sm:p-4 font-bold sticky left-0 bg-white z-10 w-28 sm:w-44 min-w-[7rem] sm:min-w-[11rem] border-r border-slate-200 shadow-[4px_0_12px_rgba(15,23,42,0.06)] text-slate-900 text-xs sm:text-sm break-words">
                座椅佈局
              </th>
              {selectedCars.map((car) => (
                <td key={car.id} className="p-3 sm:p-4 text-center border-r border-slate-200/80 last:border-r-0 min-w-[155px] sm:min-w-[210px]">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm block">{car.seating.layout}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{car.seating.layoutDescription}</span>
                </td>
              ))}
            </tr>

            {/* Aisle width */}
            <tr>
              <th scope="row" className="p-2.5 sm:p-4 font-bold sticky left-0 bg-white z-10 w-28 sm:w-44 min-w-[7rem] sm:min-w-[11rem] border-r border-slate-200 shadow-[4px_0_12px_rgba(15,23,42,0.06)] text-slate-900 text-xs sm:text-sm break-words">
                第二排中央走道寬度
              </th>
              {selectedCars.map((car) => (
                <td key={car.id} className="p-3 sm:p-4 text-center border-r border-slate-200/80 last:border-r-0 min-w-[155px] sm:min-w-[210px]">
                  {car.seating.secondRowWalkThroughWidthMm > 0 ? (
                    <span className="font-mono font-bold text-cyan-700 text-xs sm:text-sm">
                      {car.seating.secondRowWalkThroughWidthMm} mm
                    </span>
                  ) : (
                    <span className="text-slate-400 text-xs">無走道 (連座前傾)</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Door type */}
            <tr className={highlightDiff ? 'bg-sky-50/60' : 'bg-slate-50/40'}>
              <th scope="row" className="p-2.5 sm:p-4 font-bold sticky left-0 bg-white z-10 w-28 sm:w-44 min-w-[7rem] sm:min-w-[11rem] border-r border-slate-200 shadow-[4px_0_12px_rgba(15,23,42,0.06)] text-slate-900 text-xs sm:text-sm break-words">
                車門機構
              </th>
              {selectedCars.map((car) => (
                <td key={car.id} className="p-3 sm:p-4 text-center font-semibold border-r border-slate-200/80 last:border-r-0 min-w-[155px] sm:min-w-[210px]">
                  {car.doorType === 'dual-power-sliding' ? (
                    <span className="text-emerald-700 font-bold text-xs sm:text-sm">雙側電動滑門 ✓</span>
                  ) : car.doorType === 'manual-sliding' ? (
                    <span className="text-sky-700 font-bold text-xs sm:text-sm">雙側手動滑門</span>
                  ) : (
                    <span className="text-slate-500 text-xs">傳統外推門</span>
                  )}
                </td>
              ))}
            </tr>

            {/* Dimensions L x W x H */}
            <tr>
              <th scope="row" className="p-2.5 sm:p-4 font-bold sticky left-0 bg-white z-10 w-28 sm:w-44 min-w-[7rem] sm:min-w-[11rem] border-r border-slate-200 shadow-[4px_0_12px_rgba(15,23,42,0.06)] text-slate-900 text-xs sm:text-sm break-words">
                車身尺碼 (長x寬x高)
              </th>
              {selectedCars.map((car) => (
                <td key={car.id} className="p-3 sm:p-4 text-center font-mono text-xs border-r border-slate-200/80 last:border-r-0 min-w-[155px] sm:min-w-[210px] text-slate-800">
                  <div>{car.dimensions.lengthMm} × {car.dimensions.widthMm} × {car.dimensions.heightMm} mm</div>
                  <div className="text-[10px] text-slate-500 mt-1">軸距 {car.dimensions.wheelbaseMm} mm</div>
                </td>
              ))}
            </tr>

            {/* Step in height */}
            <tr className={highlightDiff ? 'bg-sky-50/60' : 'bg-slate-50/40'}>
              <th scope="row" className="p-2.5 sm:p-4 font-bold sticky left-0 bg-white z-10 w-28 sm:w-44 min-w-[7rem] sm:min-w-[11rem] border-r border-slate-200 shadow-[4px_0_12px_rgba(15,23,42,0.06)] text-slate-900 text-xs sm:text-sm break-words">
                長輩登車踏板離地高
              </th>
              {selectedCars.map((car) => (
                <td key={car.id} className="p-3 sm:p-4 text-center border-r border-slate-200/80 last:border-r-0 font-mono min-w-[155px] sm:min-w-[210px]">
                  <span className="font-bold text-cyan-700 text-xs sm:text-sm">{car.dimensions.stepInHeightMm} mm</span>
                </td>
              ))}
            </tr>

            {/* 7 seat Luggage */}
            <tr>
              <th scope="row" className="p-2.5 sm:p-4 font-bold sticky left-0 bg-white z-10 w-28 sm:w-44 min-w-[7rem] sm:min-w-[11rem] border-r border-slate-200 shadow-[4px_0_12px_rgba(15,23,42,0.06)] text-slate-900 text-xs sm:text-sm break-words">
                7座滿載行李箱
              </th>
              {selectedCars.map((car) => (
                <td key={car.id} className="p-3 sm:p-4 text-center border-r border-slate-200/80 last:border-r-0 min-w-[155px] sm:min-w-[210px]">
                  <span className="text-sm sm:text-base font-black text-slate-900 block">{car.luggage.litres7SeatMode} L</span>
                  <span className="text-[10px] text-slate-500 block line-clamp-2 mt-1">
                    {car.luggage.realWorldCapacityDescription}
                  </span>
                </td>
              ))}
            </tr>

            {/* ISOFIX points */}
            <tr className={highlightDiff ? 'bg-sky-50/60' : 'bg-slate-50/40'}>
              <th scope="row" className="p-2.5 sm:p-4 font-bold sticky left-0 bg-white z-10 w-28 sm:w-44 min-w-[7rem] sm:min-w-[11rem] border-r border-slate-200 shadow-[4px_0_12px_rgba(15,23,42,0.06)] text-slate-900 text-xs sm:text-sm break-words">
                ISOFIX 汽座組數
              </th>
              {selectedCars.map((car) => (
                <td key={car.id} className="p-3 sm:p-4 text-center font-bold text-cyan-800 text-xs sm:text-sm border-r border-slate-200/80 last:border-r-0 min-w-[155px] sm:min-w-[210px]">
                  {car.safety.isofixPoints} 組
                  <span className="text-[10px] font-normal text-slate-500 block mt-0.5">({car.safety.isofixLocations.join('、')})</span>
                </td>
              ))}
            </tr>

            {/* Powertrain & MPG */}
            <tr>
              <th scope="row" className="p-2.5 sm:p-4 font-bold sticky left-0 bg-white z-10 w-28 sm:w-44 min-w-[7rem] sm:min-w-[11rem] border-r border-slate-200 shadow-[4px_0_12px_rgba(15,23,42,0.06)] text-slate-900 text-xs sm:text-sm break-words">
                動力 / 平均油耗
              </th>
              {selectedCars.map((car) => (
                <td key={car.id} className="p-3 sm:p-4 text-center border-r border-slate-200/80 last:border-r-0 min-w-[155px] sm:min-w-[210px]">
                  <span className="text-xs font-semibold text-slate-800 block">{car.powertrain.engineSummary}</span>
                  <span className="text-xs font-bold text-emerald-700 font-mono mt-0.5 block">{car.powertrain.fuelConsumptionKmL} km/L</span>
                </td>
              ))}
            </tr>

            {/* Taiwan Annual Tax */}
            <tr className={highlightDiff ? 'bg-sky-50/60' : 'bg-slate-50/40'}>
              <th scope="row" className="p-2.5 sm:p-4 font-bold sticky left-0 bg-white z-10 w-28 sm:w-44 min-w-[7rem] sm:min-w-[11rem] border-r border-slate-200 shadow-[4px_0_12px_rgba(15,23,42,0.06)] text-slate-900 text-xs sm:text-sm break-words">
                每年台灣稅金
              </th>
              {selectedCars.map((car) => (
                <td key={car.id} className="p-3 sm:p-4 text-center font-mono font-bold text-slate-900 text-xs sm:text-sm border-r border-slate-200/80 last:border-r-0 min-w-[155px] sm:min-w-[210px]">
                  {car.powertrain.annualTaiwanTaxTwd.toLocaleString()} 元/年
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Add Car Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">選擇要加入比對的七人座車型</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {availableToAdd.length === 0 ? (
                <p className="text-xs text-slate-500 py-4 text-center">所有車型皆已加入比對清單中。</p>
              ) : (
                availableToAdd.map((car) => (
                  <button
                    key={car.id}
                    onClick={() => handleAddCar(car.id)}
                    className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={getCarImageUrl(car.heroImage)} alt={car.model} className="w-12 h-10 rounded-lg object-cover" />
                      <div>
                        <span className="text-sm font-bold text-slate-900 block">{car.brand} {car.model}</span>
                        <span className="text-[11px] text-cyan-700 font-semibold">{car.categoryName}</span>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-cyan-700">+ 加入</span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
