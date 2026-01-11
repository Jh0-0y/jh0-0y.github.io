import { useState, useEffect } from 'react';
import { FiSun, FiMoon, FiDownload } from 'react-icons/fi';
import { useDarkMode } from '@/utils';

import styles from './StickyHeader.module.css';
import { aboutData, PORTFOLIO_SECTIONS } from '../../constants';

export const StickyHeader = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      // Hero 섹션 높이의 50% 이상 스크롤하면 표시
      const heroHeight = window.innerHeight;
      setIsVisible(window.scrollY > heroHeight * 0.5);

      // 현재 활성 섹션 감지
      const sections = PORTFOLIO_SECTIONS.map(({ id }) => ({
        id,
        element: document.getElementById(id),
      }));

      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 60;
      const top = element.offsetTop - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleDownloadResume = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = `${aboutData.name}_이력서.pdf`;
    link.click();
  };

  if (!isVisible) return null;

  return (
    <header className={styles.header}>
      <div className={styles.trafficLights}>
        <span className={`${styles.trafficLight} ${styles.red}`} />
        <span className={`${styles.trafficLight} ${styles.yellow}`} />
        <span className={`${styles.trafficLight} ${styles.green}`} />
      </div>

      <nav className={styles.tabNav}>
        {PORTFOLIO_SECTIONS.map(({ id, label }) => (
          <button
            key={id}
            className={`${styles.tab} ${activeSection === id ? styles.active : ''}`}
            onClick={() => scrollToSection(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className={styles.actions}>
        <button
          className={styles.actionButton}
          onClick={handleDownloadResume}
          title="이력서 다운로드"
        >
          <FiDownload size={16} />
        </button>
        <button
          className={styles.actionButton}
          onClick={toggleDarkMode}
          title={darkMode ? '라이트 모드' : '다크 모드'}
        >
          {darkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
        </button>
      </div>
    </header>
  );
};
