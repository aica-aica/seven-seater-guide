import { Car } from '@/types/car';

interface JsonLdCarProps {
  car: Car;
  canonicalUrl: string;
}

export default function JsonLdCar({ car, canonicalUrl }: JsonLdCarProps) {
  const fullImageUrl = car.heroImage.startsWith('http')
    ? car.heroImage
    : `https://aica-aica.github.io/seven-seater-guide${car.heroImage.startsWith('/') ? car.heroImage : `/${car.heroImage}`}`;

  const graphEntities: any[] = [
    {
      '@type': ['Car', 'Product'],
      '@id': `${canonicalUrl}#car`,
      name: `${car.brand} ${car.model} (${car.year}) 七人座`,
      model: car.model,
      brand: {
        '@type': 'Brand',
        name: car.brand,
      },
      image: fullImageUrl,
      description: `${car.tagline}。七人滿載行李箱容積 ${car.luggage.litres7SeatMode}L，${car.seating.layout} 座椅配置，${car.safety.isofixPoints} 組 ISOFIX。`,
      vehicleConfiguration: `${car.categoryName} (${car.seating.layoutDescription})`,
      bodyType: car.category === '5-plus-2-suv' ? 'SUV' : 'MPV',
      seatingCapacity: 7,
      numberOfDoors: 5,
      vehicleTransmission: car.powertrain.transmission,
      fuelType: car.powertrain.engineType,
      cargoVolume: {
        '@type': 'QuantitativeValue',
        value: car.luggage.litres7SeatMode,
        unitCode: 'LTR',
        description: '七人滿載行李箱容積 (Liters in 7-seat mode)',
      },
      depth: {
        '@type': 'QuantitativeValue',
        value: car.dimensions.lengthMm,
        unitCode: 'MMT',
      },
      width: {
        '@type': 'QuantitativeValue',
        value: car.dimensions.widthMm,
        unitCode: 'MMT',
      },
      height: {
        '@type': 'QuantitativeValue',
        value: car.dimensions.heightMm,
        unitCode: 'MMT',
      },
      wheelbase: {
        '@type': 'QuantitativeValue',
        value: car.dimensions.wheelbaseMm,
        unitCode: 'MMT',
      },
      fuelEfficiency: {
        '@type': 'QuantitativeValue',
        value: car.powertrain.fuelConsumptionKmL,
        unitText: 'km/L',
      },
      weight: {
        '@type': 'QuantitativeValue',
        value: car.powertrain.displacementCc,
        unitText: 'cc',
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'TWD',
        lowPrice: car.priceRangeTwd[0],
        highPrice: car.priceRangeTwd[1],
        offerCount: car.trims.length,
        availability: 'https://schema.org/InStock',
      },
      additionalProperty: [
        {
          '@type': 'PropertyValue',
          name: '7人座佈局型態',
          value: car.seating.layoutDescription,
        },
        {
          '@type': 'PropertyValue',
          name: '滑軌走道型式',
          value: car.seating.railType,
        },
        {
          '@type': 'PropertyValue',
          name: '第二排中央走道寬度',
          value: `${car.seating.secondRowWalkThroughWidthMm} mm`,
        },
        {
          '@type': 'PropertyValue',
          name: '第三排腿部空間評測',
          value: `膝部餘裕 ${car.seating.thirdRowKneeClearanceCm} 公分 (評分 ${car.seating.thirdRowComfortRating}/10 分)`,
        },
        {
          '@type': 'PropertyValue',
          name: '第三排成人適應性',
          value:
            car.seating.thirdRowUsability === 'adult-long-haul'
              ? '成人長途舒適 (大腿完整支撐)'
              : car.seating.thirdRowUsability === 'adult-short-haul'
              ? '成人中短途 (頭部稍緊湊)'
              : '兒童／短途應急 (板凳感偏重)',
        },
        {
          '@type': 'PropertyValue',
          name: '滿載7人行李廂容量',
          value: `${car.luggage.litres7SeatMode} 公升 (${car.luggage.realWorldCapacityDescription})`,
        },
        {
          '@type': 'PropertyValue',
          name: '第三排傾倒行李廂容量',
          value: `${car.luggage.litres3rdRowFolded} 公升`,
        },
        {
          '@type': 'PropertyValue',
          name: '全車最大行李裝載容量',
          value: `${car.luggage.maxLitres} 公升`,
        },
        {
          '@type': 'PropertyValue',
          name: '車門機構型式',
          value: car.doorTypeDescription,
        },
        {
          '@type': 'PropertyValue',
          name: '長輩登車階梯離地高',
          value: `${car.dimensions.stepInHeightMm} mm`,
        },
        {
          '@type': 'PropertyValue',
          name: 'ISOFIX 兒童安全座椅安裝數量',
          value: `${car.safety.isofixPoints} 組 (${car.safety.isofixLocations.join('、')})`,
        },
        {
          '@type': 'PropertyValue',
          name: '台灣年度稅金合計',
          value: `${car.powertrain.annualTaiwanTaxTwd.toLocaleString()} 元/年`,
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonicalUrl}#breadcrumbs`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: '首頁',
          item: 'https://7seater-guide.tw/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: '七人座車款庫',
          item: 'https://7seater-guide.tw/cars',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: `${car.brand} ${car.model}`,
          item: canonicalUrl,
        },
      ],
    },
  ];

  // If car has specific FAQs, also inject schema.org/FAQPage
  if (car.faqs && car.faqs.length > 0) {
    graphEntities.push({
      '@type': 'FAQPage',
      '@id': `${canonicalUrl}#faq`,
      mainEntity: car.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.answer,
        },
      })),
    });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graphEntities,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
