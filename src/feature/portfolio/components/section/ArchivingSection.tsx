import { FiGithub, FiExternalLink, FiLinkedin, FiFileText, FiMail } from 'react-icons/fi';

import styles from './ArchivingSection.module.css';
import type { ArchivingItem, ArchivingType } from '../../types';

interface ArchivingSectionProps {
  data: ArchivingItem[];
}

const iconMap: Record<ArchivingType, React.ReactNode> = {
  github: <FiGithub size={32} />,
  blog: <FiExternalLink size={32} />,
  linkedin: <FiLinkedin size={32} />,
  notion: <FiFileText size={32} />,
  email: <FiMail size={32} />,
};

export const ArchivingSection = ({ data }: ArchivingSectionProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>Archiving</h2>

      <div className={styles.cards}>
        {data.map((item) => (
          <a
            key={item.type}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.card}
          >
            <div className={styles.cardIcon}>{iconMap[item.type]}</div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardUrl}>{item.url}</p>
              <p className={styles.cardDescription}>{item.description}</p>
              {item.highlights && item.highlights.length > 0 && (
                <ul className={styles.highlights}>
                  {item.highlights.map((highlight, index) => (
                    <li key={index}>{highlight}</li>
                  ))}
                </ul>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
