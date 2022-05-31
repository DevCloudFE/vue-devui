import type { SetupContext } from 'vue';
import type { UseTabNavEvent } from '../tab-nav-types';

export function useTabNavEvent(ctx: SetupContext): UseTabNavEvent {
  const onTabRemove = (item: any, ev: MouseEvent) => {
    ev.stopPropagation();
    ctx.emit('tab-remove', item, ev);
    ctx.emit('add-or-delete-tab-change', item.id, 'delete');
  };
  const onTabAdd = () => {
    ctx.emit('tab-add');
    ctx.emit('add-or-delete-tab-change', undefined, 'add');
  };
  return { onTabRemove, onTabAdd };
}
