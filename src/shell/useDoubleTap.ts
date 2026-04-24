import { useCallback, useRef } from 'react';

export const useDoubleTap = (onActivate: () => void, windowMs = 400) => {
  const timestamps = useRef<number[]>([]);
  return useCallback(() => {
    const now = Date.now();
    timestamps.current = [...timestamps.current, now].filter((t) => now - t < windowMs);
    if (timestamps.current.length >= 2) {
      timestamps.current = [];
      onActivate();
    }
  }, [onActivate, windowMs]);
};
