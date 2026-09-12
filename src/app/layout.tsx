import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://7seater-guide.tw'),
  title: {
    default: '七人座選車指南 | 台灣 7-Seater MPV & 5+2 SUV 深度評測與規格庫',
    template: '%s | 七人座選車指南 (7-Seater Guide Taiwan)',
  },
  description:
    '台灣最客觀的七人座汽車評測權威庫。深入實測第三排成人腿部空間、雙側電動滑門動線、ISOFIX 汽座安裝與七人滿載行李箱容積，杜絕業配充值，助您找到最適合全家人的七人座車款。',
  keywords: [
    '七人座',
    '七人座MPV',
    '5+2休旅車',
    'Toyota Sienna',
    'Kia Carnival',
    'Hyundai Custin',
    'Volkswagen Caddy Maxi',
    '第三排空間',
    '雙側滑門',
    'ISOFIX汽座',
    '七人座行李箱',
  ],
  authors: [{ name: '七人座選車指南研究室' }],
  creator: '7-Seater Guide Taiwan',
  publisher: '七人座選車指南',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: '七人座選車指南 | 台灣 7-Seater MPV & SUV 深度評測與規格庫',
    description:
      '客觀解析 2+2+3 vs 2+3+2 座椅配置、雙側滑門、滿載行李箱與 ISOFIX 數量，為台灣三代同堂與雙寶家庭提供最真實的購車數據。',
    url: 'https://7seater-guide.tw',
    siteName: '七人座選車指南',
    locale: 'zh_TW',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '七人座選車指南 (7-Seater Guide Taiwan)',
    url: 'https://7seater-guide.tw',
    logo: 'https://7seater-guide.tw/logo.png',
    description: '專注於台灣市場 7 人座 MPV 與 5+2 SUV 的客觀數據評測與空間安全權威分析機構。',
    knowsAbout: [
      '7-Seater MPV',
      '5+2 SUV',
      'Child Car Seat ISOFIX Compatibility',
      'Vehicle Seating Modularity',
      'Automotive Safety and Crumple Zones',
    ],
  };

  return (
    <html lang="zh-Hant-TW" className="h-full bg-[#f0f5fb] text-slate-900 antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#f0f5fb] text-slate-900 font-sans selection:bg-cyan-500 selection:text-white">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
