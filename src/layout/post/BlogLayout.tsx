import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { BlogFooter, BlogHeader, BlogSidebar } from './_components';
import styles from './BlogLayout.module.css';

export const BlogLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // 화면 크기 감지
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 1023px)');
    
    // 초기값 설정
    setIsMobile(mediaQuery.matches);

    // 화면 크기 변경 감지
    const handleResize = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
      
      // 데스크탑으로 전환될 때 사이드바 상태 초기화
      if (!e.matches) {
        setIsSidebarOpen(false);
      }
    };

    mediaQuery.addEventListener('change', handleResize);
    return () => mediaQuery.removeEventListener('change', handleResize);
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  // 모바일에서만 사이드바 닫기
  const handleCloseSidebarOnMobile = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  // ESC 키로 사이드바 닫기 (모바일만)
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSidebarOpen && isMobile) {
        handleCloseSidebar();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isSidebarOpen, isMobile]);

  // 사이드바 열릴 때 body 스크롤 방지 (모바일만)
  useEffect(() => {
    if (isSidebarOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isSidebarOpen, isMobile]);

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <BlogHeader onSidebarToggle={handleToggleSidebar} />
      </header>

      <main className={styles.main}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <BlogFooter />
      </footer>

      <aside className={`${styles.aside} ${isSidebarOpen ? styles.open : ''}`}>
        <BlogSidebar onCloseMobile={handleCloseSidebarOnMobile} />
      </aside>

      {isSidebarOpen && isMobile && (
        <div className={styles.overlay} onClick={handleCloseSidebar} />
      )}
    </div>
  );
};