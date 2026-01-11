import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage, getFieldErrors } from '@/services/core/api.error';
import { useToast } from '@/utils/toast/useToast';
import { postApi } from '../api/post.api';
import type { UpdatePostRequest } from '../api/post.request';
import type { PostType, PostStatus } from '../types/post.enums';

export interface PostEditForm {
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  status: PostStatus;
  stacks: string[];
  tags: string[];
}

export interface UsePostEditReturn {
  form: PostEditForm;
  isLoading: boolean;
  isFetching: boolean;
  isDeleting: boolean;
  error: string | null;
  fieldErrors: Record<string, string> | null;
  updateField: <K extends keyof PostEditForm>(key: K, value: PostEditForm[K]) => void;
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void;
  toggleStatus: () => void;
  submit: () => Promise<void>;
  deletePost: () => Promise<void>;
}

const INITIAL_FORM: PostEditForm = {
  title: '',
  excerpt: '',
  postType: 'CORE',
  content: '',
  status: 'PUBLIC',
  stacks: [],
  tags: [],
};

export const usePostEdit = (postId: number): UsePostEditReturn => {
  const navigate = useNavigate();
  const toast = useToast();

  const [form, setForm] = useState<PostEditForm>(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string> | null>(null);

  // 기존 데이터 로드
  useEffect(() => {
    if (!postId) return;

    const fetchPost = async () => {
      setIsFetching(true);
      setError(null);

      try {
        const response = await postApi.getPost(postId);
        if (response.success) {
          const post = response.data;
          setForm({
            title: post.title,
            excerpt: post.excerpt,
            postType: post.postType,
            content: post.content,
            status: post.status,
            stacks: post.stacks,
            tags: post.tags,
          });
        }
      } catch (err) {
        const message = getErrorMessage(err);
        setError(message);
      } finally {
        setIsFetching(false);
      }
    };

    fetchPost();
  }, [postId]); // toast 제거

  // 필드 업데이트
  const updateField = useCallback(
    <K extends keyof PostEditForm>(key: K, value: PostEditForm[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
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

  // 수정 제출
  const submit = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setFieldErrors(null);

    try {
      const request: UpdatePostRequest = {
        title: form.title,
        excerpt: form.excerpt,
        postType: form.postType,
        content: form.content,
        status: form.status,
        stacks: form.stacks,
        tags: form.tags,
      };

      const response = await postApi.updatePost(postId, request);

      if (response.success) {
        toast.success('게시글이 수정되었습니다');
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
  }, [form, postId, navigate, toast]);

  // 삭제
  const deletePost = useCallback(async () => {
    setIsDeleting(true);

    try {
      const response = await postApi.deletePost(postId);

      if (response.success) {
        toast.success('게시글이 삭제되었습니다');
        navigate('/');
      }
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  }, [postId, navigate, toast]);

  return {
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
  };
};