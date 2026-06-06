import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/** Tech stack type definitions. */

export interface TechIconImage {
  iconImg: string;
  color: string;
}

/** A tech icon can be a FontAwesome icon, an image object, or a plain image path string. */
export type TechIconValue = IconDefinition | TechIconImage;

/** Database sub-entries can be FontAwesome icons or TechIconImage objects. */
export type DatabaseEntry = IconDefinition | TechIconImage;

/** The full technologies map, where 'database' key contains nested entries. */
export type Technologies = Record<string, TechIconValue | Record<string, DatabaseEntry>>;
