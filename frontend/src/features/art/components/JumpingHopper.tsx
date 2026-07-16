import { useRef, useEffect, useCallback, useState } from 'react';
import { useMotionValueEvent, useTransform, useScroll } from 'framer-motion';
import type { JumpingHopperProps } from '@/types/components';
import { logger } from '@/utils/logger';

const JumpingHopper: React.FC<JumpingHopperProps> = ({ setScrollToUnderwater }) => {
  const canvaRef = useRef<HTMLCanvasElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start end', 'end start'],
  });
  const [renderAnimation, setRenderAnimation] = useState(true);
  const [isScrolled, setScrolled] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [vhScrolled, setVhScrolled] = useState(false);
  const [initialFrameLoaded, setInitialFrameLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const allowScrollUp = useRef(false);
  const lastScrollY = useRef(0);
  const currentFrameIndex = useRef(1);
  const transitionStartY = useRef(0);

  const cropCanvas = useCallback(
    (img: HTMLImageElement) => {
      const canvas = canvaRef.current;
      if (
        !canvas ||
        !img ||
        !img.complete ||
        img.naturalWidth === 0 ||
        img.naturalHeight === 0
      )
        return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const canvasAspect = canvas.width / canvas.height;
      const imageAspect = img.naturalWidth / img.naturalHeight;
      let sx = 0,
        sy = 0,
        sw = img.naturalWidth,
        sh = img.naturalHeight;

      // Center crop logic
      if (imageAspect > canvasAspect) {
        sw = img.naturalHeight * canvasAspect;
        sx = (img.naturalWidth - sw) / 2;
      } else {
        sh = img.naturalWidth / canvasAspect;
        sy = (img.naturalHeight - sh) / 2;
      }

      try {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          img,
          sx,
          sy,
          sw,
          sh,
          0,
          0,
          canvas.width / (window.devicePixelRatio || 1),
          canvas.height / (window.devicePixelRatio || 1),
        );
        if (!canvasReady) setCanvasReady(true);
      } catch (error) {
        logger.warn('Error drawing image to canvas:', error);
      }
    },
    [canvasReady],
  );

  // Load and render initial frame immediately
  useEffect(() => {
    const canvas = canvaRef.current;
    if (!canvas) return;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = `art/frames/1.webp`;
    img.onload = () => {
      if (img.complete && img.naturalWidth > 0 && img.naturalHeight > 0) {
        cropCanvas(img);
        setInitialFrameLoaded(true);
      } else {
        logger.warn('Initial frame loaded but appears broken');
        setInitialFrameLoaded(true);
      }
    };
    img.onerror = (error) => {
      logger.warn('Failed to load initial frame:', error);
      setInitialFrameLoaded(true);
    };
  }, [cropCanvas]);

  useEffect(() => {
    const canvas = canvaRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      if (!canvas) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext('2d');

      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);

        // Re-render current frame after resize
        if (imagesLoaded && images[currentFrameIndex.current - 1]) {
          const img = images[currentFrameIndex.current - 1];
          if (img && img.complete && img.naturalWidth > 0) {
            cropCanvas(img);
          }
        } else if (initialFrameLoaded) {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = `art/frames/1.webp`;
          img.onload = () => {
            if (img.complete && img.naturalWidth > 0) {
              cropCanvas(img);
            }
          };
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [imagesLoaded, images, initialFrameLoaded, cropCanvas]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const isScrolledUp = scrollY < lastScrollY.current;

      if (!isScrolled) setScrolled(true);

      // Start transition zone earlier for smoother experience
      if (scrollY >= 3.7 * vh && renderAnimation && !isTransitioning) {
        setIsTransitioning(true);
        transitionStartY.current = scrollY;
      }

      // Complete transition after a buffer zone
      if (scrollY >= 4.3 * vh && renderAnimation) {
        setRenderAnimation(false);
        if (!allowScrollUp.current) allowScrollUp.current = true;
      }

      if (!vhScrolled && scrollY >= 3 * vh) {
        setVhScrolled(true);
      }

      // More lenient scroll lock — allow small movements during transition
      if (!allowScrollUp.current && isScrolledUp) {
        const scrollDiff = lastScrollY.current - scrollY;
        const maxAllowedReverse = isTransitioning ? 50 : 20;

        if (scrollDiff > maxAllowedReverse) {
          requestAnimationFrame(() => {
            window.scrollTo({
              top: lastScrollY.current - maxAllowedReverse,
              behavior: 'auto',
            });
          });
        } else {
          lastScrollY.current = scrollY;
        }
      } else {
        lastScrollY.current = scrollY;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: false });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [renderAnimation, isScrolled, vhScrolled, isTransitioning]);

  // Load all frames
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;
    const totalFrames = 179;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      img.src = `art/frames/${i}.webp`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
          setImages(loadedImages);
        }
      };
      img.onerror = () => {
        logger.warn(`Failed to load frame ${i}`);
        loadedCount++;
        if (loadedCount === totalFrames) {
          setImagesLoaded(true);
          setImages(loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const currentIndex = useTransform(scrollYProgress, [0, 1], [1, 179]);

  const render = useCallback(
    (index: number) => {
      if (!imagesLoaded || index < 1 || index > 179) return;

      const img = images[index - 1];
      if (!img || !img.complete || img.naturalWidth === 0) {
        if (img && !img.complete) {
          img.onload = () => {
            if (currentFrameIndex.current === index) {
              cropCanvas(img);
            }
          };
        }
        return;
      }

      currentFrameIndex.current = index;
      if (index === 145) setScrollToUnderwater?.(true);
      cropCanvas(img);
    },
    [images, imagesLoaded, cropCanvas, setScrollToUnderwater],
  );

  const getNonAnimationElement = useCallback(
    (backgroundName: string = 'wheedit-empty.jpg') => {
      const isEmptyBackground = backgroundName.includes('empty');

      return (
        <div
          style={{
            backgroundImage: `url(/${backgroundName})`,
            display: renderAnimation ? 'none' : 'block',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: isEmptyBackground ? '51.25vw' : '100vh',
            minHeight: isEmptyBackground ? '782px' : '100vh',
            overflow: 'hidden',
            opacity: renderAnimation ? 0 : 1,
            transition: 'opacity 0.6s ease-in-out',
          }}
        />
      );
    },
    [renderAnimation],
  );

  useMotionValueEvent(currentIndex, 'change', (latest) => {
    const startingFrame = 34.01528617134731;
    const frameIndex = Math.round(latest - startingFrame);
    render(frameIndex);
  });

  // Preload critical frames for smoother experience
  useEffect(() => {
    if (imagesLoaded) {
      [1, 2, 3, 179].forEach((i) => {
        if (images[i - 1]) {
          const img = images[i - 1];
          if (!img.complete) {
            img.decode?.().catch(() => {});
          }
        }
      });
    }
  }, [imagesLoaded, images]);

  return (
    <>
      {renderAnimation && (
        <div
          ref={scrollRef}
          className="relative w-full h-[300vh] z-1 overflow-hidden"
        >
          <canvas
            ref={canvaRef}
            className="w-full h-full min-h-160 object-cover object-center lg:object-top pointer-events-none z-0 overflow-hidden"
            style={{
              position: vhScrolled ? 'sticky' : 'fixed',
              top: vhScrolled ? '0' : '50%',
              transform: vhScrolled ? 'none' : 'translateY(-50%)',
              opacity: initialFrameLoaded ? 1 : 0,
              transition: 'opacity 0.3s ease-in-out',
            }}
          />
          {/* Loading indicator */}
          {!initialFrameLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
              <div className="text-lg text-gray-600">Loading...</div>
            </div>
          )}
        </div>
      )}

      {!renderAnimation && getNonAnimationElement('wheedit-empty.jpg')}
    </>
  );
};

export default JumpingHopper;
