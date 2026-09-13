import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://7seater-guide.tw'),
  title: {
    default: '七人座選車指南 2025 | 台灣 7 人座 MPV 與 5+2 SUV 推薦、空間實測與規格庫',
    template: '%s | 七人座選車指南 (7-Seater Guide Taiwan)',
  },
  description:
    '台灣最客觀權威的七人座休旅車與 MPV 評測資料庫。深入實測第三排成人膝部空間（公分）、雙側電動滑門防撞動線、ISOFIX 兒童汽座相容度、7人滿載行李箱公升數與 1.8m 停車場限高。收錄 Sienna、Carnival、Custin、Kodiaq、Alphard、n7 等 13 款主流車型，客觀數據不業配，為家庭精準選車。',
  keywords: [
    '七人座',
    '七人座推薦',
    '七人座休旅車',
    '七人座MPV',
    '正七人座',
    '5+2七人座',
    '2025七人座推薦',
    '七人座休旅車推薦',
    '七人座休旅車2025',
    '百萬內七人座',
    'Sienta停產替代',
    '七人座電動車',
    '七人座滑門',
    'ISOFIX七人座',
    '第三排空間實測',
    '雙側電動滑門',
    '2+2+3座椅配置',
    'Toyota Sienna',
    'Kia Carnival',
    'Hyundai Custin',
    'Skoda Kodiaq',
    'Luxgen n7',
    'VW ID Buzz',
    'Toyota Alphard',
    'Lexus LM',
    'Kia EV9',
    'Volkswagen Caddy Maxi',
  ],
  authors: [{ name: '七人座選車指南空間工程研究室' }],
  creator: '7-Seater Guide Taiwan',
  publisher: '七人座選車指南',
  category: 'automotive',
  alternates: {
    canonical: 'https://7seater-guide.tw',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: '七人座選車指南 2025 | 台灣 7-Seater MPV & SUV 深度評測與規格庫',
    description:
      '實測 13 款台灣主流七人座：第三排成人腿部空間、雙側電動滑門、滿載行李箱容積與 ISOFIX 數量，為台灣三代同堂與雙寶家庭提供最真實的購車數據。',
    url: 'https://7seater-guide.tw',
    siteName: '七人座選車指南 (7-Seater Guide Taiwan)',
    locale: 'zh_TW',
    type: 'website',
    images: [
      {
        url: 'https://7seater-guide.tw/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '七人座選車指南 2025 台灣熱門七人座評測規格庫',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '七人座選車指南 2025 | 台灣 7 人座 MPV 與 5+2 SUV 深度評測',
    description:
      '實測第三排空間、雙側滑門、滿載行李箱與 ISOFIX 數量，台灣七人座購車客觀權威數據庫。',
    images: ['https://7seater-guide.tw/og-image.jpg'],
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
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://7seater-guide.tw/#website',
    name: '七人座選車指南',
    alternateName: [
      '7-Seater Guide Taiwan',
      '台灣七人座選車指南',
      '台灣七人座休旅車與MPV規格資料庫',
      '七人座推薦評測網',
    ],
    url: 'https://7seater-guide.tw',
    description: '專注於台灣市場 7 人座 MPV 與 5+2 SUV 的客觀空間實測與規格評鑑權威資料庫。',
    inLanguage: 'zh-TW',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://7seater-guide.tw/cars?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': 'https://7seater-guide.tw/#organization',
    name: '七人座選車指南 (7-Seater Guide Taiwan)',
    url: 'https://7seater-guide.tw',
    logo: 'https://7seater-guide.tw/logo.png',
    description: '專注於台灣市場 7 人座 MPV 與 5+2 SUV 的客觀數據評測與空間安全權威分析機構。',
    areaServed: 'TW',
    knowsAbout: [
      '台灣七人座休旅車與 MPV 評選推薦',
      '正七人座 MPV vs 5+2 SUV 第三排空間差異',
      'ISOFIX 兒童安全座椅安裝動線與 3 汽座相容性',
      '雙側電動滑門防撞與狹窄車位上下車',
      '地下停車場 1.8m 與 1.85m 車高限高限制',
      '七人滿載行李箱公升數裝載實測',
      'Toyota Sienta 停產後百萬內替代車款',
      '台灣七人座汽車年度牌照稅與燃料費試算',
    ],
  };

  return (
    <html lang="zh-Hant-TW" className="h-full bg-[#f0f5fb] text-slate-900 antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
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
