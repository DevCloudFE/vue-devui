import type { VNode } from 'vue';
import { h, render } from 'vue';

const COMPONENT_CONTAINER_SYMBOL = Symbol('dev_component_container');
type IMargeVNode =  {
  [COMPONENT_CONTAINER_SYMBOL]?: HTMLDivElement;
} & VNode;
/**
 * 创建组件实例对象
 * 返回的实例和调用 getCurrentComponent() 返回的一致
 * @param {*} Component
 */
export function createComponent(component: any, props: any, children: any = null): VNode['component'] {
  const vnode: IMargeVNode = h(component, { ...props }, children);
  const container = document.createElement('div');
  vnode[COMPONENT_CONTAINER_SYMBOL] = container;
  render(vnode, container);
  return vnode.component;
}

/**
 * 销毁组件实例对象
 * @param {*} ComponnetInstance 通过createComponent方法得到的组件实例对象
 */
export function unmountComponent(ComponnetInstance: any): void {
  render(null, ComponnetInstance?.vnode[COMPONENT_CONTAINER_SYMBOL]);
}
