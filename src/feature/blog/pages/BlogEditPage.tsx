import { useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { usePostEdit } from '../hooks/usePostEdit';
import { useStacks } from '../hooks/useStacks';
import { STACK_GROUP_LABELS, STACK_GROUP_ORDER } from '../types/stack.enums';
import type { PostType } from '../types/post.enums';
import { MarkdownEditor } from '../components';
import styles from './BlogEditPage.module.css';

const POST_TYPES: { value: PostType; label: string }[] = [
  { value: 'CORE', label: 'Core' },
  { value: 'ARCHITECTURE', label: 'Architecture' },
  { value: 'TROUBLESHOOTING', label: 'Troubleshooting' },
  { value: 'ESSAY', label: 'Essay' },
];

export const BlogEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id ? parseInt(id, 10) : 0;

  const {
    form,
    isLoading,
    isFetching,
    isDeleting,
    error,
    fieldErrors,
    updateField,
    addTag,
    removeTag,
    toggleStatus,
    submit,
    deletePost,
  } = usePostEdit(postId);

  const { groupedStacks, isLoading: isStacksLoading } = useStacks();
  const [tagInput, setTagInput] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // postId가 없으면 홈으로 리다이렉트
  if (!postId) {
    return <Navigate to="/" replace />;
  }

  // 스택 토글
  const handleStackToggle = (stackName: string) => {
    if (form.stacks.includes(stackName)) {
      updateField('stacks', form.stacks.filter((s) => s !== stackName));
    } else {
      updateField('stacks', [...form.stacks, stackName]);
    }
  };

  // 태그 추가
  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    setTagInput('');
    if (trimmed) {
      addTag(trimmed);
    }
  };

  // 태그 입력 키 핸들러
  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === ' ') {
      e.preventDefault();
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmed = tagInput.trim();
      setTagInput('');
      if (trimmed) {
        addTag(trimmed);
      }
    }
  };

  // 저장
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit();
  };

  // 삭제 확인
  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  // 삭제 실행
  const handleDeleteConfirm = () => {
    deletePost();
  };

  // 삭제 취소
  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
  };

  // 로딩 중
  if (isFetching) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>게시글을 불러오는 중...</div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* 헤더 */}
      <header className={styles.header}>
        <Link to={`/post/${postId}`} className={styles.backLink}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span>취소</span>
        </Link>
        <h1 className={styles.pageTitle}>글 수정</h1>
        <div className={styles.headerActions}>
          {/* 삭제 버튼 */}
          <button type="button" onClick={handleDeleteClick} className={styles.deleteButton}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            삭제
          </button>
          {/* 공개/비공개 토글 */}
          <button
            type="button"
            onClick={toggleStatus}
            className={`${styles.statusToggle} ${form.status === 'PUBLIC' ? styles.public : ''}`}
          >
            {form.status === 'PUBLIC' ? (
              <>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                공개
              </>
            ) : (
              <>
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                비공개
              </>
            )}
          </button>
        </div>
      </header>

      {/* 삭제 확인 모달 */}
      {showDeleteConfirm && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>게시글 삭제</h2>
            <p className={styles.modalMessage}>정말로 이 게시글을 삭제하시겠습니까?</p>
            <div className={styles.modalActions}>
              <button type="button" onClick={handleDeleteCancel} className={styles.modalCancelButton}>
                취소
              </button>
              <button
                type="button"
                onClick={handleDeleteConfirm}
                className={styles.modalDeleteButton}
                disabled={isDeleting}
              >
                {isDeleting ? '삭제 중...' : '삭제'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 에러 메시지 */}
      {error && <div className={styles.errorMessage}>{error}</div>}

      {/* 폼 */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 포스트 타입 */}
        <div className={styles.field}>
          <label className={styles.label}>타입</label>
          <div className={styles.typeButtons}>
            {POST_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => updateField('postType', type.value)}
                className={`${styles.typeButton} ${form.postType === type.value ? styles.active : ''}`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* 제목 */}
        <div className={styles.field}>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="제목을 입력하세요"
            className={`${styles.titleInput} ${fieldErrors?.title ? styles.inputError : ''}`}
            required
          />
          {fieldErrors?.title && <span className={styles.fieldError}>{fieldErrors.title}</span>}
        </div>

        {/* 요약 */}
        <div className={styles.field}>
          <textarea
            value={form.excerpt}
            onChange={(e) => updateField('excerpt', e.target.value)}
            placeholder="글을 간단히 요약해주세요 (목록에 표시됩니다)"
            className={`${styles.excerptInput} ${fieldErrors?.excerpt ? styles.inputError : ''}`}
            rows={2}
          />
          {fieldErrors?.excerpt && <span className={styles.fieldError}>{fieldErrors.excerpt}</span>}
        </div>

        {/* 스택 선택 */}
        <div className={styles.field}>
          <label className={styles.label}>스택</label>
          {isStacksLoading ? (
            <div className={styles.stacksLoading}>스택 로딩중...</div>
          ) : groupedStacks ? (
            <div className={styles.stackGroups}>
              {STACK_GROUP_ORDER.map((group) => {
                const stacks = groupedStacks[group];
                if (!stacks || stacks.length === 0) return null;

                return (
                  <div key={group} className={styles.stackGroup}>
                    <span className={styles.stackGroupLabel}>{STACK_GROUP_LABELS[group]}</span>
                    <div className={styles.stackButtons}>
                      {stacks.map((stack) => (
                        <button
                          key={stack.id}
                          type="button"
                          onClick={() => handleStackToggle(stack.name)}
                          className={`${styles.stackButton} ${form.stacks.includes(stack.name) ? styles.active : ''}`}
                        >
                          {stack.name}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : null}
          {form.stacks.length > 0 && (
            <div className={styles.selectedStacks}>
              {form.stacks.map((stack) => (
                <span key={stack} className={styles.selectedStack}>
                  {stack}
                  <button type="button" onClick={() => handleStackToggle(stack)} className={styles.stackRemove}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 태그 */}
        <div className={styles.field}>
          <label className={styles.label}>태그 (공백 대신 _ 사용)</label>
          <div className={styles.tagInputWrapper}>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="태그 입력 후 Enter"
              className={styles.tagInput}
            />
            <button type="button" onClick={handleAddTag} className={styles.tagAddButton}>
              추가
            </button>
          </div>
          {form.tags.length > 0 && (
            <div className={styles.tagList}>
              {form.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  #{tag}
                  <button type="button" onClick={() => removeTag(tag)} className={styles.tagRemove}>
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* 본문 에디터 */}
        <div className={styles.editorSection}>
          <label className={styles.label}>본문</label>
          <MarkdownEditor
            value={form.content}
            onChange={(value) => updateField('content', value)}
            placeholder="내용을 작성하세요... (마크다운을 지원합니다)"
          />
          {fieldErrors?.content && <span className={styles.fieldError}>{fieldErrors.content}</span>}
        </div>

        {/* 하단 액션 */}
        <div className={styles.actions}>
          <Link to={`/post/${postId}`} className={styles.cancelButton}>
            취소
          </Link>
          <button type="submit" className={styles.submitButton} disabled={isLoading}>
            {isLoading ? '저장 중...' : '수정하기'}
          </button>
        </div>
      </form>
    </div>
  );
};