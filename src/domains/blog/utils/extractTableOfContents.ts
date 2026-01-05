import type { TableOfContentsSection } from '../types';

/**
 * 마크다운 본문에서 목차(TOC) 자동 추출
 * ## 제목 → level 2
 * ### 제목 → level 3
 */
export function extractTableOfContents(markdown: string): TableOfContentsSection[] {
  const sections: TableOfContentsSection[] = [];
  const regex = /^(#{2,3})\s+(.+)$/gm;

  let match;
  while ((match = regex.exec(markdown)) !== null) {
    const level = match[1].length as 2 | 3;
    const title = match[2].trim();
    const id = generateSlug(title);

    sections.push({ id, title, level });
  }

  return sections;
}

/**
 * 제목을 URL-safe slug로 변환
 */
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s가-힣-]/g, '') // 특수문자 제거 (한글 유지)
    .replace(/\s+/g, '-') // 공백 → 하이픈
    .replace(/-+/g, '-') // 중복 하이픈 제거
    .trim();
}