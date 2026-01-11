import { useEffect, useState, useRef } from 'react';
import { FiSun, FiMoon, FiDownload } from 'react-icons/fi';
import { useDarkMode } from '@/utils';


import styles from './HeroSection.module.css';
import type { HeroData } from '../../types';
import { aboutData, archivingData, PORTFOLIO_SECTIONS } from '../../constants';

interface HeroSectionProps {
  data: HeroData;
}

export const HeroSection = ({ data }: HeroSectionProps) => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // archivingData에서 GitHub, Blog 링크 찾기
  const githubLink = archivingData.find((item) => item.type === 'github');
  const blogLink = archivingData.find((item) => item.type === 'blog');

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const sectionHeight = sectionRef.current.offsetHeight;
      const progress = Math.min(window.scrollY / (sectionHeight * 0.8), 1);
      setScrollProgress(progress);
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

  const handleDownloadPortfolio = () => {
    const link = document.createElement('a');
    link.href = '/portfolio.pdf';
    link.download = `${aboutData.name}_포트폴리오.pdf`;
    link.click();
  };

  const windowStyle = {
    '--scale': 1 + scrollProgress * 0.15,
    '--border-radius': `${12 - scrollProgress * 12}px`,
    opacity: 1 - scrollProgress * 1.5,
    pointerEvents: scrollProgress > 0.6 ? 'none' : 'auto',
  } as React.CSSProperties;

  return (
    <section ref={sectionRef} className={styles.heroSection}>
      <div className={styles.heroBackground} />

      <div className={styles.macWindow} style={windowStyle}>
        {/* 타이틀바 */}
        <div className={styles.titlebar}>
          <div className={styles.trafficLights}>
            <span className={`${styles.trafficLight} ${styles.red}`} />
            <span className={`${styles.trafficLight} ${styles.yellow}`} />
            <span className={`${styles.trafficLight} ${styles.green}`} />
          </div>

          <nav className={styles.tabNav}>
            {PORTFOLIO_SECTIONS.map(({ id, label }) => (
              <button
                key={id}
                className={styles.tab}
                onClick={() => scrollToSection(id)}
              >
                {label}
              </button>
            ))}
          </nav>

          <div className={styles.actions}>
            <button
              className={styles.actionButton}
              onClick={toggleDarkMode}
              title={darkMode ? '라이트 모드' : '다크 모드'}
            >
              {darkMode ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>
          </div>
        </div>

        {/* Hero 콘텐츠 */}
        <div className={styles.windowContent}>
          <div
            className={styles.heroContent}
            style={{ opacity: 1 - scrollProgress * 2 }}
          >
            {/* 메인 영역: 좌측 텍스트 + 우측 정보카드 */}
            <div className={styles.mainArea}>
              {/* 좌측: 텍스트 + 다운로드 버튼 */}
              <div className={styles.textArea}>
                <p className={styles.greeting}>👋 {data.headline.line1}</p>

                <h1 className={styles.headline}>
                  {data.headline.line2 && (
                    <>
                      {data.headline.line2}
                      <br />
                    </>
                  )}
                  <span className={styles.accent}>{data.headline.accent}</span>
                  {data.headline.line3}
                </h1>

                <p className={styles.description}>{data.description}</p>

                <button
                  className={styles.downloadButton}
                  onClick={handleDownloadPortfolio}
                >
                  <FiDownload size={18} />
                  <span>포트폴리오 다운로드</span>
                </button>
              </div>

              {/* 우측: 정보 카드 (heroData.infoCard 사용) */}
              <div className={styles.infoCard}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>ROLE</span>
                  <span className={styles.infoValue}>{data.infoCard.role}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>LOCATION</span>
                  <span className={styles.infoValue}>{data.infoCard.location}</span>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>TECH STACK</span>
                  <div className={styles.techTags}>
                    {data.infoCard.techStack.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>LINKS</span>
                  <div className={styles.links}>
                    {githubLink && (
                      <a
                        href={githubLink.url}
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {githubLink.title}
                      </a>
                    )}
                    {githubLink && blogLink && (
                      <span className={styles.linkDivider}>·</span>
                    )}
                    {blogLink && (
                      <a
                        href={blogLink.url}
                        className={styles.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {blogLink.title}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 하단 중앙: 스크롤 인디케이터 */}
            <div className={styles.scrollIndicator}>
              <span>↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
