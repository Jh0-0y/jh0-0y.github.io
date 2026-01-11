import type { SKILL_BADGES } from '..';
import type { BadgeConfig } from './badgeData';
export { SkillBadge } from './SkillBadge';
export type SkillBadgeName = keyof typeof SKILL_BADGES;
export type { BadgeConfig };
