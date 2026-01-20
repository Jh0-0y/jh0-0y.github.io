import { useEffect, useRef } from 'react';

import styles from './SearchBar.module.css';
import { useSearch } from '@/feature/blog/hooks/post/useSearch';

interface SearchBarProps {
  onSearch?: () => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { inputValue, setInputValue, handleSearch, clearSearch } = useSearch();

  // 검색 실행 (Enter 키)
  const executeSearch = () => {
    handleSearch();
    onSearch?.(); // 모바일에서만 사이드바 닫기
  };

  // Enter 키 처리
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeSearch();
    }
    if (e.key === 'Escape') {
      clearSearch();
      inputRef.current?.blur();
    }
  };

  // Cmd+K / Ctrl+K 단축키
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  return (
    <div className={styles.searchWrapper}>
      <div className={styles.searchBar}>
        <div className={styles.iconWrapper}>
          <svg
            className={styles.searchIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <input
          ref={inputRef}
          type="text"
          className={styles.input}
          placeholder="검색..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <div className={styles.actions}>
          {inputValue && (
            <button 
              className={styles.clearButton} 
              type="button"
              onClick={clearSearch}
              aria-label="검색어 지우기"
            >
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <kbd className={styles.shortcut}>⌘K</kbd>
        </div>
      </div>
    </div>
  );
};