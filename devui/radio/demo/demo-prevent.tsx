import { defineComponent, ref } from 'vue';
import DRadioGroup from '../src/radio-group';
import DRadio from '../src/radio';

export default defineComponent({
  setup () {
    const radioValRef = ref('wu');
    const beforeChange = (v: string) => v !== 'leng';
    const doUpdateValue = (newVal: string) => {
      radioValRef.value = newVal;
    };
    return {
      radioValRef,
      beforeChange,
      doUpdateValue
    };
  },
  render () {
    const {
      radioValRef,
      doUpdateValue,
      beforeChange
    } = this;
    const groupProps = {
      'onUpdate:value': doUpdateValue
    };

    return (
      <DRadioGroup
        value={radioValRef}
        {...groupProps}
        beforeChange={beforeChange}
        cssStyle="column">
        <DRadio value="wu">无情</DRadio>
        <DRadio value="tie">铁手</DRadio>
        <DRadio value="zhui">追命</DRadio>
        <DRadio value="leng">冷血</DRadio>
      </DRadioGroup>
    );
  }
});
