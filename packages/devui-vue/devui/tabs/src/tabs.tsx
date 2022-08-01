import { defineComponent, onBeforeMount, onMounted, onUpdated, provide, reactive, ref } from 'vue';
import { Active, Tabs, tabsProps, TabsState, TabsProps } from './tabs-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { useTabsRender } from './use-tabs';
import './tabs.scss';

export default defineComponent({
  name: 'DTabs',
  props: tabsProps,
  emits: ['update:modelValue', 'active-tab-change'],
  setup(props: TabsProps, { emit, slots }) {
    const ns = useNamespace('tabs');
    const tabsEle = ref(null);
    const data = reactive({ offsetLeft: 0, offsetWidth: 0, id: null });
    const state: TabsState = reactive({
      data: [],
      active: props.modelValue,
      showContent: props.showContent,
      slots: [],
    });
    provide<Tabs>('tabs', {
      state,
    });
    const { ulClasses } = useTabsRender(props);

    const canChange = function (currentTab: Active) {
      let changeResult = Promise.resolve(true);
      if (typeof props.beforeChange === 'function') {
        const result: any = props.beforeChange(currentTab);
        if (typeof result !== 'undefined') {
          if (result.then) {
            changeResult = result;
          } else {
            changeResult = Promise.resolve(result);
          }
        }
      }

      return changeResult;
    };
    const activeClick = function (item, tabEl?) {
      if (!props.reactivable && props.modelValue === item.id) {
        return;
      }
      canChange(item.id).then((change) => {
        if (!change) {
          return;
        }
        const tab = state.data.find((itemOption) => itemOption.id === item.id);
        if (tab && !tab.disabled) {
          state.active = item.id;
          emit('update:modelValue', tab.id);
          if (props.type === 'slider' && tabEl && tabsEle) {
            this.offsetLeft = tabEl.getBoundingClientRect().left - this.tabsEle.nativeElement.getBoundingClientRect().left;
            this.offsetWidth = tabEl.getBoundingClientRect().width;
          }
          emit('active-tab-change', tab.id);
        }
      });
    };
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
      if (props.type !== 'slider' && props.modelValue === undefined && state.data.length > 0) {
        activeClick(state.data[0]);
      }
    });
    onMounted(() => {
      if (props.type === 'slider' && props.modelValue === undefined && state.data.length > 0 && state.data[0]) {
        activeClick(state.data[0].tabsEle.value.getElementById(state.data[0].tabId));
      }
    });
    return () => {
      return (
        <div class={ns.b()}>
          <ul ref={tabsEle} role="tablist" class={ulClasses.value}>
            {state.data.map((item, i) => {
              return (
                <li
                  role="presentation"
                  onClick={() => {
                    activeClick(item);
                  }}
                  class={(props.modelValue === (item.id || item.tabId) ? 'active' : '') + ' ' + (item.disabled ? 'disabled' : '')}
                  id={item.id || item.tabId}>
                  <a role="tab" data-toggle={item.id} aria-expanded={props.modelValue === (item.id || item.tabId)}>
                    {state.slots[i] ? state.slots[i]() : <span>{item.title}</span>}
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
          {slots.default?.()}
        </div>
      );
    };
  },
});
