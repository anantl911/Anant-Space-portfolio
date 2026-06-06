import type { ReactNode } from 'react';

/** Shared component prop type definitions. */

export interface HeaderProps {
  anantSpaceLogo: string;
}

export interface HomeSectionTextProps {
  sectionID: string;
  textClass: string;
  sectionText: ReactNode;
}

export interface ParticlesProps {
  id: string;
  particleCount: number;
  movementSpeed: number;
  particleColors: string[];
  linkEnabled: boolean;
  zIndex?: number;
}

export interface GameBoxProps {
  gameName: string;
  gameDescription: string;
  imageSource: string;
}

export interface JumpingHopperProps {
  setScrollToUnderwater?: (value: boolean) => void;
}
