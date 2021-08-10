import { camelCase, upperFirst } from 'lodash-es'

export function bigCamelCase(str) {
  return upperFirst(camelCase(str))
}
