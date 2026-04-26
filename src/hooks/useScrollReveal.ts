import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: string;
  duration?: number;
  ease?: string;
  stagger?: number;
  delay?: number;
  start?: string;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      from = { opacity: 0, y: 40 },
      to = { opacity: 1, y: 0 },
      duration = 0.8,
      ease = 'power3.out',
      stagger = 0,
      delay = 0,
      start = 'top 85%',
    } = options;

    const ctx = gsap.context(() => {
      const targets = stagger > 0 ? ref.current!.children : ref.current;
      gsap.fromTo(targets, from, {
        ...to,
        duration,
        ease,
        stagger,
        delay,
        scrollTrigger: {
          trigger: ref.current,
          start,
          toggleActions: 'play none none none',
        },
      });
    }, ref);

    return () => ctx.revert();
  }, []);

  return ref;
}
