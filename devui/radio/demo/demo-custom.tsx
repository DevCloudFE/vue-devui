import { defineComponent, ref, Ref } from 'vue';
import DRadioGroup from '../src/radio-group';
import DRadio from '../src/radio';

export default defineComponent({
  setup () {
    const list1 = [
      '自来也', '大蛇丸', '纲手'
    ];
    const list2 = [
      {
        name: '鸣人'
      }, {
        name: '佐助'
      }, {
        name: '小樱'
      }
    ];
    const oldRef = ref('自来也');
    const newRef = ref('鸣人');
    const doUpdateValue = (newVal: string, valRef: Ref<string>) => {
      valRef.value = newVal;
    };
    const doOld = (newVal: string) => {
      doUpdateValue(newVal, oldRef);
    };
    const doNew = (newVal: string) => {
      doUpdateValue(newVal, newRef);
    };
    return {
      list1,
      list2,
      oldRef,
      newRef,
      doOld,
      doNew
    };
  },

  render () {
    const {
      list1,
      list2,
      oldRef,
      newRef,
      doOld,
      doNew
    } = this;

    const groupProps = {
      'onUpdate:value': doOld
    };
    const groupPropsNew = {
      'onUpdate:value': doNew
    };

    return (
      <div>
        <DRadioGroup value={oldRef} {...groupProps} cssStyle="row">
          {list1.map(item => <DRadio value={item}>{item}</DRadio>)}
        </DRadioGroup>
        <DRadioGroup value={newRef} {...groupPropsNew} cssStyle="row">
          {list2.map(item => <DRadio value={item.name}>我是{item.name}</DRadio>)}
        </DRadioGroup>
      </div>
    );
  }
});
