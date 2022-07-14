import { computed, defineComponent, ref, Transition, watch } from 'vue';
import { toastProps, type ToastProps, type Message } from './toast-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import DIcon from '../../icon/src/icon';
import './toast.scss';
import cloneDeep from 'lodash/cloneDeep';

export default defineComponent({
  name: 'DToast',
  components: {
    DIcon,
  },
  props: toastProps,
  emits: ['close'],
  setup(props: ToastProps, { slots, emit, expose }) {
    const ns = useNamespace('toast');
    const visible = ref<boolean>(false);
    const display = ref<'none' | 'block'>('none');
    const values = ref<Message[]>([]);

    const setVisible = (v: boolean) => {
      visible.value = v;
    };
    const handleClose = (e: MouseEvent, index: number) => {
      const dom = document.getElementById(`devui-toast-item-${index}`);
      dom?.classList.remove('devui-toast__item-show-toast');
      dom?.classList.add('devui-toast__item-hide-toast');
      setTimeout(() => {
        values.value.splice(index, 1);
      }, 300);
      emit('close', e);
    };

    const iconName = (severity: string) => {
      if (severity === 'success') {
        return 'right-o';
      } else if (severity === 'error') {
        return 'error-o';
      } else if (severity === 'warn') {
        return 'warning-o';
      }
    };

    const toastClass = computed(() => (visible.value ? 'devui-toast__item-show-toast' : 'devui-toast__item-hide-toast'));

    watch(
      () => visible.value,
      (val) => {
        if (val) {
          display.value = 'block';
        } else {
          setTimeout(() => {
            display.value = 'none';
          }, 300);
        }
      }
    );

    watch(
      () => props.value,
      (val) => {
        values.value = val as Message[];
      },
      { deep: true, immediate: true }
    );

    expose({
      setVisible,
    });
    return () => (
      <div class={ns.b()}>
        {values.value?.length &&
          values.value.map((item, index) => {
            return (
              <div
                key={index}
                id={`devui-toast-item-${index}`}
                style={{ display: display.value }}
                class={[`${ns.e('item')} ${toastClass.value}`]}>
                <div class={ns.e('item-icon')}>{item.severity ? <d-icon name={iconName(item.severity)}></d-icon> : null}</div>
                <div class={ns.e('item-close')} onClick={(e) => handleClose(e, index)}>
                  <d-icon name="close"></d-icon>
                </div>
                <div class={ns.e('item-content')}>
                  <div>{item.summary}</div>
                  <div class={ns.e('item-content-wrap')}>{item.content}</div>
                </div>
              </div>
            );
          })}
      </div>
    );
  },
});
