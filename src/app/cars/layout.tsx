import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '2025 台灣七人座車款大全 | 正 MPV 與 5+2 SUV 完整規格、售價與空間評等',
  description:
    '收錄台灣市售 13 款主流 7 人座休旅車與 MPV：Toyota Sienna、Kia Carnival、Hyundai Custin、Skoda Kodiaq、VW Multivan、Caddy Maxi、Luxgen n7、Kia EV9、Alphard 等。提供新車售價區間、排氣量、座椅佈局、行李容積與 ISOFIX 篩選。',
  keywords: [
    '七人座休旅車',
    '七人座MPV',
    '台灣七人座新車',
    '2025七人座推薦',
    '正七人座',
    '5+2休旅車',
    '百萬七人座',
    'Toyota Sienna',
    'Kia Carnival',
    'Hyundai Custin',
    'Skoda Kodiaq',
    'Luxgen n7',
    'VW ID Buzz',
    'Toyota Alphard',
  ],
  alternates: {
    canonical: 'https://7seater-guide.tw/cars',
  },
  openGraph: {
    title: '2025 台灣七人座車款大全 | 正 MPV 與 5+2 SUV 完整規格評等',
    description:
      '收錄台灣市售 13 款主流 7 人座：詳細比對售價、排氣量、第三排成人適應性、行李箱公升數與 ISOFIX 數量。',
    url: 'https://7seater-guide.tw/cars',
    type: 'website',
  },
};

export default function CarsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
