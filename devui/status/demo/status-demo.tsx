import { defineComponent } from 'vue'
import CodeBox from '../../shared/devui-codebox/devui-codebox'
import Status from './code/status-code'
import StatusCode from './code/status-code.tsx?raw'
export default defineComponent({
  name: 'DStatusDemo',
  setup() {
    const StatusSource: any[] = [{title: 'TSX', language: 'TSX', code: StatusCode}];
    return () => {
      return <div class="demo-container">
      <div class="demo-example">
        <div class="demo-title">{ '基本用法' }</div>
        <div class="demo-text"></div>
        <CodeBox id="components-button-primary" sourceData={StatusSource}>
            <Status></Status>
        </CodeBox>
      </div>
    </div>
    }
  }
})