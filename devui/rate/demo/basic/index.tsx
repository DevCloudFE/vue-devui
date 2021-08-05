import { defineComponent, ref } from 'vue';
import DRate from '../../rate';

export default defineComponent({
  name: 'BasicRate',
  components: {
    DRate,
  },
  props: {},
  setup() {
    const value = ref(2);
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
          <d-rate value={value} {...doNew} />
        </div>
        <div>{value} star</div>
      </>
    );
  },
});
