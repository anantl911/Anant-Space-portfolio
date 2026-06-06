import { Project } from "@/types/models/project";

export const flattenTechTags = (techTags: Project['techTags']): string[] => {
  const { general, frontend, backend, database, desktop, others } = techTags;
  return [...general, ...frontend, ...backend, ...database, ...desktop, ...others];
};

export const formatDate = (iso: string): string => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};