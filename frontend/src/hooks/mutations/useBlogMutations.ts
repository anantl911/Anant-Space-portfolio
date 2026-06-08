import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../queryKeys";
import blogApi from "../../api/blogs.api";
import type { BlogInput } from "@/types/models/blogs";


export const useCreateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: BlogInput) => blogApi.create(data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.blogs.all
            });
        }
    });
};

export const useUpdateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, data }: { id: string, data: Partial<BlogInput> }) => 
            blogApi.update(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all })
        }
    })
};

export const useDeleteBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => blogApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.blogs.all });
        }
    })
}
