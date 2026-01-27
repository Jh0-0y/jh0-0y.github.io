import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/feature/auth/stores/authStore';
import { toast } from '@/shared/toast/useToast';
import { getErrorMessage } from './api.error';
import type { ErrorResponse } from './api.response';
import { _getLoadingStore } from '@/shared/loading/useLoading';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://sealog-api.o-r.kr/api';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// 로딩 최소 표시 시간 관리
const loadingStartTimes = new Map<string, number>();
const MIN_LOADING_TIME = 300; // 최소 0.3초

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    if ((config as any).skipLoading) return config;

    const requestId = `${config.url}_${Date.now()}`;
    (config as any).requestId = requestId;

    // 즉시 로딩 표시 & 시작 시간 기록
    _getLoadingStore().showLoading();
    loadingStartTimes.set(requestId, Date.now());

    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  async (response) => {
    const requestId = (response.config as any).requestId;
    if (requestId) {
      const startTime = loadingStartTimes.get(requestId);
      if (startTime) {
        const elapsed = Date.now() - startTime;
        const remainingTime = MIN_LOADING_TIME - elapsed;

        // 최소 1초 표시 보장
        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }

        loadingStartTimes.delete(requestId);
      }
      _getLoadingStore().hideLoading();
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { 
      _retry?: boolean;
      _skipGlobalErrorHandler?: boolean;
      requestId?: string;
    };

    // 로딩 정리 (최소 1초 보장)
    if (originalRequest?.requestId) {
      const startTime = loadingStartTimes.get(originalRequest.requestId);
      if (startTime) {
        const elapsed = Date.now() - startTime;
        const remainingTime = MIN_LOADING_TIME - elapsed;

        if (remainingTime > 0) {
          await new Promise(resolve => setTimeout(resolve, remainingTime));
        }

        loadingStartTimes.delete(originalRequest.requestId);
      }
      _getLoadingStore().hideLoading();
    }

    // 401 에러 처리
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh') &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/auth/signup')
    ) {
      originalRequest._retry = true;

      try {
        await apiClient.post('/auth/refresh', {}, { skipLoading: true } as any);
        return apiClient(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // 글로벌 에러 처리
    if (!originalRequest._skipGlobalErrorHandler) {
      const errorResponse = error.response?.data as ErrorResponse | undefined;
      const hasFieldErrors = errorResponse?.errors && Object.keys(errorResponse.errors).length > 0;
      
      if (!hasFieldErrors) {
        const errorMessage = getErrorMessage(error);
        toast.error(errorMessage);
      }
    }

    return Promise.reject(error);
  }
);

declare module 'axios' {
  export interface AxiosRequestConfig {
    skipLoading?: boolean;
  }
}