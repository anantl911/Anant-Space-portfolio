import type { BlogInput, BlogUpdateInput, BlogQuery, BlogData } from "../../types/blogs.js";
import { Blog } from "../../models/blogs.js";

export const BlogRepository = {
    create: async (data: BlogData) => {
        const blog = new Blog(data);
        return await blog.save();
    },

    findById: async (id: string) => {
        return await Blog.findById(id).lean();
    },
    findBySlug: async (slug: string) => {
        return await Blog.findOne({ slug }).lean();
    },

    findAll: async (query: BlogQuery) => {
        const { visibleFor, tag, search, page = 1, limit = 10 } = query;
        const filter: Record<string, unknown> = {};

        if (visibleFor) {
            filter.visibleFor = visibleFor;
        }

        if (tag) {
            filter.tags = tag;
        }

        if (search) {
            const regex = new RegExp(search, "i");
            filter.$or = [{ title: regex }, { content: regex }];
        }

        const skip = (page - 1) * limit;

        const [blogs, total] = await Promise.all([
            Blog.find(filter).select('-content').sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            Blog.countDocuments(filter),
        ]);

        return { blogs, total, page, limit, totalPages: Math.ceil(total / limit) };
    },

    update: async (id: string, data: BlogUpdateInput) => {
        return await Blog.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
    },

    delete: async (id: string) => {
        return await Blog.findByIdAndDelete(id).lean();
    },
};
