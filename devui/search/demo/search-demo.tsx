import { defineComponent } from 'vue'
import { useDemo } from 'hooks/use-demo';
import DemoBasic from './demo-basic';
import DemoBasicCode from './demo-basic?raw';
import DemoLeftIcon from './demo-iconleft';
import DemoLeftIconCode from './demo-iconleft?raw';
import DemoNoBorder from './demo-noborder';
import DemoNoBorderCode from './demo-noborder?raw';
import DemoBind from './demo-bind';
import DemoBindCode from './demo-bind?raw';
import './search-demo.scss';

export default defineComponent({
  render () {
    return useDemo([
      {
        id: 'demo-basic',
        title: '基本用法',
        code: DemoBasicCode,
        content: <DemoBasic></DemoBasic>
      },
      {
        id: 'demo-lefticon',
        title: '搜索图标位置左置',
        code: DemoLeftIconCode,
        content: <DemoLeftIcon></DemoLeftIcon>
      },
      {
        id: 'demo-bind',
        title: '无边框',
        code: DemoNoBorderCode,
        content: <DemoNoBorder></DemoNoBorder>
      },
      {
        id: 'demo-bind',
        title: '双向绑定',
        code: DemoBindCode,
        content: <DemoBind></DemoBind>
      },
    ]);
  }
})