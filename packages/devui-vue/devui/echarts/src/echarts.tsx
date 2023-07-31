import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import { DevuiChartProps, devuiChartProps } from "./echarts-types";
import * as echarts from 'echarts';
import { DEVUI_ECHART_THEME } from "./echarts-theme";
import { toRefs } from "@vueuse/core";


export default defineComponent({
  name: 'DChart',
  props: devuiChartProps,
  emits: ['chartReady'],
  setup(props: DevuiChartProps, { emit }) {
    const { option } = toRefs(props);
    let theme: any;
    let themeService: any;
    let isDark = false;
    let echartInstacne: any;
    let timer: NodeJS.Timeout;

    const chartRef = ref();

    const themeChange = () => {
      isDark = !!themeService?.currentTheme?.isDark;
      theme = isDark ? DEVUI_ECHART_THEME.defaultDarkTheme : DEVUI_ECHART_THEME.defaultLightTheme;

      emit('chartReady', echartInstacne);
    };

    const onresize = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        echartInstacne.resize();
      }, 100);
    };

    onMounted(() => {
      themeService = (window as any)['devuiThemeService'];
      isDark = !!themeService?.currentTheme?.isDark;
      theme = isDark ? DEVUI_ECHART_THEME.defaultDarkTheme : DEVUI_ECHART_THEME.defaultLightTheme;
      echartInstacne = echarts.init(chartRef.value, theme);

      if(themeService) {
        themeService.eventBus.add('themeChanged', themeChange);
      }

      echartInstacne.setOption(option.value, true);
      emit('chartReady', echartInstacne);

      window.addEventListener('resize', onresize);
    });

    onUnmounted(() => {
      echartInstacne?.dispatchAction({
        type: 'hideTip'
      });

      themeService.eventBus.remove('themeChanged', themeChange);
    });

    return () => (
      <div ref={chartRef} class="devui-charts"></div>
    );
  }
});
