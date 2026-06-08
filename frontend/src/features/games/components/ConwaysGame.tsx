import { useRef, useEffect } from 'react';
import { CGOLEngine } from '../utils/CGOLEngine';

const ConwaysGame: React.FC = () => {
  const canvaRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvaRef.current) return;
    
    const engine = new CGOLEngine(canvaRef.current);
    engine.start();

    return () => {
      engine.stop();
    };
  }, []);

  return (
    <section id="cgol-game">
      <div id="game-container" className="w-full h-[45vw] min-h-[600px] relative">
        <canvas
          ref={canvaRef}
          className="absolute inset-0 w-full h-full block outline-none"
          tabIndex={0}
        />
      </div>
    </section>
  );
};

export default ConwaysGame;
