import { defineComponent, inject, onBeforeMount, onMounted, onUpdated, reactive, ref, SetupContext, shallowRef } from 'vue';
import { TabsData, tabsProps, TabsProps } from '../../tabs-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import { useTabNavRender, useTabNavFunction } from './use-tab-nav';
import './tab-nav.scss';
import { OffSetData } from './tab-nav-types';

export default defineComponent({
  name: 'DTabNav',
  props: tabsProps,
  emits: ['update:modelValue', 'active-tab-change'],
  setup(props: TabsProps, ctx: SetupContext) {
    const ns = useNamespace('tabs');
    const tabsEle = shallowRef<HTMLUListElement>();
    const data: OffSetData = reactive({ offsetLeft: 0, offsetWidth: 0, id: null });
    const tabs = inject<TabsData>('tabs');
    const { ulClasses } = useTabNavRender(props);
    const { activeClick } = useTabNavFunction(props, tabs, data, ctx, tabsEle);

    onUpdated(() => {
      if (props.type === 'slider') {
        // 延时等待active样式切换至正确的tab
        setTimeout(() => {
          const tabEle = tabsEle.value.querySelector('#' + props.modelValue + '.active');
          if (tabEle) {
            data.offsetLeft = tabEle.getBoundingClientRect().left - tabsEle.value.getBoundingClientRect().left;
            data.offsetWidth = tabEle.getBoundingClientRect().width;
          }
        });
      }
    });
    onBeforeMount(() => {
      if (props.type !== 'slider' && props.modelValue === undefined && tabs.state.data.length > 0) {
        activeClick(tabs.state.data[0]);
      }
    });
    onMounted(() => {
      if (props.type === 'slider' && props.modelValue === undefined && tabs.state.data.length > 0 && tabs.state.data[0]) {
        activeClick(tabs.state.data[0].tabsEle.value.getElementById(tabs.state.data[0].tabId));
      }
    });
    return () => {
      return (
        <ul ref={tabsEle} role="tablist" class={ulClasses.value}>
          {(tabs.state.data || []).map((item, i) => {
            return (
              <li
                role="presentation"
                onClick={() => {
                  activeClick(item);
                }}
                class={(props.modelValue === (item.id || item.tabId) ? 'active' : '') + ' ' + (item.disabled ? 'disabled' : '')}
                id={item.id || item.tabId}>
                <a role="tab" data-toggle={item.id} aria-expanded={props.modelValue === (item.id || item.tabId)}>
                  {tabs.state.slots[i] ? tabs.state.slots[i]() : <span>{item.title}</span>}
                </a>
              </li>
            );
          })}
          <div
            class={ns.e(`nav-${props.type}-animation`)}
            style={{
              left: data.offsetLeft + 'px',
              width: data.offsetWidth + 'px',
            }}></div>
        </ul>
      );
    };
  },
});
