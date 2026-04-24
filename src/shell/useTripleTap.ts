import { useCallback, useRef } from 'react';

export const useTripleTap = (onActivate: () => void, windowMs = 600) => {
  const timestamps = useRef<number[]>([]);
  return useCallback(() => {
    const now = Date.now();
    timestamps.current = [...timestamps.current, now].filter((t) => now - t < windowMs);
    if (timestamps.current.length >= 3) {
      timestamps.current = [];
      onActivate();
    }
  }, [onActivate, windowMs]);
};
