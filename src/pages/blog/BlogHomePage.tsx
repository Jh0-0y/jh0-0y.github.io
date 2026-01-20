import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { usePosts } from '@/feature/blog/hooks/post/usePosts';
import type { PostType } from '@/feature/blog/types/post';
import { TypingBanner } from '@/feature/blog/components/blog-home/TypingBanner';
import { 
  BlogHomeFilter,
  BlogHomeContents
 } from '@/feature/blog/components/blog-home';
import { Pagination } from '@/components/pagination/Pagination';
import styles from './BlogHomePage.module.css';

export const BlogHomePage = () => {
  const navigate = useNavigate();
  const params = useParams<{ postType?: string; group?: string; stack?: string }>();
  const [searchParams] = useSearchParams();
  const { posts, pagination, isLoading, error, filter, setPage } = usePosts();

  const currentPostType = filter.postType || 'ALL';

  const handleTabClick = (type: PostType | 'ALL') => {
    const keyword = searchParams.get('q');
    const { group, stack } = params;

    let basePath = '';

    if (group && stack) {
      basePath = type === 'ALL' ? `/${group}/${stack}` : `/${group}/${stack}/${type.toLowerCase()}`;
    } else {
      basePath = type === 'ALL' ? '/' : `/${type.toLowerCase()}`;
    }

    navigate(keyword ? `${basePath}?q=${keyword}` : basePath);
  };


  return (
    <div className={styles.container}>
      {/* 배너 - 전체 너비 */}
      <div className={styles.bannerWrapper}>
        <TypingBanner />
      </div>

      {/* 섹션 - max-width 제한 */}
      <div className={styles.sectionWrapper}>
        {/* 필터 */}
        <div className={styles.filterWrapper}>
          <BlogHomeFilter
            currentPostType={currentPostType}
            totalCount={pagination.totalElements}
            onTabClick={handleTabClick}
          />
        </div>

        {/* 컨텐츠 */}
        <div className={styles.contentsWrapper}>
          <BlogHomeContents posts={posts} />
        </div>

        {/* 페이지네이션 */}
        {pagination.totalPages > 1 && (
          <div className={styles.paginationWrapper}>
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={setPage}
              hasNext={pagination.hasNext}
              hasPrevious={pagination.hasPrevious}
            />
          </div>
        )}
      </div>
    </div>
  );
};