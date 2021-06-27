import { defineComponent, ref } from 'vue';
import DRadioGroup from '../src/radio-group';
import DRadio from '../src/radio';

export default defineComponent({
  setup () {
    const radioValRef = ref('item1');
    const doUpdateValue = (newVal: string) => {
      radioValRef.value = newVal;
    };
    return {
      radioValRef,
      doUpdateValue
    };
  },
  render () {
    const {
      radioValRef,
      doUpdateValue
    } = this;

    const onChange = () => {
      console.log(2021);
    };
    const groupProps = {
      'onUpdate:value': doUpdateValue
    };

    return (
      <DRadioGroup value={radioValRef} {...groupProps} cssStyle="row" onChange={onChange}>
        <DRadio value="item1">Item1</DRadio>
        <DRadio value="item2">Item2</DRadio>
        <DRadio value="item3">Item3</DRadio>
      </DRadioGroup>
    );
  }
});
