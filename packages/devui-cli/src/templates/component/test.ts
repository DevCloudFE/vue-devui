import { getPartName } from '../lib-entry/lib-entry';
import { ComponentMeta } from './meta';

export default function genTestTemplate(meta: ComponentMeta) {
  return `\
import { mount } from '@vue/test-utils'
import { ${meta.parts.map((part) => getPartName(part, meta.name)).join(', ')} } from '../index'

describe('${meta.name} test', () => {
  it('${meta.name} init render', async () => {
    \/\/ todo
  })
})
`;
}
