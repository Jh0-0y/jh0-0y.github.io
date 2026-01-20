import { Extension } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';

export interface CustomTocOptions {
  getHeadings: (headings: TocHeading[]) => void;
}

export interface TocHeading {
  level: number;
  text: string;
  id: string;
}

/**
 * 제목을 ID로 변환하는 헬퍼 함수
 */
const generateHeadingId = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\sㄱ-힣-]/g, '') // 특수문자 제거 (한글 유지)
    .replace(/\s+/g, '-')           // 공백을 하이픈으로
    .trim();                        // 앞뒤 공백 제거
};

/**
 * Table of Contents Extension
 * - Heading 노드에 자동으로 id 속성 추가
 * - 문서의 모든 heading 추출
 */
export const CustomToc = Extension.create<CustomTocOptions>({
  name: 'tableOfContents',

  addOptions() {
    return {
      getHeadings: () => {},
    };
  },

  addProseMirrorPlugins() {
    const { getHeadings } = this.options;

    return [
      new Plugin({
        key: new PluginKey('tableOfContents'),
        
        view() {
          return {
            update: (view) => {
              const headings: TocHeading[] = [];
              
              // 문서 전체를 순회하며 heading 찾기
              view.state.doc.descendants((node, pos) => {
                if (node.type.name === 'heading') {
                  const text = node.textContent;
                  const level = node.attrs.level;
                  const id = generateHeadingId(text);

                  headings.push({ level, text, id });
                }
              });

              // 외부에 heading 목록 전달
              getHeadings(headings);
            },
          };
        },
      }),
    ];
  },

  // Heading 노드에 id 속성 추가
  addGlobalAttributes() {
    return [
      {
        types: ['heading'],
        attributes: {
          id: {
            default: null,
            parseHTML: (element) => element.getAttribute('id'),
            renderHTML: (attributes) => {
              // textContent는 여기서 접근 불가하므로
              // 실제 렌더링 시점에 처리
              return {
                id: attributes.id,
              };
            },
          },
        },
      },
    ];
  },

  // Heading 렌더링 시 id 자동 생성
  onBeforeCreate() {
    const originalHeadingSpec = this.editor.schema.nodes.heading?.spec;
    
    if (originalHeadingSpec?.toDOM) {
      const originalToDOM = originalHeadingSpec.toDOM;
      
      // @ts-ignore
      this.editor.schema.nodes.heading.spec.toDOM = (node) => {
        const result = originalToDOM(node) as [string, any, number];
        const text = node.textContent;
        const id = generateHeadingId(text);
        
        // id 속성 추가
        if (result[1]) {
          result[1].id = id;
        } else {
          result[1] = { id };
        }
        
        return result;
      };
    }
  },
});