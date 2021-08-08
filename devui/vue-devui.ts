import { App } from 'vue';

// 通用
import Button from './button/button';
import Icon from './icon/src/icon';
import Panel from './panel/panel';

// 导航
import Tabs from './tabs/tabs';

// 反馈
import Alert from './alert/alert';

// 数据录入
import Checkbox from './checkbox/src/checkbox';
import Radio from './radio/src/radio';
import Select from './select/src/select'
import Switch from './switch/src/switch';
import TagsInput from './tags-input/src/tags-input';
import TextInput from './text-input/src/text-input';

// 数据展示
import Avatar from './avatar/avatar';

function install(app: App) {
  const packages = [
    Button, Icon, Panel,
    Tabs,
    Alert,
    Checkbox, Radio, Select, Switch, TagsInput, TextInput,
    Avatar,
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
  Alert,
  Checkbox, Radio, Select, Switch, TagsInput, TextInput,
  Avatar,
};

export default { install, version: '0.0.1' };
