import createComponentAction from './create-component';
import createLibEntryAction from './create-lib-entry';
export declare type CreateCMD = {
    config?: string;
    type?: keyof typeof CREATE_TYPE_ACTION;
    core?: boolean;
    service?: boolean;
    directive?: boolean;
    force?: boolean;
};
declare const CREATE_TYPE_ACTION: {
    component: typeof createComponentAction;
    'lib-entry': typeof createLibEntryAction;
};
export declare function validateCreateType(type: string): string;
export default function createAction(names?: string[], cmd?: CreateCMD): Promise<void>;
export {};
