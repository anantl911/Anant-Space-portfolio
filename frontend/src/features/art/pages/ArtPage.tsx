import { useState, useRef, useEffect } from 'react';
import JumpingHopper from '../components/JumpingHopper';

const ArtPage: React.FC = () => {
  const underwaterDiv = useRef<HTMLDivElement>(null);
  const [scrollToUnderwater, setScrollToUnderwater] = useState(false);

  useEffect(() => {
    if (scrollToUnderwater && underwaterDiv.current) {
      // Optionally scroll to underwater section
      // setTimeout(() => {
      //   underwaterDiv.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // }, 2000);

      // Reset the flag after handling
      setScrollToUnderwater(false);
    }
  }, [scrollToUnderwater]);

  return (
    <article id="art">
      <JumpingHopper setScrollToUnderwater={setScrollToUnderwater} />

      <div
        ref={underwaterDiv}
        className="z-10 min-h-160 w-full bg-cover bg-no-repeat bg-center bg-[url(/wheedit-empty2.webp)]"
      />

      <div className="min-h-200 min-w-full bg-[linear-gradient(rgba(0,18,26,0.9),rgba(0,0,0,1)),url(/wheedit-empty2.webp)]" />
    </article>
  );
};

export default ArtPage;
