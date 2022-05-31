import { InjectionKey } from 'vue';
import { CollapseContext } from './collapse-types';

export const SELECT_TOKEN: InjectionKey<CollapseContext> = Symbol('dCollapse');
