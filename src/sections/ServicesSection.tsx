import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { HardHat, Building2, Sun, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: HardHat,
    title: 'Construcción',
    description:
      'Edificación residencial, comercial e industrial. Desarrollamos proyectos llave en mano con los más altos estándares de calidad y cumplimiento normativo.',
    accent: '#C75C2E',
    accentBg: 'rgba(199, 92, 46, 0.1)',
  },
  {
    icon: Building2,
    title: 'Inmobiliaria',
    description:
      'Desarrollo de proyectos residenciales y comerciales. Comercialización de propiedades con enfoque en zonas de alta plusvalía y sostenibilidad.',
    accent: '#2E7D6F',
    accentBg: 'rgba(46, 125, 111, 0.1)',
  },
  {
    icon: Sun,
    title: 'Paneles Solares',
    description:
      'Instalación de sistemas fotovoltaicos residenciales, comerciales e industriales. Ahorra hasta 95% en tu recibo de luz con energía limpia.',
    accent: '#FFB800',
    accentBg: 'rgba(255, 184, 0, 0.1)',
  },
];

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const autoRotateRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inactivityTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stopAutoRotate = useCallback(() => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
      autoRotateRef.current = null;
    }
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    inactivityTimeoutRef.current = setTimeout(() => {
      startAutoRotate();
    }, 10000);
  }, []);

  const startAutoRotate = useCallback(() => {
    if (autoRotateRef.current) return;
    autoRotateRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % 3);
    }, 5000);
  }, []);

  useEffect(() => {
    startAutoRotate();
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
      if (inactivityTimeoutRef.current) clearTimeout(inactivityTimeoutRef.current);
    };
  }, [startAutoRotate]);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        carouselRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleRotate = useCallback(
    (direction: number) => {
      stopAutoRotate();
      setCurrentIndex((prev) => (prev + direction + 3) % 3);
    },
    [stopAutoRotate]
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      dragStartX.current = e.clientX;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      stopAutoRotate();
    },
    [stopAutoRotate]
  );

  const handlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      setIsDragging(false);
      const deltaX = e.clientX - dragStartX.current;
      if (Math.abs(deltaX) > 50) {
        handleRotate(deltaX < 0 ? 1 : -1);
      }
    },
    [isDragging, handleRotate]
  );

  const getCardTransform = (index: number) => {
    const diff = (index - currentIndex + 3) % 3;
    if (diff === 0) {
      return 'translateX(0) translateZ(60px) rotateY(0deg)';
    } else if (diff === 1) {
      return 'translateX(120%) translateZ(-40px) rotateY(-25deg)';
    } else {
      return 'translateX(-120%) translateZ(-40px) rotateY(25deg)';
    }
  };

  const getCardOpacity = (index: number) => {
    const diff = (index - currentIndex + 3) % 3;
    return diff === 0 ? 1 : 0.5;
  };

  return (
    <section
      id="servicios"
      ref={sectionRef}
      data-theme="dark"
      className="bg-nexus-bg-primary section-padding overflow-hidden"
    >
      <div className="container-nexus">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-eyebrow text-nexus-solar mb-4 block">
            NUESTROS SERVICIOS
          </span>
          <h2 className="text-section-title text-nexus-text-primary">
            Tres áreas de excelencia
          </h2>
          <p className="text-lg text-nexus-text-secondary max-w-[640px] mx-auto mt-4 leading-relaxed">
            Soluciones completas que cubren cada etapa de tu proyecto, desde los cimientos hasta la independencia energética.
          </p>
        </div>

        {/* 3D Carousel */}
        <div
          ref={carouselRef}
          className="relative"
          style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          <div className="relative h-[480px] md:h-[420px] flex items-center justify-center">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="absolute w-[340px] md:w-[380px] bg-nexus-bg-tertiary border border-[rgba(255,255,255,0.08)] rounded-[24px] p-10 md:p-12 cursor-grab active:cursor-grabbing select-none"
                  style={{
                    transform: getCardTransform(index),
                    opacity: getCardOpacity(index),
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
                    borderTop: `4px solid ${service.accent}`,
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-20 h-20 rounded-[16px] flex items-center justify-center mb-6"
                    style={{ backgroundColor: service.accentBg }}
                  >
                    <Icon className="w-12 h-12" style={{ color: service.accent }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-subsection-title text-nexus-text-primary mb-4">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-nexus-text-secondary leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={() => handleRotate(-1)}
              className="w-12 h-12 rounded-full border border-[rgba(255,255,255,0.2)] flex items-center justify-center text-nexus-text-primary hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleRotate(1)}
              className="w-12 h-12 rounded-full border border-[rgba(255,255,255,0.2)] flex items-center justify-center text-nexus-text-primary hover:bg-[rgba(255,255,255,0.05)] transition-all duration-300"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
