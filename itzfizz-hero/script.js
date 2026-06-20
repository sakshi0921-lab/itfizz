/* ============================================================
   ItzFizz — Scroll-driven hero
   ============================================================ */

(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Build the letter-spaced headline ---------- */
  function buildHeadline() {
    const el = document.getElementById('headline');
    const words = [
      { text: 'WELCOME', accent: false },
      { text: 'ITZFIZZ', accent: true },
    ];

    words.forEach((word, wi) => {
      word.text.split('').forEach((letter) => {
        const span = document.createElement('span');
        span.className = 'ch' + (word.accent ? ' ch--fizz' : '');
        span.textContent = letter;
        el.appendChild(span);
      });
      if (wi < words.length - 1) {
        const gap = document.createElement('span');
        gap.className = 'gap';
        gap.style.display = 'inline-block';
        gap.style.width = '0.6em';
        el.appendChild(gap);
      }
    });
  }

  /* ---------- 2. Count-up for the stat percentages ---------- */
  function animateCounts() {
    document.querySelectorAll('.stat').forEach((stat) => {
      const target = parseInt(stat.dataset.target, 10);
      const digits = stat.querySelector('.stat__digits');
      const counter = { val: 0 };
      gsap.to(counter, {
        val: target,
        duration: 1.1,
        ease: 'power1.out',
        onUpdate: () => {
          digits.textContent = Math.round(counter.val);
        },
      });
    });
  }

  function setCountsToFinal() {
    document.querySelectorAll('.stat').forEach((stat) => {
      stat.querySelector('.stat__digits').textContent = stat.dataset.target;
    });
  }

  /* ---------- 3. Page-load intro animation ---------- */
  function playIntro() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero__eyebrow', { opacity: 1, y: 0, duration: 0.6 }, 0.1)
      .to(
        '.hero__headline .ch',
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.025 },
        0.3
      )
      .to('.hero__sub', { opacity: 1, duration: 0.6 }, '-=0.35')
      .to(
        '.car',
        { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
        '-=0.25'
      )
      .to('.speedlines', { opacity: 1, duration: 0.4 }, '-=0.5')
      .to(
        '.speedlines span',
        { scaleX: 1, duration: 0.5, stagger: 0.06, ease: 'power2.out' },
        '-=0.4'
      )
      .to(
        '.stat',
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
        '-=0.35'
      )
      .add(animateCounts, '-=0.3')
      .to('.scrollcue', { opacity: 1, duration: 0.5 }, '-=0.1');

    return tl;
  }

  /* ---------- 4. Core feature: scroll-tied car animation ---------- */
  function initScrollAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    const heroScroll = gsap.timeline({
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: '+=120%',
        scrub: 1, // numeric scrub = built-in interpolation/easing lag, tied to scroll position
        pin: true,
        anticipatePin: 1,
      },
      defaults: { ease: 'none' },
    });

    heroScroll
      .to('#railFill', { scaleX: 1 }, 0)
      .to(
        '#car',
        {
          x: () => Math.min(window.innerWidth * 0.34, 360),
          y: -16,
          rotate: -3,
          scale: 1.12,
        },
        0
      )
      .to('.car__wheel--front', { rotation: 900 }, 0)
      .to('.car__wheel--rear', { rotation: 900 }, 0)
      .to(
        '#speedlines',
        { x: -60, opacity: 0.35 },
        0
      )
      .to(
        '.speedlines span',
        { scaleX: 1.6, stagger: 0.03 },
        0
      )
      .to('.hero__headline', { y: -50, opacity: 0.18 }, 0)
      .to('.hero__sub', { y: -30, opacity: 0 }, 0)
      .to('.hero__eyebrow', { opacity: 0 }, 0)
      .to('#stats', { y: 16, opacity: 0.55 }, 0);
  }

  /* ---------- 5. Scroll-cue button ---------- */
  function initScrollCue() {
    const cue = document.getElementById('scrollcue');
    cue.addEventListener('click', () => {
      const next = document.querySelector('.next');
      if (next) next.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    buildHeadline();
    initScrollCue();

    if (reduceMotion) {
      setCountsToFinal();
      return; // CSS media query already shows everything in its final state
    }

    playIntro();
    initScrollAnimation();
  });
})();
