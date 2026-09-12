'use client';

import React from 'react';
import { TableOfContentsItem } from '@/types/guide';
import { ListOrdered } from 'lucide-react';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav aria-label="文章目錄" className="bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-2xl p-5 text-slate-700 shadow-sm">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-200/80 font-bold text-sm text-slate-900">
        <ListOrdered className="w-4 h-4 text-cyan-600" />
        <span>文章核心章節</span>
      </div>
      <ul className="space-y-2 text-xs">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="text-slate-600 hover:text-cyan-700 font-medium transition-colors block py-0.5 leading-snug"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
