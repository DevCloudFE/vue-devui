const path = require('path');
const fs = require('fs');

const UI_BASE_DIR = path.resolve(__dirname, '../devui')

/**
 * 读取UI组件库中的`doc-demo`目录，收集供文档使用的`demo`组件。
 * - mrundef - 210811
 * @param {string} compName 组件名称
 * @param {string} docDemoDir demo组件存放目录名称，默认`doc-demo`
 * @returns 
 */
const getDocDemos = (compName, docDemoDir = 'doc-demo') => {
    const res = []
    /** 组装`doc-demo`路径 */
    const docDemoPath = path.join(UI_BASE_DIR, compName, docDemoDir)
    /** 路径存在 且是目录 */
    if (fs.existsSync(docDemoPath) && fs.statSync(docDemoPath).isDirectory()) {
        /** 获取有效组件文件 */
        const names = fs.readdirSync(docDemoPath, 'utf-8')
            // 过滤隐藏文件名
            .filter(n => !/^\./.test(n))
            // 仅保留文件
            .filter(n => fs.statSync(path.join(docDemoPath, n)).isFile())
            // 过滤文件类型 js/jsx/ts/tsx/vue
            .filter(n => /\.(([jt]sx?|vue)?)$/.test(n))
        names.forEach(name => {
            /** 去掉扩展名 */
            const n = name.replace(/\.[^\.\\\/]+$/, '')
            /** 组装引入命名名称 */
            const k = `${compName}_${n}`
            /** 确保没有重复引用 */
            if (!res.some(({ name }) => name === k)) {
                res.push({
                    from: `${compName}/doc-demo/${n}`,
                    name: k
                })
            }
        })
    }
    return res
}

module.exports = getDocDemos