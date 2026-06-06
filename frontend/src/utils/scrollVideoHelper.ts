/**
 * Synchronizes a video element's playback position with scroll progress
 * relative to a section element.
 *
 * @param videoEl - The `<video>` element to control
 * @param sectionEl - The section whose scroll position drives the video
 * @param scrollMultiplier - Optional multiplier for scroll sensitivity (default: 1)
 * @returns A cleanup function that removes event listeners and cancels animation frames
 */
export function syncVideoToScroll(
  videoEl: HTMLVideoElement,
  sectionEl: HTMLElement,
  scrollMultiplier: number = 1,
): (() => void) | undefined {
  if (!videoEl || !sectionEl) return undefined;

  let targetTime = 0;
  let animationFrameId: number;

  const update = (): void => {
    if (!videoEl.duration) {
      animationFrameId = requestAnimationFrame(update);
      return;
    }

    const currentTime = videoEl.currentTime;
    const delta = targetTime - currentTime;

    videoEl.currentTime += delta * 0.1;
    animationFrameId = requestAnimationFrame(update);
  };

  const onScroll = (): void => {
    const rect = sectionEl.getBoundingClientRect();
    let scrollFraction = -rect.top / rect.height;
    scrollFraction *= scrollMultiplier;
    scrollFraction = Math.min(Math.max(scrollFraction, 0), 1);

    targetTime = scrollFraction * videoEl.duration;
  };

  const init = (): void => {
    if (videoEl.readyState >= 1) {
      window.addEventListener('scroll', onScroll);
      update();
    } else {
      videoEl.addEventListener('loadedmetadata', () => {
        window.addEventListener('scroll', onScroll);
        update();
      });
    }
  };

  const cleanup = (): void => {
    window.removeEventListener('scroll', onScroll);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  };

  init();
  return cleanup;
}
