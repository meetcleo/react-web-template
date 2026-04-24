import type { BoxProps } from '../Box/types';
import type { SpacingToken } from '../../tokens';

export type HStackProps = BoxProps & {
  gap?: SpacingToken;
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  wrap?: boolean;
};
