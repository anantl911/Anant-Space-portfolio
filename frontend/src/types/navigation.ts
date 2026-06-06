/** Navigation type definitions. */

export type NavLinkGroup = string[];

/**
 * Navigation links are organized as a tuple of two groups:
 * - Group 0: Left-side navigation (Home, Games, Blog, About)
 * - Group 1: Right-side navigation (Paintings, Questions, Conversations, Dreams)
 */
export type NavLinks = [NavLinkGroup, NavLinkGroup];
