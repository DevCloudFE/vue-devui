import { defineComponent, ref } from 'vue';
import { backTopProps, BackTopProps } from './back-top-types';
import { usePosition, useVisibility } from './hooks';
import IconTop from './assets/top.svg';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './back-top.scss';

export default defineComponent({
  name: 'DBackTop',
  props: backTopProps,
  emits: [],
  setup(props: BackTopProps, ctx) {
    const slots = ctx.slots;
    const backTopRef = ref(null);
    const ns = useNamespace('back-top');
    const position = usePosition(props);
    const isVisible = useVisibility(props, backTopRef);

    const scrollToTop = () => {
      // toTop方法暂定
      window &&
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth', // 平滑滚动
        });
    };

    return () => (
      <div
        class={ns.b()}
        ref={backTopRef}
        style={{
          ...position,
          display: isVisible.value ? 'block' : 'none',
        }}
        onClick={scrollToTop}>
        <div class={[ns.e('base'), slots.default ? ns.e('custom') : ns.e('content')]}>{slots.default ? slots.default() : <IconTop />}</div>
      </div>
    );
  },
});
