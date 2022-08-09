import type { ComputedRef, EmitsOptions, SetupContext, ShallowRef } from 'vue';
import { TabsProps, Active, TabsData, TabsStateData } from '../../../tabs-types';
import { OffSetData, UseTabNavFunction } from '../tab-nav-types';

export function useTabNavFunction(
  props: TabsProps,
  tabs: TabsData | undefined,
  tabsList: ComputedRef,
  data: OffSetData,
  ctx: SetupContext<EmitsOptions>,
  tabsEle: ShallowRef<HTMLUListElement | undefined>
): UseTabNavFunction {
  const update = () => {
    if (props.type === 'slider') {
      // 延时等待active样式切换至正确的tab
      setTimeout(() => {
        const tabEle = tabsEle.value?.querySelector('#' + props.modelValue + '.active');
        if (tabEle && tabsEle.value) {
          if (['top', 'bottom'].includes(props.tabPosition)) {
            data.offsetLeft = tabEle.getBoundingClientRect().left - tabsEle.value.getBoundingClientRect().left;
          } else {
            data.offsetTop = tabEle.getBoundingClientRect().top - tabsEle.value.getBoundingClientRect().top;
            data.offsetHeight = tabEle.getBoundingClientRect().height;
          }
          data.offsetWidth = tabEle.getBoundingClientRect().width;
        }
      });
    }
  };

  const canChange = (currentTab: Active) => {
    let changeResult = Promise.resolve(true);
    if (typeof props.beforeChange === 'function') {
      const result = props.beforeChange(currentTab) as boolean | Promise<boolean>;
      if (typeof result !== 'undefined') {
        if ((result as Promise<boolean>).then) {
          changeResult = result as Promise<boolean>;
        } else {
          changeResult = Promise.resolve(result);
        }
      }
    }

    return changeResult;
  };
  const activeClick = (item: TabsStateData, tabEl?: Element) => {
    const id = item.props.id;
    if (!props.reactivable && props.modelValue === id) {
      return;
    }
    canChange(id).then((change) => {
      if (!change) {
        return;
      }
      const tab = tabsList.value.find((itemOption) => itemOption.props.id === id);
      if (tabs && tab && !tab.props.disabled) {
        tabs.state.active = id;
        if (props.type === 'slider' && tabEl && tabsEle && tabsEle.value) {
          if (['left', 'right'].includes(props.tabPosition)) {
            data.offsetLeft = tabEl.getBoundingClientRect().left - tabsEle.value.nativeElement.getBoundingClientRect().left;
          } else {
            data.offsetTop = tabEl.getBoundingClientRect().top - tabsEle.value.nativeElement.getBoundingClientRect().top;
            data.offsetHeight = tabEl.getBoundingClientRect().height;
          }
          data.offsetWidth = tabEl.getBoundingClientRect().width;
        }
        ctx.emit('active-tab-change', tab.props.id);
      }
    });
  };

  const beforeMount = () => {
    if (props.type !== 'slider' && props.modelValue === undefined && tabsList.value && tabsList.value.length > 0) {
      activeClick(tabsList.value[0]);
    }
  };

  const mounted = () => {
    if (props.type === 'slider' && props.modelValue === undefined && tabsList.value && tabsList.value.length > 0 && tabsList.value[0]) {
      const tabsStateData = tabsList.value[0];
      const dom = tabsStateData.tabsEle?.value;
      const ele = dom?.getElementById(tabsStateData.tabId as string);
      activeClick(ele as unknown as TabsStateData);
    }
  };

  const tabCanClose = (item: TabsStateData) => {
    return (props.closeable || item.closeable) && !item.disabled;
  };

  return { update, activeClick, beforeMount, mounted, tabCanClose };
}
