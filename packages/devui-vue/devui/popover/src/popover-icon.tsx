import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { PopType } from './popover-types';
import { SuccessIcon, WarningIcon, InfoIcon, ErrorIcon } from './popover-icons';
import './popover-icon.scss';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<PopType>,
      default: 'default',
    },
  },
  setup(props) {
    return () =>
      props.type &&
      props.type !== 'default' && (
        <span class='devui-popover-icon'>
          {props.type === 'success' && <SuccessIcon />}
          {props.type === 'warning' && <WarningIcon />}
          {props.type === 'info' && <InfoIcon />}
          {props.type === 'error' && <ErrorIcon />}
        </span>
      );
  },
});
