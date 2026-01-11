import { Link } from 'react-router-dom';
import { usePosts } from '../hooks/usePosts';
import { formatDate } from '../utils';
import styles from './BlogHomePage.module.css';

export const BlogHomePage = () => {
  const { posts, pagination, isLoading, error, setPage } = usePosts();

  // 로딩 상태
  if (isLoading && posts.length === 0) {
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
        <div className={styles.error}>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>다시 시도</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* 페이지 헤더 */}
      <header className={styles.header}>
        <h1 className={styles.title}>최근 글</h1>
        <p className={styles.description}>
          개발하면서 배운 것들을 기록합니다
        </p>
      </header>

      {/* 게시글 목록 */}
      {posts.length === 0 ? (
        <div className={styles.empty}>
          <p>게시글이 없습니다.</p>
        </div>
      ) : (
        <div className={styles.postList}>
          {posts.map((post) => (
            <article key={post.id} className={styles.postCard}>
              <Link to={`/post/${post.id}`} className={styles.postLink}>
                  {/* 타입 */}
                  <span className={styles.postType}>{post.postType}</span>

                  {/* 제목 */}
                  <h2 className={styles.postTitle}>{post.title}</h2>

                  {/* 설명 */}
                  <p className={styles.postExcerpt}>{post.excerpt}</p>

                  {/* 스택 */}
                  <div className={styles.postStacks}>
                    {post.stacks.map((stack) => (
                      <span key={stack} className={styles.postStack}>
                        {stack}
                      </span>
                    ))}
                  </div>

                  {/* 하단: 태그 + 메타 정보 */}
                  <div className={styles.postFooter}>
                    <div className={styles.postTags}>
                      {post.tags.map((tag) => (
                        <span key={tag} className={styles.postTag}>
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className={styles.postMeta}>
                      <span className={styles.author}>정현영</span>
                      <span className={styles.dot}>·</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
              </Link>
            </article>
          ))}
        </div>
      )}

      {/* 페이지네이션 */}
      {pagination.totalPages > 1 && (
        <nav className={styles.pagination}>
          <button
            className={styles.pageButton}
            onClick={() => setPage(pagination.page - 1)}
            disabled={!pagination.hasPrevious}
          >
            이전
          </button>

          <span className={styles.pageInfo}>
            {pagination.page + 1} / {pagination.totalPages}
          </span>

          <button
            className={styles.pageButton}
            onClick={() => setPage(pagination.page + 1)}
            disabled={!pagination.hasNext}
          >
            다음
          </button>
        </nav>
      )}
    </div>
  );
};