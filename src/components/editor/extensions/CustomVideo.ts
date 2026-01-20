import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import VideoComponent from '../nodes/VideoNode';
import type { VideoNodeAttrs } from '../types';

export interface VideoOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    customVideo: {
      setVideo: (options: VideoNodeAttrs) => ReturnType;
    };
  }
}

export const CustomVideo = Node.create<VideoOptions>({
  name: 'customVideo',

  group: 'block',

  atom: true,

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-id'),
        renderHTML: (attributes) => {
          if (!attributes.id) return {};
          return { 'data-id': attributes.id };
        },
      },
      url: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-url'),
        renderHTML: (attributes) => {
          if (!attributes.url) return {};
          return { 'data-url': attributes.url };
        },
      },
      fileName: {
        default: null,
        parseHTML: (element) => element.getAttribute('data-filename'),
        renderHTML: (attributes) => {
          if (!attributes.fileName) return {};
          return { 'data-filename': attributes.fileName };
        },
      },
      size: {
        default: null,
        parseHTML: (element) => {
          const size = element.getAttribute('data-size');
          return size ? parseInt(size, 10) : null;
        },
        renderHTML: (attributes) => {
          if (!attributes.size) return {};
          return { 'data-size': attributes.size };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="custom-video"]',
      },
    ];
  },

  // 수정: renderHTML에서 모든 속성을 명시적으로 포함
  // 수정: 빈 요소가 아니도록 HTML 주석 추가
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { 
        'data-type': 'custom-video',
        // 수정: 속성들을 직접 HTML에 포함
        'data-id': HTMLAttributes['data-id'],
        'data-url': HTMLAttributes['data-url'],
        'data-filename': HTMLAttributes['data-filename'],
        'data-size': HTMLAttributes['data-size'],
      }),
      '<!--custom-video-->', // 수정: 빈 요소가 아니도록 주석 추가
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VideoComponent);
  },

  addCommands() {
    return {
      setVideo:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});