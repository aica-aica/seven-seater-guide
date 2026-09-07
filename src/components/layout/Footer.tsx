import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Database, Award, Info } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800/80 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800/60">
          {/* Col 1: Platform Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black text-sm">
                7
              </div>
              <span className="font-bold text-base text-slate-100">
                七人座選車指南
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              專注於台灣市場 7 人座 MPV、5+2 SUV 與商旅車款的客觀數據評測。以第三排真實腿長、ISOFIX 汽座相容性與後廂容積為基準，杜絕充值業配。
            </p>
            <div className="flex items-center gap-2 text-[11px] text-amber-400/90 font-medium">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>100% 客觀規格驗證與實測比對</span>
            </div>
          </div>

          {/* Col 2: Topic Clusters */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              主題評測矩陣
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/guides/true-7-seater-mpv-vs-5-plus-2-suv" className="hover:text-amber-400 transition-colors">
                  正 MPV vs 5+2 SUV 空間與安全
                </Link>
              </li>
              <li>
                <Link href="/guides/sliding-door-vs-hinged-door-child-seats" className="hover:text-amber-400 transition-colors">
                  雙側滑門 vs 傳統外推門實測
                </Link>
              </li>
              <li>
                <Link href="/guides/2-2-3-vs-2-3-2-seating-layout-guide" className="hover:text-amber-400 transition-colors">
                  2+2+3 走道式 vs 2+3+2 三座式
                </Link>
              </li>
              <li>
                <Link href="/guides/hybrid-vs-diesel-family-mpv" className="hover:text-amber-400 transition-colors">
                  家庭 MPV 油電與柴油動力抉擇
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Models */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              指標車款規格庫
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/cars/toyota-sienna" className="hover:text-amber-400 transition-colors">
                  Toyota Sienna 2.5 Hybrid (美規正七人座)
                </Link>
              </li>
              <li>
                <Link href="/cars/kia-carnival" className="hover:text-amber-400 transition-colors">
                  Kia Carnival 2.2 CRDi (大扭力柴油MPV)
                </Link>
              </li>
              <li>
                <Link href="/cars/hyundai-custin" className="hover:text-amber-400 transition-colors">
                  Hyundai Custin 1.5T (150萬內高CP國產MPV)
                </Link>
              </li>
              <li>
                <Link href="/cars/volkswagen-caddy-maxi" className="hover:text-amber-400 transition-colors">
                  VW Caddy Maxi 2.0 TDI (5組ISOFIX露營神車)
                </Link>
              </li>
              <li>
                <Link href="/cars/skoda-kodiaq" className="hover:text-amber-400 transition-colors">
                  Skoda Kodiaq 1.5/2.0 TSI (熱銷 5+2 SUV)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: GEO & SEO Specs */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-3">
              AI 檢索架構與數據
            </h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-start gap-2">
                <Database className="w-3.5 h-3.5 text-amber-500 mt-0.5" />
                <span>內建 Schema.org Car & Product JSON-LD 規範。</span>
              </div>
              <div className="flex items-start gap-2">
                <Award className="w-3.5 h-3.5 text-amber-500 mt-0.5" />
                <span>為 Google AI Overviews 結構化擷取而設計。</span>
              </div>
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-amber-500 mt-0.5" />
                <span>車身數據依據經濟部能源局與原廠實測規格為準。</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} 7-Seater Guide Taiwan. 所有車輛規格與數據僅供客觀選購參考。</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link href="/faq" className="hover:text-slate-400">常見問答 (FAQ)</Link>
            <Link href="/compare" className="hover:text-slate-400">車型比較器</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-400">XML 網站地圖</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
