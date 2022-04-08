import type { CSSProperties, VNode, ComponentInternalInstance } from 'vue';
import { defineComponent } from 'vue';
import { createComponent } from '../../shared/scripts/component';
import Loading from './loading';

import { LoadingOptions } from './loading-types';

const loadingConstructor = defineComponent(Loading);

interface TargetElement extends Element {
  style?: CSSProperties;
}

type IMargeVNodeComponent = VNode['component'] & {
  loadingInstance?: ComponentInternalInstance['proxy'];
} | null;

const cacheTarget = new WeakMap();

const loading = {
  open(options: LoadingOptions = {}): IMargeVNodeComponent {

    const parent: TargetElement = options.target || document.body;

    if (cacheTarget.has(parent)) {
      return cacheTarget.get(parent);
    }
    if (parent.style) {
      parent.style.position = options.positionType;
    }

    const isFull = document.body === parent;

    options = { ...new LoadingOptions(), ...options };

    const instance: IMargeVNodeComponent = createComponent(loadingConstructor, {
      ...options,
      isFull
    }, options.loadingTemplateRef ? () => options.loadingTemplateRef : null);

    cacheTarget.set(parent, instance);

    instance?.proxy?.open();
    parent.appendChild(instance?.proxy?.$el);

    const close = instance?.proxy?.close;
    if (instance) {
      instance.loadingInstance = instance?.proxy;
      if (instance.loadingInstance) {
        instance.loadingInstance.close = (...args: unknown[]) => {
          cacheTarget.delete(parent);
          // 1. 箭头函数内部并没有内置arguments对象 @mrundef-210810
          // 2. 如果没有上下文要求`apply(null)`，不必使用apply/call
          // close.apply(null, arguments)
          close?.(...args);
        };
      }
    }
    return instance;
  }
};

export default loading;
