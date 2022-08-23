import { defineComponent, inject } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './list-item.scss';
import { listItemProps } from './list-types';
import { listKey, ListKey } from './listKey';

export default defineComponent({
  name: 'DListItem',
  props: listItemProps,
  setup(props, { slots }) {
    const ns = useNamespace('list-item');
    const split = inject<ListKey>(listKey)?.split;
    const sizeStyle = inject<ListKey>(listKey)?.sizeStyle;
    const layout = inject<ListKey>(listKey)?.layout;

    return () => (
      <div class={`${ns.b()}  ${split?.value ? ns.m('split') : ''}`} style={{ ...sizeStyle?.value }}>
        <div style={{ flex: 1 }}>{slots.default?.()}</div>
        {slots.actions ? (
          <div
            class={ns.e('action')}
            style={{
              position: layout?.value === 'vertical' ? 'absolute' : 'static',
              zIndex: layout?.value === 'vertical' ? 99 : 'inherit',
              bottom: '12px',
            }}>
            {slots.actions?.().map((item, index) => {
              return (
                <div class={ns.e('action-item')}>
                  <div>{item}</div>
                  {index !== (slots.actions?.().length as number) - 1 ? <div class={ns.e('action-split')}></div> : null}
                </div>
              );
            })}
          </div>
        ) : null}
        {props.extra || slots.extra ? (
          slots.extra ? (
            <div class={ns.e('extra')}>{slots.extra?.()}</div>
          ) : props.extra ? (
            props.extra
          ) : null
        ) : null}
      </div>
    );
  },
});
