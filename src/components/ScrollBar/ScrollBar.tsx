import React from 'react';
import { ScrollViewProps } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

const N400 = '#D8DADF';

export type ScrollBarProps = {
  width?: number;
  height?: number;
  color?: string;
  translateY: Animated.Node<number>;
} & Pick<ScrollViewProps, 'scrollIndicatorInsets'>;

export const ScrollBar = ({
  width = 6,
  height = 32,
  color = N400,
  translateY,
  scrollIndicatorInsets,
}: Omit<ScrollBarProps, 'translateY'> & {
  translateY: Animated.SharedValue<number>;
}) => {
  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    position: 'absolute',
    right: scrollIndicatorInsets?.right || 0,
    width,
    height,
    backgroundColor: color,
    zIndex: 1,
  }));

  return <Animated.View style={style} />;
};
