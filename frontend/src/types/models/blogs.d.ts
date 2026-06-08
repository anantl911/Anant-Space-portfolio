export interface Blog {
    _id: Types.ObjectId;
    title: string;
    author: string;
    content: Record<string, any>;
    tags: string[];
    heroPicture: string;
    visibleFor: string[];
    meta: {
        views: number;
        likes: number;
        dislikes: number;
    };
    readingTime: number;
    status: 'draft' | 'published';
    excerpt: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}


// TODO: Put this into proper types folder.
export type BlogInput = {
    title: string;
    author: string;
    content: Record<string, unknown>;
    tags: string[];
    heroPicture: string;
    visibleFor: string[];
};

export type BlogList = {
    blogs: Blog[],
    total: number,
    page: number,
    limit: number,
    totalPages: number
}