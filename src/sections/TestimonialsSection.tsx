import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      'Nexus transformó nuestra visión de hogar en realidad. El equipo de construcción fue impecable y la instalación de paneles solares nos ha reducido el recibo de luz en un 90%.',
    name: 'Carlos Mendoza',
    role: 'Propietario, Casa Verde Valle',
    avatar: '/images/avatar-1.jpg',
  },
  {
    quote:
      'Como desarrollador, valoro la puntualidad y calidad. Nexus entregó el proyecto comercial 3 semanas antes de lo previsto, con acabados de primer nivel.',
    name: 'Ana Patricia López',
    role: 'Directora, Inversiones ALFA',
    avatar: '/images/avatar-2.jpg',
  },
  {
    quote:
      'La transición a energía solar para nuestra planta industrial fue fluida gracias a Nexus. El retorno de inversión se logró en 18 meses.',
    name: 'Roberto Sánchez',
    role: 'Gerente de Operaciones, Indústrias del Norte',
    avatar: '/images/avatar-3.jpg',
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !gridRef.current) return;

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
        gridRef.current!.children,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-theme="dark"
      className="bg-nexus-bg-primary section-padding"
    >
      <div className="container-nexus">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="text-eyebrow text-nexus-realstate mb-4 block">
            TESTIMONIOS
          </span>
          <h2 className="text-section-title text-nexus-text-primary">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-nexus-bg-tertiary border border-[rgba(255,255,255,0.06)] rounded-[24px] p-10"
            >
              {/* Quote icon */}
              <span className="text-nexus-solar text-5xl opacity-40 leading-none block mb-4">
                &#x275D;
              </span>

              {/* Quote */}
              <p className="text-lg text-nexus-text-primary italic leading-relaxed">
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-8">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="font-sans font-semibold text-base text-nexus-text-primary">
                    {t.name}
                  </div>
                  <div className="text-nexus-text-secondary text-sm">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
