import type { ReactNode } from 'react';
import styles from './Section.module.css';

interface SectionProps {
  id: string;
  children: ReactNode;
  className?: string;
  fullHeight?: boolean;
}

export const Section = ({ id, children, className = '', fullHeight = true }: SectionProps) => {
  return (
    <section
      id={id}
      className={`${styles.section} ${fullHeight ? styles.fullHeight : ''} ${className}`}
    >
      <div className={styles.content}>{children}</div>
    </section>
  );
};

