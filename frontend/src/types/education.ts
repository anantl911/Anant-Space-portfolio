/** Education-related type definitions. */

export interface EducationEntry {
  institution: string;
  degree: string;
  year: string;
  grade: string;
  place: string;
  desc: string;
}

export interface ExtracurricularEntry {
  title: string;
  description: string;
  icon: string;
}

export interface CertificationEntry {
  title: string;
  issuer: string;
  date: string;
  link: string;
}
