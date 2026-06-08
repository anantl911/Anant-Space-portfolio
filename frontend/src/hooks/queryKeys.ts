export const queryKeys = {
  projects: {
    all:    ['projects'] as const,
    detail: (id: string) => ['projects', id] as const,
  },
  blogs: {
    all:    ['blogs'] as const,
    list:   (params?: { page?: number; tag?: string }) => ['blogs', 'list', params] as const,
    detail: (id: string) => ['blogs', id] as const,
    slug:   (slug: string) => ['blogs', 'slug', slug] as const
  },
} as const;