import { h, Comment, Text, Fragment } from 'vue';
import { isObject } from '@vue/shared';
import type { VNode } from 'vue';
import { useNamespace } from '../../../hooks/use-namespace';

const ns = useNamespace('popper-trigger');

function wrapContent(content: string | VNode) {
  return h('span', { class: ns.b() }, content);
}

export function getFirstValidChild(nodes: VNode[]): VNode | null {
  for (const child of nodes) {
    if (isObject(child)) {
      if (child.type === Comment) {
        continue;
      }
      if (child.type === 'svg' || child.type === Text) {
        return wrapContent(child);
      }
      if (child.type === Fragment) {
        return getFirstValidChild(child.children as VNode[]);
      }
      return child;
    }
    return wrapContent(child);
  }

  return null;
}
