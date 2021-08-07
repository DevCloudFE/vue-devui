import { defineComponent } from 'vue'
import { useDemo } from 'hooks/use-demo';
import DemoBasic from './demo-basic';
import DemoBasicCode from './demo-basic?raw';
import DemoImage from './demo-image';
import DemoImageCode from './demo-image?raw';
import DemoCustom from './demo-custom';
import DemoCustomCode from './demo-custom?raw';
export default defineComponent({
  name: 'DCardDemo',
  render () {
    return useDemo([
      {
        id: 'demo-basic',
        title: '基本用法',
        code: DemoBasicCode,
        content: <DemoBasic></DemoBasic>
      },{
        id: 'demo-basic',
        title: '使用图片',
        code: DemoImageCode,
        content: <DemoImage></DemoImage>
      }, {
        id: 'demo-custom',
        title: '自定义',
        code: DemoCustomCode,
        content: <DemoCustom></DemoCustom>
      }
    ]);
  }
});