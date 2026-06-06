import { useState, useRef, useEffect, useCallback } from 'react';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'subsection-author-info', label: 'Home' },
  { id: 'author-projects', label: 'Projects' },
  { id: 'author-experience', label: 'Experience' },
  { id: 'section-education', label: 'Education' },
];

const ScrollProgress: React.FC = () => {
  const [activeSection, setActiveSection] = useState('subsection-author-info');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const sectionIds = sections.map((s) => s.id);

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Allow some time for DOM elements to mount
    const timeoutId = setTimeout(() => {
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el && observerRef.current) {
          observerRef.current.observe(el);
        }
      });
    }, 500);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="hidden lg:flex fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex-col gap-6">
      <div className="absolute right-1 top-0 bottom-0 w-[1px] bg-gray-700 -z-10" />
      {sections.map((sec) => (
        <div
          key={sec.id}
          className="group flex items-center justify-end gap-3 cursor-pointer relative"
          onClick={() => scrollTo(sec.id)}
        >
          <span
            className={`text-xs font-mono uppercase tracking-widest text-[#facd8a] absolute right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 ${
              activeSection === sec.id
                ? 'opacity-100 translate-x-0'
                : 'translate-x-2'
            }`}
          >
            {sec.label}
          </span>
          <div
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 z-10 ${
              activeSection === sec.id
                ? 'bg-[#facd8a] border-[#facd8a] scale-125 shadow-[0_0_10px_#facd8a]'
                : 'bg-[#1a2224] border-gray-500 group-hover:border-[#facd8a]'
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default ScrollProgress;
