import { defineComponent, reactive, PropType } from 'vue';
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
  setup(props, ctx) {
    const { name, onIconclick, onChange, iconBgColor, iconColor, ...inputProps } = props;
    const state = reactive({ value: '' });
    const onInputChange = (v: string) => {
      state.value = v;
      typeof onChange === 'function' && onChange(state.value);
    };
    const onIconClick = (e: MouseEvent) => {
      typeof onIconclick === 'function' && onIconclick(state.value, e);
    };
    return () => {
      return (
        <div class="d-input-icon-container">
          <label>
            <Input { ...inputProps } onChange={onInputChange} />
          </label>
          <span onClick={onIconClick} style={{ backgroundColor: iconBgColor }}>
            <Icon size="small" name={name} color={iconColor} />
          </span>
        </div>
      );
    };
  },
});
