import { defineComponent, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import { multiAutoCompleteProps, MultiAutoCompleteProps } from './multi-auto-complete-types';
import './multi-auto-complete.scss';

export default defineComponent({
  name: 'DMultiAutoComplete',
  props: multiAutoCompleteProps,
  emits: [],
  setup(props: MultiAutoCompleteProps, ctx: SetupContext) {
    // 直接解构 props 会导致响应式失效，需要使用 toRefs 进行包裹
    // const { data } = toRefs(props);
    // console.log(data.value);

    return () => {
      return (
        <div class="devui-multi-auto-complete"></div>
      );
    };
  }
});
