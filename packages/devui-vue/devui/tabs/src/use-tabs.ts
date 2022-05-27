import type { SetupContext } from 'vue';
import type { UseTabsEvent } from './tabs-types';

export function useTabsEvent(ctx: SetupContext): UseTabsEvent {
  const onUpdateModelValue = (value: string) => {
    ctx.emit('update:modelValue', value);
  };
  const onActiveTabChange = (value: string) => {
    ctx.emit('active-tab-change', value);
  };
  const onTabRemove = (item: any, ev: MouseEvent) => {
    ctx.emit('tab-remove', item, ev);
  };

  return { onUpdateModelValue, onActiveTabChange, onTabRemove };
}
