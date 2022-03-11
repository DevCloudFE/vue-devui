import { defineComponent, toRefs, Transition } from 'vue';
import { notificationProps, NotificationProps } from './notification-types';
import Close from './notification-icon-close';
import TypeIcon from './notification-image';
import { useNotification, useEvent } from './use-notification';
import './notification.scss';

export default defineComponent({
  name: 'DNotification',
  props: notificationProps,
  emits: ['update:modelValue', 'destroy'],
  setup(props: NotificationProps, { emit, slots }) {
    const { modelValue, title, type } = toRefs(props);
    const { classes } = useNotification(props);
    const { interrupt, removeReset, close, handleDestroy } = useEvent(props, emit);

    return () => (
      <Transition name='notification-fade' onAfterLeave={handleDestroy}>
        {modelValue.value && (
          <div class='devui-notification'>
            <div class={classes.value} onMouseenter={interrupt} onMouseleave={removeReset}>
              <div class='devui-notification-item'>
                <Close onClick={close} />
                {title.value && <TypeIcon type={type.value} />}
                <div class='devui-notification-message'>
                  <span class='devui-notification-title'>{title.value}</span>
                  <span class='devui-notification-content'>{slots.default?.()}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    );
  },
});
