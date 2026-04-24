import React, { createContext, useContext, useMemo, useState } from 'react';

export type FrameChrome = 'notch' | 'island';
export type FramePreset = 'small' | 'medium' | 'large';

export type FrameSpec = {
  label: string;
  width: number;
  height: number;
  chrome: FrameChrome;
  safeAreaTop: number;
  safeAreaBottom: number;
};

// Sizes in logical points — the values the browser sees as CSS pixels.
// Small: iPhone 13 mini / X era (notch)
// Medium: iPhone 15 / 16 (dynamic island)
// Large: iPhone 15/16 Pro Max (dynamic island)
export const FRAME_PRESETS: Record<FramePreset, FrameSpec> = {
  small: { label: 'Small', width: 375, height: 812, chrome: 'notch', safeAreaTop: 44, safeAreaBottom: 34 },
  medium: { label: 'Medium', width: 393, height: 852, chrome: 'island', safeAreaTop: 59, safeAreaBottom: 34 },
  large: { label: 'Large', width: 430, height: 932, chrome: 'island', safeAreaTop: 59, safeAreaBottom: 34 },
};

export type SafeAreaInsets = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

type FrameContextValue = {
  preset: FramePreset;
  setPreset: (p: FramePreset) => void;
  spec: FrameSpec;
  insets: SafeAreaInsets;
};

const FrameContext = createContext<FrameContextValue | null>(null);

export const FrameProvider: React.FC<{ children: React.ReactNode; initialPreset?: FramePreset }> = ({
  children,
  initialPreset = 'medium',
}) => {
  const [preset, setPreset] = useState<FramePreset>(initialPreset);
  const value = useMemo<FrameContextValue>(() => {
    const spec = FRAME_PRESETS[preset];
    return {
      preset,
      setPreset,
      spec,
      insets: { top: spec.safeAreaTop, bottom: spec.safeAreaBottom, left: 0, right: 0 },
    };
  }, [preset]);
  return <FrameContext.Provider value={value}>{children}</FrameContext.Provider>;
};

const DEFAULT_INSETS: SafeAreaInsets = {
  top: FRAME_PRESETS.medium.safeAreaTop,
  bottom: FRAME_PRESETS.medium.safeAreaBottom,
  left: 0,
  right: 0,
};

export const useFrame = (): FrameContextValue | null => useContext(FrameContext);

export const useSafeArea = (): SafeAreaInsets => {
  const ctx = useContext(FrameContext);
  return ctx ? ctx.insets : DEFAULT_INSETS;
};
