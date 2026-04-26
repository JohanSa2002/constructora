import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: '15+', label: 'Años de experiencia' },
  { number: '200+', label: 'Proyectos entregados' },
  { number: '50MW', label: 'Energía solar instalada' },
  { number: '98%', label: 'Clientes satisfechos' },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !textRef.current || !statsRef.current) return;

    const ctx = gsap.context(() => {
      // Text block from left
      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Stats cards from right with stagger
      gsap.fromTo(
        statsRef.current!.children,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="nosotros"
      ref={sectionRef}
      data-theme="light"
      className="bg-nexus-bg-secondary section-padding"
    >
      <div className="container-nexus">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Block */}
          <div ref={textRef}>
            <span className="text-eyebrow text-nexus-construction mb-4 block">
              SOBRE NOSOTROS
            </span>
            <h2 className="text-section-title text-nexus-text-dark mb-6">
              Una empresa, tres soluciones integrales
            </h2>
            <p className="text-lg text-nexus-text-dark-secondary leading-relaxed">
              En Nexus combinamos la experiencia en construcción tradicional con la visión inmobiliaria del futuro y la tecnología de energía solar. Nuestro enfoque integral nos permite acompañarte desde la concepción de tu proyecto hasta su operación sostenible.
            </p>
            <p className="text-base text-nexus-text-dark-secondary leading-relaxed mt-4">
              Ya sea que busques construir tu hogar, invertir en propiedades o reducir tu huella energética, tenemos el equipo y la tecnología para hacerlo realidad.
            </p>
          </div>

          {/* Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white p-8 rounded-[16px] shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
              >
                <div className="text-stat-number text-nexus-text-dark">{stat.number}</div>
                <div className="text-nexus-text-dark-secondary mt-2 text-base">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
