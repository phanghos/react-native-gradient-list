import React, { PropsWithChildren } from 'react';
import { ScrollViewProps } from 'react-native';
import Animated from 'react-native-reanimated';
import {
  ListBottomGradient,
  ListBottomGradientProps,
} from '../ListBottomGradient';
import { ScrollBar } from '../ScrollBar';
import { GradientListProps } from '../../types';
import { useGradientList, useListSize, useScrollBarConfig } from '../../hooks';

export type GradientScrollViewProps = GradientListProps &
  ScrollViewProps &
  Pick<ListBottomGradientProps, 'gradientColor'>;

export const GradientScrollView = ({
  scrollBarConfig,
  gradientOffset,
  scrollIndicatorInsets,
  renderCustomScrollBar,
  gradientColor,
  offset,
  showsVerticalScrollIndicator,
  children,
  ...restProps
}: PropsWithChildren<GradientScrollViewProps>) => {
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
      <Animated.ScrollView
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
      >
        {children}
      </Animated.ScrollView>
      <ListBottomGradient
        offset={gradientOffset}
        opacity={opacity}
        gradientColor={gradientColor}
      />
    </>
  );
};
