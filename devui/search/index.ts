import type { App } from 'vue'
import Search from './src/search'

Search.install = function(app: App) {
  app.component(Search.name, Search)
}

export { Search }

export default {
  title: 'Search 搜索框',
  category: '通用',
  install(app: App): void {    
		app.use(Search as any)
  }
}
