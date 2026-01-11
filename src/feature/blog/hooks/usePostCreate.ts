import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage, getFieldErrors } from '@/services/core/api.error';
import { useToast } from '@/utils/toast/useToast';
import { postApi } from '../api/post.api';
import type { CreatePostRequest } from '../api/post.request';
import type { PostType, PostStatus } from '../types/post.enums';

export interface PostCreateForm {
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  status: PostStatus;
  stacks: string[];
  tags: string[];
}

export interface UsePostCreateReturn {
  form: PostCreateForm;
  isLoading: boolean;
  error: string | null;
  fieldErrors: Record<string, string> | null;
  updateField: <K extends keyof PostCreateForm>(key: K, value: PostCreateForm[K]) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  toggleStatus: () => void;
  submit: () => Promise<void>;
  reset: () => void;
}

const INITIAL_FORM: PostCreateForm = {
  title: '',
  excerpt: '',
  postType: 'CORE',
  content: '',
  status: 'PUBLIC',
  stacks: [],
  tags: [],
};

export const usePostCreate = (): UsePostCreateReturn => {
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState<PostCreateForm>(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(null);

  // 필드 업데이트
  const updateField = useCallback(
    <K extends keyof PostCreateForm>(key: K, value: PostCreateForm[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
      // 해당 필드 에러 제거
      if (fieldErrors?.[key]) {
        setFieldErrors((prev) => {
          if (!prev) return null;
          const { [key]: _, ...rest } = prev;
          return Object.keys(rest).length > 0 ? rest : null;
        });
      }
    },
    [fieldErrors]
  );

  // 태그 추가
  const addTag = useCallback(
    (tag: string) => {
      const trimmed = tag.trim();
      if (trimmed && !form.tags.includes(trimmed)) {
        setForm((prev) => ({ ...prev, tags: [...prev.tags, trimmed] }));
      }
    },
    [form.tags]
  );

  // 태그 제거
  const removeTag = useCallback((tagToRemove: string) => {
    setForm((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  }, []);

  // 공개/비공개 토글
  const toggleStatus = useCallback(() => {
    setForm((prev) => ({
      ...prev,
      status: prev.status === 'PUBLIC' ? 'PRIVATE' : 'PUBLIC',
    }));
  }, []);

  // 폼 초기화
  const reset = useCallback(() => {
    setForm(INITIAL_FORM);
    setError(null);
    setFieldErrors(null);
  }, []);

  // 제출
  const submit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setFieldErrors(null);

    try {
      const request: CreatePostRequest = {
        title: form.title,
        excerpt: form.excerpt,
        postType: form.postType,
        content: form.content,
        status: form.status,
        stacks: form.stacks,
        tags: form.tags,
      };

      const response = await postApi.createPost(request);

      if (response.success) {
        toast.success('게시글이 발행되었습니다');
        navigate(`/post/${response.data.id}`);
      }
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      setFieldErrors(getFieldErrors(err));
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }, [form, navigate, toast]);

  return {
    form,
    isLoading,
    error,
    fieldErrors,
    updateField,
    addTag,
    removeTag,
    toggleStatus,
    submit,
    reset,
  };
};