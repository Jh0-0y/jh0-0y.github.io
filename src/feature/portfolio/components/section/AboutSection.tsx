import { FiCalendar, FiMapPin, FiMail } from 'react-icons/fi';

import styles from './AboutSection.module.css';
import type { AboutData } from '../../types';

interface AboutSectionProps {
  data: AboutData;
}

export const AboutSection = ({ data }: AboutSectionProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.sectionTitle}>About Me</h2>

      <div className={styles.content}>
        {data.profileImage && (
          <div className={styles.imageWrapper}>
            <img
              src={data.profileImage}
              alt={`${data.name} 프로필`}
              className={styles.profileImage}
            />
          </div>
        )}

        <div className={styles.info}>
          <div className={styles.header}>
            <h3 className={styles.name}>{data.name}</h3>
            <p className={styles.title}>{data.title}</p>
          </div>

          {/* 기본 정보 */}
          <div className={styles.details}>
            {data.birthDate && (
              <div className={styles.detailItem}>
                <FiCalendar className={styles.detailIcon} />
                <span>{data.birthDate}</span>
              </div>
            )}
            {data.location && (
              <div className={styles.detailItem}>
                <FiMapPin className={styles.detailIcon} />
                <span>{data.location}</span>
              </div>
            )}
            {data.email && (
              <div className={styles.detailItem}>
                <FiMail className={styles.detailIcon} />
                <a href={`mailto:${data.email}`} className={styles.emailLink}>
                  {data.email}
                </a>
              </div>
            )}
          </div>

          <div className={styles.summary}>
            {data.summary.split('\n').map((line, index) => (
              <p key={index}>{line || <br />}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};