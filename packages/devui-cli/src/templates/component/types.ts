import { propsName, propsTypesName } from './utils';

export default function genTypesTemplate(name: string) {
  return `\
import type { PropType, ExtractPropTypes } from 'vue'

export const ${propsName(name)}Props = {
  \/\* test: {
    type: Object as PropType<{ xxx: xxx }>
  } \*\/
} as const

export type ${propsTypesName(name)}Props = ExtractPropTypes<typeof ${propsName(name)}Props>
`;
}
