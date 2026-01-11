import { useParams, Link } from 'react-router-dom';
import { usePostDeteils } from '../hooks/usePostDeteils';
import { formatDate } from '../utils';
import styles from './BlogPostPage.module.css';

export const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const postId = id ? parseInt(id, 10) : undefined;

  const { post, isLoading, error } = usePostDeteils(postId);

  // 로딩 상태
  if (isLoading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>게시글을 불러오는 중...</div>
      </div>
    );
  }

  // 에러 상태
  if (error) {
    return (
      <div className={styles.page}>
        <Link to="/" className={styles.backLink}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span>목록으로</span>
        </Link>
        <div className={styles.error}>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // 게시글 없음
  if (!post) {
    return (
      <div className={styles.page}>
        <Link to="/" className={styles.backLink}>
          <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span>목록으로</span>
        </Link>
        <div className={styles.empty}>
          <p>게시글을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* 뒤로가기 */}
      <Link to="/" className={styles.backLink}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
        </svg>
        <span>목록으로</span>
      </Link>

      {/* 게시글 헤더 */}
      <header className={styles.header}>
        <span className={styles.postType}>{post.postType}</span>
        <h1 className={styles.title}>{post.title}</h1>

        {/* 스택 */}
        {post.stacks.length > 0 && (
          <div className={styles.stacks}>
            {post.stacks.map((stack) => (
              <span key={stack} className={styles.stack}>
                {stack}
              </span>
            ))}
          </div>
        )}

        {/* 태그 */}
        {post.tags.length > 0 && (
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* 메타 정보 */}
        <div className={styles.meta}>
          <span className={styles.author}>정현영</span>
          <span className={styles.dot}>·</span>
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </header>

      {/* 게시글 본문 */}
      <article className={styles.content}>
        <div className={styles.markdown}>
          {/* TODO: react-markdown 등 마크다운 라이브러리 사용 권장 */}
          <div dangerouslySetInnerHTML={{ __html: formatContent(post.content) }} />
        </div>
      </article>

      {/* 이전/다음 게시글 */}
      <nav className={styles.navigation}>
        {post.prev ? (
          <Link to={`/post/${post.prev.id}`} className={styles.navLink}>
            <span className={styles.navDirection}>이전 글</span>
            <span className={styles.navTitle}>
              <span className={styles.navPostType}>[{post.prev.postType}]</span>
              {post.prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}

        {post.next ? (
          <Link to={`/post/${post.next.id}`} className={`${styles.navLink} ${styles.navNext}`}>
            <span className={styles.navDirection}>다음 글</span>
            <span className={styles.navTitle}>
              <span className={styles.navPostType}>[{post.next.postType}]</span>
              {post.next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
};

// TODO: 실제로는 react-markdown + rehype-highlight 등 사용 권장
function formatContent(content: string): string {
  return content
    .replace(/^## (.+)$/gm, '<h2 id="$1">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 id="$1">$1</h3>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>');
}