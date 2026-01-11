// ========================================
// Hero 섹션 관련 타입 정의
// ========================================

export interface HeroData {
  headline: {
    line1: string;
    line2: string;
    accent: string;
    line3: string;
  };
  subtitle: SubtitleItem[];
  description: string;
  infoCard: InfoCardData;
}

export interface SubtitleItem {
  text: string;
  highlight: boolean;
}

export interface InfoCardData {
  role: string;
  location: string;
  techStack: string[];
}