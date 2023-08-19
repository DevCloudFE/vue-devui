import { defineComponent, toRefs, Transition, withModifiers } from 'vue';
import { notificationProps, NotificationProps } from './notification-types';
import Close from './notification-icon-close';
import TypeIcon from './notification-image';
import { useNotification, useEvent } from './use-notification';
import { useNamespace } from '@devui/shared/utils';
import './notification.scss';

export default defineComponent({
  name: 'DNotification',
  inheritAttrs:false,
  props: notificationProps,
  emits: ['update:modelValue', 'destroy'],
  setup(props: NotificationProps, { emit, slots ,attrs}) {
    const { modelValue, title, type } = toRefs(props);
    const { classes } = useNotification(props);
    const { interrupt, removeReset, close, handleDestroy } = useEvent(props, emit);
    const ns = useNamespace('notification');
    return () => (
      <Transition name="notification-fade" onAfterLeave={handleDestroy}>
        {modelValue.value && (
          <div class={ns.b()} onClick={withModifiers(() => ({}), [''])} onPointerup={withModifiers(() => ({}), ['stop'])} {...attrs}>
            <div class={classes.value} onMouseenter={interrupt} onMouseleave={removeReset}>
              <div class={ns.e('item')}>
                <Close onClick={close} />
                {title.value && <TypeIcon type={type.value} />}
                <div class={[ns.e('message'),{'no-title':props.title === ''}]}>
                  <span class={ns.e('title')}>{title.value}</span>
                  <p class={ns.e('content')}>{slots.default?.()}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Transition>
    );
  },
});
