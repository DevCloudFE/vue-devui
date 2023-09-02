import { h, Comment, Text, Fragment, cloneVNode, withDirectives, inject } from 'vue';
import { isObject } from '@vue/shared';
import type { VNode, Ref } from 'vue';
import { useNamespace } from '../../../utils/use-namespace';
import { POPPER_TRIGGER_TOKEN } from './popper-trigger-types';

export function usePopperTrigger() {
  const ns = useNamespace('popper-trigger');
  const triggerRef = inject(POPPER_TRIGGER_TOKEN) as Ref<HTMLElement | null>;
  function addDirective(node: VNode): VNode {
    return withDirectives(cloneVNode(node, {}, true), [
      [
        {
          mounted(el) {
            triggerRef.value = el;
          },
          updated(el) {
            triggerRef.value = el;
          },
          unmounted(el) {
            triggerRef.value = null;
          },
        },
      ],
    ]);
  }

  function wrapContent(content: string | VNode) {
    const node = h('span', { class: ns.b() }, content);
    return addDirective(node)
  }
  function addDirectiveToFirstValidChild(nodes: VNode[]): VNode | null | undefined {
    for (let i = 0; i < nodes.length; i++) {
      let child = nodes[i];
      if (child) {
        if (isObject(child)) {
          if (child.type === Comment) {
            continue;
          }
          if (child.type === 'svg' || child.type === Text) {
            nodes[i] = wrapContent(child)
            return;
          }
          if (child.type === Fragment) {
            return addDirectiveToFirstValidChild(child.children as VNode[]);
          }
          nodes[i] = addDirective(child);
          return;
        }
        nodes[i] = wrapContent(child)
      }
      return;
    }
    return null;
  }
  return { addDirectiveToFirstValidChild }
}

