import { computed, defineComponent, toRefs } from 'vue';
import type { PropType } from 'vue';
import { NotificationType } from './notification-types';
import { SuccessIcon, WarningIcon, InfoIcon, ErrorIcon } from './notification-icons';
import { useNamespace } from '../../shared/hooks/use-namespace';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<NotificationType>,
      default: 'normal',
    },
  },
  setup(props) {
    const { type } = toRefs(props);
    const ns = useNamespace('notification');
    const classes = computed(() => ({
      [ns.e('image')]: true,
      [ns.em('image', type.value)]: true,
    }));

    return () => (
      <span class={classes.value}>
        {type.value &&
          type.value !== 'normal' &&
          ((type.value === 'success' && <SuccessIcon />) ||
            (type.value === 'info' && <InfoIcon />) ||
            (type.value === 'warning' && <WarningIcon />) ||
            (type.value === 'error' && <ErrorIcon />))}
      </span>
    );
  },
});
