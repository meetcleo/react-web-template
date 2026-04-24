import React from 'react';
import { config } from '../../config';
import { colorRoles, fontFamilies, fontWeights, Spacing, typographyLineHeightMap, typographySizeMap } from '../../design-system/tokens';
import { useFrame, useSafeArea } from '../../shell';

const CHROME_LABELS: Record<'notch' | 'island' | 'punch-hole', string> = {
  notch: 'notch',
  island: 'Dynamic Island',
  'punch-hole': 'punch-hole camera',
};

export const HomeScreen: React.FC = () => {
  const insets = useSafeArea();
  const frame = useFrame();
  const chromeLabel = CHROME_LABELS[frame?.spec.chrome ?? 'island'];
  return (
  <div
    style={{
      height: '100%',
      width: '100%',
      paddingTop: insets.top + Spacing.S,
      paddingBottom: insets.bottom + Spacing.S,
      paddingLeft: Spacing.M,
      paddingRight: Spacing.M,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      gap: Spacing.XXS,
      backgroundColor: colorRoles.background.primary,
    }}
  >
    <div style={{ flex: 1 }} />
    <h1
      style={{
        fontFamily: fontFamilies.header,
        fontWeight: fontWeights.Bold,
        fontSize: typographySizeMap.L.display,
        lineHeight: `${typographyLineHeightMap.L.display}px`,
        color: colorRoles.content.primary,
        margin: 0,
      }}
    >
      {config.appName}
    </h1>
    <p
      style={{
        fontFamily: fontFamilies.body,
        fontWeight: fontWeights.Regular,
        fontSize: typographySizeMap.L.body,
        lineHeight: `${typographyLineHeightMap.L.body}px`,
        color: colorRoles.content.secondary,
        margin: 0,
      }}
    >
      Start prompting to build your prototype.
    </p>
    <div style={{ flex: 1 }} />
    <p
      style={{
        fontFamily: fontFamilies.body,
        fontWeight: fontWeights.Regular,
        fontSize: typographySizeMap.S.body,
        lineHeight: `${typographyLineHeightMap.S.body}px`,
        color: colorRoles.content.tertiary,
        margin: 0,
      }}
    >
      Double-tap the {chromeLabel} to open the design system gallery. Long-press it to change the viewport.
    </p>
  </div>
  );
};
