import { useMemo } from 'react';
import { useStacksQuery } from '@/api/stack/queries';
import { useCreateStackMutation, useDeleteStackMutation } from '@/api/stack/mutations';
import type { StackGroup, StackResponse } from '@/api/stack/types';

/**
 * 스택 관리용 훅 (CRUD)
 * 사용처: StackManageModal
 */
export const useStackManage = () => {
  const { data: stacks, isLoading } = useStacksQuery();
  const createMutation = useCreateStackMutation();
  const deleteMutation = useDeleteStackMutation();

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

  const createStack = (name: string, stackGroup: StackGroup) => {
    return createMutation.mutateAsync({ name, stackGroup });
  };

  const deleteStack = (stackId: number) => {
    return deleteMutation.mutateAsync(stackId);
  };

  return {
    groupedStacks,
    isLoading,
    createStack,
    deleteStack,
    isCreating: createMutation.isPending,
    isDeleting: deleteMutation.isPending,
    deletingId: deleteMutation.variables ?? null,
  };
};