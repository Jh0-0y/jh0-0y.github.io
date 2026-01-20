import { marked } from 'marked';

/**
 * 커스텀 마크다운 태그를 HTML로 변환하는 정규식 패턴
 */
const CUSTOM_TAG_PATTERNS = {
  image: /::image\[id=(\d+)\s+url=([^\s]+)\s+fileName=([^\s]+)\s+size=(\d+)\]::/g,
  video: /::video\[id=(\d+)\s+url=([^\s]+)\s+fileName=([^\s]+)\s+size=(\d+)\]::/g,
  file: /::file\[id=(\d+)\s+url=([^\s]+)\s+fileName=([^\s]+)\s+size=(\d+)\]::/g,
};

/**
 * 커스텀 이미지 태그를 HTML로 변환
 */
const convertImageTag = (markdown: string): string => {
  return markdown.replace(
    CUSTOM_TAG_PATTERNS.image,
    (match, id, url, fileName, size) => {
      return `<div data-type="custom-image" data-id="${id}" data-url="${url}" data-filename="${fileName}" data-size="${size}"><!--custom-image--></div>`;
    }
  );
};

/**
 * 커스텀 비디오 태그를 HTML로 변환
 */
const convertVideoTag = (markdown: string): string => {
  return markdown.replace(
    CUSTOM_TAG_PATTERNS.video,
    (match, id, url, fileName, size) => {
      return `<div data-type="custom-video" data-id="${id}" data-url="${url}" data-filename="${fileName}" data-size="${size}"><!--custom-video--></div>`;
    }
  );
};

/**
 * 커스텀 파일 태그를 HTML로 변환
 */
const convertFileTag = (markdown: string): string => {
  return markdown.replace(
    CUSTOM_TAG_PATTERNS.file,
    (match, id, url, fileName, size) => {
      return `<div data-type="custom-file" data-id="${id}" data-url="${url}" data-filename="${fileName}" data-size="${size}"><!--custom-file--></div>`;
    }
  );
};

// 수정: marked 렌더러 커스터마이징
const renderer = new marked.Renderer();

// 제거: heading renderer는 TableOfContentsExtension이 처리
// renderer.heading = function(text, level) { ... }

// 수정: 코드블록 렌더링 시 data-language 속성 추가
renderer.code = function(code, language) {
  const lang = language || 'plaintext';
  return `<pre data-language="${lang}"><code class="language-${lang}">${code}</code></pre>`;
};

/**
 * Markdown을 HTML로 변환
 */
export const markdownToHtml = (markdown: string): string => {
  if (!markdown) return '';

  // 1. 커스텀 태그를 플레이스홀더로 치환
  const customTagPlaceholders: { placeholder: string; html: string }[] = [];
  let processedMarkdown = markdown;

  const customTagRegex = /::(image|video|file)\[([^\]]+)\]::/g;
  
  processedMarkdown = processedMarkdown.replace(customTagRegex, (match) => {
    const placeholder = `{{CUSTOM_TAG_${customTagPlaceholders.length}}}`;
    
    // 커스텀 태그를 HTML로 변환
    let html = match;
    html = convertImageTag(html);
    html = convertVideoTag(html);
    html = convertFileTag(html);
    
    customTagPlaceholders.push({ placeholder, html });
    return placeholder;
  });

  // 2. marked로 일반 마크다운 변환
  let html = marked.parse(processedMarkdown, {
    async: false,
    breaks: true,
    gfm: true,
    tables: true,
    renderer: renderer,
  }) as string;

  // 3. 플레이스홀더를 실제 HTML로 복원
  customTagPlaceholders.forEach(({ placeholder, html: customHtml }) => {
    const escapedPlaceholder = placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`<p>${escapedPlaceholder}</p>|${escapedPlaceholder}`, 'g');
    html = html.replace(regex, customHtml);
  });

  return html;
};