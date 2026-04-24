import type { ImageRemoteProps } from '../ImageRemote/types';

export type PhotographyProps = Omit<ImageRemoteProps, 'source'> & {
  cdnImageSource?: string;
  photo?: string;
};
