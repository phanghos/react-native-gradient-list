import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';

export const useListSize = () => {
  const [completeHeight, setCompleteHeight] = useState(0);
  const [completeWidth, setCompleteWidth] = useState(0);
  const [visibleHeight, setVisibleHeight] = useState(0);
  const [visibleWidth, setVisibleWidth] = useState(0);

  const onLayout = ({
    nativeEvent: {
      layout: { height, width },
    },
  }: LayoutChangeEvent) => {
    setVisibleHeight(height);
    setVisibleWidth(width);
  };

  const onContentSizeChange = (w: number, h: number) => {
    setCompleteHeight(h);
    setCompleteWidth(w);
  };

  return {
    completeHeight,
    completeWidth,
    visibleHeight,
    visibleWidth,
    onLayout,
    onContentSizeChange,
  };
};
