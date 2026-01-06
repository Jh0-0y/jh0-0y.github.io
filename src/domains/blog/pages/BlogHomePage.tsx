import { Link } from 'react-router-dom';
import type { Post } from '../types';
import styles from './BlogHomePage.module.css';

// TODO: 실제 데이터로 교체
const MOCK_POSTS: Post[] = [
  {
    id: 1,
    title: 'Spring Boot에서 WebSocket 실시간 통신 구현하기',
    excerpt: 'STOMP 프로토콜을 활용한 실시간 양방향 통신 구현 과정과 트러블슈팅 경험을 공유합니다.',
    category: 'STUDY',
    tags: ['Spring Boot', 'WebSocket', 'STOMP'],
    date: '2025-01-03',
    readTime: '8분',
  },
  {
    id: 2,
    title: 'Redis를 활용한 세션 클러스터링',
    excerpt: 'MSA 환경에서 Redis를 이용해 세션을 공유하고 관리하는 방법을 알아봅니다.',
    category: 'ARCHITECTURE',
    tags: ['Redis', 'Spring Boot', 'MSA'],
    date: '2024-12-28',
    readTime: '6분',
  },
  {
    id: 3,
    title: 'WebSocket 연결이 자꾸 끊어지는 문제 해결',
    excerpt: 'Heartbeat 설정과 reconnect 로직으로 불안정한 WebSocket 연결 문제를 해결한 과정입니다.',
    category: 'TROUBLESHOOTING',
    tags: ['WebSocket', 'Spring Boot'],
    date: '2024-12-20',
    readTime: '5분',
  },
  {
    id: 4,
    title: '팀 리더로서 첫 프로젝트를 마치며',
    excerpt: '5명의 팀원과 함께한 한 달간의 프로젝트. 기술보다 더 어려웠던 것들에 대한 이야기.',
    category: 'ESSAY',
    tags: ['회고', '팀워크'],
    date: '2024-12-15',
    readTime: '4분',
  },
];

export const BlogHomePage = () => {
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
      <div className={styles.postList}>
        {MOCK_POSTS.map((post) => (
          <article key={post.id} className={styles.postCard}>
            <Link to={`/post/${post.id}`} className={styles.postLink}>
              <h2 className={styles.postTitle}>
                <span className={styles.category}>[{post.category}]</span>
                {post.title}
              </h2>
              <p className={styles.postExcerpt}>{post.excerpt}</p>
              
              <div className={styles.postMeta}>
                <div className={styles.postTags}>
                  {post.tags.map((tag) => (
                    <span key={tag} className={styles.postTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className={styles.postInfo}>
                  <span>{post.date}</span>
                  <span className={styles.dot}>·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
};