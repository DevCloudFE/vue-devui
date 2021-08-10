import { relative } from 'path'
import { INDEX_FILE_NAME, VERSION } from '../shared/constant.js'
import { VUE_DEVUI_FILE } from '/own-files/own-workspace/vue-devui/devui-cli/shared/constant.js'

export function createVueDevuiTemplate(exportModules = []) {
  const packages = []
  const imports = []
  const installs = []

  exportModules.forEach((m) => {
    const { fileInfo } = m
    const relativePath = relative(VUE_DEVUI_FILE, fileInfo.path)
      .replace(/\\/g, '/')
      .replace('..', '.')
      .replace('/' + INDEX_FILE_NAME, '')

    const importStr = `import ${m.default}, { ${m.parts.join(', ')} } from '${relativePath}'`

    packages.push(...m.parts)
    imports.push(importStr)
    installs.push(m.default)
  })

  const template = `\
import type { App } from 'vue'

${imports.join('\n')}

const installs = [
  ${installs.join(',\n\t')}
]

export {
  ${packages.join(',\n\t')}
}

export default {
  version: '${VERSION}',
  install(app: App) {
    installs.forEach((p) => app.use(p))
  }
}
`

  return template
}
