import { defineComponent, ref } from 'vue';
import DRate from '../../rate';

export default defineComponent({
  name: 'BasicRate',
  components: {
    DRate,
  },
  props: {},
  setup() {
    const value1 = ref(5);
    const value2 = ref(3);
    const value3 = ref(2);
    return {
      value1,
      value2,
      value3,
    };
  },
  render() {
    const { value1, value2, value3 } = this;
    return (
      <>
        <div>
          <d-rate value={value1} read={true} type="success" count={5} />
        </div>
        <div>
          <d-rate value={value2} read={true} type="warning" count={5} />
        </div>
        <div>
          <d-rate value={value3} read={true} type="error" count={5} />
        </div>
      </>
    );
  },
});
