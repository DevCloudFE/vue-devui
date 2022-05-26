import { InjectionKey } from 'vue';
import { SelectContext } from './select-types';

export const SELECT_TOKEN: InjectionKey<SelectContext> = Symbol('dSelect');

export const escapeStringRegexp = (string = ''): string => string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
