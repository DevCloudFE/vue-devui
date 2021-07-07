import { defineComponent, ref } from 'vue';
import DToggle from '../src/toggle';

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
        <h6>中杯拿铁</h6>
        <DToggle size="sm" checked={checked1.value} {...{'onUpdate:checked': doUpdate1}}></DToggle>

        <h6>大杯拿铁</h6>
        <DToggle checked={checked2.value} {...{'onUpdate:checked': doUpdate2}}></DToggle>
        <DToggle checked={checked3.value} {...{'onUpdate:checked': doUpdate3}}></DToggle>

        <h6>特大杯拿铁</h6>
        <DToggle size="lg" checked={checked4.value} {...{'onUpdate:checked': doUpdate4}}></DToggle>

        <h6>别这样</h6>
        <DToggle disabled={true}></DToggle>
        <DToggle disabled={true} checked={true}></DToggle>
      </div>);
    };
  }
});
