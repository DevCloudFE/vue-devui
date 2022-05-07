import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { PopType } from './popover-types';
import { SuccessIcon, WarningIcon, InfoIcon, ErrorIcon } from './popover-icons';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './popover-icon.scss';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<PopType>,
      default: 'default',
    },
  },
  setup(props) {
    const ns = useNamespace('popover');

    return () =>
      props.type &&
      props.type !== 'default' && (
        <span class={ns.e('icon-wrap')}>
          {props.type === 'success' && <SuccessIcon />}
          {props.type === 'warning' && <WarningIcon />}
          {props.type === 'info' && <InfoIcon />}
          {props.type === 'error' && <ErrorIcon />}
        </span>
      );
  },
});
