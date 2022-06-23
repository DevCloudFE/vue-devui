import { InjectionKey } from 'vue';
import { SelectContext, OptionGroupContext } from './select-types';

export const SELECT_TOKEN: InjectionKey<SelectContext> = Symbol('dSelect');
export const OPTION_GROUP_TOKEN: InjectionKey<OptionGroupContext> = Symbol('dOptionGroup');

export const escapeStringRegexp = (string = ''): string => string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
