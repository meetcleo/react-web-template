import React from 'react';
import {
  typographySizeMap,
  typographyLineHeightMap,
  typographyDefaultWeights,
  fontWeights,
} from '../../tokens';
import type { TypographyProps } from './types';

const DEFAULT_TAGS: Record<string, keyof React.JSX.IntrinsicElements> = {
  display: 'h1',
  displayNumbers: 'span',
  headline: 'h2',
  title: 'h3',
  titleStrong: 'h3',
  body: 'p',
  bodyStrong: 'p',
  bodyLink: 'span',
  label: 'span',
  labelStrong: 'span',
  buttonLabel: 'span',
};

const ALIGN = { left: 'text-left', center: 'text-center', right: 'text-right' } as const;

export const Typography: React.FC<TypographyProps> = ({
  type,
  size = 'M',
  weight,
  italic = false,
  color,
  align = 'left',
  uppercase = false,
  numberOfLines,
  className = '',
  style,
  as,
  children,
}) => {
  const fontSize = typographySizeMap[size][type];
  const lineHeight = typographyLineHeightMap[size][type];
  const resolvedWeight = weight ?? typographyDefaultWeights[type];
  const isUnderline = type === 'bodyLink';

  if (fontSize == null || lineHeight == null) {
    console.warn(`Typography: no size/lineHeight for type="${type}" size="${size}".`);
  }

  const Tag = (as ?? DEFAULT_TAGS[type] ?? 'span') as React.ElementType;

  const computedStyle: React.CSSProperties = {
    fontSize: fontSize != null ? `${fontSize}px` : undefined,
    lineHeight: lineHeight != null ? `${lineHeight}px` : undefined,
    fontWeight: fontWeights[resolvedWeight],
    fontStyle: italic ? 'italic' : undefined,
    color: color ?? 'var(--content-primary)',
    textTransform: uppercase ? 'uppercase' : undefined,
    textDecoration: isUnderline ? 'underline' : undefined,
    display: numberOfLines != null ? '-webkit-box' : undefined,
    WebkitLineClamp: numberOfLines,
    WebkitBoxOrient: numberOfLines != null ? 'vertical' : undefined,
    overflow: numberOfLines != null ? 'hidden' : undefined,
    margin: 0,
    fontFamily:
      type === 'display' || type === 'displayNumbers' || type === 'headline'
        ? 'PPNeueMontreal-Bold, PPNeueMontreal, system-ui, sans-serif'
        : 'PPNeueMontreal, system-ui, sans-serif',
    ...style,
  };

  return (
    <Tag className={`${ALIGN[align]} ${className}`} style={computedStyle}>
      {children}
    </Tag>
  );
};

export type { TypographyProps };
