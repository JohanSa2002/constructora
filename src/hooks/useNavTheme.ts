import { useEffect, useState } from 'react';

export function useNavTheme() {
  const [isLight, setIsLight] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      const sections = document.querySelectorAll<HTMLElement>('[data-theme]');
      const navHeight = 72;

      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navHeight && rect.bottom >= navHeight) {
          setIsLight(section.dataset.theme === 'light');
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isLight, isScrolled };
}
