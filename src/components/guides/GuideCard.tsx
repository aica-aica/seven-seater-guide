import React from 'react';
import Link from 'next/link';
import { GuideArticle } from '@/types/guide';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';
import { getCarImageUrl } from '@/utils/image';

interface GuideCardProps {
  guide: GuideArticle;
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <article className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-2xl overflow-hidden hover:border-cyan-400/60 transition-all hover:shadow-xl hover:shadow-cyan-600/5 flex flex-col group shadow-sm">
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-100">
        <img
          src={getCarImageUrl(guide.heroImage)}
          alt={guide.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-white/95 text-cyan-800 border border-cyan-200 backdrop-blur-md shadow-sm">
            {guide.categoryLabel}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
            <span>{guide.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-cyan-600" />
              {guide.readTimeMinutes} 分鐘閱讀
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-cyan-700 transition-colors leading-snug mb-2">
            <Link href={`/guides/${guide.slug}`}>
              {guide.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 leading-relaxed">
            {guide.summary}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={guide.author.avatar}
              alt={guide.author.name}
              className="w-6 h-6 rounded-full object-cover border border-slate-200"
            />
            <span className="text-xs text-slate-700 font-medium">
              {guide.author.name}
            </span>
          </div>

          <Link
            href={`/guides/${guide.slug}`}
            className="text-xs font-bold text-cyan-700 hover:text-cyan-600 flex items-center gap-1"
          >
            閱讀專題
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
