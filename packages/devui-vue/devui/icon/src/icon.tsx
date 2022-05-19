import { computed, defineComponent, resolveDynamicComponent, toRefs } from 'vue';
import { isUrl } from '../../shared/utils/url';
import { iconProps, IconProps } from './icon-types';
import svgIcon from './svg-icon';

export default defineComponent({
  name: 'DIcon',
  props: iconProps,
  setup(props: IconProps, { attrs }) {
    const { component, name, size, color, classPrefix } = toRefs(props);
    const IconComponent = component.value ? resolveDynamicComponent(component.value) : resolveDynamicComponent(svgIcon);
    const iconSize = computed(() => {
      return typeof size.value === 'number' ? `${size.value}px` : size.value;
    });

    const svgIconDom = () => {
      return <IconComponent name={name.value} color={color.value} size={iconSize.value} {...attrs}></IconComponent>;
    };

    const imgIconDom = () => {
      return (
        <img
          src={name.value}
          alt={name.value.split('/')[name.value.split('/').length - 1]}
          style={{
            width: iconSize.value || '',
          }}
          {...attrs}
        />
      );
    };

    const fontIconDom = () => {
      const fontIconClass = /^icon-/.test(name.value) ? name.value : `${classPrefix.value}-${name.value}`;
      return (
        <i
          class={[classPrefix.value, fontIconClass]}
          style={{
            fontSize: iconSize.value,
            color: color.value,
          }}
          {...attrs}></i>
      );
    };

    return () => {
      return component.value ? svgIconDom() : isUrl(name.value) ? imgIconDom() : fontIconDom();
    };
  },
});
