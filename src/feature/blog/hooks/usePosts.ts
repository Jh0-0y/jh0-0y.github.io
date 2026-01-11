import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getErrorMessage } from '@/services/core/api.error';
import { postApi } from '../api/post.api';
import type { PostListItem } from '../api/post.response';
import type { PostType } from '../types/post.enums';

const POST_TYPES: PostType[] = ['CORE', 'ARCHITECTURE', 'TROUBLESHOOTING', 'ESSAY'];

const isPostType = (value: string | null): value is PostType => {
  return value !== null && POST_TYPES.includes(value as PostType);
};

export interface PostsFilter {
  postType?: PostType;
  stack?: string;
  keyword?: string;
}

export interface Pagination {
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

export interface UsePostsReturn {
  posts: PostListItem[];
  pagination: Pagination;
  isLoading: boolean;
  error: string | null;
  filter: PostsFilter;
  setFilter: (filter: PostsFilter) => void;
  setPage: (page: number) => void;
  refetch: () => Promise<void>;
}

const DEFAULT_PAGE_SIZE = 10;

export const usePosts = (initialFilter?: PostsFilter): UsePostsReturn => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [posts, setPosts] = useState<PostListItem[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 0,
    size: DEFAULT_PAGE_SIZE,
    totalPages: 0,
    totalElements: 0,
    hasNext: false,
    hasPrevious: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // URL에서 필터 읽기
  const getFilterFromURL = useCallback((): PostsFilter => {
    const postTypeParam = searchParams.get('postType');

    return {
      postType: isPostType(postTypeParam) ? postTypeParam : initialFilter?.postType,
      stack: searchParams.get('stack') || initialFilter?.stack,
      keyword: searchParams.get('keyword') || initialFilter?.keyword,
    };
  }, [searchParams, initialFilter]);

  // URL에서 페이지 읽기
  const getPageFromURL = useCallback((): number => {
    const page = searchParams.get('page');
    return page ? parseInt(page, 10) : 0;
  }, [searchParams]);

  const filter = getFilterFromURL();
  const currentPage = getPageFromURL();

  const fetchPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await postApi.getPosts({
        page: currentPage,
        size: pagination.size,
        postType: filter.postType,
        stack: filter.stack,
        keyword: filter.keyword,
      });

      if (response.success) {
        const data = response.data;
        setPosts(data.content);
        setPagination((prev) => ({
          ...prev,
          page: currentPage,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          hasNext: data.hasNext,
          hasPrevious: data.hasPrevious,
        }));
      }
    } catch (err) {
      setError(getErrorMessage(err));
      setPosts([]);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, pagination.size, filter.postType, filter.stack, filter.keyword]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // URL 파라미터 업데이트 헬퍼
  const updateSearchParams = useCallback((updates: Record<string, string | null>) => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          newParams.set(key, value);
        } else {
          newParams.delete(key);
        }
      });

      return newParams;
    });
  }, [setSearchParams]);

  const handleSetFilter = useCallback((newFilter: PostsFilter) => {
    updateSearchParams({
      postType: newFilter.postType || null,
      stack: newFilter.stack || null,
      keyword: newFilter.keyword || null,
      page: null, // 필터 변경 시 페이지 리셋
    });
  }, [updateSearchParams]);

  const setPage = useCallback((page: number) => {
    updateSearchParams({
      page: page > 0 ? String(page) : null,
    });
  }, [updateSearchParams]);

  return {
    posts,
    pagination: {
      ...pagination,
      page: currentPage,
    },
    isLoading,
    error,
    filter,
    setFilter: handleSetFilter,
    setPage,
    refetch: fetchPosts,
  };
};