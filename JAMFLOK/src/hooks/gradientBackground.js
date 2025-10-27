import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

import colors from '../styles/colors';
import stylesGlobal from '../styles/stylesGlobal';

export default function GradientBackground({ children }) {
  return (
    <LinearGradient
      colors={[colors.colorStart, colors.colorEnd]}
      locations={[0.0001, 1]}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={stylesGlobal.container}
    >
      {children}
    </LinearGradient>
  );
}
