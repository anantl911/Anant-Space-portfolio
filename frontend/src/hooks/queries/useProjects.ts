import { useQuery } from '@tanstack/react-query';
import projectApi from '@/api/projects.api';
import { queryKeys } from '../queryKeys';
import localProjects from '@/data/projects';

const STALE_MINS = 60;
const USE_LOCAL_PROJECTS = import.meta.env.VITE_USE_LOCAL_PROJECTS === 'true';

export const useProjects = () => {
  return useQuery({
    queryKey: queryKeys.projects.all,
    queryFn: async () => {
      if (USE_LOCAL_PROJECTS) {
        return localProjects;
      }
      try {
        const data = await projectApi.listProjects();
        if (!data || data.length === 0) {
          console.warn('No projects found from backend, falling back to local data.');
          return localProjects;
        }
        return data;
      } catch (error) {
        console.warn('Backend fetch failed, falling back to local projects data.', error);
        return localProjects;
      }
    },
    staleTime: STALE_MINS * 60 * 1000, 
  });
};
