import { useLogout } from '@/hooks/auth/useLogout';

export function LogoutButton() {
  const { logout, isLoading } = useLogout();

  return (
    <button onClick={logout} disabled={isLoading}>
      {isLoading ? '로그아웃 중...' : '로그아웃'}
    </button>
  );
}