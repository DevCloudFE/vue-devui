import { defineComponent } from 'vue';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './list-item.scss';
import { listItemMetaProps } from './list-types';
import DRow from '../../grid/src/row';
import DCol from '../../grid/src/col';
import './list-item-meta.scss';

export default defineComponent({
  name: 'DListItemMeta',
  components: {
    DRow,
    DCol,
  },
  props: listItemMetaProps,
  setup(props, { slots }) {
    const ns = useNamespace('list-item-meta');
    return () => (
      <div class={ns.b()}>
        <d-row align="center">
          <d-col span={2}>{slots.avatar ? slots.avatar() : null}</d-col>
          <d-col span={22}>
            {props.title || slots.title ? <div class={ns.m('title')}>{slots.title ? slots.title() : props.title}</div> : null}
            {props.description || slots.description ? (
              <div class={ns.m('description')}>{slots.description ? slots.description() : props.description}</div>
            ) : null}
          </d-col>
        </d-row>
      </div>
    );
  },
});
