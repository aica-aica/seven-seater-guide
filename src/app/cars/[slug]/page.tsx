import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { CARS_DATA } from '@/data/cars';
import { getCarImageUrl } from '@/utils/image';
import CarSpecTable from '@/components/cars/CarSpecTable';
import SeatingDiagram from '@/components/cars/SeatingDiagram';
import LuggageCapacity from '@/components/cars/LuggageCapacity';
import IsofixMap from '@/components/cars/IsofixMap';
import ProsConsList from '@/components/cars/ProsConsList';
import JsonLdCar from '@/components/seo/JsonLdCar';
import { ArrowLeft, Scale, Check, ChevronRight, HelpCircle, Sparkles } from 'lucide-react';

interface CarDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return CARS_DATA.map((car) => ({
    slug: car.slug,
  }));
}

export async function generateMetadata({ params }: CarDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = CARS_DATA.find((c) => c.slug === slug);
  if (!car) return { title: '車款不存在' };

  const minWan = (car.priceRangeTwd[0] / 10000).toFixed(0);
  const maxWan = (car.priceRangeTwd[1] / 10000).toFixed(0);

  return {
    title: `${car.brand} ${car.model} 七人座評測：第三排空間、ISOFIX與行李箱實測`,
    description: `${car.brand} ${car.model} 售價 ${minWan}~${maxWan}萬。${car.tagline}。提供 7 人座滿載行李箱容積、${car.seating.layout} 座椅走道動線、${car.safety.isofixPoints} 組 ISOFIX 汽座安裝與客觀優缺點分析。`,
    openGraph: {
      title: `${car.brand} ${car.model} (${car.year}) 七人座完整評測規格`,
      description: `${car.tagline}，真實行李容積 ${car.luggage.litres7SeatMode}L，第三排空間評測。`,
      images: [{ url: getCarImageUrl(car.heroImage), width: 1200, height: 630, alt: car.model }],
    },
  };
}

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = await params;
  const car = CARS_DATA.find((c) => c.slug === slug);

  if (!car) {
    notFound();
  }

  const minPriceWan = (car.priceRangeTwd[0] / 10000).toFixed(0);
  const maxPriceWan = (car.priceRangeTwd[1] / 10000).toFixed(0);
  const canonicalUrl = `https://7seater-guide.tw/cars/${car.slug}`;

  return (
    <div className="text-slate-900 min-h-screen pb-16">
      {/* JSON-LD Schema.org Structured Data (Car + Product + FAQPage + BreadcrumbList) */}
      <JsonLdCar car={car} canonicalUrl={canonicalUrl} />

      {/* Breadcrumb Bar */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/90 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="麵包屑導覽" className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-cyan-600 transition-colors">
              首頁
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/cars" className="hover:text-cyan-600 transition-colors">
              車型庫
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800 font-bold truncate">
              {car.brand} {car.model}
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Header Banner */}
      <div className="relative border-b border-slate-200/80 py-10 sm:py-16 bg-gradient-to-b from-white/60 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Info & Badges */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-md text-xs font-black shadow-sm ${
                    car.coreCategory === 'true-7-mpv'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 font-bold'
                      : 'bg-sky-100 text-sky-800 border border-sky-300 font-bold'
                  }`}
                >
                  {car.coreCategory === 'true-7-mpv' ? '🛡️ 正7人座 MPV' : '⚡ 5+2 SUV'}
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-bold bg-cyan-50 text-cyan-700 border border-cyan-200">
                  {car.categoryName}
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  {car.doorTypeDescription}
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  標準 {car.seatingCapacity} 人座
                </span>
                <span className="px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                  {car.year} 年式
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {car.brand} {car.model}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
                {car.tagline}
              </p>

              {/* Price Callout */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-xs text-slate-500 uppercase font-bold tracking-wider">
                  新車建議售價：
                </span>
                <span className="text-3xl sm:text-4xl font-black text-cyan-700 font-mono">
                  {minPriceWan} ~ {maxPriceWan}{' '}
                  <span className="text-sm font-bold text-slate-600 font-sans">萬元 TWD</span>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  href={`/compare?car1=${car.id}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold shadow-md shadow-cyan-600/20 transition-all"
                >
                  <Scale className="w-4 h-4" />
                  與其他七人座車款橫向比對
                </Link>
                <Link
                  href="/cars"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 shadow-sm transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  返回所有車型
                </Link>
              </div>
            </div>

            {/* Right: Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/90 shadow-xl bg-gradient-to-b from-slate-100 to-slate-200/50 group">
                <img
                  src={getCarImageUrl(car.heroImage)}
                  alt={`${car.brand} ${car.model}`}
                  className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        {/* Module 1: Seating & Walk-Through Diagram */}
        <section aria-labelledby="seating-section">
          <SeatingDiagram seating={car.seating} modelName={`${car.brand} ${car.model}`} />
        </section>

        {/* Module 2: Luggage & Suitcases Capacity */}
        <section aria-labelledby="luggage-section">
          <LuggageCapacity luggage={car.luggage} />
        </section>

        {/* Module 3: ISOFIX & Safety */}
        <section aria-labelledby="safety-section">
          <IsofixMap safety={car.safety} />
        </section>

        {/* Module 4: Mechanical & Dimension Specs Table */}
        <section aria-labelledby="spec-table-section">
          <CarSpecTable car={car} />
        </section>

        {/* Module 5: Real-World Pros & Cons */}
        <section aria-labelledby="pros-cons-section">
          <div className="mb-4">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span>⚖️</span> 編輯部實測結論與真實車主評價
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              不隱瞞缺點，提供最客觀的買前避坑評估。
            </p>
          </div>
          <ProsConsList
            pros={car.pros}
            cons={car.cons}
            idealPersona={car.idealPersona}
            heightWarning={car.heightWarning}
          />
        </section>

        {/* Module 6: Trims & Pricing Breakdown */}
        <section className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-5 sm:p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-1">
            車型編成與等級售價配備
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            台灣現行販售規格配備差異
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {car.trims.map((trim, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#f4f8fc] border border-slate-200/80 space-y-3"
              >
                <div className="flex items-baseline justify-between border-b border-slate-200 pb-2">
                  <h4 className="font-bold text-slate-900 text-sm">{trim.name}</h4>
                  <span className="font-mono font-bold text-cyan-700 text-base">
                    {(trim.priceTwd / 10000).toFixed(0)} 萬元
                  </span>
                </div>
                <div className="space-y-1.5 text-xs text-slate-700">
                  <span className="text-[11px] text-slate-500 block font-semibold">重點標配：</span>
                  {trim.keyEquipment.map((eq, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      <span>{eq}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Module 7: Car-Specific Dedicated FAQ Section */}
        {car.faqs && car.faqs.length > 0 && (
          <section className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-5 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <HelpCircle className="w-5 h-5 text-cyan-600" />
              <h3 className="text-xl font-bold text-slate-900">
                {car.brand} {car.model} 常見疑問與車主實測解答（專屬 FAQ）
              </h3>
            </div>
            <p className="text-xs text-slate-500 mb-6">
              針對本車型之空間、停車、動力與汽座常見問題整理，已同步注入 Schema.org/FAQPage 結構化資料。
            </p>

            <div className="space-y-4">
              {car.faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-5 rounded-xl bg-[#f4f8fc] border border-slate-200/80 space-y-2.5"
                >
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 flex items-start gap-2">
                    <span className="text-cyan-600 font-mono">Q:</span>
                    <span>{faq.question}</span>
                  </h4>
                  <div className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-6 border-l-2 border-cyan-500">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
