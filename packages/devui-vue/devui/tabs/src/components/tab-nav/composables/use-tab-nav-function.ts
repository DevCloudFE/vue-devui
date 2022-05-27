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
      const tab = tabs.state.data.find((itemOption) => itemOption.id === item.id);
      if (tab && !tab.disabled) {
        tabs.state.active = item.id;
        ctx.emit('update:modelValue', tab.id);
        if (props.type === 'slider' && tabEl && tabsEle) {
          data.offsetLeft = tabEl.getBoundingClientRect().left - tabsEle.value.nativeElement.getBoundingClientRect().left;
          data.offsetWidth = tabEl.getBoundingClientRect().width;
        }
        ctx.emit('active-tab-change', tab.id);
      }
    });
  };

  return { activeClick };
}
