import { useMemo } from 'react';
import { useStacksQuery } from '@/api/stack/queries';
import type { StackGroup, StackResponse } from '@/api/stack/types';

/**
 * 게시글 작성/수정 폼용 스택 훅
 * 사용처: StackSection
 */
export const useStacksForForm = () => {
  const { data: stacks, isLoading } = useStacksQuery();

  const groupedStacks = useMemo(() => {
    if (!stacks) return null;

    return stacks.reduce(
      (acc, stack) => {
        const group = stack.stackGroup as StackGroup;
        if (!acc[group]) acc[group] = [];
        acc[group].push(stack);
        return acc;
      },
      {} as Record<StackGroup, StackResponse[]>
    );
  }, [stacks]);

  return { groupedStacks, isLoading };
};