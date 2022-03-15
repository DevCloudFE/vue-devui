import { existsSync, statSync } from 'fs-extra';
import { dirname, extname, isAbsolute, resolve } from 'path';
import prompts from 'prompts';
import { mergeCliConfig } from '../shared/config';
import { CWD } from '../shared/constant';
import generateConfig from '../shared/generate-config';
import logger from '../shared/logger';
import { dynamicImport, onPromptsCancel } from '../shared/utils';
import buildAction from './build';
import createAction from './create';

function getActions() {
  const actionMap = new Map<string, prompts.Choice & { action: Function }>();
  actionMap.set('create', {
    title: 'create',
    value: 'create',
    selected: true,
    action: createAction
  });
  actionMap.set('build', { title: 'build', value: 'build', action: buildAction });

  return actionMap;
}

export type BaseCmd = {
  init?: boolean;
  config?: string;
};

export default async function baseAction(cmd: BaseCmd) {
  if (cmd.init) {
    return generateConfig();
  }

  loadCliConfig(cmd);

  selectCommand();
}

export function loadCliConfig(cmd: Pick<BaseCmd, 'config'>) {
  if (!cmd.config) {return;}

  const configPath = resolve(CWD, cmd.config);

  if (!existsSync(configPath)) {
    logger.error(`The path "${configPath}" not exist.`);
    process.exit(1);
  }

  if (statSync(configPath).isDirectory() || !['.js', '.ts'].includes(extname(configPath))) {
    logger.error(`The path "${configPath}" is not a ".js" or ".ts" file.`);
    process.exit(1);
  }

  const config = dynamicImport(configPath);
  if (config.cwd && !isAbsolute(config.cwd)) {
    config.cwd = resolve(dirname(configPath), config.cwd);
  }

  mergeCliConfig(config);
}

async function selectCommand() {
  const actions = getActions();
  let result: any = {};

  try {
    result = await prompts(
      [
        {
          name: 'command',
          type: 'select',
          message: 'Please select a command.',
          choices: Array.from(actions.values())
        }
      ],
      {
        onCancel: onPromptsCancel
      }
    );
  } catch (e: any) {
    logger.error(e.message);
    process.exit(1);
  }

  actions.get(result.command)!.action();
}
