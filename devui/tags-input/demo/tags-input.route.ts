import TagsInputDemoComponent from './tags-input-demo'
import DevUIApiComponent from '../../shared/devui-api/devui-api'

import ApiCn from '../doc/api-cn.md'
import ApiEn from '../doc/api-en.md'
const routes = [
  { path: '',  redirectTo: 'demo' },
  { path: 'demo', component: TagsInputDemoComponent},
  { path: 'api', component: DevUIApiComponent, meta: {
    'zh-cn': '',
    'en-us': ''
  }}
]

export default routes
