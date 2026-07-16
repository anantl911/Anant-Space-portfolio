import { useRef, useState, useEffect } from 'react';
import ParticlesBackground from '@/components/particles/ParticlesBackground';

const MiscInfo: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showParticles, setShowParticles] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setShowParticles(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShowParticles(true);
          }
        });
      },
      { threshold: 0.01 },
    );

    if (sectionRef.current) {
      observerRef.current.observe(sectionRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const renderStars = () => (
    <>
      {showParticles && (
        <div
          className="absolute inset-0 z-0 opacity-0 fade-in"
          style={{ pointerEvents: 'none' }}
        >
          <ParticlesBackground
            id="particles-background"
            particleCount={100}
            movementSpeed={0.2}
            particleColors={['#FFFFFF', '#5d36c0']}
            linkEnabled={true}
          />
        </div>
      )}

      {showParticles && (
        <div
          className="absolute inset-0 z-0 opacity-0 fade-in"
          style={{ pointerEvents: 'none' }}
        >
          <ParticlesBackground
            id="particles-foreground"
            particleCount={Math.floor(Math.random() * 5)}
            movementSpeed={30}
            particleColors={['#ca7e7e']}
            linkEnabled={false}
          />
        </div>
      )}
    </>
  );

  const renderFigures = () => (
    <div id="transparent-figures" className="hidden sm:flex">
      <div className="min-h-[630px] w-full bg-cover absolute z-10 bg-[url(/home/hills.png)]" />
      <div className="min-h-[620px] w-full bg-cover absolute z-20 top-[10px] bg-[url(/home/figures.png)]" />
    </div>
  );

  return (
    <div
      ref={sectionRef}
      id="wow"
      className="min-h-[630px] bg-[url(/home/anant_space_bg.png)] bg-cover relative w-full overflow-hidden"
    >
      {renderStars()}
      {renderFigures()}
    </div>
  );
};

export default MiscInfo;
