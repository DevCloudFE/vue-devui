import { defineComponent } from 'vue';
import { useDemo } from 'hooks/use-demo';
import DemoBaisc from './demo-basic';
import DemoBasicCode from './demo-basic?raw';
import DemoDisabled from './demo-disabled';
import DemoDisabledCode from './demo-disabled?raw';

export default defineComponent({
  name: 'DTagsInputDemo',
  render () {
    return useDemo([
      {
        id: 'demo-basic',
        title: '基本用法',
        code: DemoBasicCode,
        content: <DemoBaisc></DemoBaisc>
      }, {
        id: 'demo-disabled',
        title: '禁用',
        code: DemoDisabledCode,
        content: <DemoDisabled></DemoDisabled>
      }
    ]);
  }
})