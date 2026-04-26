import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

export function MobileMenu({ isOpen, onClose, links, onNavClick }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current || !linksRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(overlayRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.fromTo(
        linksRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.15 }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          if (overlayRef.current) {
            overlayRef.current.style.visibility = 'hidden';
          }
        },
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-nexus-bg-primary flex flex-col items-center justify-center opacity-0 invisible"
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-6 p-2 text-nexus-text-primary"
        aria-label="Cerrar menú"
      >
        <X className="w-7 h-7" />
      </button>

      <div ref={linksRef} className="flex flex-col items-center gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => onNavClick(e, link.href)}
            className="font-display text-[32px] font-semibold text-nexus-text-primary hover:text-nexus-solar transition-colors duration-300"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contacto"
          onClick={(e) => onNavClick(e, '#contacto')}
          className="text-cta bg-nexus-solar text-[#0C0C0C] px-8 py-3 rounded-[8px] mt-4"
        >
          Cotizar ahora
        </a>
      </div>
    </div>
  );
}
