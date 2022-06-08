import { Ref, ref } from 'vue';
import { useNamespace } from '../../../../shared/hooks/use-namespace';

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
