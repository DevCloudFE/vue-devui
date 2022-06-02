import { defineComponent, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import { stepsProps, StepsProps } from './steps-types';
import './steps.scss';

export default defineComponent({
  name: 'DSteps',
  props: stepsProps,
  emits: [],
  setup(props: StepsProps, ctx: SetupContext) {
    // 直接解构 props 会导致响应式失效，需要使用 toRefs 进行包裹
    // const { data } = toRefs(props);
    // console.log(data.value);

    return () => {
      return (
        <div class="devui-steps"></div>
      );
    };
  }
});
