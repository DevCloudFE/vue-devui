import { inBrowser } from './common-var';
export const isNumber = (value: unknown): value is number => typeof value === 'number';
export const isBoolean = (value: unknown): value is boolean => typeof value === 'boolean';
export const isString = (value: unknown): value is string => typeof value === 'string';
export const isObject = (value: unknown): value is Record<string, unknown> => Object.prototype.toString.call(value) === '[object Object]';
export const isFunction = (value: unknown): value is () => unknown => Object.prototype.toString.call(value) === '[object Function]';
export const isUndefined = (value: unknown): value is undefined => value === undefined;
export const isNull = (value: unknown): value is null => value === null;
export const isHTMLElement = (value: unknown): value is HTMLElement => inBrowser && 'HTMLElement' in window && value instanceof HTMLElement;
