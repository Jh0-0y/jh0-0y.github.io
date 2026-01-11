// ========================================
// 포트폴리오 상수 메인 Export
// ========================================

// Data
export {
  heroData,
  aboutData,
  skillsData,
  archivingData,
  projectsData,
  achievementsData,
} from './data';

// Helpers
export {
  getProjectById,
  getAchievementsByProjectId,
  getAchievementsByCategory,
  PORTFOLIO_SECTIONS,
} from './helpers';

export type { PortfolioSectionId } from './helpers';

// 통합 데이터 객체 (편의용)
import {
  heroData,
  aboutData,
  skillsData,
  archivingData,
  projectsData,
  achievementsData,
} from './data';
import type { PortfolioData } from '../types';

export const portfolioData: PortfolioData = {
  hero: heroData,
  about: aboutData,
  skills: skillsData,
  archiving: archivingData,
  projects: projectsData,
  achievements: achievementsData,
};
