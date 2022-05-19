import { computed, defineComponent, toRefs } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { SvgIconProps, svgIconProps } from './icon-types';
import './icon.scss';

export default defineComponent({
  name: 'DSvgIcon',
  props: svgIconProps,
  setup(props: SvgIconProps) {
    const { name, color, size } = toRefs(props);
    const ns = useNamespace('svg-icon');

    const iconName = computed(() => `#icon-${name.value}`);

    const iconSize = computed(() => {
      return typeof size.value === 'number' ? `${size.value}px` : size.value;
    });

    const styles = {
      width: iconSize.value,
      height: iconSize.value,
    };

    return () => {
      return <svg class={ns.b()} style={styles}>
        <use xlinkHref={iconName.value} fill={color.value}></use>
      </svg>;
    };
  },
});
