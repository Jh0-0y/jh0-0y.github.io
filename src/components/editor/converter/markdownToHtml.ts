import { marked } from 'marked';

/**
 * 커스텀 마크다운 태그를 HTML로 변환하는 정규식 패턴
 * 수정: fileName은 URL 인코딩되어 있으므로 공백 없이 매칭 가능
 */
const CUSTOM_TAG_PATTERNS = {
  image: /::image\[id=(\d+)\s+url=([^\s]+)\s+fileName=([^\s\]]+)\s+size=(\d+)\]::/g,
  video: /::video\[id=(\d+)\s+url=([^\s]+)\s+fileName=([^\s\]]+)\s+size=(\d+)\]::/g,
  file: /::file\[id=(\d+)\s+url=([^\s]+)\s+fileName=([^\s\]]+)\s+size=(\d+)\]::/g,
};

/**
 * 제목을 ID로 변환하는 헬퍼 함수
 */
const generateHeadingId = (text: string): string => {
  const id = text
    .toLowerCase()
    .replace(/[^\w\sㄱ-힣-]/g, '') // 특수문자 제거 (한글 유지)
    .replace(/\s+/g, '-')           // 공백을 하이픈으로
    .trim();                        // 앞뒤 공백 제거
  
  console.log('Generated heading ID:', id, 'from:', text); // 디버깅
  return id;
};

/**
 * 커스텀 이미지 태그를 HTML로 변환
 * 수정: fileName을 URL 디코딩하여 원래 파일명 복원
 */
const convertImageTag = (markdown: string): string => {
  return markdown.replace(
    CUSTOM_TAG_PATTERNS.image,
    (match, id, url, encodedFileName, size) => {
      // URL 디코딩하여 원래 파일명 복원
      const fileName = decodeURIComponent(encodedFileName);
      return `<div data-type="custom-image" data-id="${id}" data-url="${url}" data-filename="${fileName}" data-size="${size}"><!--custom-image--></div>`;
    }
  );
};

/**
 * 커스텀 비디오 태그를 HTML로 변환
 * 수정: fileName을 URL 디코딩
 */
const convertVideoTag = (markdown: string): string => {
  return markdown.replace(
    CUSTOM_TAG_PATTERNS.video,
    (match, id, url, encodedFileName, size) => {
      const fileName = decodeURIComponent(encodedFileName);
      return `<div data-type="custom-video" data-id="${id}" data-url="${url}" data-filename="${fileName}" data-size="${size}"><!--custom-video--></div>`;
    }
  );
};

/**
 * 커스텀 파일 태그를 HTML로 변환
 * 수정: fileName을 URL 디코딩
 */
const convertFileTag = (markdown: string): string => {
  return markdown.replace(
    CUSTOM_TAG_PATTERNS.file,
    (match, id, url, encodedFileName, size) => {
      const fileName = decodeURIComponent(encodedFileName);
      return `<div data-type="custom-file" data-id="${id}" data-url="${url}" data-filename="${fileName}" data-size="${size}"><!--custom-file--></div>`;
    }
  );
};

// 수정: marked 렌더러 커스터마이징
const renderer = new marked.Renderer();

// 수정: heading에 id 자동 생성
renderer.heading = function(text, level) {
  const id = generateHeadingId(text);
  return `<h${level} id="${id}">${text}</h${level}>\n`;
};

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

  // 2. marked로 일반 마크다운 변환 (커스텀 렌더러 적용)
  let html = marked.parse(processedMarkdown, {
    async: false,
    breaks: true,
    gfm: true,
    tables: true,
    renderer: renderer, // 수정: 커스텀 렌더러 사용
  }) as string;

  // 3. 플레이스홀더를 실제 HTML로 복원
  customTagPlaceholders.forEach(({ placeholder, html: customHtml }) => {
    const escapedPlaceholder = placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`<p>${escapedPlaceholder}</p>|${escapedPlaceholder}`, 'g');
    html = html.replace(regex, customHtml);
  });

  return html;
};