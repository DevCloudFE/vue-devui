import { WriteFileOptions } from 'fs';
import { mkdirSync, writeFileSync } from 'fs-extra';
import { resolve } from 'path';
import genIndexTemplate from '../templates/component';
import genCoreTemplate from '../templates/component/core';
import genDirectiveTemplate from '../templates/component/directive';
import genDocTemplate from '../templates/component/doc';
import genMetaTemplate, { ComponentMeta, genMetaObj } from '../templates/component/meta';
import genServiceTemplate from '../templates/component/service';
import genStyleTemplate from '../templates/component/style';
import genTestTemplate from '../templates/component/test';
import genTypesTemplate from '../templates/component/types';
import {
  coreFileName,
  directiveFileName,
  serviceFileName,
  typesFileName
} from '../templates/component/utils';
import { cliConfig } from './config';
import logger from './logger';
import { bigCamelCase } from './utils';

const WRITE_FILE_OPTIONS: WriteFileOptions = { encoding: 'utf-8' };

export default function genComponent(meta: ComponentMeta) {
  const componentDir = resolve(meta.dir!, 'src');
  const docDir = resolve(meta.dir!, 'docs');
  const testDir = resolve(meta.dir!, '__tests__');

  mkdirSync(componentDir, { recursive: true });
  mkdirSync(docDir, { recursive: true });
  mkdirSync(testDir, { recursive: true });

  let needsTypes = false;
  meta = genMetaObj(meta);

  if (meta.parts.includes('core')) {
    needsTypes = true;

    const coreFilePath = resolve(componentDir, coreFileName(meta.name));
    writeFileSync(coreFilePath + '.tsx', genCoreTemplate(meta.name), WRITE_FILE_OPTIONS);
    writeFileSync(
      coreFilePath + cliConfig.libStyleFileSuffix,
      genStyleTemplate(meta.name),
      WRITE_FILE_OPTIONS
    );
  }

  if (meta.parts.includes('service')) {
    needsTypes = true;

    const serviceFilePath = resolve(componentDir, serviceFileName(meta.name) + '.ts');
    writeFileSync(serviceFilePath, genServiceTemplate(meta.name), WRITE_FILE_OPTIONS);
  }

  if (meta.parts.includes('directive')) {
    const directiveFilePath = resolve(componentDir, directiveFileName(meta.name) + '.ts');
    writeFileSync(directiveFilePath, genDirectiveTemplate(), WRITE_FILE_OPTIONS);
  }

  if (needsTypes) {
    const typesFilePath = resolve(componentDir, typesFileName(meta.name) + '.ts');
    writeFileSync(typesFilePath, genTypesTemplate(meta.name), WRITE_FILE_OPTIONS);
  }

  if (meta.parts.length > 0) {
    const indexFilePath = resolve(meta.dir!, 'index.ts');
    const metaFilePath = resolve(meta.dir!, 'meta.json');
    const testFilePath = resolve(testDir, 'index.spec.ts');
    const docFilePath = resolve(docDir, 'index.md');

    writeFileSync(indexFilePath, genIndexTemplate(meta.name, meta.parts), WRITE_FILE_OPTIONS);
    writeFileSync(metaFilePath, genMetaTemplate(meta), WRITE_FILE_OPTIONS);
    writeFileSync(testFilePath, genTestTemplate(meta), WRITE_FILE_OPTIONS);
    writeFileSync(docFilePath, genDocTemplate(meta), WRITE_FILE_OPTIONS);
  }

  logger.success(
    `The component "${bigCamelCase(meta.name)}" directory has been generated successfully.`
  );
  logger.info(`Target directory: ${meta.dir}`);
}
