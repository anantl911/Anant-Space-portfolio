import { ProjectList } from "@/types/axios"
import { backendApi } from "./axios"
import { projectPaths } from "./paths"

const projectApi = {
    // TODO: This doesn't actually create project. Appropriately handle when you'll add
    // ON-DEMAND project addition.
    createProject: async () => {
        const { data } = await backendApi.get<ProjectList>(projectPaths.list);
        return data.projects;
    },
    listProjects: async () => {
        const { data } = await backendApi.get<ProjectList>(projectPaths.list);
        return data.projects;
    }
}

export default projectApi;