export type FaqCategory = 'space-and-seating' | 'isofix-and-child-safety' | 'parking-and-dimensions' | 'budget-and-tax';

export interface FAQItem {
  id: string;
  category: FaqCategory;
  categoryName: string;
  question: string;
  // 短答 (50字以內高資訊密度，專為 Google AI Overviews 與精選摘要 Snippet 設計)
  shortAnswer: string;
  // 完整詳答 (包含數據、車款對比與選購要點)
  detailedAnswer: string;
  keyPoints: string[];
  relatedCarSlugs?: string[];
  lastUpdated: string;
}
