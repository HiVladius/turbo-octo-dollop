import { useState, useEffect } from 'react';

// Breakpoints de Tailwind CSS
const breakpoints = {
  'sm': 640,
  'md': 768,
  'lg': 1024,
  'xl': 1280,
  '2xl': 1536,
} as const;

type Breakpoint = keyof typeof breakpoints;

export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const query = `(min-width: ${breakpoints[breakpoint]}px)`;
    const media = window.matchMedia(query);
    
    // Establecer el valor inicial
    setMatches(media.matches);
    
    // Función de callback para cambios
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };
    
    // Agregar listener
    media.addEventListener('change', listener);
    
    // Cleanup
    return () => media.removeEventListener('change', listener);
  }, [breakpoint]);

  return matches;
}

export function useCurrentBreakpoint(): Breakpoint | null {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint | null>(null);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width >= breakpoints['2xl']) {
        setCurrentBreakpoint('2xl');
      } else if (width >= breakpoints.xl) {
        setCurrentBreakpoint('xl');
      } else if (width >= breakpoints.lg) {
        setCurrentBreakpoint('lg');
      } else if (width >= breakpoints.md) {
        setCurrentBreakpoint('md');
      } else if (width >= breakpoints.sm) {
        setCurrentBreakpoint('sm');
      } else {
        setCurrentBreakpoint(null);
      }
    };

    // Establecer valor inicial
    updateBreakpoint();

    // Agregar listener para cambios de tamaño
    window.addEventListener('resize', updateBreakpoint);
    
    // Cleanup
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return currentBreakpoint;
}

export function useIsMobile(): boolean {
  return !useBreakpoint('md');
}

export function useIsTablet(): boolean {
  const isMd = useBreakpoint('md');
  const isLg = useBreakpoint('lg');
  return isMd && !isLg;
}

export function useIsDesktop(): boolean {
  return useBreakpoint('lg');
}
