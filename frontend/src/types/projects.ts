/** Project-related type definitions. */

export interface ProjectLinks {
  github?: string;
  demo?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string[];
  image: string[];
  techInvolved: Record<string, string>;
  date: string;
  links: ProjectLinks;
}
