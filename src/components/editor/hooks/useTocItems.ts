import { useState, useEffect } from 'react';

export interface TocItem {
  id: string;
  title: string;
  level: number;
}

/**
 * DOM에서 목차 아이템을 추출하는 Hook
 * - 렌더링된 heading 요소를 읽어서 목차 생성
 * - Tiptap이 렌더링한 후 실행되도록 지연
 */
export const useTocItems = (containerSelector: string = '.tiptap-viewer'): TocItem[] => {
  const [tocItems, setTocItems] = useState<TocItem[]>([]);

  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 10;
    const retryDelay = 200;

    const extractTocItems = () => {
      const container = document.querySelector(containerSelector);
      
      if (!container) {
        if (retryCount < maxRetries) {
          retryCount++;
          setTimeout(extractTocItems, retryDelay);
        }
        return;
      }

      const headings = container.querySelectorAll('h1, h2, h3');
      
      if (headings.length === 0 && retryCount < maxRetries) {
        retryCount++;
        setTimeout(extractTocItems, retryDelay);
        return;
      }

      const items: TocItem[] = [];
      
      headings.forEach((heading) => {
        const level = parseInt(heading.tagName.substring(1));
        const title = heading.textContent || '';
        const id = heading.id;

        if (id && title) {
          items.push({ id, title, level });
        }
      });

      setTocItems(items);
    };

    // 초기 실행
    extractTocItems();

    // MutationObserver로 DOM 변경 감지
    const observer = new MutationObserver(() => {
      extractTocItems();
    });

    const container = document.querySelector(containerSelector);
    if (container) {
      observer.observe(container, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      observer.disconnect();
    };
  }, [containerSelector]);

  return tocItems;
};