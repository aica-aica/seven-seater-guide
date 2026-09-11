'use client';

import React from 'react';
import { Search, RotateCcw, SlidersHorizontal, Check, ShieldCheck, Zap } from 'lucide-react';
import { FilterOptions } from '@/types/filter';
import { SeatingLayout, DoorType, EngineType } from '@/types/car';
import { CARS_DATA } from '@/data/cars';

interface VehicleFilterProps {
  filters: FilterOptions;
  onChange: (newFilters: FilterOptions) => void;
  onReset: () => void;
  totalResults: number;
}

export default function VehicleFilter({
  filters,
  onChange,
  onReset,
  totalResults,
}: VehicleFilterProps) {
  const handleBudgetChange = (maxWan: number) => {
    onChange({
      ...filters,
      priceRange: [filters.priceRange[0], maxWan],
    });
  };

  const toggleLayout = (layout: SeatingLayout) => {
    const exists = filters.seatingLayouts.includes(layout);
    const updated = exists
      ? filters.seatingLayouts.filter((l) => l !== layout)
      : [...filters.seatingLayouts, layout];
    onChange({ ...filters, seatingLayouts: updated });
  };

  const toggleDoorType = (door: DoorType) => {
    const exists = filters.doorTypes.includes(door);
    const updated = exists
      ? filters.doorTypes.filter((d) => d !== door)
      : [...filters.doorTypes, door];
    onChange({ ...filters, doorTypes: updated });
  };

  const toggleEngine = (engine: EngineType) => {
    const exists = filters.engineTypes.includes(engine);
    const updated = exists
      ? filters.engineTypes.filter((e) => e !== engine)
      : [...filters.engineTypes, engine];
    onChange({ ...filters, engineTypes: updated });
  };

  const setCoreCategory = (cat?: 'all' | 'true-7-mpv' | '5-plus-2-suv') => {
    onChange({
      ...filters,
      coreCategory: cat,
    });
  };

  return (
    <div className="bg-[#0e1424]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl p-5 sm:p-6 shadow-xl text-slate-200">
      {/* Search Header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-5 border-b border-slate-800">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="搜尋品牌、車型名稱（如 Sienna, Carnival, Kodiaq, Sorento...）"
            value={filters.searchQuery}
            onChange={(e) => onChange({ ...filters, searchQuery: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900/60 border border-slate-700/60 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-3">
          <span className="text-xs text-slate-400 font-medium">
            符合條件：<strong className="text-cyan-400 text-sm font-mono">{totalResults}</strong> 款車型
          </span>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/[0.05] hover:bg-white/[0.09] text-xs font-semibold text-slate-300 hover:text-white border border-white/[0.08] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            重設篩選
          </button>
        </div>
      </div>

      {/* Core Category Switcher: 全部 / 正7人座 MPV / 5+2 SUV */}
      <div className="py-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">車型核心陣營：</span>
          <span className="text-[11px] text-slate-500">（全站嚴格依空間與門型劃分）</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setCoreCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              !filters.coreCategory || filters.coreCategory === 'all'
                ? 'bg-slate-800 text-white border-slate-600 shadow-sm'
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            全部車型 ({CARS_DATA.length})
          </button>
          <button
            type="button"
            onClick={() => setCoreCategory('true-7-mpv')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
              filters.coreCategory === 'true-7-mpv'
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 shadow-sm ring-1 ring-emerald-500/30'
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-emerald-400'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>🛡️ 正7人座 MPV ({CARS_DATA.filter(c => c.coreCategory === "true-7-mpv").length})</span>
          </button>
          <button
            type="button"
            onClick={() => setCoreCategory('5-plus-2-suv')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 ${
              filters.coreCategory === '5-plus-2-suv'
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 shadow-sm ring-1 ring-sky-500/30'
                : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-cyan-400'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-sky-400" />
            <span>⚡ 5+2 SUV ({CARS_DATA.filter(c => c.coreCategory === "5-plus-2-suv").length})</span>
          </button>
        </div>
      </div>

      {/* Filter Options Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-5">
        {/* Budget Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
            預算上限（萬元 TWD）
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { label: '不限', value: 500 },
              { label: '150萬內', value: 150 },
              { label: '200萬內', value: 200 },
              { label: '250萬內', value: 250 },
              { label: '300萬內', value: 300 },
            ].map((b) => {
              const active = filters.priceRange[1] === b.value;
              return (
                <button
                  key={b.value}
                  type="button"
                  onClick={() => handleBudgetChange(b.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    active
                      ? 'bg-cyan-500 text-slate-950 border-cyan-500 shadow-sm font-bold'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-850/60'
                  }`}
                >
                  {b.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Seating Layout Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
            座椅配置佈局
          </label>
          <div className="flex flex-col gap-1.5">
            {[
              { id: '2+2+3' as SeatingLayout, label: '2+2+3 走道獨立雙座', sub: '進出走道方便' },
              { id: '2+3+2' as SeatingLayout, label: '2+3+2 正三座連體', sub: '五人載物容積大' },
            ].map((layout) => {
              const checked = filters.seatingLayouts.includes(layout.id);
              return (
                <button
                  key={layout.id}
                  type="button"
                  onClick={() => toggleLayout(layout.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all ${
                    checked
                      ? 'bg-cyan-500/15 border-cyan-400/60 text-cyan-200 shadow-sm'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-850/60'
                  }`}
                >
                  <div>
                    <span className="font-semibold block">{layout.label}</span>
                    <span className="text-[10px] text-slate-400">{layout.sub}</span>
                  </div>
                  {checked && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Door Type Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
            車門開門機構
          </label>
          <div className="flex flex-col gap-1.5">
            {[
              { id: 'dual-power-sliding' as DoorType, label: '雙側電動滑門', sub: '狹窄車位上下車極佳' },
              { id: 'manual-sliding' as DoorType, label: '雙側手動滑門', sub: '輕量化大開口' },
              { id: 'hinged' as DoorType, label: '傳統外推門', sub: '5+2 SUV 標配' },
            ].map((door) => {
              const checked = filters.doorTypes.includes(door.id);
              return (
                <button
                  key={door.id}
                  type="button"
                  onClick={() => toggleDoorType(door.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium border text-left transition-all ${
                    checked
                      ? 'bg-cyan-500/15 border-cyan-400/60 text-cyan-200 shadow-sm'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-850/60'
                  }`}
                >
                  <div>
                    <span className="font-semibold block">{door.label}</span>
                    <span className="text-[10px] text-slate-400">{door.sub}</span>
                  </div>
                  {checked && <Check className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Powertrain Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2.5">
            動力系統型式
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'hybrid' as EngineType, label: '油電 Hybrid' },
              { id: 'diesel' as EngineType, label: '柴油渦輪' },
              { id: 'gasoline' as EngineType, label: '汽油渦輪/NA' },
            ].map((engine) => {
              const checked = filters.engineTypes.includes(engine.id);
              return (
                <button
                  key={engine.id}
                  type="button"
                  onClick={() => toggleEngine(engine.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    checked
                      ? 'bg-amber-500 text-slate-950 border-amber-500 font-bold'
                      : 'bg-slate-900/40 border-slate-800/80 text-slate-300 hover:border-slate-700 hover:bg-slate-850/60'
                  }`}
                >
                  {engine.label}
                </button>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80">
            <label className="block text-[11px] font-semibold text-slate-400 mb-1.5">
              排序方式
            </label>
            <select
              value={filters.sortBy}
              onChange={(e) =>
                onChange({ ...filters, sortBy: e.target.value as FilterOptions['sortBy'] })
              }
              className="w-full bg-slate-950 border border-slate-700 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="price-asc">價格：由低至高</option>
              <option value="price-desc">價格：由高至低</option>
              <option value="luggage-desc">七座行李容積：由大至小</option>
              <option value="length-desc">車身長度：由長至短</option>
              <option value="fuel-desc">省油表現：由高至低</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
