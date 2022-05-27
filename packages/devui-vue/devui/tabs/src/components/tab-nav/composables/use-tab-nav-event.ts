import type { SetupContext } from 'vue';
import type { UseTabNavEvent } from '../tab-nav-types';

export function useTabNavEvent(ctx: SetupContext): UseTabNavEvent {
  const onTabRemove = (item: any, ev: MouseEvent) => {
    console.log('handleClose');
    ev.stopPropagation();
    ctx.emit('tab-remove', item, ev);
  };
  return { onTabRemove };
}
