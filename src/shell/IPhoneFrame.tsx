import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { DesignSystemGallery } from '../design-system/gallery/DesignSystemGallery';
import { useTheme } from '../design-system/theme';
import { colors } from '../design-system/tokens';
import { FRAME_PRESETS, useFrame } from './FrameProvider';
import type { FramePreset } from './FrameProvider';
import { useDoubleTap } from './useDoubleTap';
import { useLongPress } from './useLongPress';

const FRAME_PADDING = 24;
const TOUCH_DEVICE_QUERY = '(pointer: coarse) and (hover: none)';

export const IPhoneFrame: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const frame = useFrame();
  const preset = frame?.preset ?? 'medium';
  const setPreset = frame?.setPreset;
  const spec = FRAME_PRESETS[preset];

  const [scale, setScale] = useState(1);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [presetMenuOpen, setPresetMenuOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(TOUCH_DEVICE_QUERY).matches,
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const handleIslandTap = useDoubleTap(() => setGalleryOpen(true));
  const longPress = useLongPress(() => setPresetMenuOpen(true));
  const { theme } = useTheme();
  const bezelColor = theme === 'dark' ? colors.brown[500] : colors.black;
  const islandColor = theme === 'dark' ? colors.brown[700] : colors.black;

  useEffect(() => {
    const mq = window.matchMedia(TOUCH_DEVICE_QUERY);
    const handler = (e: MediaQueryListEvent) => setIsTouchDevice(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (isTouchDevice) return;
    const compute = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const scaleX = (w - FRAME_PADDING * 2) / spec.width;
      const scaleY = (h - FRAME_PADDING * 2) / spec.height;
      setScale(Math.min(1, scaleX, scaleY));
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [isTouchDevice, spec.width, spec.height]);

  if (isTouchDevice) {
    return (
      <div className="fixed inset-0" style={{ backgroundColor: 'var(--bg-primary)' }}>
        {children}
      </div>
    );
  }

  const handleChromeClick = () => {
    if (longPress.didFire()) return;
    handleIslandTap();
  };

  const chromeProps = {
    onClick: handleChromeClick,
    onPointerDown: longPress.onPointerDown,
    onPointerUp: longPress.onPointerUp,
    onPointerLeave: longPress.onPointerLeave,
    onPointerCancel: longPress.onPointerCancel,
    'aria-label': 'Double-tap to open the design system gallery; hold to change size',
  } as const;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      <div
        style={{
          width: spec.width,
          height: spec.height,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
          borderRadius: 56,
          padding: 10,
          backgroundColor: bezelColor,
          boxShadow: '0 40px 80px rgba(0, 0, 0, 0.5), inset 0 0 0 2px rgba(255, 255, 255, 0.06)',
          transition: 'width 0.25s ease, height 0.25s ease',
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden bg-primary"
          style={{ borderRadius: 48 }}
        >
          {children}

          {spec.chrome === 'island' ? (
            <button
              type="button"
              {...chromeProps}
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
          ) : (
            <button
              type="button"
              {...chromeProps}
              className="absolute left-1/2 z-50 -translate-x-1/2 cursor-default"
              style={{
                top: 0,
                width: 209,
                height: 30,
                borderBottomLeftRadius: 20,
                borderBottomRightRadius: 20,
                backgroundColor: islandColor,
                border: 'none',
                padding: 0,
              }}
            />
          )}

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

          <AnimatePresence>
            {presetMenuOpen && setPreset && (
              <>
                <motion.div
                  key="backdrop"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setPresetMenuOpen(false)}
                  className="absolute inset-0 z-40"
                  style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
                />
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, x: '-50%', y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, x: '-50%', y: 0, scale: 1 }}
                  exit={{ opacity: 0, x: '-50%', y: -8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  className="absolute left-1/2 z-50 overflow-hidden"
                  style={{
                    top: spec.chrome === 'island' ? 56 : 40,
                    minWidth: 280,
                    borderRadius: 16,
                    backgroundColor: 'var(--bg-primary)',
                    boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2), 0 0 0 1px var(--border-default)',
                  }}
                >
                  <div
                    style={{
                      padding: '12px 20px 8px',
                      fontFamily: 'var(--font-body, inherit)',
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: 'var(--content-tertiary)',
                    }}
                  >
                    Viewport size
                  </div>
                  {(Object.keys(FRAME_PRESETS) as FramePreset[]).map((key) => {
                    const p = FRAME_PRESETS[key];
                    const selected = key === preset;
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          setPreset(key);
                          setPresetMenuOpen(false);
                        }}
                        className="flex w-full items-center justify-between"
                        style={{
                          gap: 24,
                          padding: '14px 20px',
                          border: 'none',
                          backgroundColor: selected ? 'var(--bg-secondary)' : 'transparent',
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <span
                            style={{
                              fontFamily: 'var(--font-body, inherit)',
                              fontSize: 15,
                              fontWeight: 600,
                              color: 'var(--content-primary)',
                            }}
                          >
                            {p.label}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-body, inherit)',
                              fontSize: 13,
                              color: 'var(--content-secondary)',
                            }}
                          >
                            {p.width} × {p.height} · {p.chrome === 'island' ? 'Dynamic Island' : 'Notch'}
                          </span>
                        </div>
                        {selected && (
                          <span style={{ color: 'var(--content-accentMid)', fontSize: 16 }}>✓</span>
                        )}
                      </button>
                    );
                  })}
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <DesignSystemGallery isOpen={galleryOpen} onClose={() => setGalleryOpen(false)} />
        </div>
      </div>
    </div>
  );
};
