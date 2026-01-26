import { marked } from 'marked';

/**
 * 통합된 파일 태그 패턴
 */
const FILE_TAG_PATTERN = /::file\[id=(\d+)\s+url=([^\s]+)\s+fileName=([^\s]+)\s+size=(\d+)\s+contentType=([^\]]+)\]::/g;

/**
 * 제목을 ID로 변환
 */
const generateHeadingId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\sㄱ-힣-]/g, '')
    .replace(/\s+/g, '-')
    .trim();
};

/**
 * 파일 태그를 HTML로 변환
 */
const convertFileTag = (markdown: string): string => {
  return markdown.replace(
    FILE_TAG_PATTERN,
    (_match, id, url, encodedFileName, size, contentType) => {
      const fileName = decodeURIComponent(encodedFileName);
      return `<div data-type="custom-file" data-id="${id}" data-url="${url}" data-filename="${fileName}" data-size="${size}" data-contenttype="${contentType}"><!--custom-file--></div>`;
    }
  );
};

// marked 렌더러 커스터마이징
const renderer = new marked.Renderer();

renderer.heading = function (text, level) {
  const id = generateHeadingId(text);
  return `<h${level} id="${id}">${text}</h${level}>\n`;
};

renderer.code = function (code, language) {
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

  const customTagRegex = /::file\[([^\]]+)\]::/g;

  processedMarkdown = processedMarkdown.replace(customTagRegex, (match) => {
    const placeholder = `{{CUSTOM_TAG_${customTagPlaceholders.length}}}`;

    const html = convertFileTag(match);

    customTagPlaceholders.push({ placeholder, html });
    return placeholder;
  });

  // 2. marked로 일반 마크다운 변환
  let html = marked.parse(processedMarkdown, {
    async: false,
    breaks: true,
    gfm: true,
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