/** Scroll reveals, counters, carousels, and hero/stats 3D tilt. */

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

  // Hero 3D mouse tilt
  const tiltStage = document.querySelector<HTMLElement>('[data-tilt-stage]');
  const tiltInner = document.querySelector<HTMLElement>('[data-tilt-inner]');
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  if (tiltStage && tiltInner && hero && window.matchMedia('(min-width: 980px)').matches) {
    let raf = 0;
    let tx = 0;
    let ty = 0;

    const apply = () => {
      tiltInner.style.transform = `rotateX(${ty}deg) rotateY(${tx}deg)`;
      raf = 0;
    };

    hero.addEventListener(
      'pointermove',
      (e) => {
        const rect = tiltStage.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        tx = px * 14;
        ty = py * -10;
        if (!raf) raf = requestAnimationFrame(apply);
      },
      { passive: true },
    );

    hero.addEventListener(
      'pointerleave',
      () => {
        tx = 0;
        ty = 0;
        if (!raf) raf = requestAnimationFrame(apply);
      },
      { passive: true },
    );
  }

  // Stats card micro-tilt
  document.querySelectorAll<HTMLElement>('[data-tilt-card]').forEach((card) => {
    const face = card.querySelector<HTMLElement>('.stat__face');
    if (!face) return;

    card.addEventListener(
      'pointermove',
      (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        face.style.transform = `rotateX(${8 + py * -10}deg) rotateY(${px * 12}deg) translateZ(12px)`;
      },
      { passive: true },
    );

    card.addEventListener(
      'pointerleave',
      () => {
        face.style.transform = '';
      },
      { passive: true },
    );
  });

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

  // Marquees only while their section is visible
  const bindLoop = (selector: string) => {
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) return;
    const loopIo = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          el.classList.toggle('is-active', entry.isIntersecting);
          if (!entry.isIntersecting) {
            el.querySelectorAll<HTMLVideoElement>('video').forEach((v) => {
              v.pause();
              v.closest('.testimonial__media')?.classList.remove('is-playing');
            });
          }
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -5% 0px' },
    );
    loopIo.observe(el);
  };
  bindLoop('[data-work-loop]');
  bindLoop('[data-testimonial-loop]');

  // Testimonial clips: muted autoplay when card is on screen (one at a time)
  const ensureVideoSrc = (video: HTMLVideoElement) => {
    const src = video.dataset.src;
    if (!src || video.getAttribute('src')) return;
    const source = video.querySelector('source');
    if (source) source.src = src;
    video.src = src;
    video.load();
  };

  const pauseAllTestimonialVideos = (except?: HTMLVideoElement) => {
    document.querySelectorAll<HTMLVideoElement>('[data-testimonial-video] video').forEach((other) => {
      if (other === except) return;
      other.pause();
      other.closest('.testimonial__media')?.classList.remove('is-playing');
    });
  };

  const videoIo = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const wrap = entry.target as HTMLElement;
        const video = wrap.querySelector<HTMLVideoElement>('video');
        if (!video) continue;

        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          ensureVideoSrc(video);
          video.muted = true;
          video.loop = true;
          pauseAllTestimonialVideos(video);
          wrap.classList.add('is-playing');
          void video.play().catch(() => {});
        } else {
          video.pause();
          wrap.classList.remove('is-playing');
        }
      }
    },
    { threshold: [0.55, 0.7] },
  );

  document.querySelectorAll<HTMLElement>('[data-testimonial-video]').forEach((wrap) => {
    videoIo.observe(wrap);
  });

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

  // Wheel → horizontal scroll for carousels on desktop
  document.querySelectorAll<HTMLElement>('[data-carousel]').forEach((strip) => {
    strip.addEventListener(
      'wheel',
      (e) => {
        if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
        if (strip.scrollWidth <= strip.clientWidth + 8) return;
        strip.scrollLeft += e.deltaY;
        e.preventDefault();
      },
      { passive: false },
    );
  });
}
