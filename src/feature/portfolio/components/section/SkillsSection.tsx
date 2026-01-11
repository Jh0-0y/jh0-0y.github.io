import { FiCode, FiLayout, FiServer, FiDatabase, FiCloud, FiTool } from 'react-icons/fi';

import styles from './SkillsSection.module.css';
import type { SkillGroup } from '../../types';
import { SkillBadge } from '@/components/skillbadge';

interface SkillsSectionProps {
  data: SkillGroup[];
}

// 카테고리별 아이콘 매핑
const categoryIcons: Record<string, React.ReactNode> = {
  language: <FiCode size={16} />,
  frontend: <FiLayout size={16} />,
  backend: <FiServer size={16} />,
  database: <FiDatabase size={16} />,
  devops: <FiCloud size={16} />,
  tools: <FiTool size={16} />,
};

export const SkillsSection = ({ data }: SkillsSectionProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Skills</h2>

      <div className={styles.skillCard}>
        {data.map((group) => (
          <div key={group.category} className={styles.skillRow}>
            <div className={styles.categoryLabel}>
              <span className={styles.categoryIcon}>
                {categoryIcons[group.category] || <FiCode size={16} />}
              </span>
              <span className={styles.categoryText}>{group.label}</span>
            </div>
            <div className={styles.skillItems}>
              {group.items.map((badgeName) => (
                <SkillBadge key={badgeName} name={badgeName} size="lg" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};