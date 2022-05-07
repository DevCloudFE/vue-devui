import { defineComponent, onMounted, onUnmounted, PropType, ref } from 'vue';
import { on, off } from '../../../shared/devui-directive/utils';
import clickoutsideDirective from '../../../shared/devui-directive/clickoutside';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export default defineComponent({
  directives: {
    clickoutside: clickoutsideDirective,
  },
  props: {
    currentPageSize: Number,
    pageSizeChange: Function,
    pageSizeOptions: Array as PropType<Array<number>>,
  } as const,
  setup() {
    const paginationConfig = ref(null);
    const isShowConfig = ref(false);
    const closeConfigMenu = (e: Event) => {
      isShowConfig.value = isShowConfig.value ? false : !!e;
    };

    onMounted(() => {
      on(paginationConfig.value, 'click', closeConfigMenu);
    });
    onUnmounted(() => {
      off(paginationConfig.value, 'click', closeConfigMenu);
    });

    return {
      paginationConfig,
      isShowConfig,
      closeConfigMenu,
    };
  },
  render() {
    const { closeConfigMenu, currentPageSize, pageSizeChange, pageSizeOptions, isShowConfig, $slots } = this;
    const ns = useNamespace('pagination');

    return (
      <div class={ns.e('config')} v-clickoutside={closeConfigMenu} ref="paginationConfig">
        <div class={ns.e('setup-icon')}>
          <i class="icon-setting" style="font-weight: bold;"></i>
        </div>
        {isShowConfig && (
          <div class={ns.e('config-container')}>
            {$slots.default?.()}

            <div class={ns.e('config-item')}>
              <div class="config-item-title">每页条数</div>
              <div class={ns.e('number')}>
                {pageSizeOptions.map((v: number) => {
                  return (
                    <div class={{ choosed: v === currentPageSize }} key={v} onClick={pageSizeChange.bind(null, { value: v })}>
                      {v}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
});
