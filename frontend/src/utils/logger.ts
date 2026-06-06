/**
 * Debug logging utility.
 *
 * Logs are only emitted when the app is running in development mode
 * (`import.meta.env.DEV`). In production builds Vite tree-shakes
 * the calls away, so there is zero runtime cost.
 */

const isDev = import.meta.env.DEV;

export const logger = {
  /** General informational messages. */
  log(...args: unknown[]): void {
    if (isDev) {
      console.log('[AnantSpace]', ...args);
    }
  },

  /** Warning messages. */
  warn(...args: unknown[]): void {
    if (isDev) {
      console.warn('[AnantSpace]', ...args);
    }
  },

  /** Error messages — always logged regardless of environment. */
  error(...args: unknown[]): void {
    console.error('[AnantSpace]', ...args);
  },

  /** Debug-level messages for verbose output during development. */
  debug(...args: unknown[]): void {
    if (isDev) {
      console.debug('[AnantSpace:debug]', ...args);
    }
  },
} as const;
