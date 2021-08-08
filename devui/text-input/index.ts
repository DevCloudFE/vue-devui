import { App } from 'vue'
import TextInput from './src/text-input'

TextInput.install = function(Vue: App) {
  Vue.component(TextInput.name, TextInput)
};

TextInput.version = '0.0.1'

export default TextInput
