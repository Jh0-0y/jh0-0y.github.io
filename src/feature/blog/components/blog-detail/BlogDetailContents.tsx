import { Viewer } from '@/components/editor';
import styles from './BlogDetailContents.module.css';

interface BlogDetailContentsProps {
  /**
   * 서버에서 받은 Markdown 콘텐츠
   */
  markdownContent: string;
}

/**
 * 블로그 게시글 본문 컴포넌트 (읽기 전용)
 * - 서버에서 받은 Markdown을 Tiptap Viewer로 렌더링
 * - 편집 불가능한 읽기 전용 모드
 * - S3 URL 기반 이미지/비디오/파일 표시
 */
export const BlogDetailContents: React.FC<BlogDetailContentsProps> = ({ markdownContent }) => {
  return (
    <div className={styles.wrapper}>
      <Viewer content={markdownContent} className={styles.viewer} />
    </div>
  );
};