import { apiClient } from '@/services/core/apiClient';
import type { ApiResponse } from '@/services/core/api.response';

export interface ImageUploadResponse {
  id: number;
  originalName: string;
  url: string;
  contentType: string;
  fileSize: number;
}

export const imageApi = {
  /**
   * 이미지 업로드
   */
  upload: async (file: File): Promise<ApiResponse<ImageUploadResponse>> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post<ApiResponse<ImageUploadResponse>>(
      '/images',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  },
};