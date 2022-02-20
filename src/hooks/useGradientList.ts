import { useMemo } from 'react';
import {
  useDerivedValue,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import { useScrollAnimation } from './useScrollAnimation';

type GradientListProps = {
  completeHeight: number;
  visibleHeight: number;
  contentOffset?: number;
  scrollBarOffset?: number;
  scrollBarHeight?: number;
};

const fadingThreshold = 20;

const opacityStart = 1;

const opacityEnd = 0;

export const useGradientList = ({
  completeHeight,
  visibleHeight,
  contentOffset = 0,
  scrollBarOffset = 0,
  scrollBarHeight = 32,
}: GradientListProps) => {
  const { onScroll, translateY } = useScrollAnimation();

  // Vertical scroll bar will be rendered if scrollableSpace > 0
  const scrollableSpace = useMemo(
    () => completeHeight - visibleHeight,
    [completeHeight, visibleHeight],
  );

  const scrollPerc = useDerivedValue(
    () =>
      (translateY.value / Math.abs(completeHeight - visibleHeight)) *
      (visibleHeight - scrollBarHeight - scrollBarOffset - contentOffset),
    [
      completeHeight,
      visibleHeight,
      scrollBarHeight,
      scrollBarOffset,
      contentOffset,
    ],
  );

  // -1000 will hide the scroll bar
  const realTranslateY = useDerivedValue(() => {
    if (scrollableSpace <= 0) {
      return -1000;
    }
    return (
      interpolate(
        scrollPerc.value,
        [0, visibleHeight],
        [0, visibleHeight],
        Extrapolate.CLAMP,
      ) + scrollBarOffset
    );
  }, [scrollableSpace, visibleHeight, scrollBarOffset]);

  /**
   * If ScrollView has not reached its end, show gradient at the bottom. Otherwise, hide it
   * If there is enough scrollable space (scrollableSpace > fadingThreshold), animate opacity as
   * ScrollView reaches the end. Otherwise, animate opacity by onScroll event
   */
  const opacity = useDerivedValue(() => {
    if (scrollableSpace > 0) {
      return interpolate(
        translateY.value,
        [
          scrollableSpace < fadingThreshold
            ? 0
            : scrollableSpace - fadingThreshold,
          scrollableSpace,
        ],
        [opacityStart, opacityEnd],
        Extrapolate.CLAMP,
      );
    }
    return 0;
  }, [scrollableSpace, fadingThreshold]);

  return { translateY: realTranslateY, onScroll, opacity };
};
