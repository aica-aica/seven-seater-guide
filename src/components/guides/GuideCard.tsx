import React from 'react';
import Link from 'next/link';
import { GuideArticle } from '@/types/guide';
import { Clock, BookOpen, ArrowRight } from 'lucide-react';

interface GuideCardProps {
  guide: GuideArticle;
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <article className="bg-[#0e1424]/80 backdrop-blur-xl border border-white/[0.08] rounded-2xl overflow-hidden hover:border-cyan-500/35 transition-all hover:shadow-2xl hover:shadow-cyan-500/5 flex flex-col group">
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
        <img
          src={guide.heroImage}
          alt={guide.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1424] via-transparent to-black/30" />
        <div className="absolute top-3 left-3">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#0e1424]/90 text-cyan-300 border border-cyan-500/30 backdrop-blur-md shadow-sm">
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
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              {guide.readTimeMinutes} 分鐘閱讀
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug mb-2">
            <Link href={`/guides/${guide.slug}`}>
              {guide.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {guide.summary}
          </p>
        </div>

        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
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
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            閱讀專題
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
