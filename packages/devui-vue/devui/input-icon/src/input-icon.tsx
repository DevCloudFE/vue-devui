import { defineComponent, reactive, PropType, toRefs } from 'vue';
import Input from '../../input/src/input';
import { inputProps } from '../../input/src/input-types';
import Icon from '../../icon/src/icon';

import './input-icon.scss';

const inputIconProps = {
  ...inputProps,
  name: {
    type: String,
    value: 'calendar',
    required: false,
  },
  onIconclick: {
    type: Function as PropType<(e: MouseEvent) => void>,
    required: false,
  },
  iconBgColor: {
    type: String,
    value: 'transparent',
  },
  iconColor: {
    type: String,
    value: '#000000',
  }
};

export default defineComponent({
  name: 'DInputIcon',
  props: inputIconProps,
  setup(props) {
    const { name, iconBgColor, iconColor, ...restProps } = toRefs(props);
    const state = reactive({ value: '' });
    const onInputChange = (v: string) => {
      state.value = v;
      typeof props.onChange === 'function' && props.onChange(state.value);
    };
    const onIconClick = (e: MouseEvent) => {
      typeof props.onIconclick === 'function' && props.onIconclick(state.value, e);
    };
    return () => {
      return (
        <div class="d-input-icon-container">
          <label>
            <Input { ...restProps } onChange={onInputChange} />
          </label>
          <span onClick={onIconClick} style={{ backgroundColor: iconBgColor.value }}>
            <Icon size="small" name={name.value} color={iconColor.value} />
          </span>
        </div>
      );
    };
  },
});
