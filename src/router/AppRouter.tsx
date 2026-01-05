import { BlogLayout } from '@/domains/blog/layouts';
import { BlogHomePage, BlogPostPage, BlogWritePage } from '@/domains/blog/pages';
import { NotFoundPage } from '@/pages/notfound';
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <BlogLayout />,
    children: [
      {
        index: true,
        element: <BlogHomePage />,
      },
      {
        path: 'post/:id',
        element: <BlogPostPage />,
      },
      {
        path: 'write',
        element: <BlogWritePage />,
      },
      {
        path: 'edit/:id',
        element: <BlogWritePage />,
      },
    ],
  },

  {
    path: '*',
    element: <NotFoundPage />,
  },
],
  {
    basename: '/jh0-0y-blog',
  }
);