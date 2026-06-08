import type { BlogInput, BlogUpdateInput, BlogQuery, BlogData } from "../../types/blogs.js";
import { BlogRepository } from "./blogs.repository.js";
import ApiError from "../../utils/ApiError.js";
import { extractText, generateSlug } from "../../utils/BlogUtils.js";


export const BlogsService = {
    createBlog: async (data: BlogInput) => {
        const slug = generateSlug(data.title);
        const plainText = extractText(data.content as Record<string, unknown>);
        const readingTime = Math.max(1, Math.ceil(plainText.split(/\s+/).filter(Boolean).length / 200));
        const excerpt = plainText.substring(0, 200).trim() + (plainText.length > 200 ? "..." : "");

        const blogData: BlogData = { ...data, slug, readingTime, excerpt };
        return await BlogRepository.create(blogData);
    },

    getBlogById: async (id: string) => {
        const blog = await BlogRepository.findById(id);

        if (!blog) {
            throw new ApiError(404, "Blog not found", null);
        }

        return blog;
    },

    getBlogBySlug: async (slug: string) => {
        const blog = await BlogRepository.findBySlug(slug);

        if (!blog) {
            throw new ApiError(404, "Blog not found", null);
        }

        return blog;
    },

    getAllBlogs: async (query: BlogQuery) => {
        const sanitized: BlogQuery = {
            page: Math.max(1, Number(query.page) || 1),
            limit: Math.min(50, Math.max(1, Number(query.limit) || 10)),
        };

        if (query.visibleFor) sanitized.visibleFor = query.visibleFor;
        if (query.tag) sanitized.tag = query.tag;
        if (query.search) sanitized.search = query.search;

        return await BlogRepository.findAll(sanitized);
    },

    updateBlog: async (id: string, data: BlogUpdateInput) => {
        const blog = await BlogRepository.update(id, data);

        if (!blog) {
            throw new ApiError(404, "Blog not found", null);
        }

        return blog;
    },

    deleteBlog: async (id: string) => {
        const blog = await BlogRepository.delete(id);

        if (!blog) {
            throw new ApiError(404, "Blog not found", null);
        }

        return blog;
    },
};
