import type { ComputedRef } from 'vue';

export interface UseTabNavRender {
  ulClasses: ComputedRef<Record<string, boolean>>;
}

export interface OffSetData {
  offsetLeft: number;
  offsetWidth: number;
  id: null;
}

export interface UseTabNavFunction {
  activeClick: (item: any, tabEl?: any) => void;
}
