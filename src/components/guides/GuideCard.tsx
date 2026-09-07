import React from 'react';
import Link from 'next/link';
import { GuideArticle } from '@/types/guide';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';

interface GuideCardProps {
  guide: GuideArticle;
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <article className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition-all hover:shadow-2xl flex flex-col group">
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
        <img
          src={guide.heroImage}
          alt={guide.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-slate-900/90 text-amber-400 border border-amber-500/30 backdrop-blur-sm shadow-sm">
            {guide.categoryLabel}
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
            <span>{guide.publishedAt}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              {guide.readTimeMinutes} 分鐘閱讀
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-amber-400 transition-colors leading-snug mb-2">
            <Link href={`/guides/${guide.slug}`}>
              {guide.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {guide.summary}
          </p>
        </div>

        <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={guide.author.avatar}
              alt={guide.author.name}
              className="w-6 h-6 rounded-full object-cover border border-slate-700"
            />
            <span className="text-xs text-slate-300 font-medium">
              {guide.author.name}
            </span>
          </div>

          <Link
            href={`/guides/${guide.slug}`}
            className="text-xs font-bold text-amber-400 group-hover:text-amber-300 flex items-center gap-1"
          >
            閱讀專文
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
