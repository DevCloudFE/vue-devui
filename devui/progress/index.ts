import { App } from 'vue'
import Progress from './progress'

Progress.install = function(Vue: App) {
  Vue.component(Progress.name, Progress)
};

Progress.version = '0.0.1'

export default Progress
