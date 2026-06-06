import { useQuery } from '@tanstack/react-query';
import projectApi from '@/api/projects.api';
import { queryKeys } from '../queryKeys';

const STALE_MINS = 60;

export const useProjects = () => {
  return useQuery({
    queryKey: queryKeys.projects.all,
    queryFn: projectApi.listProjects,
    staleTime: STALE_MINS * 60 * 1000, 
  });
};
