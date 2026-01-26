// 수정: Tiptap 공식 CodeBlockLowlight 확장 사용
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { lowlight } from '../utils/lowlightConfig';
import { CodeBlockNode } from '../nodes/CodeBlockNode';

// 수정: CodeBlockLowlight를 extend하여 UI만 커스터마이징
export const CustomCodeBlock = CodeBlockLowlight.extend({
  // 반환 타입을 any로 지정해서 검사를 우회해
  addOptions(): any {
    return {
      ...this.parent?.(),
      lowlight,
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockNode);
  },
});