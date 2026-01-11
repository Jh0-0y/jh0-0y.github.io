import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, GuestRoute } from '@/router/guards';

import { BlogLayout } from '@/feature/blog/layouts/BlogLayout';
import { BlogHomePage, BlogPostPage, BlogWritePage, BlogEditPage } from '@/feature/blog/pages';

import { LoginPage, SignUpPage } from '@/pages/auth';
import { ProfilePage } from '@/feature/portfolio/pages';

import { NotFoundPage } from '@/pages/notfound';
import { ProjectDetailPage } from '@/feature/portfolio/pages/ProjectDetailPage';

export const AppRouter = () => (
  <BrowserRouter basename="/">
    <Routes>
      {/* 블로그 (공개) */}
      <Route path="/" element={<BlogLayout />}>
        <Route index element={<BlogHomePage />} />
        <Route path="post/:id" element={<BlogPostPage />} />
        
        {/* 글쓰기/수정 (인증 필요) */}
        <Route path="write" element={
          <ProtectedRoute>
            <BlogWritePage />
          </ProtectedRoute>
        } />
        <Route path="post/:id/edit" element={
          <ProtectedRoute>
            <BlogEditPage />
          </ProtectedRoute>
        } />
      </Route>

      {/* 포트폴리오 (공개) */}
      <Route path="/portfolio" element={<ProfilePage />} />
      <Route path="/portfolio/project/:id" element={<ProjectDetailPage />} />

      {/* 로그인/회원가입 (비로그인만) */}
      <Route path="/login" element={
        <GuestRoute>
          <LoginPage />
        </GuestRoute>
      } />
      <Route path="/signup" element={
        <GuestRoute>
          <SignUpPage />
        </GuestRoute>
      } />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </BrowserRouter>
);