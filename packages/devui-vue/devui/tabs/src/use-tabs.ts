import { computed } from 'vue';
import type { SetupContext } from 'vue';
import type { UseTabsEvent, TabsProps, UseTabsRender, TabsStateData } from './tabs-types';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('tabs');

export function useTabsEvent(ctx: SetupContext): UseTabsEvent {
  const onUpdateModelValue = (value: string | number) => {
    ctx.emit('update:modelValue', value);
  };
  const onActiveTabChange = (value: string) => {
    ctx.emit('active-tab-change', value);
  };

  const onTabRemove = (item: TabsStateData, ev: MouseEvent) => {
    ctx.emit('tab-remove', item, ev);
  };
  const onTabAdd = () => {
    ctx.emit('tab-add');
  };
  const onTabChange = (id: string | undefined, type: string) => {
    ctx.emit('tab-change', id, type);
  };

  return { onUpdateModelValue, onActiveTabChange, onTabRemove, onTabAdd, onTabChange };
}

export function useTabsRender(props: TabsProps): UseTabsRender {
  const tabsClasses = computed(() => ({
    [ns.b()]: true,
    [ns.m(props.tabPosition)]: true,
  }));

  return { tabsClasses };
}
