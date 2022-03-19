import type { App } from 'vue';
import Search from './src/search';

export * from './src/search-types';

export { Search };

export default {
  title: 'Search 搜索框',
  category: '通用',
  status: '100%',
  install(app: App): void {
    app.component(Search.name, Search);
  }
};
