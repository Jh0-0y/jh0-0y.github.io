import type { PostType, PostStatus } from '../types/post.enums';

export interface CreatePostRequest {
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  status?: PostStatus;
  stacks?: string[];
  tags?: string[];
}

export interface UpdatePostRequest {
  title: string;
  excerpt: string;
  postType: PostType;
  content: string;
  status?: PostStatus;
  stacks?: string[];
  tags?: string[];
}
