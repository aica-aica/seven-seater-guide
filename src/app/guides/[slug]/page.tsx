import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { GUIDES_DATA } from '@/data/guides';
import { CARS_DATA } from '@/data/cars';
import TableOfContents from '@/components/guides/TableOfContents';
import JsonLdArticle from '@/components/seo/JsonLdArticle';
import CarCard from '@/components/home/CarCard';
import { ChevronRight, Clock, Calendar, Sparkles, ArrowLeft } from 'lucide-react';
import { getCarImageUrl } from '@/utils/image';

interface GuideDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES_DATA.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuideDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = GUIDES_DATA.find((g) => g.slug === slug);
  if (!guide) return { title: '文章不存在' };

  const canonicalUrl = `https://7seater-guide.tw/guides/${guide.slug}`;

  return {
    title: `${guide.title} | 七人座選車專題`,
    description: guide.summary,
    keywords: [
      guide.title,
      guide.categoryLabel,
      '七人座選購攻略',
      '七人座評測',
      '正MPV vs 5+2',
      '七人座推薦',
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: guide.title,
      description: guide.summary,
      url: canonicalUrl,
      images: [{ url: getCarImageUrl(guide.heroImage), width: 1200, height: 630, alt: guide.title }],
      type: 'article',
      publishedTime: guide.publishedAt,
      modifiedTime: guide.updatedAt,
      authors: [guide.author.name],
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.summary,
      images: [getCarImageUrl(guide.heroImage)],
    },
  };
}

export default async function GuideDetailPage({ params }: GuideDetailPageProps) {
  const { slug } = await params;
  const guide = GUIDES_DATA.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const canonicalUrl = `https://7seater-guide.tw/guides/${guide.slug}`;
  const relatedCars = CARS_DATA.filter((c) => guide.relatedCarSlugs.includes(c.id));

  return (
    <div className="text-slate-900 min-h-screen pb-20">
      {/* Schema.org Article Structured Data */}
      <JsonLdArticle article={guide} canonicalUrl={canonicalUrl} />

      {/* Breadcrumb Navigation */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/90 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav aria-label="麵包屑" className="flex items-center gap-1.5 text-xs text-slate-500">
            <Link href="/" className="hover:text-cyan-600 transition-colors">
              首頁
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/guides" className="hover:text-cyan-600 transition-colors">
              選購攻略
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-slate-800 font-bold truncate">{guide.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <header className="bg-gradient-to-b from-white/80 to-transparent border-b border-slate-200/90 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-800 text-xs font-bold border border-cyan-200 shadow-sm">
            <span>{guide.categoryLabel}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {guide.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
            {guide.subtitle}
          </p>

          <div className="flex items-center justify-center gap-6 pt-4 text-xs text-slate-500 border-t border-slate-200/80 max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <img
                src={guide.author.avatar}
                alt={guide.author.name}
                className="w-7 h-7 rounded-full object-cover border border-slate-200"
              />
              <div className="text-left">
                <span className="font-bold text-slate-900 block leading-tight">{guide.author.name}</span>
                <span className="text-[10px] text-slate-500">{guide.author.role}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              <span>{guide.publishedAt}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-600" />
              <span>{guide.readTimeMinutes} 分鐘精讀</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Article Container with Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Body Column */}
          <article className="lg:col-span-8 space-y-8">
            {/* Article Hero Image */}
            <div className="relative rounded-2xl overflow-hidden aspect-video max-h-[420px] w-full border border-slate-200/90 shadow-sm bg-slate-100">
              <img
                src={getCarImageUrl(guide.heroImage)}
                alt={guide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs drop-shadow-md">
                <span className="font-semibold bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
                  {guide.categoryLabel} 實車評測圖例
                </span>
              </div>
            </div>

            {/* Key Takeaways Box (GEO Friendly) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-cyan-50/80 border border-cyan-200/90 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-cyan-600" />
                <h2 className="text-base font-bold text-cyan-900">
                  本篇核心結論（Key Takeaways）
                </h2>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {guide.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-cyan-600 mt-1.5 flex-shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Content Rendered */}
            <div
              className="prose max-w-none prose-headings:font-bold prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:text-slate-900 prose-h2:border-b prose-h2:border-slate-200/80 prose-h2:pb-2 prose-h2:mt-10 prose-h3:text-lg prose-h3:text-cyan-700 prose-p:text-slate-700 prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base prose-li:text-slate-700 prose-li:text-sm sm:prose-li:text-base prose-strong:text-cyan-900"
              dangerouslySetInnerHTML={{ __html: guide.contentHtml }}
            />

            {/* Related Vehicles Section */}
            {relatedCars.length > 0 && (
              <section className="pt-10 border-t border-slate-200/80">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  本專題提及之代表車款
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  點擊查看個別車型之規格、走道淨寬與後廂容積
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              </section>
            )}

            <div className="pt-6">
              <Link
                href="/guides"
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-700 hover:text-cyan-600"
              >
                <ArrowLeft className="w-4 h-4" />
                返回選購指南專題庫
              </Link>
            </div>
          </article>

          {/* Sticky Table of Contents Sidebar */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <TableOfContents items={guide.tableOfContents} />

              <div className="p-5 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/90 text-xs text-slate-600 space-y-3 shadow-sm">
                <h4 className="font-bold text-slate-900">七人座選車研究室</h4>
                <p className="leading-relaxed">
                  本文所有座椅人體工學尺寸與行李箱公升數均經過實際量測，絕無商業贊助置入。
                </p>
                <Link
                  href="/compare"
                  className="block w-full py-2 text-center rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-sm shadow-cyan-600/20 transition-colors"
                >
                  開始車型規格橫向比對 →
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
