import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  /** If true, the observer disconnects after the first intersection. */
  once?: boolean;
}

/**
 * Custom hook that wraps the IntersectionObserver API.
 *
 * @param options - IntersectionObserver options plus an optional `once` flag.
 * @returns A tuple of [ref to attach to the target element, isIntersecting boolean].
 *
 * @example
 * ```tsx
 * const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
 * return <div ref={ref}>{isVisible && <ExpensiveComponent />}</div>;
 * ```
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {},
): [React.RefObject<T | null>, boolean] {
  const { once = false, ...observerOptions } = options;
  const ref = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (!('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsIntersecting(false);
        }
      });
    }, observerOptions);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [once, options.threshold, options.root, options.rootMargin]);

  return [ref, isIntersecting];
}
