import { useState, useEffect } from 'react';
import { RiListUnordered, RiCloseLine } from 'react-icons/ri';
import styles from './TableOfContents.module.css';

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TocItem[];
}

/**
 * 목차 컴포넌트
 * - props로 받은 목차 아이템을 UI로 렌더링
 * - 스크롤 추적 및 하이라이트
 * - 클릭 시 해당 섹션으로 스크롤
 */
export const TableOfContents = ({ items }: TableOfContentsProps) => {
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  // 스크롤 추적
  useEffect(() => {
    if (items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0.1,
      }
    );

    // 모든 heading 요소 관찰
    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  // 목차 클릭 핸들러
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      setIsOpen(false);
    }
  };

  // 토글 핸들러
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // 닫기 핸들러
  const handleClose = () => {
    setIsOpen(false);
  };

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // 목차가 없으면 렌더링하지 않음
  if (items.length === 0) {
    return null;
  }

  return (
    <>
      {/* 토글 버튼 */}
      <button
        type="button"
        className={styles.toggleButton}
        onClick={handleToggle}
        aria-label="목차 열기/닫기"
        aria-expanded={isOpen}
      >
        <RiListUnordered />
      </button>

      {/* 오버레이 */}
      {isOpen && (
        <div
          className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
          onClick={handleClose}
          role="button"
          tabIndex={0}
          aria-label="목차 닫기"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClose();
            }
          }}
        />
      )}

      {/* 목차 컨테이너 */}
      <aside className={`${styles.toc} ${isOpen ? styles.open : ''}`}>
        <div className={styles.tocHeader}>
          <h2 className={styles.tocTitle}>목차</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="목차 닫기"
          >
            <RiCloseLine />
          </button>
        </div>

        <nav className={styles.tocNav}>
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleClick(item.id)}
              className={`${styles.tocItem} ${styles[`level${item.level}`]} ${
                activeId === item.id ? styles.active : ''
              }`}
              aria-current={activeId === item.id ? 'location' : undefined}
            >
              {item.title}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};