import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/stores/auth/authStore';

// API 기본 URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Axios 인스턴스 생성
export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // 쿠키를 포함해서 요청 (중요!)
  withCredentials: true,
});

// 응답 인터셉터 - 401 에러 시 토큰 재발급 시도
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 401 에러 + 재시도 안 한 경우 + refresh/login/signup 요청이 아닌 경우
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/refresh') &&
      !originalRequest.url?.includes('/auth/login') &&
      !originalRequest.url?.includes('/auth/signup')
    ) {
      originalRequest._retry = true;

      try {
        // 토큰 재발급 요청 (쿠키가 자동으로 포함됨)
        await apiClient.post('/auth/refresh');

        // 원래 요청 재시도
        return apiClient(originalRequest);
      } catch (refreshError) {
        // 재발급 실패 시 로그아웃
        useAuthStore.getState().logout();
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);