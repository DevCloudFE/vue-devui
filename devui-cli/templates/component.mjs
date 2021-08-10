import { DEVUI_NAMESPACE } from '../shared/constant.js'
import { camelCase } from 'lodash-es'
import { bigCamelCase } from '../shared/utils.mjs'

export const createComponentTemplate = ({ styleName, componentName, typesName }) => `\
import './${styleName}.scss'

import { defineComponent } from 'vue'
import { ${camelCase(componentName)}Props, ${bigCamelCase(componentName)}Props } from './${typesName}'

export default defineComponent({
  name: '${bigCamelCase(DEVUI_NAMESPACE)}${bigCamelCase(componentName)}',
  props: ${camelCase(componentName)}Props,
  emits: [],
  setup(props: ${bigCamelCase(componentName)}Props, ctx) {
    return {}
  },
  render() {
    const {} = this

    return <div class="${DEVUI_NAMESPACE}-${componentName}"></div>
  }
})
`

export const createTypesTemplate = ({ componentName }) => `\
import type { PropType, ExtractPropTypes } from 'vue'

export const ${camelCase(componentName)}Props = {
  \/\* test: {
    type: Object as PropType<{ xxx: xxx }>
  } \*\/
} as const

export type ${bigCamelCase(componentName)}Props = ExtractPropTypes<typeof ${camelCase(componentName)}Props>
`

export const createDirectiveTemplate = () => `\
// can export function.
export default {
  created() { },
  beforeMount() { },
  mounted() { },
  beforeUpdate() { },
  updated() { },
  beforeUnmount() { },
  unmounted() { }
}
`

export const createServiceTemplate = ({ componentName, typesName, serviceName }) => `\
import { ${bigCamelCase(componentName)}Props } from './${typesName}'

const ${bigCamelCase(serviceName)} = {
  // open(props: ${bigCamelCase(componentName)}Props) { }
}

export default ${bigCamelCase(serviceName)}
`

export const createStyleTemplate = ({ componentName }) => `\
.${DEVUI_NAMESPACE}-${componentName} {
  //
}
`

export const createIndexTemplate = ({
  title,
  category,
  hasComponent,
  hasDirective,
  hasService,
  componentName,
  directiveName,
  serviceName
}) => {
  const importComponentStr = `\nimport ${bigCamelCase(componentName)} from './src/${componentName}'`
  const importDirectiveStr = `\nimport ${bigCamelCase(directiveName)} from './src/${directiveName}'`
  const importServiceStr = `\nimport ${bigCamelCase(serviceName)} from './src/${serviceName}'`

  const installComponentStr = `\n\t\tapp.use(${bigCamelCase(componentName)} as any)`
  const installDirectiveStr = `\n\t\tapp.directive('${bigCamelCase(componentName)}', ${bigCamelCase(directiveName)})`
  const installServiceStr = `\n\t\tapp.config.globalProperties.$${camelCase(serviceName)} = ${bigCamelCase(
    serviceName
  )}`

  const getPartStr = (state, str) => (state ? str : '')

  const importStr =
    getPartStr(hasComponent, importComponentStr) +
    getPartStr(hasDirective, importDirectiveStr) +
    getPartStr(hasService, importServiceStr)

  const installStr =
    getPartStr(hasComponent, installComponentStr) +
    getPartStr(hasDirective, installDirectiveStr) +
    getPartStr(hasService, installServiceStr)

  return `\
import type { App } from 'vue'\
${importStr}
${
  hasComponent
    ? `\n${bigCamelCase(componentName)}.install = function(app: App) {
  app.component(${bigCamelCase(componentName)}.name, ${bigCamelCase(componentName)})
}\n`
    : ''
}
export { ${[
    hasComponent ? bigCamelCase(componentName) : null,
    hasDirective ? bigCamelCase(directiveName) : null,
    hasService ? bigCamelCase(serviceName) : null
  ]
    .filter((p) => p !== null)
    .join(', ')} }

export default {
  title: '${bigCamelCase(componentName)} ${title}',
  category: '${category}',
  install(app: App) {\
    ${installStr}
  }
}
`
}

export const createTestsTemplate = () => `\
`
