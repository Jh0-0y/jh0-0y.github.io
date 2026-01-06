import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import type { PostCategory, PostStatus } from '../types';
import { MarkdownEditor } from '../components';
import styles from './BlogWritePage.module.css';

// 카테고리 옵션
const CATEGORIES: { value: PostCategory; label: string }[] = [
  { value: 'STUDY', label: 'Study' },
  { value: 'ARCHITECTURE', label: 'Architecture' },
  { value: 'TROUBLESHOOTING', label: 'Troubleshooting' },
  { value: 'ESSAY', label: 'Essay' },
];

// TODO: 수정 모드일 때 기존 데이터 로드
const INITIAL_FORM = {
  title: '',
  excerpt: '',
  category: 'Study' as PostCategory,
  tags: [] as string[],
  content: '',
  status: 'private' as PostStatus,
};

export const BlogWritePage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  // 폼 상태
  const [form, setForm] = useState(INITIAL_FORM);
  const [tagInput, setTagInput] = useState('');

  // 필드 업데이트
  const updateField = <K extends keyof typeof form>(key: K, value: typeof form[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // 태그 추가
  const addTag = () => {
    const tag = tagInput.trim();
    if (tag && !form.tags.includes(tag)) {
      updateField('tags', [...form.tags, tag]);
      setTagInput('');
    }
  };

  // 태그 입력 키 핸들러
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  // 태그 삭제
  const removeTag = (tagToRemove: string) => {
    updateField('tags', form.tags.filter((tag) => tag !== tagToRemove));
  };

  // 저장
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: API 호출
    console.log('저장할 데이터:', form);
    
    // 저장 후 상세 페이지 또는 목록으로 이동
    navigate('/blog');
  };

  return (
    <div className={styles.page}>
      {/* 헤더 */}
      <header className={styles.header}>
        <Link to="/blog" className={styles.backLink}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span>취소</span>
        </Link>
        <h1 className={styles.pageTitle}>
          {isEditMode ? '글 수정' : '새 글 작성'}
        </h1>
        <div className={styles.headerActions}>
          {/* 공개/비공개 토글 */}
          <button
            type="button"
            onClick={() => updateField('status', form.status === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC')}
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

      {/* 폼 */}
      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 카테고리 선택 */}
        <div className={styles.categorySection}>
          <label className={styles.label}>카테고리</label>
          <div className={styles.categoryButtons}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => updateField('category', cat.value)}
                className={`${styles.categoryButton} ${form.category === cat.value ? styles.active : ''}`}
              >
                {cat.label}
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
            className={styles.titleInput}
            required
          />
        </div>

        {/* 요약 */}
        <div className={styles.field}>
          <textarea
            value={form.excerpt}
            onChange={(e) => updateField('excerpt', e.target.value)}
            placeholder="글을 간단히 요약해주세요 (목록에 표시됩니다)"
            className={styles.excerptInput}
            rows={2}
          />
        </div>

        {/* 태그 */}
        <div className={styles.field}>
          <label className={styles.label}>태그</label>
          <div className={styles.tagInputWrapper}>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
              placeholder="태그 입력 후 Enter"
              className={styles.tagInput}
            />
            <button
              type="button"
              onClick={addTag}
              className={styles.tagAddButton}
            >
              추가
            </button>
          </div>
          {form.tags.length > 0 && (
            <div className={styles.tagList}>
              {form.tags.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className={styles.tagRemove}
                  >
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
        </div>

        {/* 하단 액션 */}
        <div className={styles.actions}>
          <Link to="/blog" className={styles.cancelButton}>
            취소
          </Link>
          <button type="submit" className={styles.submitButton}>
            {isEditMode ? '수정하기' : '발행하기'}
          </button>
        </div>
      </form>
    </div>
  );
};