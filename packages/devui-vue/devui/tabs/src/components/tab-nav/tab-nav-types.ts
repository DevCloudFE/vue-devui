import type { ComputedRef, StyleValue } from 'vue';
import type { TabsStateData } from '../../tabs-types';

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
  activeClick: (item: TabsStateData, tabEl?: Element) => void;
  beforeMount: () => void;
  mounted: () => void;
  tabCanClose: (item: TabsStateData) => boolean;
}

export interface UseTabNavEvent {
  onTabRemove: (item: TabsStateData, ev: MouseEvent) => void;
  onTabAdd: () => void;
}
