import TurndownService from 'turndown';
import { tables } from 'turndown-plugin-gfm';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '*',
  emDelimiter: '*',
  strongDelimiter: '**',
  blankReplacement: function (_content, node) {
    const element = node as HTMLElement;
    const dataType = element.getAttribute('data-type');

    if (dataType === 'custom-file') {
      return node.outerHTML;
    }

    return '\n\n';
  },
});

/**
 * 통합된 파일 노드 변환 규칙
 */
turndownService.addRule('customFile', {
  filter: function (node) {
    return (
      node.nodeName === 'DIV' &&
      node.getAttribute('data-type') === 'custom-file'
    );
  },
  replacement: function (_content, node) {
    const element = node as HTMLElement;
    const id = element.getAttribute('data-id');
    const url = element.getAttribute('data-url');
    const fileName = element.getAttribute('data-filename');
    const size = element.getAttribute('data-size');
    const contentType = element.getAttribute('data-contenttype');

    const encodedFileName = fileName ? encodeURIComponent(fileName) : '';

    return `\n::file[id=${id} url=${url} fileName=${encodedFileName} size=${size} contentType=${contentType}]::\n`;
  },
});

/**
 * GFM Tables 플러그인
 */
turndownService.use(tables);

/**
 * 코드블록 변환 규칙
 */
turndownService.addRule('codeBlock', {
  filter: function (node) {
    return node.nodeName === 'PRE' && node.querySelector('code') !== null;
  },
  replacement: function (content, node) {
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
  filter: function (node) {
    return (
      node.nodeName === 'TABLE' &&
      (node.classList.contains('tiptap-table') || node.hasAttribute('style'))
    );
  },
  replacement: function (_content, node) {
    const rows: string[] = [];
    const table = node as HTMLTableElement;

    const allRows = Array.from(table.querySelectorAll('tr'));

    allRows.forEach((row, rowIndex) => {
      const cells = Array.from(row.querySelectorAll('th, td'));
      const cellContents = cells.map((cell) => {
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
  return turndownService.turndown(html);
};