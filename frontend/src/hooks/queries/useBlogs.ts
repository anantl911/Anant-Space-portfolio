import { useQuery } from '@tanstack/react-query';
import blogApi from '@/api/blogs.api';
import { queryKeys } from '../queryKeys';

const STALE_MINS = 60;

export const useBlogs = (params?: { page?: number; limit?: number; tag?: string }) => {
  return useQuery({
    queryKey: queryKeys.blogs.list(params),
    queryFn: () => blogApi.list(params),
    staleTime: STALE_MINS * 60 * 1000,
  });
};

export const useBlogDetail = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.blogs.slug(slug),
    queryFn: () => blogApi.getBySlug(slug),
    enabled: !!slug,
    staleTime: STALE_MINS * 60 * 1000,
  });
};
