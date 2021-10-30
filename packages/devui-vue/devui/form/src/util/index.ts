
import eventBus from './event-bus'
export const EventBus = eventBus;

export function isObject(obj: any): boolean {
  return Object.prototype.toString.call(obj).slice(8, -1) === 'Object';
}

export function hasKey(obj: any, key: string | number | symbol): boolean {
  if (!isObject(obj)) return false;
  return Object.prototype.hasOwnProperty.call(obj, key);
}
