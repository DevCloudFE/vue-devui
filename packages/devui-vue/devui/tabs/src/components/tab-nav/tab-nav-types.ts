import type { ComputedRef, StyleValue } from 'vue';

export interface UseTabNavRender {
  ulClasses: ComputedRef<Record<string, boolean>>;
  aClasses: ComputedRef<Record<string, boolean>>;
  customStyle: StyleValue;
  sliderAnimationStyle: ComputedRef<Record<string, string | undefined>>;
}

export interface OffSetData {
  offsetLeft: number;
  offsetWidth: number;
  offsetTop: number;
  offsetHeight: number;
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
