import { defineComponent, toRefs } from 'vue';
import { iconProps, IconProps } from './icon-types';

export default defineComponent({
  name: 'DIcon',
  props: iconProps,
  setup(props: IconProps) {
    const { name, size, color, classPrefix } = toRefs(props);

    return () => {
      return /^((https?):)?\/\//.test(name.value) ? (
        <img
          src={name.value}
          alt={name.value.split('/')[name.value.split('/').length - 1]}
          style={{
            width: size.value,
            verticalAlign: 'text-bottom'
          }}
        />
      ) : (
        <i
          class={`${classPrefix.value} ${classPrefix.value}-${name.value}`}
          style={{
            fontSize: size.value,
            color: color.value
          }}
        ></i>
      );
    };
  }
});
