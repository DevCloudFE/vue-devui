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
  update: () => void;
  activeClick: (item: any, tabEl?: any) => void;
  beforeMount: () => void;
  mounted: () => void;
  tabCanClose: (item: any) => boolean;
}

export interface UseTabNavEvent {
  onTabRemove: (item: any, ev: MouseEvent) => void;
  onTabAdd: () => void;
}
