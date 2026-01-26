import { usePublicPostDetailQuery } from '@/api/post/queries';

/**
 * 게시글 상세 조회 훅
 * - usePublicPostDetailQuery를 래핑하여 기존 인터페이스 유지
 */
export const usePostDetails = (slug: string | undefined) => {
  const query = usePublicPostDetailQuery(slug || '');

  return {
    post: query.data?.data ?? null,
    isLoading: query.isLoading,
  };
};