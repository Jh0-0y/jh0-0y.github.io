// ========================================
// Achievement 관련 타입 정의 (프로젝트 상세용)
// ========================================

export type AchievementCategory = 'performance' | 'collaboration' | 'growth';

export interface AchievementData {
  id: string;
  category: AchievementCategory;
  title: string;
  description: string;
  metrics?: string;
  projectRef?: string;
}
