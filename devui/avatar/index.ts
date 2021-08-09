import { App } from 'vue'
import Avatar from './avatar'

Avatar.install = function(Vue: App) {
  Vue.component(Avatar.name, Avatar)
};

Avatar.version = '0.0.1'

export default Avatar
