import prompts from 'prompts';
import logger from '../shared/logger';
import { onPromptsCancel } from '../shared/utils';
import { loadCliConfig } from './base';
import createComponentAction from './create-component';
import createLibEntryAction from './create-lib-entry';

export type CreateCMD = {
  config?: string;
  type?: keyof typeof CREATE_TYPE_ACTION;
  core?: boolean;
  service?: boolean;
  directive?: boolean;
  force?: boolean;
};

const CREATE_TYPES = ['component', 'component-test', 'component-doc', 'lib-entry', 'doc-nav'];
const UNFINISHED_CREATE_TYPES = ['component-test', 'component-doc', 'doc-nav'];
const CREATE_TYPE_ACTION = {
  component: createComponentAction,
  'lib-entry': createLibEntryAction
};

export function validateCreateType(type: string) {
  const valid = CREATE_TYPES.includes(type);

  if (!valid) {
    logger.error(`Create type error!.`);
    logger.info(
      `Optional type list: ${CREATE_TYPES.map((type) =>
        UNFINISHED_CREATE_TYPES.includes(type) ? `${type}(Unfinished)` : type
      ).join(', ')}`
    );
  }

  return valid ? type : '';
}

export default async function createAction(names: string[] = [], cmd: CreateCMD = {}) {
  loadCliConfig(cmd);

  let { type } = cmd;

  if (!type) {
    try {
      const result = await prompts(
        [
          {
            name: 'type',
            type: 'select',
            message: 'Please select a type.',
            choices: CREATE_TYPES.map((value, index) => ({
              title: value,
              value,
              selected: index === 0
            }))
          }
        ],
        {
          onCancel: onPromptsCancel
        }
      );

      type = result.type;
    } catch (e: any) {
      logger.error(e.message);
      process.exit(1);
    }
  }

  const action = CREATE_TYPE_ACTION[type!];
  if (action) {
    action(names, cmd);
  } else {
    logger.warn('Sorry! The type is not completed.');
  }
}
