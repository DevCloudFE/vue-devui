import type { SetupContext } from 'vue';
import type { UseTabNavEvent } from '../tab-nav-types';
import type { TabsStateData } from '../../../tabs-types';

export function useTabNavEvent(ctx: SetupContext): UseTabNavEvent {
  const onTabRemove = (item: TabsStateData, ev: MouseEvent) => {
    ev.stopPropagation();
    ctx.emit('tab-remove', item.props, ev);
    ctx.emit('tab-change', item.props.id, 'delete');
  };
  const onTabAdd = () => {
    ctx.emit('tab-add');
    ctx.emit('tab-change', undefined, 'add');
  };
  return { onTabRemove, onTabAdd };
}
