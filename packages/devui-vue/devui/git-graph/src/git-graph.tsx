import { defineComponent, onMounted, ref, SetupContext, nextTick } from "vue";
import { GitGraphProps, gitGraphProps } from "./git-graph-types";
import useGitGraph from "./use-git-graph";


export default defineComponent({
  name: 'DGitGraph',
  props: gitGraphProps,
  emits: ['scrollToBottom'],
  setup(props: GitGraphProps, ctx: SetupContext) {
    const isDark = ref(false);
    const {initTheme, initGraph} = useGitGraph(props, ctx, isDark);
    onMounted(() => {
      nextTick(() => {
        const graphEle = document.getElementsByClassName('d-graph-wrapper')[0] as HTMLElement;
        initTheme();
        initGraph(graphEle, props.option, isDark.value);
      });
    });

    return () => (
      <div class="d-graph-wrapper"></div>
    );
  }
});
