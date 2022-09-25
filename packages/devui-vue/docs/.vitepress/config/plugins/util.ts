const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const fs = require('fs')
const TurndownService = require('turndown')
const turndownService = new TurndownService()
const turndownPluginGfm = require('turndown-plugin-gfm')
const tables = turndownPluginGfm.tables
const strikethrough = turndownPluginGfm.strikethrough

turndownService.use([tables, strikethrough])

export function genApi(apiPath) {
  const arr: any[] = []
  const typesArr: any[] = []
  const fileCode = fs.readFileSync(apiPath, 'utf-8')
  const ast = parser.parse(fileCode, {
    sourceType: 'unambiguous',
    plugins: ['typescript'],
  })
  traverse(ast, {
    VariableDeclaration(path) {
      const declaration = path.node.declarations[0]
      const properties = declaration.init.expression.properties
      properties.forEach((prop) => {
        const propName = prop.key.name
        let obj: any = {}
        obj.propName = propName
        prop.value.properties.map((p) => {
          if (p.key.name === 'type') {
            if (p.value.name) {
              obj.type = p.value.name
            } else {
              const name: string = p.value.typeAnnotation.typeParameters.params[0].typeName.name
              let id = ''
              for (let i = 0; i < name.length; i++) {
                id += name[i].toLowerCase()
              }
              obj.type = `<a href=#${id}>${name}</a>`
            }
          }
          if (p.key.name === 'default') {
            obj.default =
              p.value.value === undefined || p.value.value === '' || p.value.value === null ? '-' : p.value.value
          }
          if (p.key.name === 'typeName') {
            obj.typeName = p.value.value.replace('\t', '').replace('\n', '')
          }
          if (p.key.name === 'desc') {
            obj.desc = p.value.value.replace('\t', '').replace('\n', '')
          }
          if (p.key.name === 'demo') {
            const value = p.value.value.replace('\t', '').replace('\n', '')
            obj.demo = `<a href=#${value}>${value}</a>`
          }
        })
        obj.type = obj.type === undefined ? '-' : obj.type
        obj.typeName = obj.typeName === undefined ? '-' : obj.typeName
        obj.default = obj.default === undefined ? '-' : obj.default
        obj.desc = obj.desc === undefined ? '-' : obj.desc
        obj.demo = obj.demo === undefined ? '-' : obj.demo
        arr.push(obj)
      })
    },
    TSTypeAliasDeclaration(path) {
      const obj: any = {}
      const types = path.node.typeAnnotation.types.map((item) => item.literal.value)
      obj.type = path.node.id.name
      obj.types = types
      typesArr.push(obj)
    },
  })
  let tbody = ''
  let typeCode: any[] = []
  arr.map((item) => {
    tbody += `
      <tr style="border-top: #f2f2f3">
        <td style="border: 1px solid #f2f2f3; padding: 0.6em 1em" align="center">${item.propName}</td>
        <td style="border: 1px solid #f2f2f3; padding: 0.6em 1em" align="center">${item.type}</td>
        <td style="border: 1px solid #f2f2f3; padding: 0.6em 1em" align="center">${item.default}</td>
        <td style="border: 1px solid #f2f2f3; padding: 0.6em 1em" align="center">${item.desc}</td>
        <td style="border: 1px solid #f2f2f3; padding: 0.6em 1em" align="center">${item.demo}</td>
      </tr>
    `
  })
  let code = `
  <table style="border-collapse: collapse; margin: 1rem">
  <thead>
    <tr style="border-top: 1px solid #f2f2f3">
      <th style="border: 1px solid #f2f2f3; padding: 0.6em 1em">属性名</th>
      <th style="border: 1px solid #f2f2f3; padding: 0.6em 1em">类型</th>
      <th style="border: 1px solid #f2f2f3; padding: 0.6em 1em">默认</th>
      <th style="border: 1px solid #f2f2f3; padding: 0.6em 1em">说明</th>
      <th style="border: 1px solid #f2f2f3; padding: 0.6em 1em">跳转 Demo</th>
    </tr>
  </thead>
  <tbody>
    ${tbody}
  </tbody>
</table>
  `
  if (typesArr.length) {
    typesArr.map((item) => {
      let tCode = ''
      item.types.map((type) => {
        tCode += `'${type}'` + ' | '
      })
      tCode = tCode.slice(0, tCode.length - 2)
      let type = '``` js\n' + `type ${item.type} = ${tCode}` + '\n ```'
      typeCode.push(`#### ${item.type} \n` + type)
    })
  }
  code = turndownService.turndown(code)
  return {
    code,
    typeCode,
  }
}
