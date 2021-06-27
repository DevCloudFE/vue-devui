import { defineComponent } from 'vue';
import DRadioGroup from '../src/radio-group';
import DRadio from '../src/radio';

export default defineComponent({
  render () {
    return (
      <DRadioGroup value="liao">
        <DRadio value="liao" disabled={true}>辽沈战役</DRadio>
        <DRadio value="huai" disabled={true}>淮海战役</DRadio>
        <DRadio value="ping" disabled={true}>平津战役</DRadio>
      </DRadioGroup>
    );
  }
});
