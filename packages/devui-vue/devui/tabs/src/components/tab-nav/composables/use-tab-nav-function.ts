import type { EmitsOptions, SetupContext, ShallowRef } from 'vue';
import { TabsProps, Active, TabsData } from '../../../tabs-types';
import { OffSetData, UseTabNavFunction } from '../tab-nav-types';

export function useTabNavFunction(
  props: TabsProps,
  tabs: TabsData | undefined,
  data: OffSetData,
  ctx: SetupContext<EmitsOptions>,
  tabsEle: ShallowRef<HTMLUListElement | undefined>
): UseTabNavFunction {
  const update = () => {
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
  };

  const canChange = (currentTab: Active) => {
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
  const activeClick = (item, tabEl?) => {
    if (!props.reactivable && props.modelValue === item.id) {
      return;
    }
    canChange(item.id).then((change) => {
      if (!change) {
        return;
      }
      const tab = tabs.state.data.find((itemOption) => itemOption.id === item.id);
      if (tab && !tab.disabled) {
        tabs.state.active = item.id;
        if (props.type === 'slider' && tabEl && tabsEle) {
          data.offsetLeft = tabEl.getBoundingClientRect().left - tabsEle.value.nativeElement.getBoundingClientRect().left;
          data.offsetWidth = tabEl.getBoundingClientRect().width;
        }
        ctx.emit('active-tab-change', tab.id);
      }
    });
  };

  const beforeMount = () => {
    if (props.type !== 'slider' && props.modelValue === undefined && tabs.state.data.length > 0) {
      activeClick(tabs.state.data[0]);
    }
  };

  const mounted = () => {
    if (props.type === 'slider' && props.modelValue === undefined && tabs.state.data.length > 0 && tabs.state.data[0]) {
      activeClick(tabs.state.data[0].tabsEle.value.getElementById(tabs.state.data[0].tabId));
    }
  };

  const tabCanClose = (item) => {
    return (props.closeable || item.closeable) && !item.disabled;
  };

  return { update, activeClick, beforeMount, mounted, tabCanClose };
}
