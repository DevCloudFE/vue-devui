import { defineComponent } from 'vue';
import DTextInput from '../src/text-input';

export default defineComponent({
  name: 'DemoSize',
  setup() {
    return () => {
      return (
        <>
          <h4>small</h4>
          <DTextInput size="sm" placeholder="我的很大，你忍一下"></DTextInput>
          <h4>Disabled</h4>
          <DTextInput placeholder="大碗宽面"></DTextInput>
          <h4>Error</h4>
          <DTextInput placeholder="小根牙签" size="lg"></DTextInput>
        </>
      );
    }
  }
});
