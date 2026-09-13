import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '七人座常見問答與 AI 知識精要 | 第三排空間、稅金、停車限高、汽座解答',
  description:
    '針對台灣七人座買家最常搜尋的核心問題提供權威解答：正 MPV vs 5+2 空間差異、2+2+3 vs 2+3+2 佈局優缺點、Toyota Sienta 停產替代車款、雙汽座進出動線、1.8 米停車場限高與每年養車稅金試算。',
  keywords: [
    '七人座常見問題',
    '正MPV與5+2差別',
    'Sienta停產替代',
    '2+2+3座椅好處',
    '七人座稅金多少',
    '七人座地下室限高',
    '七人座ISOFIX',
  ],
  alternates: {
    canonical: 'https://7seater-guide.tw/faq',
  },
  openGraph: {
    title: '七人座常見問答與 AI 知識精要 | 第三排空間、稅金、停車限高、汽座解答',
    description:
      '解答台灣七人座買家 6 大痛點：MPV vs 5+2、Sienta 停產替代、2+2+3 走道動線、雙汽座安裝與停車場 1.8m 限高。',
    url: 'https://7seater-guide.tw/faq',
    type: 'website',
  },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
