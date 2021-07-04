import { defineComponent, ref, Ref } from 'vue';
import DCheckbox from '../src/checkbox';

export default defineComponent({
  name: 'DemoBasic',
  setup () {
    const doUpdate = (checkedRef: Ref<boolean>, newVal: boolean) => {
      checkedRef.value = newVal;
    };
    const obj: any = {};
    for (let i = 1; i <= 10; i++) {
      obj['checked' + i] = ref(false);
      obj['updateChecked' + i] = (newVal: boolean) => {
        doUpdate(obj['checked' + i], newVal);
      };
    }

    obj.checked1.value = true;
    obj.checked9.value = true;
    const halfchecked7 = ref(true);
    obj.updateChecked7 = (newVal: boolean) => {
      halfchecked7.value = !newVal;
      doUpdate(obj.checked7, newVal);
    };

    return {
      halfchecked7,
      ...obj
    };
  },
  render () {
    const {
      checked1,
      updateChecked1,
      checked2,
      updateChecked2,
      checked3,
      updateChecked3,
      checked4,
      updateChecked4,
      halfchecked7,
      checked7,
      updateChecked7,
      checked9,
      updateChecked9
    } = this;

    const checkboxProps = {
      checked1: {
        'onUpdate:checked': updateChecked1
      }, checked2: {
        'onUpdate:checked': updateChecked2
      }, checked3: {
        'onUpdate:checked': updateChecked3
      }, checked4: {
        'onUpdate:checked': updateChecked4
      }, checked7: {
        'onUpdate:checked': updateChecked7
      }, checked9: {
        'onUpdate:checked': updateChecked9
      }
    };

    return (
      <div>
        <DCheckbox
          style={{'margin-bottom': '20px'}}
          checked={checked1}
          {...checkboxProps.checked1}
          value='1'>
          Checked
        </DCheckbox>
        <DCheckbox
          style={{'margin-bottom': '20px'}}
          checked={checked2}
          {...checkboxProps.checked2}
          value='2'>
          Not Checked
        </DCheckbox>
        <DCheckbox
          style={{'margin-bottom': '20px'}}
          checked={checked3}
          {...checkboxProps.checked3}
          title="嘻嘻，今天是汕头大学40周年庆。"
          value='3'>
          Custom title
        </DCheckbox>
        <DCheckbox
          style={{'margin-bottom': '20px'}}
          checked={checked4}
          {...checkboxProps.checked4}
          showAnimation={false}
          value='4'>
          No Animation
        </DCheckbox>
        <DCheckbox
          style={{'margin-bottom': '20px'}}
          checked={true}
          disabled={true}
          value='5'>
          disabled
        </DCheckbox>
        <DCheckbox
          style={{'margin-bottom': '20px'}}
          checked={false}
          disabled={true}
          value='6'>
          disabled
        </DCheckbox>
        <DCheckbox
          style={{'margin-bottom': '20px'}}
          checked={checked7}
          {...checkboxProps.checked7}
          halfchecked={halfchecked7}
          value='7'>
          Half-checked
        </DCheckbox>
        <DCheckbox
          style={{'margin-bottom': '20px'}}
          halfchecked={true}
          disabled={true}
          label="Half-checked"
          value='8'>
        </DCheckbox>
        <DCheckbox
          style={{'margin-bottom': '20px'}}
          checked={checked9}
          {...checkboxProps.checked9}
          color='rgb(255, 193, 7)'
          label="Custom color"
          value='9'>
        </DCheckbox>
      </div>
    );
  }
});
