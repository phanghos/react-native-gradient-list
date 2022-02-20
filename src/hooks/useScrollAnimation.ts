import {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

export const useScrollAnimation = () => {
  const translateY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      translateY.value = interpolate(
        y,
        [-300, 0, Number.MAX_SAFE_INTEGER],
        [0, 0, Number.MAX_SAFE_INTEGER], // Filter out negative values
        Extrapolate.CLAMP,
      );
    },
  });

  return { translateY, onScroll };
};
