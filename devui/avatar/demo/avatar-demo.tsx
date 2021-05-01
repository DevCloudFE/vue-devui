import { defineComponent, ref } from 'vue';
import CodeBox from '../../shared/devui-codebox/devui-codebox';
import { DevuiSourceData } from '../../shared/devui-codebox/devui-source-data';

import AvatarBasic from './basic/basic';
import AvatarConfig from './config/config';
import AvatarSpecial from './special/special';

import BasicCode from './basic/basic.tsx?raw';
import ConfigCode from './config/config.tsx?raw';
import SpecialCode from './special/special.tsx?raw';

import './avatar-demo.scss';

export default defineComponent({
  name: 'd-avatar-demo',
  props: {
  },
  setup(props, ctx) {
    const BasicSource: DevuiSourceData[] = [{ title: 'TSX', language: 'TSX', code: BasicCode }];
    const ConfigSource: DevuiSourceData[] = [{ title: 'TSX', language: 'TSX', code: ConfigCode}];
    const SpecialSource: DevuiSourceData[] = [{ title: 'TSX', language: 'TSX', code: SpecialCode }];

    return () => {
      return (
        <div class="demo-container">
          <div class="demo-example">
            <div class="demo-title">{ '头像显示的基本规则' }</div>
            <div class="demo-text">{ "头像组件传入'name'属性时，会根据一定的规则显示头像的字段，具体规则参见API。" }</div>
            <CodeBox id="component-avatar-basic" sourceData={BasicSource}>
              <AvatarBasic></AvatarBasic>
            </CodeBox>
          </div>
          <div class="demo-example">
            <div class="demo-title">{ '头像的基础配置' }</div>
            <div class="demo-text">{ "头像组件可设置宽度，高度，是否为圆形头像，同时可自定义头像的显示字段，传入自定义图片等。" }</div>
            <CodeBox id="component-avatar-config" sourceData={ConfigSource}>
              <AvatarConfig></AvatarConfig>
            </CodeBox>
          </div>
          <div class="demo-example">
            <div class="demo-title">{ '头像的特殊显示' }</div>
            <div class="demo-text">{ "头像组件会对一些特殊情况进行处理，具体表现为用户不存在或展示默认头像，详细规则参见API。" }</div>
            <CodeBox id="component-avatar-special" sourceData={SpecialSource}>
              <AvatarSpecial></AvatarSpecial>
            </CodeBox>
          </div>
        </div>
      )
    }
  }
})