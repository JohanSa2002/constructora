import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { image: '/images/project-1.jpg', category: 'Residencial', name: 'Casa Verde Valle', location: 'Ciudad de México', accent: '#C75C2E' },
  { image: '/images/project-2.jpg', category: 'Solar', name: 'Planta Fotovoltaica Norte', location: 'Querétaro', accent: '#FFB800' },
  { image: '/images/project-3.jpg', category: 'Comercial', name: 'Torre Empresarial Nexus', location: 'Monterrey', accent: '#2E7D6F' },
  { image: '/images/project-4.jpg', category: 'Residencial', name: 'Condominio Los Alamos', location: 'Guadalajara', accent: '#C75C2E' },
  { image: '/images/project-5.jpg', category: 'Solar', name: 'Rooftop Industrial Toluca', location: 'Estado de México', accent: '#FFB800' },
  { image: '/images/project-6.jpg', category: 'Inmobiliaria', name: 'Desarrollo Playa Dorada', location: 'Cancún', accent: '#2E7D6F' },
];

export function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current || !galleryRef.current) return;

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
        galleryRef.current,
        { opacity: 0, x: 80 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
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

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      data-theme="light"
      className="bg-nexus-bg-secondary py-[var(--space-section-y)]"
    >
      {/* Header */}
      <div ref={headerRef} className="text-center section-padding pb-0">
        <span className="text-eyebrow text-nexus-construction mb-4 block">
          PROYECTOS DESTACADOS
        </span>
        <h2 className="text-section-title text-nexus-text-dark">
          Obras que hablan por sí solas
        </h2>
      </div>

      {/* Horizontal Scroll Gallery */}
      <div
        ref={galleryRef}
        className="flex gap-6 overflow-x-auto scroll-snap-x mandatory mt-12 pt-4 pb-4"
        style={{
          scrollbarWidth: 'none',
          paddingLeft: 'var(--space-container-x)',
          paddingRight: 'var(--space-container-x)',
        }}
      >
        {projects.map((project) => (
          <div
            key={project.name}
            className="flex-none w-[300px] md:w-[420px] scroll-snap-align-start group"
          >
            {/* Image */}
            <div className="aspect-[4/5] rounded-[16px] overflow-hidden mb-4">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-full object-cover transition-transform duration-600 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </div>

            {/* Info */}
            <span
              className="text-eyebrow text-xs"
              style={{ color: project.accent }}
            >
              {project.category}
            </span>
            <h3 className="text-subsection-title text-nexus-text-dark mt-1 text-xl">
              {project.name}
            </h3>
            <p className="text-nexus-text-dark-secondary text-base mt-1">
              {project.location}
            </p>
          </div>
        ))}

        {/* Scroll hint */}
        <div className="flex-none flex items-center pl-4">
          <span className="text-nexus-text-dark-secondary text-base opacity-60 whitespace-nowrap">
            Desliza para ver más →
          </span>
        </div>
      </div>
    </section>
  );
}
