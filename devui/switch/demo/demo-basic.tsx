import { defineComponent, ref } from 'vue';
import DSwitch from '../src/switch';

export default defineComponent({
  name: 'DemoBasic',

  setup () {
    const checked1 = ref(false);
    const checked2 = ref(false);
    const checked3 = ref(true);
    const checked4 = ref(false);
    const doUpdate1 = (v: boolean) => checked1.value = v;
    const doUpdate2 = (v: boolean) => checked2.value = v;
    const doUpdate3 = (v: boolean) => checked3.value = v;
    const doUpdate4 = (v: boolean) => checked4.value = v;

    return () => {
      return (<div>
        <h6>Small</h6>
        <DSwitch size="sm" checked={checked1.value} {...{'onUpdate:checked': doUpdate1}}></DSwitch>

        <h6>Middle</h6>
        <DSwitch checked={checked2.value} {...{'onUpdate:checked': doUpdate2}}></DSwitch>
        <DSwitch checked={checked3.value} {...{'onUpdate:checked': doUpdate3}}></DSwitch>

        <h6>Large</h6>
        <DSwitch size="lg" checked={checked4.value} {...{'onUpdate:checked': doUpdate4}}></DSwitch>

        <h6>disabled</h6>
        <DSwitch disabled={true}></DSwitch>
        <DSwitch disabled={true} checked={true}></DSwitch>
      </div>);
    };
  }
});
