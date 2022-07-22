import { defineComponent, toRefs, Transition, computed,StyleValue, watch } from 'vue';
import Close from './message-icon-close';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { messageProps, MessageProps } from './message-types';
import { SuccessIcon, WarningIcon, InfoIcon, ErrorIcon } from './message-icons';
import { getLastOffset } from './instance';
import './message.scss';

export default defineComponent({
  name: 'DMessage',
  props: messageProps,
  emits: ['destroy','close'],
  setup(props: MessageProps, { emit, slots }) {
    const { visible, message, type, bordered, shadow, showClose  } = toRefs(props);
    const ns = useNamespace('message');

    let timer: NodeJS.Timeout | null = null;
    let timestamp: number;

    // 卸载
    const handleDestroy = () => {
      emit('destroy');
    };

    // 关闭message
    const close = () => {
      timer && clearTimeout(timer);
      timer = null;
      props.onClose?.();
    };


    const interrupt = () => {
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
    };

    const removeReset = () => {
      if (!props.visible) {
        const remainTime = props.duration - (Date.now() - timestamp);
        timer = setTimeout(close, remainTime);
      }
    };

    watch(
      () => props.visible,
      (val) => {
        if (val) {
          timestamp = Date.now();
          if (props.duration) {
            timer = setTimeout(close, props.duration);
          }
        }
      }
    );

    const classes = computed(() => ({
      [ns.b()]:true,
      [ns.m(type.value)]: true,
    }));

    const lastOffset = computed(() => getLastOffset(props.id));

    const styles = computed(() => {
      const messageStyles: StyleValue = {};
      if(!bordered.value){
        messageStyles['border'] = 'none';
      }
      if(!shadow.value){
        messageStyles['box-shadow'] = 'none';
      }
      return {...messageStyles,top: `${lastOffset.value}px`,};
    });

    const renderIcon = computed(()=>{
      const iconClasses = computed(() => ({
        [ns.e('image')]: true,
        [ns.em('image', type.value)]: true,
      }));
      return (
        !type.value || type.value === 'normal' ? '': <span class={iconClasses.value} >
          {
            type.value &&
          (
            (type.value === 'success' && <SuccessIcon />) ||
            (type.value === 'info' && <InfoIcon />) ||
            (type.value === 'warning' && <WarningIcon />) ||
            (type.value === 'error' && <ErrorIcon />)
          )
          }
        </span>
      );
    });

    const renderText = computed(()=>{
      const textClasses = computed(() => ({
        [ns.e('content')]: true,
        [ns.em('content', type.value)]: true,
      }));
      return (
        <span class={textClasses.value}>
          {
            message.value ? message.value : slots.default?.()
          }
        </span>
      );
    });

    const renderClose = computed(() =>{
      return (
        showClose.value ? <span class={[ns.e('close')]} onClick={close}>
          <Close></Close>
        </span> : ''
      );
    });

    return () => {
      return (
        <Transition name="message-fade" onAfterLeave={handleDestroy}>
          {
            visible.value && (
              <div
                class={classes.value}
                style={{...styles.value}}
                onMouseenter={interrupt}
                onMouseleave={removeReset}
              >
                { renderIcon.value }
                { renderText.value }
                { renderClose.value }
              </div>
            )
          }
        </Transition>
      );
    };
  },
});
