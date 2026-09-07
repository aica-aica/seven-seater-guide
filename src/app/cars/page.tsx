'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CARS_DATA } from '@/data/cars';
import { FilterOptions } from '@/types/filter';
import VehicleFilter from '@/components/home/VehicleFilter';
import CarCard from '@/components/home/CarCard';
import { Car as CarIcon, Scale } from 'lucide-react';

const initialFilters: FilterOptions = {
  searchQuery: '',
  priceRange: [100, 500],
  seatingLayouts: [],
  doorTypes: [],
  engineTypes: [],
  categories: [],
  sortBy: 'price-asc',
};

export default function CarsCatalogPage() {
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);
  const [comparedCarIds, setComparedCarIds] = useState<string[]>(['toyota-sienna', 'kia-carnival']);

  const toggleCompare = (carId: string) => {
    if (comparedCarIds.includes(carId)) {
      setComparedCarIds(comparedCarIds.filter((id) => id !== carId));
    } else {
      if (comparedCarIds.length >= 4) {
        alert('最多同時比對 4 款車型！');
        return;
      }
      setComparedCarIds([...comparedCarIds, carId]);
    }
  };

  const filteredCars = useMemo(() => {
    return CARS_DATA.filter((car) => {
      // Search
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const match =
          car.brand.toLowerCase().includes(query) ||
          car.model.toLowerCase().includes(query) ||
          car.categoryName.toLowerCase().includes(query);
        if (!match) return false;
      }

      // Price Range
      const minWan = car.priceRangeTwd[0] / 10000;
      if (minWan > filters.priceRange[1]) return false;

      // Layout
      if (filters.seatingLayouts.length > 0) {
        if (!filters.seatingLayouts.includes(car.seating.layout)) return false;
      }

      // Door
      if (filters.doorTypes.length > 0) {
        if (!filters.doorTypes.includes(car.doorType)) return false;
      }

      // Engine
      if (filters.engineTypes.length > 0) {
        if (!filters.engineTypes.includes(car.powertrain.engineType)) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.priceRangeTwd[0] - b.priceRangeTwd[0];
      if (filters.sortBy === 'price-desc') return b.priceRangeTwd[1] - a.priceRangeTwd[1];
      if (filters.sortBy === 'luggage-desc') return b.luggage.litres7SeatMode - a.luggage.litres7SeatMode;
      if (filters.sortBy === 'length-desc') return b.dimensions.lengthMm - a.dimensions.lengthMm;
      if (filters.sortBy === 'fuel-desc') return b.powertrain.fuelConsumptionKmL - a.powertrain.fuelConsumptionKmL;
      return 0;
    });
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
            <CarIcon className="w-4 h-4" />
            <span>全台車款資料庫</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            七人座車款完整評測庫
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            包含 MPV、5+2 SUV、商旅車款的客觀規格與優缺點深度剖析。
          </p>
        </div>

        {comparedCarIds.length > 0 && (
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold shadow-md transition-all self-start sm:self-auto"
          >
            <Scale className="w-4 h-4" />
            <span>前往對比 ({comparedCarIds.length} 款)</span>
          </Link>
        )}
      </div>

      {/* Filter Component */}
      <VehicleFilter
        filters={filters}
        onChange={setFilters}
        onReset={() => setFilters(initialFilters)}
        totalResults={filteredCars.length}
      />

      {/* Car Cards Grid */}
      <div>
        {filteredCars.length === 0 ? (
          <div className="text-center py-16 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-slate-300 text-sm font-semibold mb-2">未找到符合條件的七人座車型。</p>
            <button
              onClick={() => setFilters(initialFilters)}
              className="px-4 py-2 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold"
            >
              重設所有條件
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car) => (
              <CarCard
                key={car.id}
                car={car}
                isCompared={comparedCarIds.includes(car.id)}
                onToggleCompare={toggleCompare}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
