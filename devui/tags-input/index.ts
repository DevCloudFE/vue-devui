import { App } from 'vue'
import TagsInput from './src/tags-input'

TagsInput.install = function(Vue: App) {
  Vue.component(TagsInput.name, TagsInput)
};

TagsInput.version = '0.0.1'

export default TagsInput
