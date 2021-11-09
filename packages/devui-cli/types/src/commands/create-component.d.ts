import { CreateCMD } from './create';
export declare function isValidComponentName(name: string): boolean;
export default function createComponentAction(names?: string[], cmd?: CreateCMD): Promise<void>;
