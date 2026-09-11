const fs = require('fs');
let content = fs.readFileSync('src/data/cars.ts', 'utf8');

const carImageMap = {
  'volkswagen-multivan': '/images/cars/volkswagen-multivan.jpg',
  'volkswagen-caddy-maxi': '/images/cars/volkswagen-caddy-maxi.jpg',
  'toyota-sienna': '/images/cars/toyota-sienna.jpg',
  'kia-carnival': '/images/cars/kia-carnival.jpg',
  'hyundai-custin': '/images/cars/hyundai-custin.jpg',
  'honda-odyssey': '/images/cars/honda-odyssey.jpg',
  'skoda-kodiaq': '/images/cars/skoda-kodiaq.jpg',
  'lexus-lm': '/images/cars/lexus-lm.jpg',
  'kia-sorento': '/images/cars/kia-sorento.jpg',
  'hyundai-santa-fe': '/images/cars/hyundai-santa-fe.jpg',
  'volkswagen-tiguan-allspace': '/images/cars/volkswagen-tiguan-allspace.jpg',
  'mazda-cx-90': '/images/cars/mazda-cx-90.jpg',
};

for (const [slug, img] of Object.entries(carImageMap)) {
  const regex = new RegExp(`(slug:\\s*'${slug}'[\\s\\S]*?heroImage:\\s*)'[^']+'`, 'm');
  if (regex.test(content)) {
    content = content.replace(regex, `$1'${img}'`);
    console.log('Replaced heroImage for', slug);
  } else {
    console.error('Could not find heroImage for', slug);
  }
}

const idBuzzEntry = `  {
    id: 'volkswagen-id-buzz',
    slug: 'volkswagen-id-buzz',
    brand: 'Volkswagen Commercial',
    model: 'ID. Buzz (Pro S 長軸七人座)',
    year: 2024,
    seatingCapacity: 7,
    category: 'luxury-mpv',
    categoryName: '德系純電七人座旗艦 MPV',
    coreCategory: 'true-7-mpv',
    coreCategoryLabel: '正7人座',
    priceRangeTwd: [2398000, 2486000],
    heroImage: '/images/cars/volkswagen-id-buzz.jpg',
    tagline: 'MEB 純電專屬平台長軸旗艦，經典 T1 復古神采遇上 91kWh 超大電池純電七人豪邸',
    doorType: 'dual-power-sliding',
    doorTypeDescription: '雙側 Easy Open/Close 腳踢感應電動側滑門與電動尾門',
    dimensions: {
      lengthMm: 4962,
      widthMm: 1972,
      heightMm: 1927,
      wheelbaseMm: 3239,
      groundClearanceMm: 158,
      stepInHeightMm: 410,
      turnRadiusM: 5.7,
    },
    seating: {
      layout: '2+3+2',
      layoutDescription: '長軸三排 7 人座設定，第二排 6/4 分離前後滑移 200mm，第三排雙獨立座椅可全平整傾倒或快速拆除',
      railType: '第二排長行程平整化滑軌 + 第三排 Easy Fold 平整折疊/快拆機構',
      secondRowType: 'bench',
      secondRowWalkThroughWidthMm: 0,
      secondRowSlideTravelMm: 200,
      thirdRowLegroomMm: 940,
      thirdRowHeadroomMm: 970,
      thirdRowKneeClearanceCm: 20,
      thirdRowComfortRating: 9.3,
      thirdRowUsability: 'adult-long-haul',
      thirdRowFoldingType: 'split-fold-flat',
    },
    luggage: {
      litres7SeatMode: 306,
      litres3rdRowFolded: 1340,
      maxLitres: 2469,
      realWorldCapacityDescription: '7人標準狀態具備 306L 行李空間（放得下2具20吋登機箱或折疊推車）；第三排傾倒後高達 1,340 公升；二三排全平整傾倒直衝 2,469 公升，平整長度達 2.2 公尺可直接車宿露營。',
      underfloorStorageLitres: 60,
    },
    safety: {
      isofixPoints: 5,
      isofixLocations: ['第二排左側座', '第二排中間座', '第二排右側座', '第三排左側座', '第三排右側座'],
      topTetherPoints: 5,
      canFitThreeChildSeats: true,
      ncapRating: 'Euro NCAP 5 Stars (歐盟撞擊測試五星滿分認證)',
      adasFeatures: ['IQ.DRIVE 智能駕駛輔助系統', 'Travel Assist 智慧車陣穿梭系統', 'Front Assist 車前碰撞預警與主動緊急煞車', 'Side Assist 車側盲點警示', 'Area View 360度環景攝影', 'Park Assist Plus 記憶停車與遙控停車'],
    },
    powertrain: {
      engineType: 'ev',
      engineSummary: 'MEB 平台單馬達後輪驅動 (APP550 新世代永磁同步馬達) + 91kWh 淨容量高壓電池',
      displacementCc: 0,
      horsepowerPs: 286,
      torqueNm: 560,
      transmission: '單速自排純電直驅變速箱',
      drivetrain: 'RWD',
      fuelConsumptionKmL: 5.1,
      annualTaiwanTaxTwd: 0,
    },
    trims: [
      {
        name: 'Pro S 單色款',
        priceTwd: 2398000,
        keyEquipment: ['IQ.DRIVE Level 2 駕駛輔助', '雙側電動滑門', '91kWh可用電量 (續航454~480km)', '12.9吋多媒體觸控螢幕 (MIB4)', 'App-Connect 無線 Apple CarPlay', '雙前座電動按摩座椅'],
      },
      {
        name: 'Pro S 雙色經典款',
        priceTwd: 2486000,
        keyEquipment: ['經典雙色Two-tone外觀塗裝', '雙色內裝套件風格', 'IQ.LIGHT LED Matrix 矩陣式頭燈', '20吋鋁合金輪圈', '全景玻璃天窗 (智慧調光)'],
      },
    ],
    pros: [
      '經典 Volkswagen T1 傳奇廂型車致敬外觀，路上辨識度與吸睛回頭率 100%',
      '搭載全新 APP550 後驅永磁馬達，提供 286 匹強悍馬力與 560 Nm 瞬時扭力，滿載 7 人超車毫無遲滯',
      '軸距長達 3,239mm，受惠於 MEB 純電平整化平台，車內空間開闊、無中央凸起走道，全車標配多達 5 組 ISOFIX 兒童汽座錨點',
      '純電後驅架構帶來高達 5.7 公尺超小迴轉半徑，比一般中型房車更靈活好穿梭',
      '台灣純電免燃料費與牌照稅優惠，大幅降低家庭每年固定稅費負擔',
    ],
    cons: [
      '車身高度達 1927mm，為同級 MPV 較高者，台灣大多數 1.8m 或 1.85m 地下停車場絕對無法進入，必須鎖定 2.0m 以上平面或挑高停車位',
      '車身長度 4962mm 搭配近 2 米寬度 (1972mm)，狹窄機械車位與窄巷會車需要 Area View 360 環景輔助',
      '長途高速三代同堂旅遊需規劃 DC 快充補電節奏（支援最高 200kW 快充，10%~80% 約 26 分鐘）',
    ],
    idealPersona: '熱愛經典露營風格、追求純電寧靜行路質感與零碳排，需要常態 7 人滿載，且家中或住處具備 2.0m 平面車位與充電樁安裝條件的現代科技家庭。',
    heightWarning: '車高達 1927mm！超過 1.9 公尺，全台限高 1.8m 及 1.85m 之室內地下室與機械停車塔皆無法駛入，請務必停放於 2.0m 以上挑高或平面車位。',
    faqs: [
      {
        question: 'ID. Buzz Pro S 長軸版續航力足夠全家台北高雄一日遊嗎？充電速度如何？',
        answer: 'ID. Buzz Pro S 搭載 91kWh 淨容量大電池，WLTP 官方測試續航約 454~480 公里。實測台灣國道滿載 7 人開冷氣高速巡航約可達 350~390 公里。支援最高 200kW CCS2 DC 直流快充，自 10% 充至 80% 僅需約 26 分鐘，於國道服務區稍事休息上洗手間即可補足電力，長途家庭旅行完全無里程焦慮。',
      },
      {
        question: '全車竟然有多達 5 組 ISOFIX？是真的可以同時安裝多張安全座椅嗎？',
        answer: '是的！ID. Buzz Pro S 在第二排左中右三張座椅皆配備了獨立 ISOFIX 與 Top-Tether 頂部固定扣，第三排的兩張獨立座也同樣標配 ISOFIX，全車總計高達 5 組 ISOFIX。無論家中有雙胞胎、三寶甚至多代幼童，安全座椅安裝自由度在全台灣 7 人座市場中名列前茅！',
      },
      {
        question: '車高 1927mm 在台灣停車會不會很麻煩？',
        answer: '1927mm 的車高確實是選購前最需要注意的物理限制。台灣百貨公司或老舊住宅大樓地下室限高多在 1.8m~1.85m，ID. Buzz 絕對進不去；但在現代化商場（如南港 Citylink、好市多多數分店）、露天停車場或限高 2.0m/2.1m 的新式停車場則可順暢進出。購車前強烈建議測量住家與常用停車位的淨空高度。',
      },
    ],
  },
];`;

if (!content.includes('volkswagen-id-buzz')) {
  content = content.replace(/\s*\];\s*$/, '\n' + idBuzzEntry);
  console.log('Added ID. Buzz entry');
}

fs.writeFileSync('src/data/cars.ts', content, 'utf8');
console.log('Updated src/data/cars.ts successfully!');
