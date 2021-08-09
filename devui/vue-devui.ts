import { App } from 'vue'

// 通用
import Button from './button'
import Icon from './icon'
import Panel from './panel'

// 导航
import Tabs from './tabs'

// 反馈
import Alert from './alert/alert'
import Toast, { ToastService } from './toast'
import DLoading, { LoadingService, Loading } from './loading'

// 数据录入
import Checkbox from './checkbox'
import Radio from './radio'
import Switch from './switch'
import TagsInput from './tags-input'
import TextInput from './text-input'

// 数据展示
import Avatar from './avatar'
import Carousel from './carousel'
import CarouselItem from './carousel/item'

function install(app: App): void {
  const packages = [
    Button,
    Icon,
    Panel,
    Tabs,
    Alert,
    Toast,
    ToastService,
    DLoading,
    Checkbox,
    Radio,
    Switch,
    TagsInput,
    TextInput,
    Avatar,
    Carousel,
    CarouselItem,
  ]
  packages.forEach((item: any) => {
    if (item.install) {
      app.use(item)
    } else if (item.name) {
      app.component(item.name, item)
    }
  })
}

export {
  Button,
  Icon,
  Panel,
  Tabs,
  Alert,
  Toast,
  ToastService,
  LoadingService,
  Loading,
  Checkbox,
  Radio,
  Switch,
  TagsInput,
  TextInput,
  Avatar,
  Carousel,
  CarouselItem,
}
export default { install, version: '0.0.1' }
