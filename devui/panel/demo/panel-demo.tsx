import { defineComponent } from 'vue'
import CodeBox from '../../shared/devui-codebox/devui-codebox'
import PanelBasic from './basic/basic'
import PanelType from './type/type'
import PanelCoditionChange from './condition-change/condition-change'

import BasicCode from './basic/basic.tsx?raw';
import TypeCode from './type/type.tsx?raw';
import CoditionCode from './condition-change/condition-change.tsx?raw'

export default defineComponent({
  name: 'd-panel-demo',
  props: {
  },
  setup(props, ctx) {
    const basicSource: any[] = [{title: 'TSX', language: 'TSX', code: BasicCode}];
    const typeSource: any[] = [{title: 'TSX', language: 'TSX', code: TypeCode}];
    const coditionSoure: any[] = [{title: 'TSX', language: 'TSX', code: CoditionCode}];
    return () => {
      return <div class="demo-container">
        <div class="demo-example">
          <div class="demo-title">{'基本用法'}</div>
          <div class="demo-text"></div>
          <CodeBox id="component-panel-basic" sourceData={basicSource}>
            <PanelBasic></PanelBasic>
          </CodeBox>
        </div>
        <div class="demo-example">
          <div class="demo-title">{'多种类型'}</div>
          <div class="demo-text">{'面板类型分为default、primary、success，danger、warning、info。'}</div>
          <CodeBox id="component-panel-basic" sourceData={typeSource}>
            <PanelType></PanelType>
          </CodeBox>
        </div>
        <div class="demo-example">
          <div class="demo-title">{'根据条件阻止折叠'}</div>
          <div class="demo-text">{'根据条件判断，当panel展开时，点击阻止折叠按钮，将无法折叠panel。当panel折叠时不影响操作。'}</div>
          <CodeBox id="component-panel-basic" sourceData={coditionSoure}>
            <PanelCoditionChange></PanelCoditionChange>
          </CodeBox>
        </div>
      </div>
    }
  }
})