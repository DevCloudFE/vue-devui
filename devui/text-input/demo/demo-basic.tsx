import { defineComponent } from 'vue';
import DTextInput from '../src/text-input';

export default defineComponent({
  name: 'DemoBasic',
  setup() {
    return () => {
      return (
        <>
          <h4>Default</h4>
          <DTextInput value="你有freeStyle吗？" placeholder="Please Enter"></DTextInput>
          <h4>Disabled</h4>
          <DTextInput disabled={true} placeholder="Please Enter"></DTextInput>
          <h4>Error</h4>
          <DTextInput error={true} placeholder="Please Enter"></DTextInput>
        </>
      );
    }
  }
});
