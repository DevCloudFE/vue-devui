import { defineComponent } from 'vue';
import { useDemo } from 'hooks/use-demo';
import DemoBasic from './demo-basic';
import DemoBasicCode from './demo-basic?raw';
import DemoCustom from './demo-custom';
import DemoCustomCode from './demo-custom?raw';

export default defineComponent({
  name: 'SwitchDemo',
  render () {
    return useDemo([
      {
        id: 'demo-basic',
        title: '基本用法',
        code: DemoBasicCode,
        content: <DemoBasic></DemoBasic>
      }, {
        id: 'demo-custom',
        title: '自定义',
        code: DemoCustomCode,
        content: <DemoCustom></DemoCustom>
      }
    ]);
  }
});
