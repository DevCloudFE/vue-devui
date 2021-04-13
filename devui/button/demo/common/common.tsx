import { defineComponent } from 'vue';
import Button from '../../button';

export default defineComponent({
  name: 'd-button-common',
  setup() {
    return () => {
      return (
        <div>
          <Button bsStyle="common">Common</Button>
        </div>
      );
    }
  }
});