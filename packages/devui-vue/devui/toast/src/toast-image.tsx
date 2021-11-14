import { defineComponent, PropType } from 'vue'
import { IToastSeverity } from './toast-types'
import { Icon } from '../../icon'

export default defineComponent({
  name: 'DToastImage',
  props: {
    prefixCls: String,
    severity: String as PropType<IToastSeverity>
  },
  render() {
    const { prefixCls, severity } = this

    const wrapperCls = [`${prefixCls}-image`, `${prefixCls}-image-${severity || 'common'}`]

    const severityIconMap = {
      info: 'info-o',
      success: 'right-o',
      warn: 'warning-o',
      error: 'error-o'
    }

    const showIcon = () => severity !== 'common'

    return <span class={wrapperCls}>{showIcon() ? <Icon name={severityIconMap[severity]} size="14px" /> : null}</span>
  }
})
