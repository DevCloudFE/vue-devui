import { defineComponent } from 'vue';
import { useDemo } from 'hooks/use-demo';
import OnlyRead from './only-read/index';
import OnlyReadCode from './only-read/index?raw';
import BasicRate from './basic/index';
import BasicRateCode from './basic/index?raw';
import CustomizeRate from './customize/index';
import CustomizeRateCode from './customize/index?raw';
import TypeRate from './type/index';
import TypeRateCode from './type/index?raw';

export default defineComponent({
  name: 'DRateDemo',
  render() {
    return useDemo([
      {
        id: 'only-read',
        title: '只读模式',
        code: OnlyReadCode,
        content: <OnlyRead></OnlyRead>,
      },
      {
        id: 'basic-rate',
        title: '动态模式',
        code: BasicRateCode,
        content: <BasicRate></BasicRate>,
      },
      {
        id: 'customize-rate',
        title: '动态模式-自定义',
        code: CustomizeRateCode,
        content: <CustomizeRate></CustomizeRate>,
      },
      {
        id: 'type-rate',
        title: '使用type参数',
        code: TypeRateCode,
        content: <TypeRate></TypeRate>,
      },
    ]);
  },
});
