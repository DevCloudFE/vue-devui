import { defineComponent } from 'vue'
import CodeBox from '../../shared/devui-codebox/devui-codebox'

import Basic from './basic'
import BasicCode from './basic/index.tsx?raw'
import Indicator from './indicator'
import IndicatorCode from './indicator/index.tsx?raw'
import Autoplay from './autoplay'
import AutoplayCode from './autoplay/index.tsx?raw'
import Custom from './operate'
import CustomCode from './operate/index.tsx?raw'

export default defineComponent({
  name: 'd-carousel-demo',
  setup() {
    const basicTsCode: any[] = [{title: 'TSX', language: 'TSX', code: BasicCode}];
    const indicatorCode: any[] = [{title: 'TSX', language: 'TSX', code: IndicatorCode}];
    const autoplayCode: any[] = [{title: 'TSX', language: 'TSX', code: AutoplayCode}];
    const customCode: any[] = [{title: 'TSX', language: 'TSX', code: CustomCode}];

    return () => {
      return <div class="demo-container">
      <div class="demo-example">
        <div class="demo-title">基本用法</div>
        <div class="demo-text"></div>
        <CodeBox id="components-carousel-basic" sourceData={ basicTsCode }>
          <Basic />
        </CodeBox>
      </div>
      <div class="demo-example">
        <div class="demo-title">指示器&切换箭头</div>
        <div class="demo-text">arrowTrigger设为always可以使箭头永久显示，dotTrigger设为hover可以使hover到点上就切换。</div>
        <CodeBox id="components-carousel-indicator" sourceData={ indicatorCode }>
          <Indicator />
        </CodeBox>
      </div>
      <div class="demo-example">
        <div class="demo-title">自动轮播</div>
        <div class="demo-text"></div>
        <CodeBox id="components-carousel-autoplay" sourceData={ autoplayCode }>
          <Autoplay />
        </CodeBox>
      </div>
      <div class="demo-example">
        <div class="demo-title">自定义操作</div>
        <div class="demo-text"></div>
        <CodeBox id="components-carousel-operate" sourceData={ customCode }>
          <Custom />
        </CodeBox>
      </div>
    </div>
    }
  }
})