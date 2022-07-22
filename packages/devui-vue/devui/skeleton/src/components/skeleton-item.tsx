import { defineComponent, toRefs } from 'vue';
import { skeletonItemProps, SkeletonItemProps } from './skeleton-item-types';
import { useSkeletonItem } from '../composables/use-skeleton-item';
import { ImageIcon } from './image-icon';
import './skeleton-item.scss';

export default defineComponent({
  name: 'DSkeletonItem',
  props: skeletonItemProps,
  setup(props: SkeletonItemProps) {
    const { variant } = toRefs(props);
    const { classes } = useSkeletonItem(props);

    return () => <div class={classes.value}>{variant.value === 'image' && <ImageIcon />}</div>;
  },
});
