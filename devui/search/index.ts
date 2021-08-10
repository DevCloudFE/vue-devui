import { App } from 'vue'
import Search from './src/search'

Search.install = function(Vue: App) {
  Vue.component(Search.name, Search)
};

Search.version = '0.0.1'

export default Search
