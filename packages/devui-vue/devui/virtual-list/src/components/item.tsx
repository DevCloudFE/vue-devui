import type { FunctionalComponent, PropType, VNodeProps, Slots, VNode } from 'vue';
import { cloneVNode } from 'vue';
import { flattenChildren } from '../utils';
import { RenderFunc, SharedConfig } from '../virtual-list-types';


export interface ItemProps {
  setRef: (element: HTMLElement & { $el: never }) => void;
}

const Item: FunctionalComponent<ItemProps> = ({ setRef }, { slots }) => {
  const children = flattenChildren((slots as Slots).default?.());

  return children && children.length
    ? cloneVNode(children[0], { ref: setRef as VNodeProps['ref'], })
    : children;
};
Item.props = {
  setRef: {
    type: Function as PropType<(element: HTMLElement) => void>,
  },
};

export function renderChildren<T>(
  list: T[],
  startIndex: number,
  endIndex: number,
  setNodeRef: (item: T, element: HTMLElement & { $el: never }) => void,
  { getKey }: SharedConfig<T>,
  renderFunc: RenderFunc<T>,
): string | VNode[] {
  if (renderFunc === undefined) { return ''; }
  return list.slice(startIndex, endIndex + 1).map((item, index) => {
    const eleIndex = startIndex + index;
    const node = renderFunc(item, eleIndex, {});
    const key = getKey(item);
    return (
      <Item key={key} setRef={(ele: HTMLElement & { $el: never }) => setNodeRef(item, ele)}>
        {node}
      </Item>
    );
  });
}

export default Item;
