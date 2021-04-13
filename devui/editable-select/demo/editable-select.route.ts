import EditableSelectDemoComponent from './editable-select-demo'
import DevUIApiComponent from '../../shared/devui-api/devui-api'

import ApiCn from '../doc/api-cn.md'
import ApiEn from '../doc/api-en.md'
const routes = [
  { path: '',  redirectTo: 'demo' },
  { path: 'demo', component: EditableSelectDemoComponent},
  { path: 'api', component: DevUIApiComponent, meta: {
    'zh-cn': ApiCn,
    'en-us': ApiEn
  }}
]

export default routes
