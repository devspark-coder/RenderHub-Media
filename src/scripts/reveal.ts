/** Scroll reveals, marquee pause, and hero parallax. */

export function initReveal() {
  if (typeof window === 'undefined') return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');

  if (reduce) {
    targets.forEach((el) => el.classList.add('is-in'));
    return;
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
  );

  targets.forEach((el) => io.observe(el));

  const stage = document.querySelector<HTMLElement>('[data-parallax]');
  if (stage) {
    const onScroll = () => {
      const y = Math.min(window.scrollY * 0.15, 64);
      const s = 1 + Math.min(window.scrollY * 0.00015, 0.06);
      stage.style.transform = `translate3d(0, ${y}px, 0) scale(${s})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Work strip drag / wheel assist
  const strip = document.querySelector<HTMLElement>('[data-strip]');
  if (strip) {
    strip.addEventListener(
      'wheel',
      (e) => {
        if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
          strip.scrollLeft += e.deltaY;
          e.preventDefault();
        }
      },
      { passive: false },
    );
  }
}
