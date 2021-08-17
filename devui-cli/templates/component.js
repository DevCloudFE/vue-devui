const { DEVUI_NAMESPACE } = require('../shared/constant')
const { camelCase } = require('lodash')
const { bigCamelCase } = require('../shared/utils')

exports.createComponentTemplate = ({ styleName, componentName, typesName }) => `\
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

exports.createTypesTemplate = ({ componentName }) => `\
import type { PropType, ExtractPropTypes } from 'vue'

export const ${camelCase(componentName)}Props = {
  \/\* test: {
    type: Object as PropType<{ xxx: xxx }>
  } \*\/
} as const

export type ${bigCamelCase(componentName)}Props = ExtractPropTypes<typeof ${camelCase(componentName)}Props>
`

exports.createDirectiveTemplate = () => `\
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

exports.createServiceTemplate = ({ componentName, typesName, serviceName }) => `\
import { ${bigCamelCase(componentName)}Props } from './${typesName}'

const ${bigCamelCase(serviceName)} = {
  // open(props: ${bigCamelCase(componentName)}Props) { }
}

export default ${bigCamelCase(serviceName)}
`

exports.createStyleTemplate = ({ componentName }) => `\
.${DEVUI_NAMESPACE}-${componentName} {
  //
}
`

exports.createIndexTemplate = ({
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

  const installComponentStr = `\n    app.use(${bigCamelCase(componentName)} as any)`
  const installDirectiveStr = `\n    app.directive('${bigCamelCase(componentName)}', ${bigCamelCase(directiveName)})`
  const installServiceStr = `\n    app.config.globalProperties.$${camelCase(serviceName)} = ${bigCamelCase(
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
  install(app: App): void {\
${installStr}
  }
}
`
}

exports.createTestsTemplate = () => `\
`
