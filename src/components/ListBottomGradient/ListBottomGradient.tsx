import React, { useMemo } from 'react';
import Animated, {
  useDerivedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';

export type ListBottomGradientProps = {
  offset?: number;
  opacity: Animated.Node<number>;
  gradientColor?: string;
};

const white = '#FFFFFF';
const gradientStart = { x: 0, y: 0 };
const gradientEnd = { x: 0, y: 1 };

export const ListBottomGradient = ({
  offset,
  opacity,
  gradientColor = white,
}: Omit<ListBottomGradientProps, 'opacity'> & {
  opacity: Animated.SharedValue<number>;
}) => {
  const realOpacity = useDerivedValue(() =>
    // Sometimes, it doesn't reach full 0
    opacity.value > 0.05 ? opacity.value : 0,
  );

  const style = useAnimatedStyle(
    () => ({
      opacity: realOpacity.value,
      width: '100%',
      position: 'absolute',
      bottom: offset || 0,
    }),
    [offset],
  );

  const memoGradientColor = useMemo(
    () => [`${gradientColor}00`, gradientColor],
    [gradientColor],
  );

  return (
    <Animated.View style={style}>
      <LinearGradient
        start={gradientStart}
        end={gradientEnd}
        colors={memoGradientColor}
        style={styles.gradient}
      />
    </Animated.View>
  );
};
