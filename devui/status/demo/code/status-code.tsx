import { defineComponent } from 'vue';
import Status from '../../status';

export default defineComponent({
  name: 'DStatusCode',
  setup() {
    return () => {
      return (
        <section>
            <Status type="success">success</Status>
            <Status type="error">error</Status>
            <Status type="warning">warning</Status>
            <Status type="initial">initial</Status>
            <Status type="waiting">waiting</Status>
            <Status type="running">running</Status>
            <Status type="invalid">invalid</Status>
        </section>
      );
    }
  }
});