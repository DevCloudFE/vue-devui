import { computed, defineComponent, toRefs } from 'vue';
import type { PropType } from 'vue';
import { NotificationType } from './notification-types';
import { Icon } from '../../icon';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<NotificationType>,
      default: 'normal',
    },
  },
  setup(props) {
    const { type } = toRefs(props);
    const classes = computed(() => ({
      'devui-notification-image': true,
      [`devui-notification-image-${type.value}`]: true,
    }));
    const severityIconMap = {
      info: 'info-o',
      success: 'right-o',
      warning: 'warning-o',
      error: 'error-o',
    };

    return () => <span class={classes.value}>{type.value !== 'normal' && <Icon name={severityIconMap[type.value]} size='16px' />}</span>;
  },
});
