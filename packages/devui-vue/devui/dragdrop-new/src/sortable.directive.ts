import { DirectiveBinding } from 'vue';
import { NgDirectiveBase } from './directive-base';

export interface ISortableBinding {
  dSortableZMode?: any;
  dSortable?: 'v' | 'h';
  [props: string]: any;
}

export class SortableDirective extends NgDirectiveBase<ISortableBinding> {
  static INSTANCE_KEY = '__vueDevuiSortableDirectiveInstance';
  dSortDirection = 'v';
  dSortableZMode = false;
  dSortable = true;

  hostBindingMap?: { [key: string]: string } | undefined = {
    dSortDirection: 'dsortable',
    dSortableZMode: 'd-sortable-zmode',
    dSortable: 'd-sortable',
  };
  inputNameMap?: { [key: string]: string } | undefined = {
    dSortable: 'dSortDirection',
  };
  el: { nativeElement: any } = { nativeElement: null };
  constructor(el: HTMLElement) {
    super();
    this.el.nativeElement = el;
  }
}

export default {
  mounted(el: HTMLElement & { [props: string]: any }, binding: DirectiveBinding<ISortableBinding>) {
    const sortableDirective = (el[SortableDirective.INSTANCE_KEY] = new SortableDirective(el));
    sortableDirective.setInput(binding.value);
    sortableDirective.mounted();
  },
  updated(el: HTMLElement & { [props: string]: any }, binding: DirectiveBinding<ISortableBinding>) {
    const sortableDirective = el[SortableDirective.INSTANCE_KEY] as SortableDirective;
    sortableDirective.updateInput(binding.value, binding.oldValue!);
  },
};
