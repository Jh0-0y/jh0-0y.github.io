export type { HeroData, SubtitleItem } from './hero.types';
export type { AboutData } from './about.types';
export type { SkillGroup } from './skill.types';
export type { ArchivingItem, ArchivingType } from './archiving.types';
export type { ProjectData, ChallengeItem, ProjectLinks } from './project.types';
export type { AchievementData, AchievementCategory } from './achievement.types';

// 전체 포트폴리오 데이터 타입
import type { HeroData } from './hero.types';
import type { AboutData } from './about.types';
import type { SkillGroup } from './skill.types';
import type { ArchivingItem } from './archiving.types';
import type { ProjectData } from './project.types';
import type { AchievementData } from './achievement.types';

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  skills: SkillGroup[];
  archiving: ArchivingItem[];
  projects: ProjectData[];
  achievements: AchievementData[];
}
