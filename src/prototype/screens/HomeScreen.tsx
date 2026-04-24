import React from 'react';
import { config } from '../../config';
import { colorRoles, fontFamilies, fontWeights, Spacing, typographyLineHeightMap, typographySizeMap } from '../../design-system/tokens';
import { useSafeArea } from '../../shell';

export const HomeScreen: React.FC = () => {
  const insets = useSafeArea();
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
      justifyContent: 'center',
      alignItems: 'flex-start',
      gap: Spacing.S,
      backgroundColor: colorRoles.background.primary,
    }}
  >
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
  </div>
  );
};
