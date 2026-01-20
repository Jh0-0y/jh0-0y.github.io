// 수정: Tiptap 공식 CodeBlockLowlight 확장 사용
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { ReactNodeViewRenderer } from '@tiptap/react';
import { lowlight } from '../utils/lowlightConfig';
import { CodeBlockNode } from '../nodes/CodeBlockNode';

// 수정: CodeBlockLowlight를 extend하여 UI만 커스터마이징
export const CustomCodeBlock = CodeBlockLowlight.extend({
  // 수정: lowlight 인스턴스 전달
  addOptions() {
    return {
      ...this.parent?.(),
      lowlight,
    };
  },

  // 수정: 커스텀 NodeView로 UI 변경 (Mac 스타일 등)
  addNodeView() {
    return ReactNodeViewRenderer(CodeBlockNode);
  },
});