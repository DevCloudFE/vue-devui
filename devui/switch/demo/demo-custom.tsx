import { defineComponent, ref } from 'vue';
import DSwitch from '../src/switch';

export default defineComponent({
  name: 'DemoCustom',
  setup () {
    const checked = ref(true);
    const doUpdate = (v: boolean) => checked.value = v;
    const checked2 = ref(true);
    const doUpdate2 = (v: boolean) => checked2.value = v;

    return {
      checked,
      doUpdate,
      checked2,
      doUpdate2
    };
  },
  render () {
    const {
      checked,
      doUpdate,
      checked2,
      doUpdate2
    } = this;

    return (
      <div>
        <DSwitch color="#fecc55" checked={checked} {...{'onUpdate:checked': doUpdate}} size="lg"></DSwitch>
        <div style="margin-bottom: 10px;"></div>
        <DSwitch
          checked={checked2}
          {...{'onUpdate:checked': doUpdate2}}
          v-slots={{
            checkedContent: () => '开',
            uncheckedContent: () => '关'
          }}>
        </DSwitch>
      </div>
    );
  }
});
