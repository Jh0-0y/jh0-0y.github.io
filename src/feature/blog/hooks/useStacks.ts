import { useState, useEffect, useCallback } from 'react';
import { getErrorMessage } from '@/services/core/api.error';
import { stackApi } from '../api/stack.api';
import type { StackResponse } from '../api/stack.response';
import type { StackGroup } from '../types/stack.enums';

interface UseStacksReturn {
  stacks: StackResponse[];
  groupedStacks: Record<StackGroup, StackResponse[]> | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useStacks = (): UseStacksReturn => {
  const [stacks, setStacks] = useState<StackResponse[]>([]);
  const [groupedStacks, setGroupedStacks] = useState<Record<StackGroup, StackResponse[]> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStacks = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await stackApi.getAllStacks();

      if (response.success && response.data) {
        setStacks(response.data);

        // 그룹별로 정리
        const grouped = response.data.reduce(
          (acc, stack) => {
            const group = stack.stackGroup as StackGroup;
            if (!acc[group]) {
              acc[group] = [];
            }
            acc[group].push(stack);
            return acc;
          },
          {} as Record<StackGroup, StackResponse[]>
        );

        setGroupedStacks(grouped);
      }
    } catch (err) {
      setError(getErrorMessage(err));
      console.error('Failed to fetch stacks:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStacks();
  }, [fetchStacks]);

  return {
    stacks,
    groupedStacks,
    isLoading,
    error,
    refetch: fetchStacks,
  };
};