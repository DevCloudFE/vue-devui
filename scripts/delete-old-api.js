const fs = require('fs')
const path = require('path')
const shelljs = require('shelljs')
const { COMPONENTS } = require('./const')

const targetPath = path.resolve(__dirname, '../devui')

function deleteOldApi(targetPath) {
  fs.readdir(targetPath, function(targetPathError, targetComponentFolder) {
    if (targetPathError) {
      console.error(targetPathError)
      return
    }
    
    targetComponentFolder
    .filter(doc => COMPONENTS.includes(doc))
    .forEach((componentName) => {
      const targetApiPath = path.resolve(targetPath, componentName, 'api')

      // 在组件目录下创建 doc 目录
      if (fs.existsSync(targetApiPath)) {
        shelljs.rm('-rf', targetApiPath);
      }
    })
  })
}

deleteOldApi(targetPath)
