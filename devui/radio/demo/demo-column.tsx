import { defineComponent, ref } from 'vue';
import DRadioGroup from '../src/radio-group';
import DRadio from '../src/radio';

export default defineComponent({
  name: 'DemoColumn',
  setup () {
    const radioValRef = ref('Summer');
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
    const groupProps = {
      'onUpdate:value': doUpdateValue,
      value: radioValRef
    };

    return (
      <DRadioGroup {...groupProps} cssStyle="column">
        <DRadio value="Spring">Spring</DRadio>
        <DRadio value="Summer">Summer</DRadio>
        <DRadio value="Autumn">Autumn</DRadio>
        <DRadio value="Winter">Winter</DRadio>
      </DRadioGroup>
    );
  }
});
