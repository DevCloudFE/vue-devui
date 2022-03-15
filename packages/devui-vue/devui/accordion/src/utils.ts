import { AccordionMenuItem, AccordionMenuType } from './accordion.type';
import { ComponentInternalInstance, getCurrentInstance } from 'vue';

const flatten = (
  arr: Array<any>,
  childrenKey = 'children',
  includeParent = false,
  includeLeaf = true
): Array<AccordionMenuItem> => {
  return arr.reduce((acc, cur) => {
    const children = cur[childrenKey];
    if (children === undefined) {
      if (includeLeaf) {
        acc.push(cur);
      }
    } else {
      if (includeParent) {
        acc.push(cur);
      }
      if (Array.isArray(children)) {
        acc.push(...flatten(children, childrenKey, includeParent));
      }
    }
    return acc;
  }, []);
};

const precheckNodeId = (d: AccordionMenuItem): AccordionMenuItem => {
  const random = parseInt((Math.random() * 10 ** 8).toString().padEnd(8, '0'));
  return { ...d, id: d.id ? `${d.id}_${random}` : `${d.title.replaceAll(' ', '-')}_${random}` };
};

const precheckTree = (ds: AccordionMenuType): AccordionMenuType => {
  return ds.map((d) => {
    const dd = precheckNodeId(d);
    if (d.children) {
      return {
        ...dd,
        children: precheckTree(d.children)
      };
    }
    return dd;
  });
};


const getRootSlots = () => {
  const rootComponentName = 'DAccordion';
  /**
   * 获取父组件
   */
  const getRootComponent = (
    component: ComponentInternalInstance | null
  ): ComponentInternalInstance | undefined => {
    if (component && component.type.name === rootComponentName) {
      return component;
    }

    if (component && component.parent) {
      const parent = component.parent;
      return getRootComponent(parent);
    }
  };

  // 获取根节点
  const rootComponent = getRootComponent(getCurrentInstance());
  return rootComponent?.slots;
};


export {
  flatten,
  precheckNodeId,
  precheckTree,
  getRootSlots
};
