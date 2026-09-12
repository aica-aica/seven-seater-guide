import React from 'react';
import { Car } from '@/types/car';
import { getCarImageUrl } from '@/utils/image';

interface CarSpecTableProps {
  car: Car;
}

export default function CarSpecTable({ car }: CarSpecTableProps) {
  return (
    <div className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-2xl overflow-hidden shadow-sm text-slate-700">
      <div className="p-4 sm:p-6 border-b border-slate-200/80 bg-slate-50/80">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <span>📐</span> 車身尺碼與動力機械規格全覽
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          依據原廠數據與台灣能源局核發資料，尺寸單位為公釐 (mm)。
        </p>
      </div>

      {/* 1:1 Scale Dimension Stage */}
      <div className="p-4 sm:p-6 border-b border-slate-200/80 bg-[#f4f8fc]/60">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs mb-3">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-600" />
            車身幾何 1:1 等比例尺透視（與 1.8m 地下室限高基準線）
          </span>
          <span className="font-mono font-bold text-cyan-700">
            長 {car.dimensions.lengthMm} × 寬 {car.dimensions.widthMm} × 高 {car.dimensions.heightMm} mm
          </span>
        </div>
        <div className="relative h-44 sm:h-52 rounded-xl bg-gradient-to-b from-[#e8f1fa] to-[#f4f9fe] border border-slate-200/90 overflow-hidden flex items-end justify-center px-4">
          {/* 1.8m guideline */}
          <div
            className="absolute w-full border-t border-dashed border-amber-500 z-10 flex items-center justify-between text-[10px] text-amber-800 px-3 pointer-events-none"
            style={{ bottom: `${(1800 / 2050) * 100}%` }}
          >
            <span className="bg-white/90 border border-amber-200 shadow-xs px-1 rounded font-semibold">⚠️ 1.80m 地下室限高線</span>
            <span className="bg-white/90 border border-amber-200 shadow-xs px-1 rounded font-mono font-semibold">
              {car.dimensions.heightMm > 1800
                ? `超過 +${car.dimensions.heightMm - 1800}mm (需挑高車位)`
                : `剩餘餘裕 +${1800 - car.dimensions.heightMm}mm`}
            </span>
          </div>

          {/* 1.85m guideline */}
          <div
            className="absolute w-full border-t border-dashed border-rose-500/50 z-10 flex items-center justify-between text-[10px] text-rose-800 px-3 pointer-events-none"
            style={{ bottom: `${(1850 / 2050) * 100}%` }}
          >
            <span className="bg-white/90 border border-rose-200 shadow-xs px-1 rounded font-semibold">⛔ 1.85m 大樓限高線</span>
          </div>

          {/* Ground Baseline */}
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent z-10" />

          {/* Scaled Car */}
          <div
            className="relative z-0 transition-all duration-300 flex items-end justify-center"
            style={{
              height: `${(car.dimensions.heightMm / 2050) * 100}%`,
              width: `${(car.dimensions.lengthMm / 5300) * 100}%`,
              maxWidth: '94%',
            }}
          >
            <img
              src={getCarImageUrl(car.heroImage)}
              alt={car.model}
              className="w-full h-full object-contain object-bottom filter drop-shadow-[0_8px_16px_rgba(15,23,42,0.12)]"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <caption className="sr-only">{car.brand} {car.model} 完整規格參數</caption>
          <thead>
            <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
              <th scope="col" className="p-3.5 font-bold w-1/3">規格項目</th>
              <th scope="col" className="p-3.5 font-bold w-2/3">官方數據與備註說明</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200/80">
            {/* Dimensions */}
            <tr className="bg-[#f8fafc]">
              <th scope="row" className="p-3.5 font-semibold text-slate-700">車身長度 (Length)</th>
              <td className="p-3.5 font-mono font-bold text-slate-900">{car.dimensions.lengthMm.toLocaleString()} mm</td>
            </tr>
            <tr>
              <th scope="row" className="p-3.5 font-semibold text-slate-700">車身寬度 (Width)</th>
              <td className="p-3.5 font-mono font-bold text-slate-900">
                {car.dimensions.widthMm.toLocaleString()} mm
                {car.dimensions.widthMm >= 1950 && (
                  <span className="ml-2 text-[11px] font-sans font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    窄巷會車需留意
                  </span>
                )}
              </td>
            </tr>
            <tr className="bg-[#f8fafc]">
              <th scope="row" className="p-3.5 font-semibold text-slate-700">車身高度 (Height)</th>
              <td className="p-3.5 font-mono font-bold text-slate-900">
                {car.dimensions.heightMm.toLocaleString()} mm
                {car.dimensions.heightMm > 1850 ? (
                  <span className="ml-2 text-[11px] font-sans font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    限高 1.85m 停車場無法進入
                  </span>
                ) : (
                  <span className="ml-2 text-[11px] font-sans font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    可順暢進出 1.8m 地下室
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <th scope="row" className="p-3.5 font-semibold text-slate-700">軸距 (Wheelbase)</th>
              <td className="p-3.5 font-mono font-bold text-slate-900">{car.dimensions.wheelbaseMm.toLocaleString()} mm</td>
            </tr>
            <tr className="bg-[#f8fafc]">
              <th scope="row" className="p-3.5 font-semibold text-slate-700">
                登車踏步離地高度 (Step-in Height)
              </th>
              <td className="p-3.5 font-medium text-slate-800">
                <span className="font-mono font-bold text-cyan-700">{car.dimensions.stepInHeightMm} mm</span>
                <span className="text-[11px] text-slate-500 ml-2">
                  {car.dimensions.stepInHeightMm <= 350
                    ? '（極低底盤，長輩與學步幼兒上下車最友善）'
                    : car.dimensions.stepInHeightMm <= 400
                    ? '（標準 MPV 舒適高度）'
                    : '（偏高，需踩踏板進入）'}
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row" className="p-3.5 font-semibold text-slate-700">最小迴轉半徑 (Turning Radius)</th>
              <td className="p-3.5 font-mono font-bold text-slate-900">{car.dimensions.turnRadiusM} 公尺</td>
            </tr>

            {/* Powertrain */}
            <tr className="bg-[#f8fafc]">
              <th scope="row" className="p-3.5 font-semibold text-slate-700">動力型式與排氣量</th>
              <td className="p-3.5 font-medium text-slate-800">
                {car.powertrain.engineSummary}（{car.powertrain.displacementCc} cc）
              </td>
            </tr>
            <tr>
              <th scope="row" className="p-3.5 font-semibold text-slate-700">最大馬力與扭力</th>
              <td className="p-3.5 font-medium text-slate-800">
                {car.powertrain.horsepowerPs} ps / {car.powertrain.torqueNm} Nm
              </td>
            </tr>
            <tr className="bg-[#f8fafc]">
              <th scope="row" className="p-3.5 font-semibold text-slate-700">變速箱與驅動型式</th>
              <td className="p-3.5 font-medium text-slate-800">
                {car.powertrain.transmission} / {car.powertrain.drivetrain}
              </td>
            </tr>
            <tr>
              <th scope="row" className="p-3.5 font-semibold text-slate-700">能源局平均油耗</th>
              <td className="p-3.5 font-medium text-emerald-700 font-bold font-mono">
                {car.powertrain.fuelConsumptionKmL} km/L
              </td>
            </tr>
            <tr className="bg-[#f8fafc]">
              <th scope="row" className="p-3.5 font-semibold text-slate-700">台灣每年固定稅金 (牌照稅+燃料費)</th>
              <td className="p-3.5 font-bold font-mono text-cyan-700">
                {car.powertrain.annualTaiwanTaxTwd.toLocaleString()} 元/年
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
