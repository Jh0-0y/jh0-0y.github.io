import TurndownService from 'turndown';
import { tables } from 'turndown-plugin-gfm';

/**
 * Turndown 인스턴스 생성
 */
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '*',
  emDelimiter: '*',
  strongDelimiter: '**',
  // 수정: 빈 요소 처리 - 커스텀 노드는 처리하도록 설정
  blankReplacement: function(content, node) {
    const element = node as HTMLElement;
    const dataType = element.getAttribute('data-type');
    
    // data-type이 custom-으로 시작하면 빈 요소라도 유지
    if (dataType && dataType.startsWith('custom-')) {
      return node.outerHTML; // 일단 HTML 그대로 반환 (나중에 규칙으로 처리)
    }
    
    // 나머지는 빈 줄로 처리
    return '\n\n';
  },
});

/**
 * 커스텀 이미지 노드 변환 규칙 - 최우선 순위
 * 수정: fileName을 URL 인코딩하여 공백 문제 해결
 */
turndownService.addRule('customImage', {
  filter: function(node) {
    const isDiv = node.nodeName === 'DIV';
    const dataType = node.getAttribute('data-type');
    const isCustomImage = dataType === 'custom-image';
    
    console.log('Image Filter:', { isDiv, dataType, isCustomImage }); // 디버깅
    
    return isDiv && isCustomImage;
  },
  replacement: function(content, node) {
    console.log('Image Replacement called!'); // 디버깅
    const element = node as HTMLElement;
    const id = element.getAttribute('data-id');
    const url = element.getAttribute('data-url');
    const fileName = element.getAttribute('data-filename');
    const size = element.getAttribute('data-size');

    // fileName을 URL 인코딩하여 공백 문제 해결
    const encodedFileName = fileName ? encodeURIComponent(fileName) : '';

    return `\n::image[id=${id} url=${url} fileName=${encodedFileName} size=${size}]::\n`;
  },
});

/**
 * 커스텀 비디오 노드 변환 규칙
 * 수정: fileName을 URL 인코딩
 */
turndownService.addRule('customVideo', {
  filter: function(node) {
    return (
      node.nodeName === 'DIV' &&
      node.getAttribute('data-type') === 'custom-video'
    );
  },
  replacement: function(content, node) {
    const element = node as HTMLElement;
    const id = element.getAttribute('data-id');
    const url = element.getAttribute('data-url');
    const fileName = element.getAttribute('data-filename');
    const size = element.getAttribute('data-size');

    const encodedFileName = fileName ? encodeURIComponent(fileName) : '';

    return `\n::video[id=${id} url=${url} fileName=${encodedFileName} size=${size}]::\n`;
  },
});

/**
 * 커스텀 파일 노드 변환 규칙
 * 수정: fileName을 URL 인코딩
 */
turndownService.addRule('customFile', {
  filter: function(node) {
    return (
      node.nodeName === 'DIV' &&
      node.getAttribute('data-type') === 'custom-file'
    );
  },
  replacement: function(content, node) {
    const element = node as HTMLElement;
    const id = element.getAttribute('data-id');
    const url = element.getAttribute('data-url');
    const fileName = element.getAttribute('data-filename');
    const size = element.getAttribute('data-size');

    const encodedFileName = fileName ? encodeURIComponent(fileName) : '';

    return `\n::file[id=${id} url=${url} fileName=${encodedFileName} size=${size}]::\n`;
  },
});

/**
 * GFM Tables 플러그인 사용
 */
turndownService.use(tables);

/**
 * 코드블록 변환 규칙
 */
turndownService.addRule('codeBlock', {
  filter: function(node) {
    return node.nodeName === 'PRE' && node.querySelector('code');
  },
  replacement: function(content, node) {
    const codeElement = (node as HTMLElement).querySelector('code');
    if (!codeElement) return content;

    const dataLanguage = (node as HTMLElement).getAttribute('data-language');
    
    let language = dataLanguage;
    if (!language) {
      const classMatch = codeElement.className.match(/language-(\w+)/);
      language = classMatch ? classMatch[1] : '';
    }

    const code = codeElement.textContent || '';
    
    return '\n\n```' + (language || '') + '\n' + code + '\n```\n\n';
  },
});

/**
 * Tiptap 테이블 변환 규칙
 */
turndownService.addRule('tiptapTableCleanup', {
  filter: function(node) {
    return (
      node.nodeName === 'TABLE' &&
      (node.classList.contains('tiptap-table') || 
       node.hasAttribute('style'))
    );
  },
  replacement: function(content, node) {
    const rows: string[] = [];
    const table = node as HTMLTableElement;
    
    const allRows = Array.from(table.querySelectorAll('tr'));
    
    allRows.forEach((row, rowIndex) => {
      const cells = Array.from(row.querySelectorAll('th, td'));
      const cellContents = cells.map(cell => {
        return cell.textContent?.trim() || '';
      });
      
      rows.push('| ' + cellContents.join(' | ') + ' |');
      
      if (rowIndex === 0) {
        const separator = cells.map(() => '---').join(' | ');
        rows.push('| ' + separator + ' |');
      }
    });
    
    return '\n\n' + rows.join('\n') + '\n\n';
  },
});

/**
 * HTML을 Markdown으로 변환
 */
export const htmlToMarkdown = (html: string): string => {
  console.log('Converting HTML to Markdown:', html); // 디버깅
  const result = turndownService.turndown(html);
  console.log('Result:', result); // 디버깅
  return result;
};