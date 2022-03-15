import { PropType } from 'vue';

export type ArrowTrigger = 'hover' | 'never' | 'always';
export type DotTrigger = 'click' | 'hover';
export type DotPosition = 'bottom' | 'top';

export const carouselProps = {
  arrowTrigger: {
    type: String as PropType<ArrowTrigger>,
    default: 'hover'
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  autoplaySpeed: {
    type: Number,
    default: 3000
  },
  height: {
    type: String,
    default: '100%',
  },
  showDots: {
    type: Boolean,
    default: true
  },
  dotTrigger: {
    type: String as PropType<DotTrigger>,
    default: 'click',
  },
  dotPosition: {
    type: String as PropType<DotPosition>,
    default: 'bottom',
  },
  activeIndex: {
    type: Number,
    default: 0
  },
  activeIndexChange: {
    type: Function as unknown as () => ((index: number) => void)
  },
} as const;
