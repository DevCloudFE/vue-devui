import prompts from 'prompts';
import { cliConfig } from '../shared/config';
import genComponent from '../shared/generate-component';
import logger from '../shared/logger';
import { canSafelyOverwrite, onPromptsCancel, resolveComponentDir } from '../shared/utils';
import { CreateCMD } from './create';

export function isValidComponentName(name: string) {
  if (!name) {return false;}

  const flag = /^[a-zA-Z]([\w-\d]*)$/.test(name);

  if (!flag) {
    logger.warn(`The component name "${name}" is invalid.`);
    logger.info(`The component name rule: letters, numbers, "-", and must start with a letter.`);
  }

  return flag;
}

export default async function createComponentAction(names: string[] = [], cmd: CreateCMD = {}) {
  let [name = '', title = '', category = ''] = names;
  const parts = [];
  let targetDir = resolveComponentDir(name);

  cmd.core && parts.push('core');
  cmd.service && parts.push('service');
  cmd.directive && parts.push('directive');

  if (!isValidComponentName(name)) {
    name = '';
    targetDir = '';
  }

  try {
    const meta = await prompts(
      [
        {
          name: 'name',
          type: () => (name ? null : 'text'),
          message: 'Component name:',
          validate: () => {
            console.log(''); // 防止错误输出于同一行

            const isValid = isValidComponentName(name);

            return isValid;
          },
          onState: (state) => {
            name = String(state.value).trim();
            targetDir = resolveComponentDir(name);
          }
        },
        {
          name: 'shouldOverwrite',
          type: () => (canSafelyOverwrite(targetDir) || cmd.force ? null : 'confirm'),
          message: () => {
            return `Target directory "${targetDir}" is not empty. Remove existing files and continue?`;
          }
        },
        {
          name: 'overwriteChecker',
          type: (prev, values: any = {}) => {
            if (values.shouldOverwrite === false) {
              throw new Error('Operation cancelled');
            }
            return null;
          }
        },
        {
          name: 'title',
          type: () => (title ? null : 'text'),
          message: 'Component title:',
          validate: () => title !== '',
          onState: (state) => (title = String(state.value).trim())
        },
        {
          name: 'category',
          type: () => (cliConfig.componentCategories.includes(category) ? null : 'select'),
          message: 'Select a component category.',
          choices: cliConfig.componentCategories.map((value, index) => ({
            title: value,
            value,
            selected: index === 0
          }))
        },
        {
          name: 'parts',
          type: () => (parts.length === 3 ? null : 'multiselect'),
          message: 'Select one or more parts.',
          choices: [
            {
              title: 'component',
              value: 'core',
              description: 'Contains components, types, style templates.',
              selected: parts.includes('core')
            },
            {
              title: 'service',
              value: 'service',
              description: 'Contains service, types templates',
              selected: parts.includes('service')
            },
            {
              title: 'directive',
              value: 'directive',
              description: 'Contains directive templates.',
              selected: parts.includes('directive')
            }
          ],
          min: 1
        }
      ],
      { onCancel: onPromptsCancel }
    );

    genComponent({
      name,
      title,
      category: meta.category ?? category,
      parts: meta.parts ?? parts,
      dir: targetDir
    });
  } catch (e: any) {
    logger.error(e.message);
    process.exit(1);
  }
}
