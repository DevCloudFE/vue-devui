import { defineComponent, ref } from 'vue';
import DRate from '../../rate';

export default defineComponent({
  name: 'OnlyRead',
  components: {
    DRate,
  },
  props: {},
  setup() {
    const value = ref(3.5);
    return {
      value,
    };
  },
  render() {
    const { value } = this;
    return (
      <div>
        <d-rate read={true} value={value} />
      </div>
    );
  },
});
