import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DotProps } from 'react-native-onboarding-swiper';

export const CustomDot = ({ selected }: DotProps) => (
  <View
    style={[
      styles.dot,
      { backgroundColor: '#C2185B' },
      selected && { width: 12, height: 12, borderRadius: 6 },
    ]}
  />
);

const styles = StyleSheet.create({
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
});
