import type { ProjectInput, ProjectUpdateInput, ProjectQuery } from "../../types/projects.js";
import { ProjectRepository } from "./projects.repository.js";
import ApiError from "../../utils/ApiError.js";

export const ProjectsService = {
    createProject: async (data: ProjectInput) => {
        return await ProjectRepository.create(data);
    },

    getProjectById: async (id: string) => {
        const project = await ProjectRepository.findById(id);

        if (!project) {
            throw new ApiError(404, "Project not found", null);
        }

        return project;
    },

    getAllProjects: async (query: ProjectQuery) => {
        const sanitized: ProjectQuery = {
            page: Math.max(1, Number(query.page) || 1),
            limit: Math.min(50, Math.max(1, Number(query.limit) || 10)),
        };

        if (query.visibleFor) sanitized.visibleFor = query.visibleFor;
        if (query.techTag) sanitized.techTag = query.techTag;
        if (query.search) sanitized.search = query.search;

        return await ProjectRepository.findAll(sanitized);
    },

    updateProject: async (id: string, data: ProjectUpdateInput) => {
        const project = await ProjectRepository.update(id, data);

        if (!project) {
            throw new ApiError(404, "Project not found", null);
        }

        return project;
    },

    deleteProject: async (id: string) => {
        const project = await ProjectRepository.delete(id);

        if (!project) {
            throw new ApiError(404, "Project not found", null);
        }

        return project;
    },
};
