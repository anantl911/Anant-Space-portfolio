import Particles, { initParticlesEngine } from '@tsparticles/react';
import { useEffect, useMemo, useState } from 'react';
import { loadSlim } from '@tsparticles/slim';
import type { ParticlesProps } from '@/types/components';
import type { ISourceOptions } from '@tsparticles/engine';
import { logger } from '@/utils/logger';

const ParticlesBackground: React.FC<ParticlesProps> = ({
  id,
  particleCount,
  movementSpeed,
  particleColors,
  linkEnabled,
  zIndex,
}) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (): Promise<void> => {
    logger.debug(`Particles loaded: ${id}`);
  };

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: false,
        zIndex: -1,
      },
      fpsLimit: 180,
      interactivity: {
        events: {
          onClick: {
            enable: false,
            mode: 'repulse',
          },
          onHover: {
            enable: true,
            mode: 'grab',
          },
        },
        modes: {
          grab: {
            distance: 150,
            links: {
              opacity: 0.1,
            },
          },
        },
      },

      particles: {
        color: {
          value: particleColors,
        },
        links: {
          color: '#FFFFFF',
          distance: 150,
          enable: linkEnabled,
          opacity: 0.005,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: {
            default: 'bounce',
          },
          random: true,
          speed: movementSpeed,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: particleCount,
        },
        opacity: {
          value: 0.8,
        },
        shape: {
          type: 'circle',
        },
        size: {
          value: { min: 0.5, max: 1.5 },
        },
      },
      detectRetina: true,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (!init) return null;

  return (
    <Particles
      id={id}
      particlesLoaded={particlesLoaded}
      options={options}
      style={{
        position: 'absolute',
        top: 0,
        minHeight: '630px',
        left: 0,
        zIndex: zIndex ?? -1,
      }}
    />
  );
};

export default ParticlesBackground;
