// ========================================
// 🎯 Hero 섹션 데이터
// ========================================

import type { HeroData } from '../../types';

export const heroData: HeroData = {
  headline: {
    line1: '안녕하세요',
    line2: '고민많은 개발자',
    accent: '정현영',
    line3: '입니다.',
  },
  subtitle: [
    { text: 'Backend / FullStack Developer', highlight: true },
    { text: 'Seoul, Korea', highlight: false },
  ],
  description: `개발을 시작하기 전에,
이 문제가 왜 생겼는지, 어떤 흐름으로 풀 수 있을지를 먼저 생각합니다.
완벽하진 않지만, 생각한 이유가 있는 코드를 만들려고 노력합니다.`,

  // 우측 정보카드 데이터
  infoCard: {
    role: 'Backend / FullStack Developer',
    location: 'Seoul, Korea',
    techStack: ['Spring Boot', 'React', 'Redis', 'WebSocket'],
  },
};