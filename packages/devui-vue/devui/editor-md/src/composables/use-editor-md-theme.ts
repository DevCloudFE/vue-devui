import { onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";


export function useEditorMdTheme(callback: () => void) {
  const isDarkMode = ref(false);
  let themeService: any;

  const themeChange = () => {
    if (themeService) {
      isDarkMode.value = themeService.currentTheme.id.indexOf('dark') !== -1;
      callback();
    }
  };

  onBeforeMount(() => {
    themeService = window['devuiThemeService'];
  });

  onMounted(() => {
    themeChange();
    if (themeService && themeService.eventBus) {
      themeService.eventBus.add('themeChanged', themeChange);
    }
  });

  onBeforeUnmount(() => {
    if (themeService && themeService.eventBus) {
      themeService.eventBus.remove('themeChanged', themeChange);
    }
  });

  return { isDarkMode };
}
