import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleLine1Ref = useRef<HTMLDivElement>(null);
  const titleLine2Ref = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        titleLine1Ref.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        titleLine2Ref.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.75'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 0.5, duration: 0.6, ease: 'power2.out' },
        '-=0.3'
      );

    return () => {
      tl.kill();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      data-theme="dark"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/images/hero-fallback.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: 'linear-gradient(to bottom, rgba(12,12,12,0.3) 0%, rgba(12,12,12,0.7) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-[2] text-center section-padding w-full">
        <div className="max-w-[800px] mx-auto">
          {/* Eyebrow */}
          <div ref={eyebrowRef} className="text-eyebrow text-nexus-solar mb-6 opacity-0">
            CONSTRUCTORA · INMOBILIARIA · ENERGÍA SOLAR
          </div>

          {/* Title */}
          <div className="overflow-hidden">
            <div ref={titleLine1Ref} className="text-hero-title text-nexus-text-primary opacity-0">
              Construimos
            </div>
          </div>
          <div className="overflow-hidden">
            <div ref={titleLine2Ref} className="text-hero-title text-nexus-text-primary opacity-0">
              tu futuro
            </div>
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg text-nexus-text-secondary max-w-[560px] mx-auto mt-6 leading-relaxed opacity-0"
          >
            Más de 15 años creando espacios habitables e impulsando la transición energética de México.
          </p>

          {/* CTA Row */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 opacity-0">
            <a
              href="#servicios"
              onClick={(e) => handleNavClick(e, '#servicios')}
              className="text-cta bg-nexus-solar text-[#0C0C0C] px-8 py-3.5 rounded-[8px] hover:bg-[#FFC733] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,184,0,0.25)] transition-all duration-300"
            >
              Conoce nuestros servicios
            </a>
            <a
              href="#proyectos"
              onClick={(e) => handleNavClick(e, '#proyectos')}
              className="text-cta border border-[rgba(255,255,255,0.3)] text-nexus-text-primary px-8 py-3.5 rounded-[8px] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300 bg-transparent"
            >
              Ver proyectos
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] opacity-0"
      >
        <ChevronDown className="w-6 h-6 text-nexus-text-primary animate-bounce-scroll" />
      </div>
    </section>
  );
}
