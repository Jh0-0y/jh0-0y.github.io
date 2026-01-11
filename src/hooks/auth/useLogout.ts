import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/services/auth/auth.api';
import { useAuthStore } from '@/stores/auth/authStore';
import { getErrorMessage } from '@/services/core/api.error';

interface UseLogoutReturn {
  isLoading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  clearError: () => void;
}

export const useLogout = (): UseLogoutReturn => {
  const navigate = useNavigate();
  const { logout: clearAuth } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const logout = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError(null);

    try {
      await authApi.logout();

      // ✅ 전역 인증 상태 초기화
      clearAuth();

      // ✅ 로그인 페이지로 이동
      navigate('/login', { replace: true });
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    isLoading,
    error,
    logout,
    clearError,
  };
};