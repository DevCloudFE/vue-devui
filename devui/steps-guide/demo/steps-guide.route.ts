import StepsGuideDemoComponent from './steps-guide-demo'
import DevUIApiComponent from '../../shared/devui-api/devui-api'

import ApiCn from '../doc/api-cn.md'
import ApiEn from '../doc/api-en.md'
const routes = [
  { path: '',  redirectTo: 'demo' },
  { path: 'demo', component: StepsGuideDemoComponent},
  { path: 'api', component: DevUIApiComponent, meta: {
    'zh-cn': ApiCn,
    'en-us': ApiEn
  }}
]

export default routes
