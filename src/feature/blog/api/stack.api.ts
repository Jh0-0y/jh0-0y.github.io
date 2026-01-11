import { apiClient } from '@/services/core/apiClient';
import type { ApiResponse } from '@/services/core/api.response';
import type { StackGroup } from '../types/stack.enums';
import type {
  StackResponse,
  StackWithCount,
  GroupedStacks,
  PopularStack,
} from './stack.response';
import type { CreateStackRequest, UpdateStackRequest } from './stack.request';

export const stackApi = {
  /**
   * 전체 스택 목록 조회
   * GET /api/stacks
   */
  getAllStacks: async (): Promise<ApiResponse<StackResponse[]>> => {
    const response = await apiClient.get<ApiResponse<StackResponse[]>>('/stacks');
    return response.data;
  },

  /**
   * 그룹별 스택 목록 조회
   * GET /api/stacks/group/{stackGroup}
   */
  getStacksByGroup: async (stackGroup: StackGroup): Promise<ApiResponse<StackResponse[]>> => {
    const response = await apiClient.get<ApiResponse<StackResponse[]>>(
      `/stacks/group/${stackGroup}`
    );
    return response.data;
  },

  /**
   * 스택 + 게시글 수 목록 조회 (사이드바용)
   * GET /api/stacks/with-count
   */
  getStacksWithCount: async (): Promise<ApiResponse<StackWithCount[]>> => {
    const response = await apiClient.get<ApiResponse<StackWithCount[]>>('/stacks/with-count');
    return response.data;
  },

  /**
   * 그룹별 스택 + 게시글 수 목록 조회 (사이드바 All Stacks용)
   * GET /api/stacks/grouped
   */
  getGroupedStacks: async (): Promise<ApiResponse<GroupedStacks>> => {
    const response = await apiClient.get<ApiResponse<GroupedStacks>>('/stacks/grouped');
    return response.data;
  },

  /**
   * 인기 스택 조회 (사이드바 Popular Stacks용)
   * GET /api/stacks/popular?limit=5
   */
  getPopularStacks: async (limit: number = 5): Promise<ApiResponse<PopularStack[]>> => {
    const response = await apiClient.get<ApiResponse<PopularStack[]>>('/stacks/popular', {
      params: { limit },
    });
    return response.data;
  },

  /**
   * 스택 생성
   * POST /api/stacks
   */
  createStack: async (request: CreateStackRequest): Promise<ApiResponse<StackResponse>> => {
    const response = await apiClient.post<ApiResponse<StackResponse>>('/stacks', request);
    return response.data;
  },

  /**
   * 스택 수정
   * PUT /api/stacks/{stackId}
   */
  updateStack: async (
    stackId: number,
    request: UpdateStackRequest
  ): Promise<ApiResponse<StackResponse>> => {
    const response = await apiClient.put<ApiResponse<StackResponse>>(
      `/stacks/${stackId}`,
      request
    );
    return response.data;
  },

  /**
   * 스택 삭제
   * DELETE /api/stacks/{stackId}
   */
  deleteStack: async (stackId: number): Promise<ApiResponse<void>> => {
    const response = await apiClient.delete<ApiResponse<void>>(`/stacks/${stackId}`);
    return response.data;
  },
};