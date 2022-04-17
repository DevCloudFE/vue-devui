import { writeFileSync } from 'fs-extra';
import { getComponentsMeta } from '../templates/component/utils';
import genLibEntryTemplate from '../templates/lib-entry/lib-entry';
import logger from './logger';

export default async function genLibEntry(filePath = '') {
  const componentsMeta = await getComponentsMeta();

  writeFileSync(filePath, genLibEntryTemplate(componentsMeta), {
    encoding: 'utf-8'
  });

  logger.success(`The component library entry file has been generated successfully.`);
  logger.info(`Target file: ${filePath}`);
}
