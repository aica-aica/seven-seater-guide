export type SeatingLayout = '2+2+3' | '2+3+2' | '2+2+2';
export type DoorType = 'dual-power-sliding' | 'manual-sliding' | 'hinged';
export type VehicleCategory = 'full-mpv' | 'mid-mpv' | 'compact-mpv' | '5-plus-2-suv' | 'luxury-mpv';
export type EngineType = 'gasoline' | 'diesel' | 'hybrid' | 'phev' | 'ev';
export type ThirdRowUsability = 'adult-long-haul' | 'adult-short-haul' | 'emergency-child';

export interface CarDimensions {
  lengthMm: number;
  widthMm: number;
  heightMm: number;
  wheelbaseMm: number;
  groundClearanceMm: number;
  stepInHeightMm: number; // 地板離地高度 / 登車階梯高度 (長輩/幼童上下車關鍵)
  turnRadiusM: number;    // 最小迴轉半徑
}

export interface SeatingModularity {
  layout: SeatingLayout;
  layoutDescription: string;
  railType: string;                     // 滑軌型式 (例如: 全車平整無段式滑軌走道、長行程獨立滑軌)
  secondRowType: 'captain-chairs' | 'bench' | 'modular-rail';
  secondRowWalkThroughWidthMm: number;  // 第二排中央走道寬度 (2+2+3 專用)
  secondRowSlideTravelMm: number;        // 第二排前後滑移量
  thirdRowLegroomMm: number;            // 第三排實際膝部空間 (mm)
  thirdRowHeadroomMm: number;           // 第三排實際頭部空間 (mm)
  thirdRowKneeClearanceCm: number;      // 第三排標準膝部餘裕 (公分)
  thirdRowComfortRating: number;        // 第三排舒適度評分 (1-10 分)
  thirdRowUsability: ThirdRowUsability;
  thirdRowFoldingType: 'underfloor-sink' | 'side-hang' | 'tumble-forward' | 'split-fold-flat';
}

export interface LuggageSpecs {
  litres7SeatMode: number;             // 七人滿載狀態行李箱公升數
  litres3rdRowFolded: number;          // 第三排傾倒公升數
  maxLitres: number;                   // 第二三排全折疊最大公升數
  realWorldCapacityDescription: string;// 實測能塞幾件 28 吋行李箱或推車
  underfloorStorageLitres?: number;    // 底板下潛藏儲物格
}

export interface SafetyAndIsofix {
  isofixPoints: number;                // ISOFIX 總組數
  isofixLocations: string[];           // 詳細分佈位置說明 (例如: 第二排雙座 + 第三排右側座)
  topTetherPoints: number;
  canFitThreeChildSeats: boolean;      // 能否並排/同載三組兒童安全座椅
  ncapRating: string;                  // Euro NCAP / T-NCAP 星級
  adasFeatures: string[];              // Level 2 ADAS 標配項目
}

export interface PowertrainSpecs {
  engineType: EngineType;
  engineSummary: string;
  displacementCc: number;
  horsepowerPs: number;
  torqueNm: number;
  transmission: string;
  drivetrain: 'FWD' | 'RWD' | 'AWD' | '4WD';
  fuelConsumptionKmL: number;          // 能源局平均油耗 (km/L)
  annualTaiwanTaxTwd: number;          // 台灣每年牌照稅 + 燃料費合計
}

export interface TrimOption {
  name: string;
  priceTwd: number;
  keyEquipment: string[];
}

export interface CarFaq {
  question: string;
  answer: string;
}

export interface Car {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  seatingCapacity: 7;                  // 規範定義 7 人座數值
  category: VehicleCategory;
  categoryName: string;
  priceRangeTwd: [number, number];     // 價格區間 (新台幣元)
  heroImage: string;
  tagline: string;
  doorType: DoorType;
  doorTypeDescription: string;
  dimensions: CarDimensions;
  seating: SeatingModularity;
  luggage: LuggageSpecs;
  safety: SafetyAndIsofix;
  powertrain: PowertrainSpecs;
  trims: TrimOption[];
  pros: string[];                      // 客觀優點
  cons: string[];                      // 客觀缺點/硬傷 (非充值口吻)
  idealPersona: string;                // 最適合使用情境 (例如: 經常三代同堂長途旅行之家庭)
  heightWarning?: string;              // 機械停車位/限高 1.9m 警示
  faqs: CarFaq[];                      // 車款專屬 FAQ 題庫
}
