import { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import {
  HiOutlineCode,
  HiOutlineCube,
  HiOutlinePuzzle,
  HiOutlineDatabase,
  HiOutlineCloud,
  HiOutlineLightBulb,
  HiOutlineTerminal,
  HiOutlineDotsHorizontal,
} from 'react-icons/hi';

import { STACK_GROUP_LABELS, STACK_GROUP_ORDER, type StackGroup } from '@/api/stack/types';
import styles from './StackList.module.css';
import { useStacksSidebar } from '@/feature/blog/hooks/stack/useStacksSidebar';

// 그룹별 아이콘 매핑
const GROUP_ICONS: Record<StackGroup, React.ComponentType<{ className?: string }>> = {
  LANGUAGE: HiOutlineCode,
  FRAMEWORK: HiOutlineCube,
  LIBRARY: HiOutlinePuzzle,
  DATABASE: HiOutlineDatabase,
  DEVOPS: HiOutlineCloud,
  KNOWLEDGE: HiOutlineLightBulb,
  TOOL: HiOutlineTerminal,
  ETC: HiOutlineDotsHorizontal,
};

interface StackListProps {
  onStackSelect?: () => void;
}

export const StackList = ({ onStackSelect }: StackListProps) => {
  const navigate = useNavigate();
  const params = useParams<{ postType?: string; group?: string; stack?: string }>();
  const [searchParams] = useSearchParams();
  const { groupedStacks, isLoading } = useStacksSidebar();

  // 현재 선택된 스택 (URL path에서 읽기)
  const selectedStack = params.stack || null;

  // 펼쳐진 그룹 상태 관리
  const [expandedGroups, setExpandedGroups] = useState<Set<StackGroup>>(new Set());

  // 그룹 토글 핸들러
  const handleGroupToggle = (group: StackGroup) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) {
        next.delete(group);
      } else {
        next.add(group);
      }
      return next;
    });
  };

  // 스택 클릭 핸들러
  const handleStackClick = (stackName: string, stackGroup: StackGroup) => {
    const groupPath = stackGroup.toLowerCase();
    const keyword = searchParams.get('q');

    // 이미 선택된 스택이면 해제 (홈으로)
    if (selectedStack === stackName) {
      navigate(keyword ? `/?q=${keyword}` : '/');
    } else {
      // 새 스택 선택
      const basePath = `/${groupPath}/${stackName}`;
      navigate(keyword ? `${basePath}?q=${keyword}` : basePath);
    }

    // 모바일에서 사이드바 닫기
    onStackSelect?.();
  };

  // 그룹별 전체 포스트 수 계산
  const getGroupPostCount = (stacks: Array<{ postCount: number }>) => {
    return stacks.reduce((sum, stack) => sum + stack.postCount, 0);
  };

  if (isLoading) {
    return <div className={styles.loading}>로딩중</div>;
  }

  // 스택이 없을 때
  if (groupedStacks && Object.values(groupedStacks).every((g) => g.length === 0)) {
    return (
      <div className={styles.emptyState}>
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
        <p>등록된 스택이 없습니다</p>
      </div>
    );
  }

  return (
    <div className={styles.scrollArea}>
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>All Stacks</h3>
        {groupedStacks &&
          STACK_GROUP_ORDER.map((group) => {
            const stacks = groupedStacks[group];

            // 해당 그룹에 스택이 없으면 스킵
            if (!stacks || stacks.length === 0) return null;

            const isExpanded = expandedGroups.has(group);
            const groupPostCount = getGroupPostCount(stacks);
            const IconComponent = GROUP_ICONS[group];

            return (
              <div
                key={group}
                className={`${styles.stackGroup} ${isExpanded ? styles.expanded : ''}`}
              >
                {/* 그룹 헤더 (클릭하면 펼침/접힘) */}
                <div
                  className={`${styles.groupHeader} ${
                    stacks.some((s) => s.name === selectedStack) ? styles.active : ''
                  }`}
                  onClick={() => handleGroupToggle(group)}
                >
                <div className={styles.groupInfo}>
                  <span className={styles.groupIcon}>
                    <IconComponent />
                  </span>
            
                    <span className={styles.groupLabel}>{STACK_GROUP_LABELS[group]}</span>
                    <span className={styles.groupCount}>{groupPostCount}</span>
                  </div>
                  <svg
                    className={styles.groupArrow}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>

                {/* 스택 목록 (아코디언) */}
                <div className={styles.groupStacks}>
                  {stacks.map((stack) => (
                    <button
                      key={stack.id}
                      className={`${styles.stack} ${
                        selectedStack === stack.name ? styles.active : ''
                      }`}
                      onClick={() => handleStackClick(stack.name, group)}
                    >
                      <span>{stack.name}</span>
                      <span className={styles.stackCountSmall}>{stack.postCount}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};