interface TechTags {
  general: string[];
  frontend: string[];
  backend: string[];
  database: string[];
  desktop: string[];
  others: string[];
}

interface DesignatedTag {
  tag: string;
  detail: string | null;
}

export interface ProjectLinks {
  youtube?: string;
  github?: string;
  deployment?: string;
  as_blog?: string;
}

export interface Project {
  _id: string;
  title: string;
  description: string[];
  techTags: TechTags;
  designatedTag: DesignatedTag;
  links?: ProjectLinks;
  visibleFor: string[];
  screenshots: string[];
  startedAt: string; // ISO date string
  finishedAt: string; // ISO date string
  priority: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}

export type ProjectListData = {
  total: number,
  page: number,
  limit: number,
  totalPages: number,
  projects: Project[]
};

