import { defineComponent, onMounted, ref } from 'vue';
import { backTopProps, BackTopProps } from './back-top-types';
import { usePosition, useVisibility } from './hooks';
import './back-top.scss';
import IconTop from './assets/top.svg';

export default defineComponent({
  name: 'DBackTop',
  props: backTopProps,
  emits: [],
  setup(props: BackTopProps, ctx) {
    const slots = ctx.slots;
    const backTopRef = ref(null);

    const position = usePosition(props);
    const isVisible = useVisibility(props, backTopRef);

    const scrollToTop = () => {
      // toTop方法暂定
      window &&
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth' // 平滑滚动
        });
    };

    return () => (
      <div
        class='devui-back-top'
        ref={backTopRef}
        style={{
          ...position,
          display: isVisible.value ? 'block' : 'none'
        }}
        onClick={scrollToTop}
      >
        <div
          class={[
            'devui-back-top-base',
            slots.default ? 'devui-backtop-custom' : 'devui-back-top-content'
          ]}
        >
          {slots.default ? slots.default() : <IconTop />}
        </div>
      </div>
    );
  }
});
