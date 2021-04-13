import { defineComponent } from 'vue';
import Button from '../../button';

export default defineComponent({
  name: 'd-button-primary',
  setup() {
    return () => {
      return (
        <div style="display:flex;">
          <Button bsStyle="primary" style="margin-right: 4px">primary</Button>
          <Button bsStyle="primary" disabled>Disabled</Button>
        </div>
      );
    }
  }
});