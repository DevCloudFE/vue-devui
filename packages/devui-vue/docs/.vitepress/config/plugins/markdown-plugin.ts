const escapeHtml = require('escape-html')
const prism = require('prismjs')
const path = require('path')
const fs = require('fs')
const mdContainer = require('markdown-it-container')
import { genApi } from './util'

function wrap(code: string, lang: string): string {
  if (lang === 'text') {
    code = escapeHtml(code)
  }
  return `<pre v-pre style="margin: 0;"><code>${code}</code></pre>`
}
// 语法高亮
const highlight = (str: string, lang: string) => {
  if (!lang) {
    return wrap(str, 'text')
  }
  lang = lang.toLowerCase()
  const rawLang = lang
  if (lang === 'vue' || lang === 'html') {
    lang = 'markup'
  }
  if (lang === 'md') {
    lang = 'markdown'
  }
  if (lang === 'ts') {
    lang = 'typescript'
  }
  if (lang === 'py') {
    lang = 'python'
  }
  if (prism.languages[lang]) {
    const code = prism.highlight(str, prism.languages[lang], lang)
    return wrap(code, rawLang)
  }
  return wrap(str, 'text')
}
// 配置
export const markdownConfig = (md) => {
  md.use(mdContainer, 'demo', {
    validate(params) {
      return !!params.trim().match(/^demo\s*(.*)$/)
    },

    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        // 取出:::demo 后面的配置，即源码路径
        const sourceFile = m && m.length > 1 ? m[1] : ''
        const sourceFileToken = tokens[idx + 2]
        // 源码文件路径
        const filePath = path.resolve(process.cwd(), 'docs/components', `${sourceFile}.vue`)
        let source = ''
        if (sourceFileToken.type === 'inline') {
          source = fs.readFileSync(filePath, 'utf-8')
        }
        if (!source) throw new Error(`Incorrect source file: ${sourceFile}`)
        return `<Demo source="${encodeURIComponent(highlight(source, 'vue'))}" raw-source="${encodeURIComponent(
          source
        )}" >`
      } else {
        return '</Demo>'
      }
    },
  })
  md.use(mdContainer, 'api', {
    validate(params) {
      return !!params.trim().match(/^api\s*(.*)$/)
    },
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^api\s*(.*)$/)
      if (tokens[idx].nesting === 1) {
        const sourceFile = m && m.length > 1 ? m[1] : ''
        const filePath = path.resolve(process.cwd(), `docs/components`, `${sourceFile}.ts`)
        if (!filePath) throw new Error(`can not find source file: ${sourceFile}`)
        const { code: source, typeCode } = genApi(filePath)
        const name: string = sourceFile.split('/')[0]
        const componentName = name.slice(0, 1).toLocaleUpperCase() + name.slice(1)
        return `<Api
        source="${source}"
        name=${componentName}
        typeCode="${typeCode.join(',')}">`
      } else {
        return '</Api>'
      }
    },
  })
}
