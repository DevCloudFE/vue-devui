import { defineComponent } from 'vue'
import CodeBox from '../../shared/devui-codebox/devui-codebox'
import ButtonPrimary from './primary/primary'
import ButtonCommon from './common/common'
import PrimaryCode from './primary/primary.tsx?raw'
import CommonCode from './common/common.tsx?raw'

export default defineComponent({
  name: 'd-button-demo',
  setup() {
    const primarySource: any[] = [{title: 'TSX', language: 'TSX', code: PrimaryCode}];
    const commonSource: any[] = [{title: 'TSX', language: 'TSX', code: CommonCode}];
    return () => {
      return <div class="demo-container">
      <div class="demo-example">
        <div class="demo-title">{ '主要按钮' }</div>
        <div class="demo-text"></div>
        <CodeBox id="components-button-primary" sourceData={primarySource}>
          <ButtonPrimary></ButtonPrimary>
        </CodeBox>
      </div>
      <div class="demo-example">
        <div class="demo-title">{ '次要按钮' }</div>
        <div class="demo-text"></div>
        <CodeBox id="components-button-common" sourceData={commonSource}>
          <ButtonCommon></ButtonCommon>
        </CodeBox>
      </div>
    </div>
    }
  }
})