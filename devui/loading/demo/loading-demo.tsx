import { defineComponent } from 'vue'
import CodeBox from '../../shared/devui-codebox/devui-codebox';
import { DevuiSourceData } from '../../shared/devui-codebox/devui-source-data';

import BasicDemo from './components/basicDemo'
import CustomStyleDemo from './components/customStyle'
import MutiplePromiseDemo from './components/mutiplePromise'
import ShowLoadingDemo from './components/showLoadingDemo'
import ServiceDemo from './components/serviceDemo'

import BasicCode from './components/basicDemo.tsx?raw'
import CustomStyleCode from './components/customStyle.tsx?raw'
import MutiplePromiseCode from './components/mutiplePromise.tsx?raw'
import ShowLoadingCode from './components/showLoadingDemo.tsx?raw'
import ServiceCode from './components/serviceDemo.tsx?raw'

export default defineComponent({
  name: 'd-loading-demo',
  render() {
    const BasicSource: DevuiSourceData[] = [{title: 'TSX', language: 'TSX', code: BasicCode}];
    const CustomStyleSource: DevuiSourceData[] = [{title: 'TSX', language: 'TSX', code: CustomStyleCode}];
    const MutiplePromiseSource: DevuiSourceData[] = [{title: 'TSX', language: 'TSX', code: MutiplePromiseCode}];
    const ShowLoadingSource: DevuiSourceData[] = [{title: 'TSX', language: 'TSX', code: ShowLoadingCode}];
    const ServiceSource: DevuiSourceData[] = [{title: 'TSX', language: 'TSX', code: ServiceCode}];

    return (
      <div class="demo-container">
        <div class="demo-example">
          <div class="demo-title">{ '基本用法' }</div>
          <div class="demo-text">{ '展示加载表格数据的场景中的基本使用方法。' }</div>
          <CodeBox id="component-alert-basic" sourceData={BasicSource}>
            <BasicDemo />
          </CodeBox>
        </div>
        <div class="demo-example">
          <div class="demo-title">{ '自定义样式' }</div>
          <div class="demo-text">{ '通过 templateRef 自定义loading样式。' }</div>
          <CodeBox id="component-alert-basic" sourceData={CustomStyleSource}>
            <CustomStyleDemo />
          </CodeBox>
        </div>
        <div class="demo-example">
          <div class="demo-title">{ '多promise' }</div>
          <div class="demo-text">{ '支持多个promise。' }</div>
          <CodeBox id="component-alert-basic" sourceData={MutiplePromiseSource}>
            <MutiplePromiseDemo />
          </CodeBox>
        </div>
        <div class="demo-example">
          <div class="demo-title">{ '使用showLoading控制' }</div>
          <div class="demo-text">{ '使用showLoading的true或false控制loading的显示。' }</div>
          <CodeBox id="component-alert-basic" sourceData={ShowLoadingSource}>
            <ShowLoadingDemo />
          </CodeBox>
        </div>
        <div class="demo-example">
          <div class="demo-title">{ '服务方式调用' }</div>
          <div class="demo-text">{ '使用服务的方式全屏加载loading组件或者在指定宿主上加载loading组件。' }</div>
          <CodeBox id="component-alert-basic" sourceData={ServiceSource}>
            <ServiceDemo />
          </CodeBox>
        </div>
      </div>
    )
  }
})