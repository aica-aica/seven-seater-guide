import { DoorType, EngineType, SeatingLayout, VehicleCategory } from './car';

export interface FilterOptions {
  searchQuery: string;
  priceRange: [number, number]; // 單位: 萬元 TWD
  seatingLayouts: SeatingLayout[];
  doorTypes: DoorType[];
  engineTypes: EngineType[];
  categories: VehicleCategory[];
  coreCategory?: 'all' | 'true-7-mpv' | '5-plus-2-suv';
  sortBy: 'price-asc' | 'price-desc' | 'length-desc' | 'luggage-desc' | 'fuel-desc';
}
