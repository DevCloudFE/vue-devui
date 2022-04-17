import glob from 'fast-glob';
import { readFileSync } from 'fs-extra';
import { camelCase, kebabCase } from 'lodash-es';
import { cliConfig } from '../../shared/config';
import { bigCamelCase } from '../../shared/utils';
import { ComponentMeta } from './meta';

export const coreFileName = (name: string) => kebabCase(name);
export const typesFileName = (name: string) => kebabCase(name + '-types');
export const serviceFileName = (name: string) => kebabCase(name + '-service');
export const directiveFileName = (name: string) => kebabCase(name + '-directive');

export const getRealLibPrefix = () => (cliConfig.libPrefix ? cliConfig.libPrefix + '-' : '');
export const getRealClassPrefix = () =>
  cliConfig.libClassPrefix ? cliConfig.libClassPrefix + '-' : '';

export const coreName = (name: string) => bigCamelCase(name);
export const coreRealName = (name: string) => bigCamelCase(getRealLibPrefix() + name);
export const coreClassName = (name: string) => kebabCase(getRealClassPrefix() + name);
export const propsName = (name: string) => camelCase(name + 'Props');
export const propsTypesName = (name: string) => bigCamelCase(name + 'Props');
export const serviceName = (name: string) => bigCamelCase(name + 'Service');
export const directiveName = (name: string) => bigCamelCase(name + 'Directive');

export async function getComponentMetaFiles() {
  return glob('./**/meta.json', {
    cwd: cliConfig.componentRootDir,
    absolute: true
  });
}

export async function getComponentsMeta() {
  const metaFiles = await getComponentMetaFiles();
  return metaFiles.map((f) => JSON.parse(readFileSync(f, { encoding: 'utf-8' })) as ComponentMeta);
}
