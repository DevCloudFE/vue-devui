

import { defineComponent } from 'vue';
import { useDemo } from 'hooks/use-demo';
import DemoBasic from './demo-basic';
import DemoBasicCode from './demo-basic?raw';
import DemoSize from './demo-size';
import DemoSizeCode from './demo-size?raw';

export default defineComponent({
  name: 'DTextInputDemo',
  render () {
    return useDemo([
      {
        id: 'demo-basic',
        title: '基本用法',
        code: DemoBasicCode,
        content: <DemoBasic></DemoBasic>
      }, {
        id: 'demo-size',
        title: '尺寸',
        code: DemoSizeCode,
        content: <DemoSize></DemoSize>
      }
    ]);
  }
});
