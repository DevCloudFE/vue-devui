import { defineComponent } from 'vue';
import { Icon } from '../../icon';

export default defineComponent({
  emits: ['click'],
  setup(props, { emit }) {
    return () => (
      <div class='devui-notification-icon-close' onClick={(e) => emit('click', e)}>
        <Icon name='close' size='14px' />
      </div>
    );
  },
});
