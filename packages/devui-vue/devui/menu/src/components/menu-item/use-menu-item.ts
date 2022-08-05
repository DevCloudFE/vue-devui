import { Ref, ref } from 'vue';
import type { Router } from 'vue-router';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import type { ChangeRouteResult, MenuItemProps } from './menu-item-types';

const ns = useNamespace('menu');

export function initSelect(defaultSelectKeys: string[], keys: string, isMultiple: boolean, disabled: Ref<boolean>): boolean {
  const isSelect = ref(false);
  if (!isMultiple) {
    if (defaultSelectKeys[0] === keys && !disabled.value) {
      isSelect.value = true;
    } else {
      isSelect.value = false;
    }
  } else {
    if (defaultSelectKeys.includes(keys)) {
      isSelect.value = true;
    } else {
      isSelect.value = false;
    }
  }
  return isSelect.value;
}

export function addActiveParent(ele: HTMLElement): HTMLElement {
  let cur = ele.parentElement as HTMLElement;
  while (!cur.classList.contains(ns.b())) {
    if (cur.firstElementChild?.tagName === 'DIV') {
      cur?.firstElementChild?.classList.add(`${ns.b()}-active-parent`);
    }
    cur = cur.parentElement as HTMLElement;
  }
  return cur;
}

export function changeRoute(props: MenuItemProps, router: Router, useRouter: boolean, key: string): ChangeRouteResult | undefined {
  if (useRouter && router) {
    const route = props.route || key;
    const routerResult = router.push(route).then((res) => {
      return res;
    });
    return { route, routerResult };
  }
  return undefined;
}

export function changeSelect(isMultiple: boolean, defaultSelectKeys: string[], key: string): string[]{
  if (isMultiple){
    if (!defaultSelectKeys.indexOf(key)){
      defaultSelectKeys.push(key);
    }
  } else{
    defaultSelectKeys = [];
    defaultSelectKeys.push(key);
  }
  return defaultSelectKeys;
}
