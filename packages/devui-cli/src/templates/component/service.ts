import { propsTypesName, serviceName, typesFileName } from './utils';

export default function genServiceTemplate(name: string) {
  return `\
import { ${propsTypesName(name)} } from './${typesFileName(name)}'

const ${serviceName(name)} = {
  // open(props: ${propsTypesName(name)}) { }
}

export default ${serviceName(name)}
`;
}
