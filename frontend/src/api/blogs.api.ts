import { BlogApiResponse } from "@/types/api";
import { backendApi } from "./axios";
import { blogPaths } from "./paths";
import { BlogInput, BlogList } from "@/types/models/blogs";

const blogApi = {
    create: async (blogData: BlogInput) => {
        const { data: responseData } = await backendApi.post<BlogApiResponse<any>>(blogPaths.create, blogData);
        return responseData;
    },
    list: async (params?: { page?: number; limit?: number; tag?: string }) => {
        const { data } = await backendApi.get<BlogApiResponse<BlogList>>(blogPaths.list, { params });
        return data;
    },
    getById: async (id: string) => {
        const { data } = await backendApi.get<BlogApiResponse<any>>(blogPaths.getById(id));
        return data;
    },
    getBySlug: async (slug: string) => {
        const { data } = await backendApi.get<BlogApiResponse<any>>(blogPaths.getBySlug(slug));
        return data;
    },
    update: async (id: string, blogData: Partial<BlogInput>) => {
        const { data: responseData } = await backendApi.patch<BlogApiResponse<any>>(blogPaths.updateById(id), blogData);
        return responseData;
    },
    delete: async (id: string) => {
        const { data } = await backendApi.delete<BlogApiResponse<any>>(blogPaths.deleteById(id));
        return data;
    },
};

export default blogApi;
