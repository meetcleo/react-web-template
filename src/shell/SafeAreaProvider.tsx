export const SAFE_AREA_TOP = 59;
export const SAFE_AREA_BOTTOM = 34;

export type SafeAreaInsets = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

export const useSafeArea = (): SafeAreaInsets => ({
  top: SAFE_AREA_TOP,
  bottom: SAFE_AREA_BOTTOM,
  left: 0,
  right: 0,
});
