import React, { useMemo } from 'react';
import { FlatList, FlatListProps } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  ListBottomGradient,
  ListBottomGradientProps,
} from '../ListBottomGradient';
import { ScrollBar } from '../ScrollBar';
import { GradientListProps } from '../../types';
import { useGradientList, useScrollBarConfig, useListSize } from '../../hooks';

type GradientFlatListProps<T> = GradientListProps &
  FlatListProps<T> &
  Pick<ListBottomGradientProps, 'gradientColor'>;

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const GradientFlatList = <T extends unknown = unknown>({
  scrollBarConfig,
  gradientOffset = 0,
  scrollIndicatorInsets,
  renderCustomScrollBar,
  gradientColor,
  offset,
  showsVerticalScrollIndicator,
  ...restProps
}: GradientFlatListProps<T>) => {
  const { width, height, ...restScrollBarProps } =
    useScrollBarConfig(scrollBarConfig);

  const { completeHeight, visibleHeight, onLayout, onContentSizeChange } =
    useListSize();

  const { translateY, onScroll, opacity } = useGradientList({
    scrollBarHeight: height,
    scrollBarOffset: scrollIndicatorInsets?.top,
    completeHeight,
    visibleHeight,
    contentOffset: offset,
  });

  const AnimatedFlatList = useMemo(
    () => Animated.createAnimatedComponent<FlatListProps<T>>(FlatList),
    [],
  );

  return (
    <>
      {renderCustomScrollBar && (
        <ScrollBar
          {...restScrollBarProps}
          scrollIndicatorInsets={scrollIndicatorInsets}
          width={width}
          height={height}
          translateY={translateY}
        />
      )}
      <AnimatedFlatList
        {...restProps}
        onScroll={onScroll}
        showsVerticalScrollIndicator={
          !renderCustomScrollBar &&
          (showsVerticalScrollIndicator === undefined ||
            !!showsVerticalScrollIndicator)
        }
        scrollIndicatorInsets={scrollIndicatorInsets}
        scrollEventThrottle={16}
        onLayout={onLayout}
        onContentSizeChange={onContentSizeChange}
      />
      <ListBottomGradient
        offset={gradientOffset}
        opacity={opacity}
        gradientColor={gradientColor}
      />
    </>
  );
};
