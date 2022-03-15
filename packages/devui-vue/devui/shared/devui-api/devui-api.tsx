import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'DApi',
  props: {
  },
  setup(props, ctx) {
    const route = useRoute();
    const ApiCn = route.meta['zh-cn'];

    return () => {
      return <div class="markdown"><ApiCn></ApiCn></div>;
    };
  }
});
