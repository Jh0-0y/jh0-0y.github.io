import { Link, useSearchParams } from 'react-router-dom';
import { useStacksSidebar } from '../../hooks/useStacksSidebar';
import { STACK_GROUP_LABELS, STACK_GROUP_ORDER } from '../../types/stack.enums';
import { SearchBar } from './SearchBar';
import styles from './Sidebar.module.css';
import { LogoutButton } from '@/components/logoutButton/LogoutButton';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { popularStacks, groupedStacks, isLoading } = useStacksSidebar();

  // 현재 선택된 스택 (URL에서 읽기)
  const selectedStack = searchParams.get('stack');

  // 스택 클릭 핸들러
  const handleStackClick = (stackName: string) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      if (selectedStack === stackName) {
        // 이미 선택된 스택이면 해제
        newParams.delete('stack');
      } else {
        // 새 스택 선택
        newParams.set('stack', stackName);
      }

      // 페이지 리셋
      newParams.delete('page');

      return newParams;
    });
  };

  // 필터 초기화
  const handleClearFilter = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete('stack');
      newParams.delete('keyword');
      newParams.delete('postType');
      newParams.delete('page');
      return newParams;
    });
  };

  // 활성 필터 여부
  const hasActiveFilter =
    searchParams.has('stack') || searchParams.has('keyword') || searchParams.has('postType');

  return (
    <>
      {/* 모바일 오버레이 */}
      {isOpen && <div className={styles.overlay} onClick={onClose} />}

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        {/* 로고/홈 */}
        <div className={styles.header}>
          <Link to="/" className={styles.logo}>
            hyunyoung.dev
          </Link>
          <p className={styles.subtitle}>Junior Backend Developer</p>
          <LogoutButton />
        </div>

        {/* 검색 */}
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>

        {/* 스크롤 영역 */}
        <div className={styles.scrollArea}>
          {isLoading ? (
            <div className={styles.loading}>로딩중...</div>
          ) : (
            <>
              {/* 인기 스택 */}
              {popularStacks.length > 0 && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>Popular Stacks</h3>
                  <div className={styles.popularStacks}>
                    {popularStacks.map((stack) => (
                      <button
                        key={stack.id}
                        className={`${styles.popularStack} ${
                          selectedStack === stack.name ? styles.active : ''
                        }`}
                        onClick={() => handleStackClick(stack.name)}
                      >
                        <span className={styles.tagRank}>{stack.rank}</span>
                        <span className={styles.tagName}>{stack.name}</span>
                        <span className={styles.tagCount}>{stack.postCount}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 전체 스택 (그룹별) */}
              {groupedStacks && (
                <div className={styles.section}>
                  <h3 className={styles.sectionTitle}>All Stacks</h3>

                  {STACK_GROUP_ORDER.map((group) => {
                    const stacks = groupedStacks[group];

                    // 해당 그룹에 스택이 없으면 스킵
                    if (!stacks || stacks.length === 0) return null;

                    return (
                      <div key={group} className={styles.tagGroup}>
                        <div className={styles.groupHeader}>
                          <span className={`${styles.groupDot} ${styles[group.toLowerCase()]}`} />
                          <span className={styles.groupLabel}>{STACK_GROUP_LABELS[group]}</span>
                        </div>
                        <div className={styles.groupStacks}>
                          {stacks.map((stack) => (
                            <button
                              key={stack.id}
                              className={`${styles.tag} ${
                                selectedStack === stack.name ? styles.active : ''
                              }`}
                              onClick={() => handleStackClick(stack.name)}
                            >
                              <span>{stack.name}</span>
                              <span className={styles.tagCountSmall}>{stack.postCount}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* 필터 초기화 버튼 */}
              {hasActiveFilter && (
                <div className={styles.section}>
                  <button className={styles.clearFilter} onClick={handleClearFilter}>
                    필터 초기화
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* 모바일 닫기 버튼 */}
        <button className={styles.closeButton} onClick={onClose}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </aside>
    </>
  );
};