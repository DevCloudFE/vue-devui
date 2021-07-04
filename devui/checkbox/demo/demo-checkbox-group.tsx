import { defineComponent, reactive } from 'vue';
import DCheckbox from '../src/checkbox';
import DCheckboxGroup from '../src/checkbox-group';

export default defineComponent({
  name: 'DemoCheckboxGroup',
  setup () {
    const list1 = reactive(['b']);
    const list2 = reactive(['b', 'c']);
    const list3 = reactive(['a', 'c']);
    const opts2 = [
      {
        disabled: true,
        value: 'a',
        label: '道'
      }, {
        disabled: true,
        value: 'b',
        label: '可道'
      }, {
        disabled: true,
        value: 'c',
        label: '非常道'
      }, {
        disabled: true,
        value: 'd',
        label: '名'
      }, {
        disabled: true,
        value: 'e',
        label: '可名'
      }, {
        disabled: true,
        value: 'f',
        label: '非常名'
      }, {
        disabled: true,
        value: 'g',
        label: '无名'
      }, {
        disabled: true,
        value: 'h',
        label: '天地之始'
      }, {
        disabled: true,
        value: 'g',
        label: '有名'
      }, {
        disabled: true,
        value: 'i',
        label: '万物之母'
      }, {
        disabled: true,
        value: 'j',
        label: '故常无'
      }, {
        disabled: true,
        value: 'k',
        label: '欲以观其妙'
      }, {
        disabled: true,
        value: 'l',
        label: '常有'
      }, {
        disabled: true,
        value: 'm',
        label: '欲以观其徼'
      }, {
        disabled: true,
        value: 'n',
        label: '此两者'
      }, {
        disabled: true,
        value: 'o',
        label: '同出而异名'
      }, {
        disabled: true,
        value: 'p',
        label: '同谓之玄'
      }, {
        disabled: true,
        value: 'q',
        label: '玄之又玄，众妙之门'
      }
    ];
    const updateList1 = (v: string[]) => {
      Object.assign(list1, v);
    };
    const updateList3 = (v: string[]) => {
      Object.assign(list3, v);
    };

    return {
      list1,
      list2,
      list3,
      opts2,
      updateList1,
      updateList3
    };
  },
  render () {
    const {
      list1,
      list2,
      list3,
      opts2,
      updateList1,
      updateList3
    } = this;

    const groupProps = {
      'onUpdate:value': updateList1
    };
    const groupProps3 = {
      'onUpdate:value': updateList3
    };

    return (
      <div>
        <h6>第三项根据条件禁止切换</h6>
        <DCheckboxGroup value={list1} {...groupProps} beforeChange={ (isChecked, v) => v !== 'c' }>
          <DCheckbox value="a" disabled={true}>
            金刚经
          </DCheckbox>
          <DCheckbox value="b">
            佛说世界
          </DCheckbox>
          <DCheckbox value="c">
            既非世界
          </DCheckbox>
          <DCheckbox value="d">
            故名世界
          </DCheckbox>
        </DCheckboxGroup>

        <h6>多行复选框</h6>
        <DCheckboxGroup value={list2} direction="row" options={opts2}>
        </DCheckboxGroup>
        
        <h6>itemWidth</h6>
        <DCheckboxGroup value={list3} itemWidth={100} {...groupProps3}>
          <DCheckbox value="a" label="庐山烟雨浙江潮">
          </DCheckbox>
          <DCheckbox value="b" label="未到千般恨不消">
          </DCheckbox>
          <DCheckbox value="c" label="到得还来别无事">
          </DCheckbox>
          <DCheckbox value="d" label="庐山烟雨浙江潮">
          </DCheckbox>
        </DCheckboxGroup>
      </div>
    );
  }
});
