import { Link, useParams } from 'react-router-dom';
import type { Post, AdjacentPosts, TableOfContentsSection } from '../types';
import { extractTableOfContents } from '../utils';
import styles from './BlogPostPage.module.css';

// TODO: 실제 데이터로 교체
const MOCK_POST: Post = {
  id: 1,
  title: 'Spring Boot에서 WebSocket 실시간 통신 구현하기',
  excerpt: 'STOMP 프로토콜을 활용한 실시간 양방향 통신 구현 과정과 트러블슈팅 경험을 공유합니다.',
  category: 'Study',
  tags: ['Spring Boot', 'WebSocket', 'STOMP'],
  date: '2025-01-03',
  readTime: '8분',
  status: 'public',
  content: `## 들어가며

실시간 코딩 교육 플랫폼을 개발하면서 WebSocket을 활용한 실시간 통신을 구현했습니다. 
이 글에서는 STOMP 프로토콜을 활용한 구현 과정과 겪었던 문제들을 공유합니다.

## WebSocket vs HTTP

HTTP는 클라이언트가 요청을 보내야만 서버가 응답할 수 있는 단방향 통신입니다. 
반면 WebSocket은 한 번 연결되면 양방향으로 데이터를 주고받을 수 있습니다.

\`\`\`java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic", "/queue");
        config.setApplicationDestinationPrefixes("/app");
    }
    
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOriginPatterns("*")
                .withSockJS();
    }
}
\`\`\`

## STOMP 프로토콜 선택 이유

순수 WebSocket만 사용하면 메시지 형식, 라우팅 등을 직접 구현해야 합니다. 
STOMP는 이런 부분을 표준화해주어 개발 생산성을 높여줍니다.

## 트러블슈팅

### 문제: 연결이 자주 끊어지는 현상

처음에는 클라이언트 연결이 불안정했습니다. 원인을 분석해보니 heartbeat 설정이 없어서 
일정 시간 통신이 없으면 연결이 끊어지는 것이었습니다.

### 해결

heartbeat 간격을 적절히 설정하고, reconnect 로직을 추가했습니다.

## 마치며

WebSocket 구현은 처음이라 많이 헤맸지만, 실시간 통신의 원리를 이해하는 좋은 경험이었습니다. 
다음에는 Redis Pub/Sub을 활용한 다중 서버 환경에서의 WebSocket 처리를 다뤄보겠습니다.`,
};

// TODO: 실제 데이터로 교체
const MOCK_ADJACENT: AdjacentPosts = {
  prev: {
    id: 2,
    title: 'Redis를 활용한 세션 클러스터링',
    excerpt: '',
    category: 'Architecture',
    tags: [],
    date: '2024-12-28',
    readTime: '6분',
  },
  next: null,
};

export const BlogPostPage = () => {
  const { id } = useParams<{ id: string }>();

  // TODO: id로 실제 데이터 조회
  const post = MOCK_POST;
  const adjacent = MOCK_ADJACENT;

  // 목차 동적 추출
  const sections: TableOfContentsSection[] = post.content 
    ? extractTableOfContents(post.content) 
    : [];

  return (
    <div className={styles.page}>
      {/* 뒤로가기 */}
      <Link to="/blog" className={styles.backLink}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>목록으로</span>
      </Link>

      {/* 게시글 헤더 */}
      <header className={styles.header}>
        <h1 className={styles.title}>
          <span className={styles.category}>[{post.category}]</span>
          {post.title}
        </h1>
        
        <div className={styles.meta}>
          <div className={styles.tags}>
            {post.tags.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className={styles.info}>
            <span>{post.date}</span>
            <span className={styles.dot}>·</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </header>

      {/* 목차 */}
      {sections.length > 0 && (
        <nav className={styles.toc}>
          <h2 className={styles.tocTitle}>목차</h2>
          <ul className={styles.tocList}>
            {sections.map((section) => (
              <li
                key={section.id}
                className={styles.tocItem}
                data-level={section.level}
              >
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ul>
        </nav>
      )}

      {/* 게시글 본문 */}
      <article className={styles.content}>
        <div className={styles.markdown}>
          {/* TODO: 실제로는 마크다운 파서 사용 */}
          <div dangerouslySetInnerHTML={{ __html: formatContent(post.content || '') }} />
        </div>
      </article>

      {/* 이전/다음 게시글 */}
      <nav className={styles.navigation}>
        {adjacent.prev ? (
          <Link to={`/blog/post/${adjacent.prev.id}`} className={styles.navLink}>
            <span className={styles.navDirection}>이전 글</span>
            <span className={styles.navTitle}>
              <span className={styles.navCategory}>[{adjacent.prev.category}]</span>
              {adjacent.prev.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        
        {adjacent.next ? (
          <Link to={`/blog/post/${adjacent.next.id}`} className={`${styles.navLink} ${styles.navNext}`}>
            <span className={styles.navDirection}>다음 글</span>
            <span className={styles.navTitle}>
              <span className={styles.navCategory}>[{adjacent.next.category}]</span>
              {adjacent.next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
};

// TODO: 실제로는 마크다운 라이브러리 사용
function formatContent(content: string): string {
  return content
    .replace(/^## (.+)$/gm, '<h2 id="$1">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 id="$1">$1</h3>')
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\n\n/g, '</p><p>');
}