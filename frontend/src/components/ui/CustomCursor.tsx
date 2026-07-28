import { useEffect, useRef } from 'react';

const TRAIL_COUNT = 5;

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const trail = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({ x: -100, y: -100 }))
  );

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    window.addEventListener('mousemove', move);

    let animationId: number;

    const animate = () => {
      // Ring smooth follow
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }

      // Trail chain follow
      let prevX = mouse.current.x;
      let prevY = mouse.current.y;

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const pt = trail.current[i];
        pt.x += (prevX - pt.x) * 0.35;
        pt.y += (prevY - pt.y) * 0.35;

        const el = trailRefs.current[i];
        if (el) {
          el.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0) translate(-50%, -50%) scale(${1 - i * 0.15})`;
        }

        prevX = pt.x;
        prevY = pt.y;
      }

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', move);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      {/* Faint starlight trail pool */}
      {Array.from({ length: TRAIL_COUNT }).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            trailRefs.current[index] = el;
          }}
          className="cursor-trail-dot"
          style={{
            top: 0,
            left: 0,
            opacity: Math.max(0.65 - index * 0.1, 0.12),
          }}
        />
      ))}

      {/* Main glowing star dot */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ top: 0, left: 0 }}
      />

      {/* Outer celestial ring */}
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ top: 0, left: 0 }}
      />
    </>
  );
}