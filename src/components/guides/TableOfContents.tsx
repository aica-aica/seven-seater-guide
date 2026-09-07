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
    <nav aria-label="文章目錄" className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-slate-200">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-slate-800 font-bold text-sm text-white">
        <ListOrdered className="w-4 h-4 text-amber-400" />
        <span>文章核心章節</span>
      </div>
      <ul className="space-y-2 text-xs">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className="text-slate-400 hover:text-amber-400 transition-colors block py-0.5 leading-snug"
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
