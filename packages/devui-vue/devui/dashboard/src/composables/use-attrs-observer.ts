/**
 * 根据给出的Map监听DOM属性变化，并自动emit对应更新事件，以实现双向绑定
 */

import { isNull, isUndefined, MapValueType } from '../../../shared/utils';

const isFalsy = (val: any) => isNull(val) || isUndefined(val);

export const dealBoolean = (val: any) => isFalsy(val) || val === 'false' ? false : true;

export const dealNumber = (val: any, nullBeOne = false) => isNull(val) && nullBeOne ? 1 : Number(val);

const getEmitValue = <M extends Map<any, any>, EventsType>(
  target: HTMLElement,
  attributeInfo: MapValueType<M>,
  attributeName: string | null,
  emitEventName: EventsType
) => {
  let emitEventValue: any = target.getAttribute(attributeName || '');
  if (attributeInfo.type === 'boolean') {
    emitEventValue = dealBoolean(emitEventValue);
  } else if (attributeInfo.type === 'number') {
    // --> w/h这里有两种值 number | null，当其值为 1 时，gridstack 将返回 null 我们得特殊处理一下
    emitEventValue = dealNumber(emitEventValue, emitEventName === 'update:w' || emitEventName === 'update:h');
  }

  return emitEventValue;
};

export default function useAttrsObserver<PropsType, EventsType>(
  attrPropsMap: Map<string, { prop: PropsType; type: 'string' | 'boolean' | 'number' }>,
  emit: (event: EventsType, ...args: any[]) => void
) {
  const observerAttributesChange = (target: HTMLElement, extrnalCallback?: (mutation: MutationRecord, newValue: any) => void) => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        const attributeInfo = attrPropsMap.get(mutation.attributeName || '');
        if (!attributeInfo) {
          return;
        }
        const emitEventName = `update:${attributeInfo.prop}` as EventsType;
        const emitEventValue = getEmitValue<typeof attrPropsMap, EventsType>(target, attributeInfo, mutation.attributeName, emitEventName);

        emit(emitEventName, emitEventValue);
        extrnalCallback && extrnalCallback(mutation, emitEventValue);
      }
    });
    observer.observe(target, { attributeFilter: Array.from(attrPropsMap.entries()).map((v) => v[0]), attributeOldValue: true });
  };

  return {
    observerAttributesChange,
  };
}
