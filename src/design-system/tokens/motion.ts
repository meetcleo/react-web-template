export const MotionDuration = {
  instant: 0,
  swift1: 50,
  swift2: 100,
  steady1: 200,
  steady2: 300,
  slow1: 400,
  slow2: 500,
  slow3: 1000,
} as const;

export type DurationToken = keyof typeof MotionDuration;

export const MotionEasing = {
  linear: [0.0, 0.0, 1.0, 1.0],
  ease: [0.28, 0.0, 0.72, 1.0],
  easeIn: [0.16, 0.0, 0.16, 1.0],
  easeOut: [0.28, 0.0, 0.84, 1.0],
  easeInOut: [0.28, 0.0, 0.16, 1.0],
} as const;

export type EasingToken = keyof typeof MotionEasing;

export const motion = {
  duration: MotionDuration,
  easing: MotionEasing,
} as const;
