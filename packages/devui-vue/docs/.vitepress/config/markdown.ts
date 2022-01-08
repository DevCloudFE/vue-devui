const markdown = {
  config: (md) => {
    const { demoBlockPlugin } = require('vitepress-theme-demoblock')
    md.use(demoBlockPlugin, {
      cssPreprocessor: 'scss'
    })
  }
}
export default markdown
