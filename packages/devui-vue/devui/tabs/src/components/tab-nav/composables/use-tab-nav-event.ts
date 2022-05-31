import type { SetupContext } from 'vue';
import type { UseTabNavEvent } from '../tab-nav-types';

export function useTabNavEvent(ctx: SetupContext): UseTabNavEvent {
  const onTabRemove = (item: any, ev: MouseEvent) => {
    ev.stopPropagation();
    ctx.emit('tab-remove', item, ev);
  };
  const onTabAdd = () => {
    ctx.emit('tab-add');
  };
  return { onTabRemove, onTabAdd };
}
