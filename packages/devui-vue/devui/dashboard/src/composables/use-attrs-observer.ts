/**
 * 监听DOM属性变化
 */

import { isNull, isUndefined, MapValueType } from '../../../shared/utils';

const isFalsy = (val: any) => isNull(val) || isUndefined(val);

export default function useAttrsObserver<EventsType, PropsType>(
  attrPropsMap: Map<string, { prop: PropsType; type: 'string' | 'boolean' | 'number' }>,
  emit: (event: EventsType, ...args: any[]) => void
) {
  const getEmitValue = (
    target: HTMLElement,
    attributeInfo: MapValueType<typeof attrPropsMap>,
    attributeName: string | null,
    emitEventName: EventsType
  ) => {
    let emitEventValue: any = target.getAttribute(attributeName || '');
    if (attributeInfo.type === 'boolean') {
      emitEventValue = isFalsy(emitEventValue) || emitEventValue === 'false' ? false : true;
    } else if (attributeInfo.type === 'number') {
      // --> w/h这里有两种值 number | null，当其值为 1 时，gridstack 将返回 null 我们得特殊处理一下
      emitEventValue =
        isNull(emitEventValue) && (emitEventName === 'update:w' || emitEventName === 'update:h') ? 1 : Number(emitEventValue);
    }

    return emitEventValue;
  };

  const observerAttributesChange = (target: HTMLElement) => {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        const attributeInfo = attrPropsMap.get(mutation.attributeName || '');
        if (!attributeInfo) {
          return;
        }
        const emitEventName = `update:${attributeInfo.prop}` as EventsType;

        emit(emitEventName, getEmitValue(target, attributeInfo, mutation.attributeName, emitEventName));
      }
    });
    observer.observe(target, { attributeFilter: Array.from(attrPropsMap.entries()).map((v) => v[0]) });
  };

  return {
    observerAttributesChange
  };
}
