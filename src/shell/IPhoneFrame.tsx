import React, { useEffect, useRef, useState } from 'react';
import { DesignSystemGallery } from '../design-system/gallery/DesignSystemGallery';
import { useTheme } from '../design-system/theme';
import { colors } from '../design-system/tokens';
import { useTripleTap } from './useTripleTap';

const FRAME_WIDTH = 393;
const FRAME_HEIGHT = 852;
const FRAME_PADDING = 24;

export const IPhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scale, setScale] = useState(1);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const handleIslandTap = useTripleTap(() => setGalleryOpen(true));
  const { theme } = useTheme();
  const bezelColor = theme === 'dark' ? colors.brown[500] : colors.black;
  const islandColor = theme === 'dark' ? colors.brown[700] : colors.black;

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scaleX = (w - FRAME_PADDING * 2) / FRAME_WIDTH;
      const scaleY = (h - FRAME_PADDING * 2) / FRAME_HEIGHT;
      setScale(Math.min(1, scaleX, scaleY));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div
        style={{
          width: FRAME_WIDTH,
          height: FRAME_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          borderRadius: 56,
          padding: 10,
          backgroundColor: bezelColor,
          boxShadow: '0 40px 80px rgba(0, 0, 0, 0.5), inset 0 0 0 2px rgba(255, 255, 255, 0.06)',
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden bg-primary"
          style={{ borderRadius: 48 }}
        >
          {children}

          <button
            type="button"
            onClick={handleIslandTap}
            aria-label="Hidden: triple-tap to open the design system gallery"
            className="absolute left-1/2 z-50 -translate-x-1/2 cursor-default"
            style={{
              top: 11,
              width: 126,
              height: 37,
              borderRadius: 999,
              backgroundColor: islandColor,
              border: 'none',
              padding: 0,
            }}
          />

          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 z-50 -translate-x-1/2"
            style={{
              bottom: 8,
              width: 134,
              height: 5,
              borderRadius: 999,
              backgroundColor: 'var(--content-primary)',
              opacity: 0.9,
            }}
          />

          <DesignSystemGallery isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />
        </div>
      </div>
    </div>
  );
};
