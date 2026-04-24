import type { ImageProps } from '../Image/types';

export type ImageWithFallbackProps = ImageProps & {
  fallbackSource: string;
};
