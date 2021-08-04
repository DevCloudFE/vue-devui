import { defineComponent, ref } from 'vue';
import DRate from '../../rate';

export default defineComponent({
  name: 'BasicRate',
  components: {
    DRate,
  },
  props: {},
  setup() {
    const value = ref(3);
    const onUpdateValue = (newVal: number) => {
      value.value = newVal;
    };
    return {
      value,
      onUpdateValue,
    };
  },
  render() {
    const { value, onUpdateValue } = this;
    const doNew = {
      'onUpdate:value': onUpdateValue,
    };
    return (
      <>
        <div>
          <d-rate
            value={value}
            {...doNew}
            count={6}
            character="A"
            color="#ffa500"
          />
        </div>
        <div>{value} A</div>
      </>
    );
  },
});
