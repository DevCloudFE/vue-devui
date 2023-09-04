import { defineComponent, onMounted, reactive, SetupContext, nextTick } from 'vue';
import { GitGraphProps, gitGraphProps, GitGraphData } from './git-graph-types';
import { GitGraph } from './git-graph-class';
import { useTheme } from '@devui/shared/utils/useTheme';

export default defineComponent({
  name: 'DGitGraph',
  props: gitGraphProps,
  emits: ['scrollToBottom'],
  setup(props: GitGraphProps, ctx: SetupContext) {
    const graph = new GitGraph();
    const initGraph = (element: HTMLElement, options: GitGraphData) => {
      if (element && options) {
        graph.load(element, options, isDarkMode.value);
      }
    };
    let paramsArr = reactive([]);
    const { isDarkMode } = useTheme(() => {
      initGraph(...paramsArr);
    });
    onMounted(() => {
      nextTick(() => {
        const graphEle = document.getElementsByClassName('d-graph-wrapper')[0] as HTMLElement;
        initGraph(graphEle, props.option);
        paramsArr = [graphEle, props.option];
      });
    });

    return () => <div class="d-graph-wrapper"></div>;
  },
});
