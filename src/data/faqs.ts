import { FAQItem } from '@/types/faq';

export const FAQS_DATA: FAQItem[] = [
  // 空間與乘坐
  {
    id: 'faq-true-mpv-vs-5plus2',
    category: 'space-and-seating',
    categoryName: '空間與第三排乘坐',
    question: '正七人座 MPV 與 5+2 SUV 第三排乘坐空間到底差在哪裡？',
    shortAnswer: '正七人座 MPV 底盤平整且椅面離地高度超過 33cm，大腿能獲得完整支撐，175cm 成人長途乘坐不疲累；5+2 SUV 底盤偏高且椅墊薄，乘客大腿懸空如同蹲坐小板凳，僅適合 165cm 以下成人或學童短途應急。',
    detailedAnswer: '正七人座 MPV（如 Toyota Sienna、Kia Carnival、Hyundai Custin）擁有專屬平整底盤，第三排椅面離地高通常在 330mm 以上，椅背具備多段後仰調節，且七人滿載時後行李廂仍有 450L~1100L 的裝載容量。相比之下，5+2 SUV（如 Skoda Kodiaq）是由 5 人座拉長底盤衍生，第三排受限於後軸差速器與懸吊結構，椅墊離地僅約 20cm，坐骨承重過大，長途乘坐容易腰酸背痛，且滿載時行李廂僅剩 200~300L。',
    keyPoints: [
      '正 MPV 第三排大腿可平貼椅面，5+2 SUV 大腿多半懸空',
      '正 MPV 第三排通常配有專屬空調出風口、杯架與 USB 充電孔',
      '5+2 SUV 第三排展開時，乘客後腦勺距離後擋風玻璃僅 20~30 公分，高速追撞緩衝較小',
    ],
    relatedCarSlugs: ['toyota-sienna', 'kia-carnival', 'skoda-kodiaq'],
    lastUpdated: '2024-04-01',
  },
  {
    id: 'faq-223-vs-232-layout',
    category: 'space-and-seating',
    categoryName: '空間與第三排乘坐',
    question: '七人座選 2+2+3 好還是 2+3+2 好？哪種格局更適合家庭？',
    shortAnswer: '6人以內高頻率出遊選 2+2+3，第二排為獨立尊榮座並附中央走道，進出第三排不需翻折座椅且方便車內照顧小孩；若經常是 5 人乘車且需載運大量露營裝備或推車，選 2+3+2 可將第三排完全隱藏，享有超大行李廂。',
    detailedAnswer: '2+2+3 佈局的核心價值在於「中央走道（寬度約 18~22cm）」與第二排獨立單人座的舒適度（可配備通風加熱與腿靠），即使第二排安裝了兩張固定式安全汽座，第三排乘客依然能自由由走道進出。缺點是若全家只有 5 個人，必定有一人需孤獨坐在第三排。2+3+2 佈局則能讓 5 個人全員坐在前兩排聊天，第三排長期收折收平以獲得 800 公升以上的巨量行李箱容積，但進出第三排必須翻折第二排座椅，且若第二排裝滿汽座將無法順暢翻折。',
    keyPoints: [
      '2+2+3 適合：三代同堂（長輩+父母+幼童）、雙汽座家庭、商務貴賓接送',
      '2+3+2 適合：5口之家熱愛露營載物、平日第二排需坐滿 3 人照顧幼童',
    ],
    relatedCarSlugs: ['toyota-sienna', 'hyundai-custin', 'volkswagen-caddy-maxi'],
    lastUpdated: '2024-04-01',
  },

  // 汽座與兒童安全
  {
    id: 'faq-dual-isofix-third-row-access',
    category: 'isofix-and-child-safety',
    categoryName: '汽座與安全防護',
    question: '第二排安裝兩張 ISOFIX 兒童安全座椅後，第三排乘客還能進出嗎？',
    shortAnswer: '在 2+2+3 車型上完全不受影響，乘客可直接走中央通道進出第三排；但在 2+3+2 車型上，兩張汽座會鎖死第二排椅背前傾機構，導致第三排無法正常進出，必須每次拆裝汽座或由後尾門爬入。',
    detailedAnswer: '這是新手七人座買家最常遭遇的痛點！多數 ISOFIX 兒童安全座椅（特別是具備底座支撐腳的 0-4 歲旋轉型汽座）安裝在第二排後，第二排座椅將被牢牢固定，無法往前滑動或傾倒椅背。如果購買的是 2+3+2 傳統連體座椅車款，第三排乘客將被徹底「封死」在車後。唯有具備「中央走道」的 2+2+3 車型（如 Custin, Sienna, Carnival, ID. Buzz），或者具備多組 ISOFIX 且第三排自帶 ISOFIX 的車款（如 Caddy Maxi 可裝在第二排右 + 第三排右），才能根本解決雙汽座動線死角。',
    keyPoints: [
      '雙寶家庭強烈建議優先挑選 2+2+3 中央走道車型',
      'Volkswagen Caddy Maxi 全車高達 5 組 ISOFIX，可將汽座分散安裝於不同排',
      '選購前務必帶著實際安全座椅前往展間進行模擬進出動線實測',
    ],
    relatedCarSlugs: ['hyundai-custin', 'volkswagen-caddy-maxi', 'kia-carnival'],
    lastUpdated: '2024-04-02',
  },
  {
    id: 'faq-how-many-isofix-points',
    category: 'isofix-and-child-safety',
    categoryName: '汽座與安全防護',
    question: '哪一台七人座車款擁有最多組 ISOFIX 兒童安全座椅卡扣？',
    shortAnswer: 'Volkswagen Caddy Maxi 擁有同級最多的 5 組 ISOFIX（副駕駛座 1 組、第二排左中右 3 組、第三排 2 組），是台灣市售車中唯一第二排可同時並排安裝三張 ISOFIX 兒童汽座的家庭神車。',
    detailedAnswer: '多數主流七人座 MPV（如 Sienna、Carnival、Multivan、Lexus LM）標配 4 組 ISOFIX（第二排 2 組 + 第三排 2 組）；Hyundai Custin 則配備 3 組 ISOFIX（第二排 2 組 + 第三排右側 1 組）；而大部分 5+2 SUV 則僅在第二排配備 2 組 ISOFIX。若家中有三個學齡前幼童需同時乘載，VW Caddy Maxi 是極罕見能完全以 ISOFIX 規格固定三張以上汽座的解答。',
    keyPoints: [
      'VW Caddy Maxi：5 組 ISOFIX（同級之最，第二排可並排三張）',
      'Toyota Sienna / Kia Carnival / VW Multivan：4 組 ISOFIX',
      'Hyundai Custin：3 組 ISOFIX',
      '多數 5+2 SUV：僅 2 組 ISOFIX（位於第二排兩側）',
    ],
    relatedCarSlugs: ['volkswagen-caddy-maxi', 'toyota-sienna', 'kia-carnival'],
    lastUpdated: '2024-04-02',
  },

  // 停車與車身尺碼
  {
    id: 'faq-parking-height-1-8m-limit',
    category: 'parking-and-dimensions',
    categoryName: '停車與車身長寬高',
    question: '車高 1.8m 或 1.9m 的地下停車場，哪些七人座車款能停？哪些會卡住？',
    shortAnswer: 'Sienna（1.77m）、Carnival（1.78m）、Custin（1.73m）、Sorento（1.70m）皆可順暢進出 1.8m 停車場；但 VW Caddy Maxi（1.83m）、VW Multivan（1.90m）、Lexus LM（1.95m）嚴禁進入限高 1.8m/1.85m 停車場，容易撞擊排風管或消防灑水頭。',
    detailedAnswer: '台灣許多老舊大樓、百貨公司或公有地下停車場限高標示為 1.80m 或 1.85m。購車時切勿只看車身規格表，還必須算入車頂天線或行李架厚度。VW Multivan 車高達 1907mm，Lexus LM 車高更達 1955mm，在台北市區尋找停車位需特別鎖定限高 2.0m 以上或室外平面停車場。另外，Sienna 與 Carnival 車寬逼近 2 米（1995mm），進出標準 2.2m 機械車位時兩側輪胎極易刮擦邊框。',
    keyPoints: [
      '安全進出 1.8m 限高：Sorento (1.70m)、Custin (1.73m)、Sienna (1.77m)、Carnival (1.78m)',
      '需注意 1.9m 限高門檻：Caddy Maxi (1.83m)',
      '嚴禁進入 1.9m 以下停車場：Multivan (1.90m)、Lexus LM (1.95m)',
    ],
    relatedCarSlugs: ['toyota-sienna', 'hyundai-custin', 'volkswagen-multivan', 'lexus-lm'],
    lastUpdated: '2024-04-03',
  },

  // 預算與養車稅金
  {
    id: 'faq-annual-car-tax-comparison',
    category: 'budget-and-tax',
    categoryName: '購車預算與養車稅金',
    question: '在台灣養一台七人座，每年牌照稅加燃料費要繳多少錢？哪種排氣量最省？',
    shortAnswer: '1.5T 汽油（如 Custin）每年僅 11,920 元最省；2.0 TDI/2.2 柴油（如 Caddy Maxi、Carnival）每年僅 14,938 元；2.5L 油電（如 Sienna、LM 350h）因跨入 2401-3000cc 級距，每年需繳 22,410 元。',
    detailedAnswer: '台灣小客車稅制依照排氣量級距與燃料種類計徵。Hyundai Custin 採用 1497cc 渦輪引擎，落在 1201-1800cc 級距，每年牌照稅 7,120 + 燃料費 4,800 = 11,920 元；Kia Carnival 雖排氣量達 2151cc，但因柴油小客車燃料費享有優惠費率，牌照稅 11,230 + 燃料費 3,708 = 每年僅需 14,938 元；Toyota Sienna 2.5 Hybrid 因排氣量 2487cc 跨入 2.4L~3.0L 級距，每年需繳 22,410 元，養車前務必考量每年固定稅賦差異。',
    keyPoints: [
      '最低稅金：Hyundai Custin 1.5T (每年 11,920 元)',
      '柴油大扭力超值稅金：Kia Carnival 2.2D (每年 14,938 元)',
      '大排量稅金：Toyota Sienna 2.5 Hybrid (每年 22,410 元)',
    ],
    relatedCarSlugs: ['hyundai-custin', 'kia-carnival', 'toyota-sienna'],
    lastUpdated: '2024-04-03',
  },
  {
    id: 'faq-best-budget-7seater-under-150w',
    category: 'budget-and-tax',
    categoryName: '購車預算與養車稅金',
    question: '預算 150 萬新台幣以內，台灣有哪些推薦的正七人座側滑門 MPV？',
    shortAnswer: '150 萬以內唯一具備「雙側電動滑門」與「正七人座獨立豪華座椅」的車款是 Hyundai Custin（132.9~149.9萬，2024 MPV 銷售冠軍）；若重視極致露營裝載空間與 5 組 ISOFIX，Volkswagen Caddy Maxi（145.8~153.8萬）則是兼具超低油耗的絕佳歐系首選。',
    detailedAnswer: '在過去幾款日系熱門中型滑門休旅（如 Toyota Sienta、Previa、Odyssey）相繼停產退役後，台灣 150 萬以內的「正七人座側滑門」新車選擇一度稀缺。目前 150 萬級距的絕對霸主是國產組裝的 Hyundai Custin，頂規即標配雙側電動滑門、第二排皇家通風加熱座椅與完整 Level 2 駕駛輔助。歐系代表則是 VW Caddy Maxi，雖側滑門為手動開啟，但擁有挑高車室與完全可拆除的第三排座椅，柴油平均油耗超過 20km/L。此外國產純電 Luxgen n7 亦以 134.9 萬起提供七人座節能新選擇。',
    keyPoints: [
      'Hyundai Custin (132.9~149.9萬)：2024 MPV 銷冠、雙側電動滑門、皇家獨立腿靠座椅、1.5T低稅金',
      'VW Caddy Maxi Life (145.8~153.8萬)：歐系底盤剛性、5組ISOFIX、20.2km/L極致柴油省油',
      'Luxgen n7 七人座 (134.9~149.9萬)：台灣唯一國產純電 7 人座，享受綠能補助',
    ],
    relatedCarSlugs: ['hyundai-custin', 'volkswagen-caddy-maxi'],
    lastUpdated: '2025-04-18',
  },
  {
    id: 'faq-sienta-discontinuation-alternatives',
    category: 'budget-and-tax',
    categoryName: '購車預算與養車稅金',
    question: 'Toyota Sienta 停產後，台灣目前百萬內 7 人座 MPV 有何替代選擇？',
    shortAnswer: 'Sienta 停售後，台灣百萬以內的「全新 7 人座 MPV」正式歸零！目前市場買家主要有三條路徑：轉向二手 Sienta/Prius α、將預算提高至 130~140 萬直上國產代表 Hyundai Custin 或純電 Luxgen n7，或期待未來導入的歐洲商旅 MPV 如 Opel Combo。',
    detailedAnswer: '根據汽車專業媒體【國王車訊 King Autos】的市場深入分析，Sienta 以 70~80 萬元級距與小巧雙側滑門長期稱霸台灣入門七人座市場。隨著 Sienta 停產，百萬內全新 MPV 正式出現巨大市場空窗。預算型家庭若堅持全新車且需要滑門與二排獨立座，目前最接近的升級首選為 132.9 萬起的 Hyundai Custin；若著眼於市區節能且家中可充電，134.9 萬的國產純電 Luxgen n7 亦是高人氣候選。未來 Stellantis 集團的 Opel Combo 若順利引進，亦有望成為新的百萬級歐系平價 MPV 救星。',
    keyPoints: [
      '台灣新車市場目前 100 萬以內「全新 7 人座 MPV」已正式絕版',
      '最熱門銜接首選：Hyundai Custin (132.9萬起，具備電動滑門與二排VIP座)',
      '純電高性價比方案：Luxgen n7 (134.9萬起，省稅金與日常電費)',
      '未來新車期待：Opel Combo 評估導入中、Toyota 次世代 Previa/Sienna 規劃',
    ],
    relatedCarSlugs: ['hyundai-custin', 'volkswagen-caddy-maxi'],
    lastUpdated: '2025-04-18',
  },
];
