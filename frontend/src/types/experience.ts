import type { ReactNode } from 'react';

/** Experience-related type definitions. */

export interface ExperienceTheme {
  title: string;
  images: string[];
  tasks_description: string[];
  time: string;
}

export interface ExperienceEntry {
  title: string;
  description: string;
  detail_description?: string;
  theme?: ExperienceTheme[];
  images?: string[];
  tasks_description?: string[];
  time?: string;
  buttons?: ReactNode;
}
