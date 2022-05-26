import type { ComputedRef } from 'vue';

export interface UseTabRender {
  ulClasses: ComputedRef<Record<string, boolean>>;
}

export interface OffSetData {
  offsetLeft: number;
  offsetWidth: number;
  id: null;
}

export interface UseTabFunction {
  activeClick: (item: any, tabEl?: any) => void;
}
