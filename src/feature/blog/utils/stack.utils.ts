import type { StackGroup } from '@/api/stack/types';

/**
 * 스택 그룹 우선순위
 * 낮을수록 먼저 표시
 */
const STACK_GROUP_PRIORITY: Record<StackGroup, number> = {
  LANGUAGE: 1,
  FRAMEWORK: 2,
  LIBRARY: 3,
  DATABASE: 4,
  DEVOPS: 5,
  KNOWLEDGE: 6,
  TOOL: 7,
  ETC: 8
};

/**
 * 스택 그룹 우선순위 반환
 */
export const getStackGroupPriority = (stackGroup: StackGroup): number => {
  return STACK_GROUP_PRIORITY[stackGroup] ?? 999;
};

/**
 * 스택 정렬 (그룹 우선순위 → 이름순)
 */
export const sortStacks = <T extends { stackGroup: StackGroup; name: string }>(
  stacks: T[]
): T[] => {
  return [...stacks].sort((a, b) => {
    // 1. 그룹 우선순위
    const priorityDiff = getStackGroupPriority(a.stackGroup) - getStackGroupPriority(b.stackGroup);
    if (priorityDiff !== 0) return priorityDiff;

    // 2. 이름순 (가나다/알파벳)
    return a.name.localeCompare(b.name, 'ko');
  });
};

/**
 * 스택 이름 배열 정렬 (그룹 정보가 있는 스택 목록 기준)
 * - 전체 스택 목록에서 그룹 정보를 찾아서 정렬
 */
export const sortStackNames = <T extends { stackGroup: StackGroup; name: string }>(
  stackNames: string[],
  allStacks: T[]
): string[] => {
  const stackMap = new Map(allStacks.map((stack) => [stack.name, stack]));

  return [...stackNames].sort((a, b) => {
    const stackA = stackMap.get(a);
    const stackB = stackMap.get(b);

    // 그룹 정보가 없으면 맨 뒤로
    if (!stackA && !stackB) return a.localeCompare(b, 'ko');
    if (!stackA) return 1;
    if (!stackB) return -1;

    // 1. 그룹 우선순위
    const priorityDiff = getStackGroupPriority(stackA.stackGroup) - getStackGroupPriority(stackB.stackGroup);
    if (priorityDiff !== 0) return priorityDiff;

    // 2. 이름순
    return a.localeCompare(b, 'ko');
  });
};