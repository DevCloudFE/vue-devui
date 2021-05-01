import { defineComponent } from 'vue';

import CodeBox from '../../shared/devui-codebox/devui-codebox';
import AlertBasic from './basic/basic';
import AlertClose from './close/close';
import AlertWithoutIcon from './withoutIcon/withoutIcon';
import { DevuiSourceData } from '../../shared/devui-codebox/devui-source-data';

//code
import BasicCode from './basic/basic.tsx?raw';
import CloseCode from './close/close.tsx?raw';
import WithoutIconCode from './withoutIcon/withoutIcon.tsx?raw';

import './alert-demo.scss';

export default defineComponent({
  name: 'd-alert-demo',
  props: {
  },
  setup(props, ctx) {
    const BasicSource: DevuiSourceData[] = [{title: 'TSX', language: 'TSX', code: BasicCode}];
    const CloseSource: DevuiSourceData[] = [{title: 'TSX', language: 'TSX', code: CloseCode}];
    const WithoutIconSource: DevuiSourceData[] = [{title: 'TSX', language: 'TSX', code: WithoutIconCode}];
    return () => {
      return (
        <div class="demo-container">
          <div class="demo-example">
            <div class="demo-title">{ '基本用法' }</div>
            <div class="demo-text">{ '共有四种样式：success、danger、warning、info。' }</div>
            <CodeBox id="component-alert-basic" sourceData={BasicSource}>
              <AlertBasic></AlertBasic>
            </CodeBox>
          </div>
          <div class="demo-example">
            <div class="demo-title">{ '可关闭提示' }</div>
            <div class="demo-text">{ '显示关闭按钮，点击可关闭提示。' }</div>
            <CodeBox id="component-alert-close" sourceData={CloseSource}>
              <AlertClose></AlertClose>
            </CodeBox>
          </div>
          <div class="demo-example">
            <div class="demo-title">{ '不使用默认图标' }</div>
            <div class="demo-text">{ '不使用默认的类型图标。' }</div>
            <CodeBox id="component-alert-close" sourceData={WithoutIconSource}>
              <AlertWithoutIcon></AlertWithoutIcon>
            </CodeBox>
          </div>
        </div>
      )
    }
  }
})