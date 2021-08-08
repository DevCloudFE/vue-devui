import { App } from 'vue';

// 通用
import Button from './button/button';
import Icon from './icon/src/icon';
import Panel from './panel/panel';

// 导航
import Tabs from './tabs/tabs';

// 反馈
import Alert from './alert/alert';
import Loading from './loading';

// 数据录入
import Checkbox from './checkbox/src/checkbox';
import Radio from './radio/src/radio';
import Switch from './switch/src/switch';
import TagsInput from './tags-input/src/tags-input';
import TextInput from './text-input/src/text-input';

// 数据展示
import Avatar from './avatar/avatar';
import Carousel from './carousel/carousel';
import CarouselItem from './carousel/item';

function install(app: App) {
  const packages = [
    Button, Icon, Panel,
    Tabs,
    Alert, Loading,
    Checkbox, Radio, Switch, TagsInput, TextInput,

    Avatar,
    Carousel,
    CarouselItem,
  ];
  packages.forEach((item:any) => {
    if (item.install) {
      app.use(item);
    } else if (item.name) {
      app.component(item.name, item);
    }
  });
}

export {
  Button, Icon, Panel,

  Tabs,
  Alert, Loading,
  Checkbox, Radio, Switch, TagsInput, TextInput,

  Avatar,
  Carousel,
  CarouselItem,
};

export default { install, version: '0.0.1' };
