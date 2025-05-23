import { useState, useEffect } from 'react';

interface ScreenInfo {
  width: number;
  height: number;
  isLandscape: boolean;
  isPortrait: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  devicePixelRatio: number;
}

export function useScreenInfo(): ScreenInfo {
  const [screenInfo, setScreenInfo] = useState<ScreenInfo>(() => {
    if (typeof window === 'undefined') {
      return {
        width: 0,
        height: 0,
        isLandscape: false,
        isPortrait: true,
        isMobile: false,
        isTablet: false,
        isDesktop: false,
        devicePixelRatio: 1,
      };
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const isLandscape = width > height;
    const isPortrait = height >= width;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;
    const devicePixelRatio = window.devicePixelRatio || 1;

    return {
      width,
      height,
      isLandscape,
      isPortrait,
      isMobile,
      isTablet,
      isDesktop,
      devicePixelRatio,
    };
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isLandscape = width > height;
      const isPortrait = height >= width;
      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;
      const isDesktop = width >= 1024;
      const devicePixelRatio = window.devicePixelRatio || 1;

      setScreenInfo({
        width,
        height,
        isLandscape,
        isPortrait,
        isMobile,
        isTablet,
        isDesktop,
        devicePixelRatio,
      });
    };

    const handleOrientationChange = () => {
      // Small delay to ensure dimensions are updated after orientation change
      setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return screenInfo;
}
