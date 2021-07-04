import { defineComponent } from 'vue';
import { useDemo } from 'hooks/use-demo';
import DemoBasic from './demo-basic';
import DemoBasicCode from './demo-basic?raw';
import DemoCheckboxGroup from './demo-checkbox-group';
import DemoCheckboxGroupCode from './demo-checkbox-group?raw';

export default defineComponent({
  name: 'DCheckboxDemo',
  
  render () {
    return useDemo([{
      id: 'checkbox-basic',
      title: '基本用法',
      code: DemoBasicCode,
      content: <DemoBasic></DemoBasic>
    }, {
      id: 'checkbox-group',
      title: '复选框组',
      code: DemoCheckboxGroupCode,
      content: <DemoCheckboxGroup></DemoCheckboxGroup>
    }]);
  }
});
