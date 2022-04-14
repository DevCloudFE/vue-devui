import type { FunctionalComponent, PropType, VNodeProps, Slots } from 'vue';
import { cloneVNode } from 'vue';
import { flattenChildren } from '../utils';


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

export default Item;
