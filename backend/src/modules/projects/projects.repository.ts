import type { ProjectInput, ProjectUpdateInput, ProjectQuery } from "../../types/projects.js";
import { Project } from "../../models/project.js";

export const ProjectRepository = {
    create: async (data: ProjectInput) => {
        const project = new Project(data);
        return await project.save();
    },

    findById: async (id: string) => {
        return await Project.findById(id).lean();
    },

    findAll: async (query: ProjectQuery) => {
        const { visibleFor, techTag, search, page = 1, limit = 10 } = query;
        const filter: Record<string, unknown> = {};

        if (visibleFor) {
            filter.visibleFor = visibleFor;
        }

        if (techTag) {
            filter.techTags = techTag;
        }

        if (search) {
            const regex = new RegExp(search, "i");
            filter.$or = [{ title: regex }, { description: regex }];
        }

        const skip = (page - 1) * limit;

        const [projects, total] = await Promise.all([
            Project.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
            Project.countDocuments(filter),
        ]);

        return { projects, total, page, limit, totalPages: Math.ceil(total / limit) };
    },

    update: async (id: string, data: ProjectUpdateInput) => {
        return await Project.findByIdAndUpdate(id, { $set: data }, { new: true, runValidators: true }).lean();
    },

    delete: async (id: string) => {
        return await Project.findByIdAndDelete(id).lean();
    },
};
