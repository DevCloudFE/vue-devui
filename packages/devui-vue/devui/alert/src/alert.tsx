import { defineComponent, ref, Transition, onMounted } from 'vue';

import AlertCloseIcon from './components/alert-close-icon';
import AlertTypeIcon from './components/alert-type-icon';

import { alertProps } from './alert-types';
import './alert.scss';

export default defineComponent({
  name: 'DAlert',
  props: alertProps,
  emits: ['close'],
  setup(props, ctx) {
    const hide = ref(false);
    const closing = ref(false);
    const alertEl = ref();
    let dismissTimer: undefined | number = undefined;
    const close = (event?: MouseEvent) => {
      dismissTimer && clearTimeout(dismissTimer);
      closing.value = true;
      ctx.emit('close', event);
    };

    const afterLeave = () => {
      dismissTimer = undefined;
      hide.value = true;
      closing.value = false;
    };

    onMounted(() => {
      if (props.dismissTime) {
        dismissTimer = window.setTimeout(() => {
          close();
        }, props.dismissTime);
      }
    });

    return () => {
      return !hide.value ? (
        <Transition name="devui-alert" onAfterLeave={afterLeave}>
          <div
            ref={alertEl}
            v-show={!closing.value}
            class={`devui-alert devui-alert-${props.type} ${props.cssClass} ${closing.value ? 'devui-alter-close' : ''
            }`}
          >
            {props.closeable ? (
              <div class="devui-close" onClick={close}>
                <AlertCloseIcon></AlertCloseIcon>
              </div>
            ) : null}
            {props.showIcon !== false && props.type !== 'simple' ? (
              <span class="devui-alert-icon">
                <AlertTypeIcon type={props.type}></AlertTypeIcon>
              </span>
            ) : null}
            {ctx.slots.default?.()}
          </div>
        </Transition>
      ) : null;
    };
  },
});
