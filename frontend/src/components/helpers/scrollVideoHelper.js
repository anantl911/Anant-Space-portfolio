export function syncVideoToScroll(videoEl, sectionEl, scrollMultiplier = 1) {
  if (!videoEl || !sectionEl) return;

  let targetTime = 0;
  let animationFrameId;

  const update = () => {
    if (!videoEl.duration) {
      animationFrameId = requestAnimationFrame(update);
      return;
    }

    const currentTime = videoEl.currentTime;
    const delta = targetTime - currentTime;

    videoEl.currentTime += delta * 0.1; // lower = smoother

    animationFrameId = requestAnimationFrame(update);
  };

  const onScroll = () => {
    const rect = sectionEl.getBoundingClientRect();
    let scrollFraction = -rect.top / rect.height;
    scrollFraction *= scrollMultiplier;
    scrollFraction = Math.min(Math.max(scrollFraction, 0), 1);

    targetTime = scrollFraction * videoEl.duration;
  };

  const init = () => {
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

  const cleanup = () => {
    window.removeEventListener('scroll', onScroll);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  };

  init();
  return cleanup;
}
