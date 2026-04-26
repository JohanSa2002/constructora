import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipo: '',
    mensaje: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !formRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
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
        formRef.current!.elements as HTMLCollectionOf<HTMLElement>,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) {
      newErrors.email = 'El correo es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Correo inválido';
    }
    if (!formData.tipo) newErrors.tipo = 'Selecciona un tipo de proyecto';
    if (!formData.mensaje.trim()) newErrors.mensaje = 'El mensaje es requerido';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setIsSubmitted(true);
  };

  const inputClass =
    'w-full bg-nexus-bg-tertiary border border-[rgba(255,255,255,0.1)] rounded-[8px] px-4 py-3.5 text-nexus-text-primary text-base placeholder:text-[rgba(255,255,255,0.25)] focus:border-nexus-solar focus:outline-none focus:shadow-[0_0_0_3px_rgba(255,184,0,0.1)] transition-all duration-300';

  const labelClass = 'text-eyebrow text-nexus-text-secondary text-xs mb-2 block';

  return (
    <section
      id="contacto"
      ref={sectionRef}
      data-theme="dark"
      className="bg-nexus-bg-primary section-padding relative overflow-hidden"
    >
      {/* Decorative gradient orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, #FFB800 0%, #C75C2E 50%, #2E7D6F 100%)',
          opacity: 0.08,
          filter: 'blur(120px)',
        }}
      />

      <div className="container-nexus relative z-[1]">
        <div ref={contentRef} className="max-w-[800px] mx-auto text-center">
          <span className="text-eyebrow text-nexus-solar mb-4 block">
            EMPIEZA HOY
          </span>
          <h2 className="text-section-title text-nexus-text-primary">
            ¿Listo para construir tu futuro?
          </h2>
          <p className="text-lg text-nexus-text-secondary max-w-[560px] mx-auto mt-4 leading-relaxed">
            Cuéntanos sobre tu proyecto y te contactaremos en menos de 24 horas con una propuesta personalizada.
          </p>
        </div>

        {isSubmitted ? (
          <div className="max-w-[600px] mx-auto mt-12 text-center bg-nexus-bg-tertiary border border-[rgba(255,255,255,0.08)] rounded-[24px] p-12">
            <div className="text-nexus-solar text-5xl mb-4">✓</div>
            <h3 className="text-subsection-title text-nexus-text-primary mb-2">
              ¡Mensaje enviado!
            </h3>
            <p className="text-nexus-text-secondary">
              Gracias por contactarnos. Te responderemos en menos de 24 horas.
            </p>
          </div>
        ) : (
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="max-w-[800px] mx-auto mt-12 text-left"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nombre */}
              <div>
                <label className={labelClass}>Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className={inputClass}
                />
                {errors.nombre && (
                  <span className="text-nexus-construction text-sm mt-1 block">{errors.nombre}</span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className={labelClass}>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className={inputClass}
                />
                {errors.email && (
                  <span className="text-nexus-construction text-sm mt-1 block">{errors.email}</span>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label className={labelClass}>Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+52 (55) 0000-0000"
                  className={inputClass}
                />
              </div>

              {/* Tipo de proyecto */}
              <div>
                <label className={labelClass}>Tipo de proyecto</label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  className={`${inputClass} appearance-none cursor-pointer`}
                >
                  <option value="" disabled>
                    Selecciona una opción
                  </option>
                  <option value="construccion">Construcción</option>
                  <option value="inmobiliaria">Inmobiliaria</option>
                  <option value="paneles-solares">Paneles Solares</option>
                  <option value="proyecto-integral">Proyecto Integral</option>
                </select>
                {errors.tipo && (
                  <span className="text-nexus-construction text-sm mt-1 block">{errors.tipo}</span>
                )}
              </div>

              {/* Mensaje */}
              <div className="md:col-span-2">
                <label className={labelClass}>Mensaje</label>
                <textarea
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos sobre tu proyecto..."
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
                {errors.mensaje && (
                  <span className="text-nexus-construction text-sm mt-1 block">{errors.mensaje}</span>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-6 text-cta bg-nexus-solar text-[#0C0C0C] py-4 rounded-[8px] hover:bg-[#FFC733] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,184,0,0.25)] transition-all duration-300 border-none cursor-pointer"
            >
              Enviar mensaje
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
