// Approximate web equivalent of RN Photography — picks cdnImageSource or photo, renders via ImageRemote.
import React from 'react';
import { ImageRemote } from '../ImageRemote';
import type { PhotographyProps } from './types';

export const Photography: React.FC<PhotographyProps> = ({ cdnImageSource, photo, ...rest }) => {
  const src = cdnImageSource ?? photo;
  if (!src) return null;
  return <ImageRemote {...rest} source={src} />;
};

export type { PhotographyProps };
