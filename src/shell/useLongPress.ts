import { useCallback, useRef } from 'react';

// Fires onActivate once the pointer has been held for `holdMs` without leaving
// or releasing. Matches iOS long-press feel — action triggers at the hold mark,
// not on release.
export const useLongPress = (onActivate: () => void, holdMs = 1000) => {
  const timerRef = useRef<number | null>(null);
  const firedRef = useRef(false);

  const clear = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const onPointerDown = useCallback(() => {
    firedRef.current = false;
    clear();
    timerRef.current = window.setTimeout(() => {
      firedRef.current = true;
      onActivate();
    }, holdMs);
  }, [onActivate, holdMs, clear]);

  const onPointerUp = useCallback(() => clear(), [clear]);
  const onPointerLeave = useCallback(() => clear(), [clear]);
  const onPointerCancel = useCallback(() => clear(), [clear]);

  const didFire = useCallback(() => firedRef.current, []);

  return { onPointerDown, onPointerUp, onPointerLeave, onPointerCancel, didFire };
};
