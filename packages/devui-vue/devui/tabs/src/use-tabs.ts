import type { SetupContext } from 'vue';
import type { UseTabsEvent } from './tabs-types';

export function useTabsEvent(ctx: SetupContext): UseTabsEvent {
  const onUpdateModelValue = (value: string | number) => {
    ctx.emit('update:modelValue', value);
  };
  const onActiveTabChange = (value: string) => {
    ctx.emit('active-tab-change', value);
  };
  const onTabRemove = (item: any, ev: MouseEvent) => {
    ctx.emit('tab-remove', item, ev);
  };
  const onTabAdd = () => {
    ctx.emit('tab-add');
  };

  return { onUpdateModelValue, onActiveTabChange, onTabRemove, onTabAdd };
}
