/** Scroll reveals, impact counters, and work video hover. */

export function initReveal() {
  if (typeof window === 'undefined') return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');

  if (reduce) {
    targets.forEach((el) => el.classList.add('is-in'));
    document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      el.textContent = el.dataset.count || '0';
    });
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
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
  );

  targets.forEach((el) => io.observe(el));

  const stage = document.querySelector<HTMLElement>('[data-parallax]');
  if (stage && window.matchMedia('(min-width: 900px)').matches) {
    const onScroll = () => {
      const y = Math.min(window.scrollY * 0.12, 56);
      stage.style.transform = `translate3d(0, ${y}px, 0)`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Animated impact counters
  const counters = document.querySelectorAll<HTMLElement>('[data-count]');
  const countIo = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const end = Number(el.dataset.count || 0);
        const duration = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 3);
          el.textContent = String(Math.round(end * eased));
          if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        countIo.unobserve(el);
      }
    },
    { threshold: 0.4 },
  );
  counters.forEach((el) => countIo.observe(el));

  // Play short work videos on hover / in view when present
  document.querySelectorAll<HTMLVideoElement>('[data-work-video]').forEach((video) => {
    const card = video.closest('.work-card');
    const play = () => {
      void video.play().catch(() => {});
    };
    const pause = () => {
      video.pause();
      video.currentTime = 0;
    };
    card?.addEventListener('mouseenter', play);
    card?.addEventListener('mouseleave', pause);
    card?.addEventListener('focusin', play);
    card?.addEventListener('focusout', pause);
  });
}
