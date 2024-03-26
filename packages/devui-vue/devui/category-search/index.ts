import type { App } from 'vue';
import CategorySearch from './src/category-search';

export * from './src/category-search-types';

export { CategorySearch };

export default {
	title: 'CategorySearch 分类搜索',
	category: '演进中',
	status: '100%',
	install(app: App): void {
		app.component(CategorySearch.name, CategorySearch);
	}
}