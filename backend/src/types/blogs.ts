export type BlogMeta = {
    views: number;
    likes: number;
    dislikes: number;
};

export type BlogInput = {
    title: string;
    author: string;
    content: object;
    tags: string[];
    heroPicture: string;
    visibleFor: string[];
};

export type BlogData = BlogInput & {
    slug: string;
    excerpt: string;
    readingTime: number;
};

export type BlogUpdateInput = Partial<BlogInput>;

export type BlogQuery = {
    visibleFor?: string;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
};
