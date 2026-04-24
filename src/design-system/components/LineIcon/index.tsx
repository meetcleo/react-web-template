import React from 'react';
import { generatedIconNames, generatedIcons } from './generatedIcons';
import type { GeneratedIconDef } from './generatedIcons';
import type { CustomIconName, LineIconName, LineIconProps, LineIconSize } from './types';

const ICON_SIZES: Record<LineIconSize, number> = { XS: 12, S: 16, M: 20, L: 24, XL: 32 };
const ROTATION = { LEFT: -90, RIGHT: 90, FLIP: 180 } as const;

// Custom icons authored for the template (not in the RN set). Drawn on a 24x24
// canvas and use `currentColor` so they inherit the `color` prop like generated
// icons.
const customIcons: Record<CustomIconName, GeneratedIconDef> = {
  sun: {
    strokeFactor: 1,
    content: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </>
    ),
  },
  moon: {
    strokeFactor: 1,
    content: <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />,
  },
};

export const allIconNames: readonly LineIconName[] = [...generatedIconNames, 'sun', 'moon'];

const resolve = (name: LineIconName): GeneratedIconDef => {
  if (name in generatedIcons) return generatedIcons[name as keyof typeof generatedIcons];
  return customIcons[name as CustomIconName];
};

export const LineIcon: React.FC<LineIconProps> = ({
  name,
  size = 'M',
  color,
  strokeWidth = 1.5,
  className = '',
  rotate,
}) => {
  const px = ICON_SIZES[size];
  const rotation = rotate ? ROTATION[rotate] : 0;
  const entry = resolve(name);
  // Content scaled by `strokeFactor` (from its original viewBox fit) would
  // render strokes at strokeWidth * strokeFactor parent-user-units. Dividing
  // here cancels that out so every icon renders at the same visual thickness.
  const compensatedStroke = strokeWidth / entry.strokeFactor;
  return (
    <svg
      width={px}
      height={px}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={compensatedStroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      className={className}
      style={{
        color: color ?? 'var(--content-primary)',
        display: 'inline-block',
        flexShrink: 0,
        ...(rotation ? { transform: `rotate(${rotation}deg)` } : {}),
      }}
      aria-hidden
    >
      {entry.content}
    </svg>
  );
};

export type { LineIconProps, LineIconName, LineIconSize };
