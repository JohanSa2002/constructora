import { useState } from 'react';
import { Menu } from 'lucide-react';
import { useNavTheme } from '@/hooks/useNavTheme';
import { MobileMenu } from './MobileMenu';

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Servicios', href: '#servicios' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Contacto', href: '#contacto' },
];

export function Navigation() {
  const { isLight, isScrolled } = useNavTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 h-[72px] flex items-center transition-all duration-400 ${
          isScrolled
            ? isLight
              ? 'bg-[rgba(245,240,235,0.95)] backdrop-blur-[12px] border-b border-[rgba(0,0,0,0.06)]'
              : 'bg-[rgba(12,12,12,0.92)] backdrop-blur-[12px] border-b border-[rgba(255,255,255,0.06)]'
            : 'bg-transparent'
        }`}
        style={{ transition: 'color 0.4s ease, background 0.4s ease' }}
      >
        <div className="w-full flex items-center justify-between section-padding py-0">
          {/* Logo */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, '#inicio')}
            className={`font-sans font-semibold text-[18px] tracking-[0.12em] transition-colors duration-400 ${
              isLight && isScrolled ? 'text-nexus-text-dark' : 'text-nexus-text-primary'
            }`}
          >
            NEXUS
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-eyebrow transition-colors duration-400 hover:opacity-70 ${
                  isLight && isScrolled ? 'text-nexus-text-dark' : 'text-nexus-text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contacto"
              onClick={(e) => handleNavClick(e, '#contacto')}
              className="text-cta bg-nexus-solar text-[#0C0C0C] px-6 py-2.5 rounded-[8px] hover:bg-[#FFC733] hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,184,0,0.25)] transition-all duration-300"
            >
              Cotizar ahora
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <Menu
              className={`w-6 h-6 transition-colors duration-400 ${
                isLight && isScrolled ? 'text-nexus-text-dark' : 'text-nexus-text-primary'
              }`}
            />
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        links={NAV_LINKS}
        onNavClick={handleNavClick}
      />
    </>
  );
}
