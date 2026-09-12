import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Database, Award, Info } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#e8f1fa]/90 text-slate-600 border-t border-slate-200/90 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-300/60">
          {/* Col 1: Platform Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center text-white font-black text-sm shadow-md shadow-cyan-600/20">
                7
              </div>
              <span className="font-bold text-base text-slate-900">
                七人座選車指南
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-600">
              專注於台灣市場 7 人座 MPV、5+2 SUV 與商旅車款的客觀數據評測。以第三排真實腿長、ISOFIX 汽座相容性與後廂容積為基準，杜絕充值業配。
            </p>
            <div className="flex items-center gap-2 text-[11px] text-cyan-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-cyan-600" />
              <span>100% 客觀規格驗證與實測比對</span>
            </div>
          </div>

          {/* Col 2: Topic Clusters */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              主題評測矩陣
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/guides/true-7-seater-mpv-vs-5-plus-2-suv" className="text-slate-600 hover:text-sky-600 transition-colors">
                  正 MPV vs 5+2 SUV 空間與安全
                </Link>
              </li>
              <li>
                <Link href="/guides/sliding-door-vs-hinged-door-child-seats" className="text-slate-600 hover:text-sky-600 transition-colors">
                  雙側滑門 vs 傳統外推門實測
                </Link>
              </li>
              <li>
                <Link href="/guides/2-2-3-vs-2-3-2-seating-layout-guide" className="text-slate-600 hover:text-sky-600 transition-colors">
                  2+2+3 走道式 vs 2+3+2 三座式
                </Link>
              </li>
              <li>
                <Link href="/guides/hybrid-vs-diesel-family-mpv" className="text-slate-600 hover:text-sky-600 transition-colors">
                  家庭 MPV 油電與柴油動力抉擇
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Models */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              指標車款規格庫
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/cars/volkswagen-id-buzz" className="text-slate-700 hover:text-sky-600 transition-colors font-semibold">
                  ⚡ VW ID. Buzz Pro S (德系純電七人座)
                </Link>
              </li>
              <li>
                <Link href="/cars/toyota-sienna" className="text-slate-600 hover:text-sky-600 transition-colors">
                  Toyota Sienna 2.5 Hybrid (美規正七人座)
                </Link>
              </li>
              <li>
                <Link href="/cars/kia-carnival" className="text-slate-600 hover:text-sky-600 transition-colors">
                  Kia Carnival 2.2 CRDi (大扭力柴油MPV)
                </Link>
              </li>
              <li>
                <Link href="/cars/toyota-alphard" className="text-slate-600 hover:text-sky-600 transition-colors">
                  Toyota Alphard 2.5 Hybrid (日系頂級旗艦)
                </Link>
              </li>
              <li>
                <Link href="/cars/kia-ev9" className="text-slate-600 hover:text-sky-600 transition-colors">
                  Kia EV9 (純電三排座旗艦休旅)
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: GEO & SEO Specs */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              AI 檢索架構與數據
            </h3>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex items-start gap-2">
                <Database className="w-3.5 h-3.5 text-cyan-600 mt-0.5" />
                <span>內建 Schema.org Car & Product JSON-LD 規範。</span>
              </div>
              <div className="flex items-start gap-2">
                <Award className="w-3.5 h-3.5 text-cyan-600 mt-0.5" />
                <span>收錄 Euro NCAP / IIHS 安全撞擊與台灣原廠規配手冊。</span>
              </div>
              <div className="flex items-start gap-2">
                <Info className="w-3.5 h-3.5 text-cyan-600 mt-0.5" />
                <span>數據每季實車更新，持續驗證第三排真實成人膝部距離。</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} 七人座選車指南 (7-Seater Guide Taiwan). 保持獨立客觀，資料供購車決策參考。
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <Link href="/cars" className="hover:text-sky-600 transition-colors">全車庫檢視</Link>
            <Link href="/compare" className="hover:text-sky-600 transition-colors">對決比較器</Link>
            <Link href="/faq" className="hover:text-sky-600 transition-colors">常見問題</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
