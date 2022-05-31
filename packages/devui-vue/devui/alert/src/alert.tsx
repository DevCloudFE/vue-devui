import { defineComponent, ref, Transition, onMounted } from 'vue';
import AlertCloseIcon from './components/alert-close-icon';
import AlertTypeIcon from './components/alert-type-icon';
import { alertProps } from './alert-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './alert.scss';

export default defineComponent({
  name: 'DAlert',
  props: alertProps,
  emits: ['close'],
  setup(props, ctx) {
    const ns = useNamespace('alert');
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
        <Transition name={ns.b()} onAfterLeave={afterLeave}>
          <div
            ref={alertEl}
            v-show={!closing.value}
            class={[ns.b(), ns.m(props.type), props.cssClass, closing.value && ns.m('close'), props.center && ns.m('center')]}>
            {props.showIcon !== false && props.type !== 'simple' ? (
              <span class={ns.e('icon-wrap')}>
                <AlertTypeIcon type={props.type} />
              </span>
            ) : null}
            <div class={ns.e('content')}>
              <span>{ctx.slots.default?.()}</span>
              {props.closeable ? (
                <div class={ns.e('close-icon')} onClick={close}>
                  <AlertCloseIcon />
                </div>
              ) : null}
            </div>
          </div>
        </Transition>
      ) : null;
    };
  },
});
