import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import projectApi from '@/api/projects.api';


export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: projectApi.createProject,
    onSuccess: () => {
      // Invalidate the projects list cache → triggers automatic refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all });
    },
  });
};