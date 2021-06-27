import { defineComponent } from 'vue';
import { useDemo } from 'hooks/use-demo';
import DemoRow from './demo-row';
import DemoRowCode from './demo-row?raw';
import DemoCol from './demo-column';
import DemoColCode from './demo-column?raw';
import DemoPrevent from './demo-prevent';
import DemoPreventCode from './demo-prevent?raw';
import DemoDisabled from './demo-disabled';
import DemoDisabledCode from './demo-disabled?raw';
import DemoCustom from './demo-custom';
import DemoCustomCode from './demo-custom?raw';

export default defineComponent({
  name: 'DRadioDemo',

  render () {
    return useDemo([
      {
        id: 'radio-row',
        title: '横向排列',
        code: DemoRowCode,
        content: <DemoRow></DemoRow>
      }, {
        id: 'radio-column',
        title: '竖向排列',
        code: DemoColCode,
        content: <DemoCol></DemoCol>
      }, {
        id: 'radio-prevent',
        title: '根据条件终止切换操作',
        text: '根据条件判断，第四项禁止跳转。',
        code: DemoPreventCode,
        content: (
          <DemoPrevent></DemoPrevent>
        )
      }, {
        id: 'radio-disabled',
        title: '禁用',
        code: DemoDisabledCode,
        content: (
          <DemoDisabled></DemoDisabled>
        )
      }, {
        id: 'radio-custom',
        title: '自定义单选项',
        text: '数据源可以是普通数组、对象数组等',
        code: DemoCustomCode,
        content: (
          <DemoCustom></DemoCustom>
        )
      }
    ]);
  }
});
