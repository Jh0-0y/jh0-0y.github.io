import { NodeViewContent, NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import { useCallback, useState } from 'react';
import { CODE_LANGUAGES } from '../constants/codeLanguages';
import styles from './CodeBlockNode.module.css';

export const CodeBlockNode = ({ node, updateAttributes }: NodeViewProps) => {
  const [copied, setCopied] = useState(false);
  const language = node.attrs.language || 'javascript';

  // 수정: useEffect 제거 - Tiptap의 CodeBlockLowlight가 자동으로 하이라이팅 처리
  // 수정: ref 제거 - NodeViewContent가 알아서 처리

  const handleLanguageChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      updateAttributes({ language: e.target.value });
    },
    [updateAttributes]
  );

  const handleCopy = useCallback(async () => {
    const code = node.textContent;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('복사 실패:', err);
    }
  }, [node.textContent]);

  return (
    <NodeViewWrapper className={styles.codeBlockWrapper}>
      <div className={styles.codeBlock}>
        {/* Mac 스타일 헤더 */}
        <div className={styles.header}>
          <div className={styles.windowButtons}>
            <span className={styles.btnClose} />
            <span className={styles.btnMinimize} />
            <span className={styles.btnMaximize} />
          </div>

          {/* 수정: 언어 라벨 제거, 셀렉트만 우측에 배치 */}
          <div className={styles.spacer} />

          <select
            className={styles.languageSelect}
            value={language}
            onChange={handleLanguageChange}
            contentEditable={false}
          >
            {CODE_LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value}>
                {lang.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            className={styles.copyButton}
            onClick={handleCopy}
            contentEditable={false}
          >
            {copied ? (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                복사됨
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                복사
              </>
            )}
          </button>
        </div>

        <pre className={styles.pre}>
          <NodeViewContent as={"code" as any} className={`language-${language}`} />
        </pre>
      </div>
    </NodeViewWrapper>
  );
};