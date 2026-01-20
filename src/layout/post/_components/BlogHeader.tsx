import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLogin, HiOutlineLogout } from 'react-icons/hi';
import { GiNautilusShell } from 'react-icons/gi';
import { useLogout } from '@/feature/auth/hooks/useLogout';
import { useAuthStore } from '@/stores/auth/authStore';
import styles from './BlogHeader.module.css';

interface BlogHeaderProps {
  onSidebarToggle?: () => void;
}

export const BlogHeader = ({ onSidebarToggle }: BlogHeaderProps) => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { isAuthenticated } = useAuthStore();
  const { logout } = useLogout();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 로고 클릭 핸들러
  const handleLogoClick = () => {
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;
    
    if (isMobile) {
      // 모바일: 사이드바 토글
      onSidebarToggle?.();
    } else {
      // 데스크탑: 홈으로 이동
      navigate('/');
    }
  };

  // 로그인/로그아웃 버튼 클릭
  const handleAuthClick = () => {
    if (isAuthenticated) {
      // 로그아웃
      logout();
    } else {
      // 로그인 페이지로 이동
      navigate('/auth/login');
    }
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.content} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.headerBg} />
        
        {/* 왼쪽 영역 - 아이콘과 네비게이션 */}
        <div className={styles.leftSection}>
          <div className={styles.logoWrapper} onClick={handleLogoClick}>
            <GiNautilusShell className={styles.shellIcon} />
          </div>

          <nav className={styles.nav}>
            <button className={styles.navButton}>Develop</button>
            <button className={styles.navButton}>DevOps</button>
            <button className={styles.navButton}>DevKit</button>
          </nav>
        </div>

        {/* 오른쪽 영역 - 로그인/로그아웃 */}
        <div className={styles.rightSection}>
          <button
            onClick={handleAuthClick}
            className={styles.authButton}
          >
            {isAuthenticated ? (
              <>
                <HiOutlineLogout className={styles.authIcon} />
                <span>로그아웃</span>
              </>
            ) : (
              <>
                <HiOutlineLogin className={styles.authIcon} />
                <span>로그인</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};