import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Placeholder from '@tiptap/extension-placeholder';
import { CustomFile, CustomCodeBlock, CustomToc } from '../extensions';
import { htmlToMarkdown, markdownToHtml } from '../converter';
import { uploadFile, extractFilesFromDrop } from '../utils';
import type { EditorOptions, UseMyEditorReturn } from '../types';

export const useMyEditor = ({
  mode,
  content = '',
  placeholder = '마크다운 문서도 지원합니다.',
  onUpdate,
  editable = true,
}: EditorOptions): UseMyEditorReturn => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CustomCodeBlock,
      Underline,
      Link.configure({
        openOnClick: mode === 'viewer',
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer',
        },
      }),
      Highlight,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'tiptap-table',
        },
      }),
      TableRow.configure({
        HTMLAttributes: {
          class: 'tiptap-table-row',
        },
      }),
      TableCell.configure({
        HTMLAttributes: {
          class: 'tiptap-table-cell',
        },
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'tiptap-table-header',
        },
      }),
      Placeholder.configure({
        placeholder: mode === 'editor' ? placeholder : '',
      }),
      CustomFile,
      CustomToc.configure({
        getHeadings: () => {},
      }),
    ],
    content: markdownToHtml(content),
    editable: mode === 'editor' && editable,
    editorProps: {
      attributes: {
        class: mode === 'editor' ? 'tiptap-editor' : 'tiptap-viewer',
      },
      handleDrop: (view, event ) => {
        if (mode !== 'editor') return false;

        const files = extractFilesFromDrop(event.dataTransfer);
        if (!files || files.length === 0) return false;

        event.preventDefault();

        // 드롭 위치 계산
        const coordinates = view.posAtCoords({
          left: event.clientX,
          top: event.clientY,
        });

        if (!coordinates) return false;

        const dropPos = coordinates.pos;

        files.forEach(async (file) => {
          const result = await uploadFile(file);

          if (result.success && result.data) {
            const { id, url, fileName, size, contentType } = result.data;
            
            // 드롭된 위치에 정확히 삽입
            editor?.chain()
              .focus()
              .insertContentAt(dropPos, {
                type: 'customFile',
                attrs: { id, url, fileName, size, contentType }
              })
              .run();
          } else {
            alert(result.error || '파일 업로드에 실패했습니다.');
          }
        });

        return true;
      },
      handlePaste: (_view, event) => {
        if (mode !== 'editor') return false;

        const text = event.clipboardData?.getData('text/plain');
        if (!text) return false;

        const hasMarkdown =
          /^#{1,6}\s/.test(text) ||
          /^\*\*.*\*\*/.test(text) ||
          /^\*.*\*/.test(text) ||
          /^\[.*\]\(.*\)/.test(text) ||
          /^```/.test(text) ||
          /^>\s/.test(text) ||
          /^\|(.+)\|/.test(text);

        if (hasMarkdown) {
          event.preventDefault();
          const html = markdownToHtml(text);
          editor?.commands.insertContent(html);
          return true;
        }

        return false;
      },
    },
    onUpdate: ({ editor }) => {
      if (mode === 'editor' && onUpdate) {
        const html = editor.getHTML();
        const markdown = htmlToMarkdown(html);
        onUpdate(markdown);
      }
    },
  });

  const getMarkdown = (): string => {
    if (!editor) return '';
    const html = editor.getHTML();
    return htmlToMarkdown(html);
  };

  const setMarkdown = (markdown: string): void => {
    if (!editor) return;
    const html = markdownToHtml(markdown);
    editor.commands.setContent(html);
  };

  const clear = (): void => {
    if (!editor) return;
    editor.commands.clearContent();
  };

  return {
    editor,
    getMarkdown,
    setMarkdown,
    clear,
  };
};