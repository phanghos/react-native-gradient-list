import { ScrollBarConfig } from '../types';

const defaultScrollBarConfig: ScrollBarConfig = {
  width: 6,
  height: 32,
};

export const useScrollBarConfig = ({
  width,
  height,
  ...restScrollBarProps
}: ScrollBarConfig = defaultScrollBarConfig) => {
  return { width, height, ...restScrollBarProps };
};
