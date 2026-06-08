
export const projectPaths = {
    list: "/project/list"
};

export const filePaths = {
    upload: "/upload/image"
};

export const blogPaths = {
    create: "/blog/create",
    list: "/blog/list",
    getById: (id: string) => `/blog/get/${id}`,
    getBySlug: (slug: string) => `/blog/slug/${slug}`,
    updateById: (id: string) => `/blog/update/${id}`,
    deleteById: (id: string) => `/blog/delete/${id}`,
};