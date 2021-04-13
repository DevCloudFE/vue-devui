const fs = require('fs')
const path = require('path')
const shelljs = require('shelljs')
const program = require('commander')
const { COMPONENTS } = require('./const')

const DEFAULT_SOURCE_PATH = path.resolve(__dirname, '../../../code/ng-devui/devui')
const DEFAULT_TARGET_PATH = path.resolve(__dirname, '../devui')

// 从命令行参数中取源文件和目标文件路径
program
  .option('-s, --source <type>', 'Original file path', DEFAULT_SOURCE_PATH)
  .option('-t, --target <type>', 'Target file path', DEFAULT_TARGET_PATH)
program.parse(process.argv);

const { source, target } = program.opts();

const sourcePath = source;
const targetPath = target;

function addApi(sourcePath, targetPath) {
  fs.readdir(sourcePath, function(sourcePathError, sourceComponentFolder) {
    if (sourcePathError) {
      console.error(sourcePathError)
      return
    }
    
    sourceComponentFolder
    .filter(doc => COMPONENTS.includes(doc))
    .forEach((componentName) => {
      const targetDocPath = path.resolve(targetPath, componentName, 'doc')

      // 在组件目录下创建 doc 目录
      if (!fs.existsSync(targetDocPath)) {
        fs.mkdirSync(targetDocPath)
      }

      // 拷贝中英文 API 文档
      const sourceDocPath = path.resolve(sourcePath, componentName, 'doc')
      fs.readdir(sourceDocPath, (sourceDocPathError, sourceDocs) => {
        if (sourceDocPathError) {
          console.error(sourceDocPathError)
          return
        }

        sourceDocs.forEach(sourceDoc => {
          shelljs.cp(path.resolve(sourceDocPath, sourceDoc), targetDocPath)
        })
      })

      // 修改路由
      const componentRoutePath = path.resolve(targetPath, componentName, 'demo', componentName + '.route.ts')
      shelljs.sed('-i', /'..\/doc\/api-cn.md'/, 'ApiCn', componentRoutePath)
      shelljs.sed('-i', /'..\/doc\/api-en.md'/, 'ApiEn', componentRoutePath)
      shelljs.sed(
        '-i', 
        /const routes = \[/, 
        'import ApiCn from \'../doc/api-cn.md\'\nimport ApiEn from \'../doc/api-en.md\'\nconst routes = [', 
        componentRoutePath
      )
    })
  })
}

addApi(sourcePath, targetPath)
