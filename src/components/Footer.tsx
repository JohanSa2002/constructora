import { Instagram, Linkedin, Phone } from 'lucide-react';

const serviceLinks = ['Construcción', 'Inmobiliaria', 'Paneles Solares', 'Proyectos Integrales'];
const companyLinks = ['Nosotros', 'Proyectos', 'Blog', 'Carreras'];

export function Footer() {
  return (
    <footer className="bg-nexus-bg-tertiary pt-20 pb-10 section-padding">
      <div className="container-nexus">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <span className="font-sans font-semibold text-[18px] tracking-[0.12em] text-nexus-text-primary">
              NEXUS
            </span>
            <p className="text-nexus-text-secondary mt-4 text-base leading-relaxed">
              Construyendo el futuro con energía limpia.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-subsection-title text-nexus-text-primary mb-4 text-lg">Servicios</h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <span className="text-nexus-text-secondary hover:text-nexus-text-primary transition-colors duration-300 cursor-default text-base">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-subsection-title text-nexus-text-primary mb-4 text-lg">Empresa</h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <span className="text-nexus-text-secondary hover:text-nexus-text-primary transition-colors duration-300 cursor-default text-base">
                    {link}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-subsection-title text-nexus-text-primary mb-4 text-lg">Contacto</h4>
            <ul className="space-y-3 text-nexus-text-secondary text-base">
              <li>info@nexus.com</li>
              <li>+52 (55) 1234-5678</li>
              <li>Ciudad de México, México</li>
            </ul>
            <div className="flex items-center gap-4 mt-6">
              <span className="text-nexus-text-secondary hover:text-nexus-text-primary transition-colors duration-300 cursor-default">
                <Instagram className="w-5 h-5" />
              </span>
              <span className="text-nexus-text-secondary hover:text-nexus-text-primary transition-colors duration-300 cursor-default">
                <Linkedin className="w-5 h-5" />
              </span>
              <span className="text-nexus-text-secondary hover:text-nexus-text-primary transition-colors duration-300 cursor-default">
                <Phone className="w-5 h-5" />
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[rgba(255,255,255,0.08)] mt-16 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-nexus-text-secondary text-sm">
            © 2025 Nexus. Todos los derechos reservados.
          </p>
          <p className="text-nexus-text-secondary text-sm">
            Privacidad · Términos
          </p>
        </div>
      </div>
    </footer>
  );
}
