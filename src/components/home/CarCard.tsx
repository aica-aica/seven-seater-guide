import React from 'react';
import Link from 'next/link';
import { Car } from '@/types/car';
import { Users, DoorClosed, Briefcase, Gauge, Shield, ArrowRight } from 'lucide-react';

interface CarCardProps {
  car: Car;
  isCompared?: boolean;
  onToggleCompare?: (carId: string) => void;
}

export default function CarCard({ car, isCompared, onToggleCompare }: CarCardProps) {
  const minPriceWan = (car.priceRangeTwd[0] / 10000).toFixed(1).replace('.0', '');
  const maxPriceWan = (car.priceRangeTwd[1] / 10000).toFixed(1).replace('.0', '');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all hover:shadow-2xl hover:shadow-black/50 flex flex-col group">
      {/* Card Header & Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
        <img
          src={car.heroImage}
          alt={`${car.brand} ${car.model} 七人座規格`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span
            className={`px-2.5 py-1 rounded-md text-[11px] font-black backdrop-blur-sm shadow-sm ${
              car.coreCategory === 'true-7-mpv'
                ? 'bg-emerald-500 text-slate-950 font-bold'
                : 'bg-sky-400 text-slate-950 font-bold'
            }`}
          >
            {car.coreCategory === 'true-7-mpv' ? '🛡️ 正7人座' : '⚡ 5+2 SUV'}
          </span>
          <span className="px-2 py-1 rounded-md text-[11px] font-bold bg-slate-900/90 text-amber-400 border border-amber-500/30 backdrop-blur-sm shadow-sm">
            {car.categoryName}
          </span>
          {car.doorType === 'dual-power-sliding' && (
            <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 backdrop-blur-sm">
              雙側電動滑門
            </span>
          )}
        </div>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 right-3 text-right">
          <span className="text-xs text-slate-300 block font-medium">售價區間</span>
          <span className="text-lg font-black text-amber-400 drop-shadow">
            {minPriceWan} ~ {maxPriceWan} <span className="text-xs font-bold text-slate-200">萬</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-baseline justify-between mb-1">
            <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
              {car.brand} {car.model}
            </h3>
            <span className="text-xs text-slate-400 font-mono">{car.year} 年式</span>
          </div>
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
            {car.tagline}
          </p>

          {/* Key Metric Pills */}
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/70 border border-slate-800">
              <Users className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">座椅佈局</span>
                <span className="font-semibold text-slate-200">{car.seating.layout}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/70 border border-slate-800">
              <Briefcase className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">7人滿載後廂</span>
                <span className="font-semibold text-slate-200">{car.luggage.litres7SeatMode} L</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/70 border border-slate-800">
              <Gauge className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">動力 / 平均油耗</span>
                <span className="font-semibold text-slate-200">{car.powertrain.fuelConsumptionKmL} km/L</span>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-950/70 border border-slate-800">
              <Shield className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
              <div>
                <span className="text-[10px] text-slate-400 block">ISOFIX 數量</span>
                <span className="font-semibold text-slate-200">{car.safety.isofixPoints} 組固定點</span>
              </div>
            </div>
          </div>

          {/* Third Row Usability Indicator */}
          <div className="mt-3 flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-800/60 text-[11px]">
            <span className="text-slate-400">第三排實際適應性：</span>
            <span
              className={`font-semibold ${
                car.seating.thirdRowUsability === 'adult-long-haul'
                  ? 'text-emerald-400'
                  : car.seating.thirdRowUsability === 'adult-short-haul'
                  ? 'text-amber-400'
                  : 'text-rose-400'
              }`}
            >
              {car.seating.thirdRowUsability === 'adult-long-haul'
                ? '✅ 成人長途舒適'
                : car.seating.thirdRowUsability === 'adult-short-haul'
                ? '⚠️ 成人中短途適用'
                : '❌ 兒童/應急專用'}
            </span>
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
          {onToggleCompare && (
            <button
              type="button"
              onClick={() => onToggleCompare(car.id)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold border transition-all text-center ${
                isCompared
                  ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                  : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border-slate-700 hover:border-slate-600'
              }`}
            >
              {isCompared ? '已加入對比 ✓' : '+ 加入對比'}
            </button>
          )}

          <Link
            href={`/cars/${car.slug}`}
            className="flex-1 py-2 px-3 rounded-lg text-xs font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 flex items-center justify-center gap-1 shadow-sm transition-all"
          >
            詳細規格
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
