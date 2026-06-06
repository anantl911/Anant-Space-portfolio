export type ProjectLinks = {
    youtube?: string;
    github?: string;
    deployment?: string;
    as_blog?: string;
};

export type ProjectInput = {
    title: string;
    description: string;
    techTags: string[];
    links: ProjectLinks;
    visibleFor: string[];
    screenshots: string[];
};

export type ProjectUpdateInput = Partial<ProjectInput>;

export type ProjectQuery = {
    visibleFor?: string;
    techTag?: string;
    search?: string;
    page?: number;
    limit?: number;
};
