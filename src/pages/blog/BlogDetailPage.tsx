import { useParams } from 'react-router-dom';
import { usePostDetails } from '@/feature/blog/hooks/post/usePostDeteils';
import { useTocItems } from '@/components/editor/hooks/useTocItems'; // 추가
import { TableOfContents } from '@/components/editor/base/TableOfContents';
import { 
  ThumbnailBanner,
  BlogDetailHeader,
  BlogDetailContents,
  RelatedPosts,
} from '@/feature/blog/components/blog-detail';
import styles from './BlogDetailPage.module.css';

export const BlogDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { post, isLoading, error } = usePostDetails(slug);
  
  // 추가: DOM에서 목차 추출
  const tocItems = useTocItems('.tiptap-viewer');

  // 로딩 상태
  if (isLoading) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.loading}>게시글을 불러오는 중...</div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.error}>
            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // 게시글 없음
  if (!post) {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.container}>
          <div className={styles.empty}>
            <p>게시글을 찾을 수 없습니다.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.pageWrapper}>
      {/* 썸네일 배너 */}
      <ThumbnailBanner thumbnailUrl={post.thumbnailUrl} title={post.title} />

      {/* 본문 컨테이너 */}
      <div className={styles.container}>
        {/* 게시글 헤더 */}
        <BlogDetailHeader
          postType={post.postType}
          title={post.title}
          stacks={post.stacks}
          tags={post.tags}
          createdAt={post.createdAt}
        />

        {/* 게시글 본문 */}
        <article className={styles.content}>
          <BlogDetailContents markdownContent={post.content} />
        </article>

        {/* 관련 게시글 */}
        <RelatedPosts relatedPosts={post.relatedPosts || []} />
      </div>

      {/* 목차 - 수정: items prop으로 전달 */}
      <TableOfContents items={tocItems} />
    </div>
  );
};