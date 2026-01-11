import { getBadgeConfig, type BadgeConfig } from './badgeData';
import styles from './SkillBadge.module.css';

interface SkillBadgeProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

// 아이콘 URL 가져오기 (우선순위: Simple Icons → Devicon → 로컬)
const getIconUrl = (config: BadgeConfig): string | null => {
  // 1. Simple Icons CDN (기본)
  if (config.iconSlug) {
    const color = (config.textColor || '#ffffff').replace('#', '');
    return `https://cdn.simpleicons.org/${config.iconSlug}/${color}`;
  }

  // 2. Devicon CDN
  if (config.deviconSlug) {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${config.deviconSlug}/${config.deviconSlug}-original.svg`;
  }

  return null;
};

// 아이콘 사이즈 매핑
const iconSizeMap = {
  sm: 12,
  md: 14,
  lg: 16,
};

export const SkillBadge = ({ name, size = 'md' }: SkillBadgeProps) => {
  const config = getBadgeConfig(name);

  // 정의되지 않은 뱃지는 기본 스타일로 표시
  if (!config) {
    return (
      <span className={`${styles.badge} ${styles[size]} ${styles.unknown}`}>
        {name}
      </span>
    );
  }

  const iconUrl = getIconUrl(config);
  const iconSize = iconSizeMap[size];

  const style = {
    '--badge-bg': config.color,
    '--badge-text': config.textColor || '#ffffff',
  } as React.CSSProperties;

  return (
    <span className={`${styles.badge} ${styles[size]}`} style={style}>
      {iconUrl && (
        <img
          src={iconUrl}
          alt=""
          width={iconSize}
          height={iconSize}
          className={styles.icon}
          loading="lazy"
        />
      )}
      {config.label}
    </span>
  );
};
