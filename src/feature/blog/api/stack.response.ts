import type { StackGroup } from '../types/stack.enums';

/**
 * 스택 기본 응답
 * 백엔드: StackResponse.Response
 */
export interface StackResponse {
  id: number;
  name: string;
  stackGroup: StackGroup;
}

/**
 * 스택 + 게시글 수 응답
 * 백엔드: StackResponse.StackWithCount
 */
export interface StackWithCount {
  id: number;
  name: string;
  stackGroup: StackGroup;
  postCount: number;
}

/**
 * 그룹별 스택 응답
 * 백엔드: StackResponse.GroupedStacks
 * 주의: 백엔드에서 groupedTags로 반환함
 */
export interface GroupedStacks {
  groupedTags: Record<StackGroup, StackWithCount[]>;
}

/**
 * 인기 스택 응답
 * 백엔드: StackResponse.PopularStack
 */
export interface PopularStack {
  rank: number;
  id: number;
  name: string;
  postCount: number;
}