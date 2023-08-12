export const QUADRANT_CONFIGS = [];
export const LABEL_SIZE = ['small', 'normal', 'large'];
import {  getCurrentInstance, computed, ref } from 'vue';
import { createI18nTranslate } from '../locale/create';
const app = getCurrentInstance();
const t = createI18nTranslate('DQuadrantDiagram', app);
export const DEFAULT_AXIS_CONFIGS = {
    tickWidth: 10,
    spaceBetweenLabelsAxis: 20,
    xAxisLabel: computed(()=> {
      return ref(t('xAxisLabel')).value
    }),
    yAxisLabel: computed(()=> {
      return ref(t('yAxisLabel')).value
    }),
    xAxisRange: {
      min: 0,
      max: 100,
      step: 10
    },
    yAxisRange: {
      min: 0,
      max: 50,
      step: 5
    },
    originPosition: {
      left: 30,
      bottom: 30
    },
    axisMargin: 35,
    xWeight: 1,
    yWeight: 1
  };
export const DEFAULT_QUADRANT_CONFIGS = [
  { title: computed(()=> {
    return ref(t('importantAndUrgent')).value
  }) },
  { title: computed(()=> {
    return ref(t('importantNoturgent')).value
  }) },
  { title: computed(()=> {
    return ref(t('notImportantNoturgent')).value
  }) },
  { title: computed(()=> {
    return ref(t('notImportantAndUrgent')).value
  }) }
];
export const DEFAULT_VIEW_CONFIGS = {
  height: 900,
  width: 950,
};
export const AXIS_TITLE_SPACE = 15;
export const SMALL_LABEL_SIZE_CENTER_POINT = {
  x: 6, y: 6
};
export const NORMAL_LABEL_SIZE_CENTER_POINT = {
  x: 45, y: 14
};
export const LARGE_LABEL_SIZE_CENTER_POINT = {
  x: 60, y: 18
};
