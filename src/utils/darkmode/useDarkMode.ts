import { useEffect } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 타입 정의
interface ThemeState {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
  toggleDarkMode: () => void;
}

// 헬퍼 함수
const applyTheme = (darkMode: boolean): void => {
  document.documentElement.setAttribute(
    'data-theme',
    darkMode ? 'dark' : 'light'
  );
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      darkMode: false,

      setDarkMode: (darkMode: boolean) => {
        set({ darkMode });
        applyTheme(darkMode);
      },

      toggleDarkMode: () =>
        set((state) => {
          const newDarkMode = !state.darkMode;
          applyTheme(newDarkMode);
          return { darkMode: newDarkMode };
        }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export const useDarkMode = () => {
  const darkMode = useThemeStore((state) => state.darkMode);
  const setDarkMode = useThemeStore((state) => state.setDarkMode);
  const toggleDarkMode = useThemeStore((state) => state.toggleDarkMode);

  // 초기 테마 적용
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-storage');

    if (savedTheme) {
      const { state } = JSON.parse(savedTheme);
      applyTheme(state.darkMode);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, [setDarkMode]);

  return {
    darkMode,
    setDarkMode,
    toggleDarkMode,
  };
};
