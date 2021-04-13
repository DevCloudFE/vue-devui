import DragDropDemoComponent from './dragdrop-demo'
import DevUIApiComponent from '../../shared/devui-api/devui-api'

import ApiCn from '../doc/api-cn.md'
import ApiEn from '../doc/api-en.md'
const routes = [
  { path: '',  redirectTo: 'demo' },
  { path: 'demo', component: DragDropDemoComponent},
  { path: 'api', component: DevUIApiComponent, meta: {
    'zh-cn': '',
    'en-us': ''
  }}
]

export default routes
