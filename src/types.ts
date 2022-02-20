import { ScrollBarProps } from './components/ScrollBar';

export type ScrollBarConfig = Omit<
  ScrollBarProps,
  'translateY' | 'scrollIndicatorInsets'
>;

export type GradientListProps = {
  scrollBarConfig?: ScrollBarConfig;
  renderCustomScrollBar?: boolean;
  gradientOffset?: number;
  offset?: number;
};
