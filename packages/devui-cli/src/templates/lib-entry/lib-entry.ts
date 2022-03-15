import { relative, resolve } from 'path';
import { cliConfig } from '../../shared/config';
import logger from '../../shared/logger';
import { ComponentMeta, isValidComponentMeta } from '../component/meta';
import { coreFileName, coreName, directiveName, serviceName } from '../component/utils';

export function resolveImportRelativePath(coreName: string) {
  const libEntryPath = resolve(cliConfig.cwd, cliConfig.libEntryRootDir);
  const corePath = resolve(cliConfig.cwd, cliConfig.componentRootDir, coreName);

  let relativePath = relative(libEntryPath, corePath);

  if (relativePath.startsWith(coreName)) {
    relativePath = './' + relativePath;
  }

  return relativePath.replace(/\\/g, '/');
}

export function getPartName(part: string, name: string) {
  const partNameFn = {
    core: coreName,
    service: serviceName,
    directive: directiveName
  }[part];

  if (partNameFn === undefined) {
    logger.warn(
      `The component part must be one of core, service, or directive, but it gets an invalid value ${part}.`
    );
  }

  return partNameFn?.(name) ?? name;
}

export default function genLibEntryTemplate(componentsMeta: ComponentMeta[]) {
  const imports = [];
  const installs = [];
  const packages = [];

  for (const meta of componentsMeta) {
    if (!isValidComponentMeta(meta)) {
      logger.warn(
        `The component meta information must include the name and parts attributes, and the parts attribute must be an array.`
      );
      continue;
    }

    const parts = meta.parts.map((part) => getPartName(part, meta.name));
    const install = coreName(meta.name) + 'Install';
    const importPkgPath = resolveImportRelativePath(coreFileName(meta.name));

    installs.push(install);
    imports.push(`import ${install}, { ${parts.join(', ')} } from '${importPkgPath}'`);
    packages.push(...parts);
  }

  return `\
import type { App } from 'vue'

${imports.join('\n') || '// Not find components.'}

const installs = [
\t${installs.join(',\n\t')}
]

export {
\t${packages.join(',\n\t')}
}

export default {
  version: '${cliConfig.version}',
  install(app: App): void {
    installs.forEach((p) => app.use(p as any))
  }
}
`;
}
