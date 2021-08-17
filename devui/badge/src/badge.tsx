import './badge.scss'

import { defineComponent, computed } from 'vue'
import { badgeProps, BadgeProps } from './badge-types'

export default defineComponent({
  name: 'DBadge',
  props: badgeProps,
  emits: [],
  setup(props: BadgeProps, ctx) {
    const className = computed(() => {
      const base = 'devui-badge-content'
      return [
        base,
        props.showDot ? `${base}-dot` : `${base}-count`,
        props.status && `${base}-${props.status}`,
        ctx.slots.default && props.badgePos && `${base}-${props.badgePos}`,
        ctx.slots.default && `${base}-fixed`
      ].join(' ')
    })

    const style = computed(() => {
      const styleMap = {
        bgColor: 'background',
        textColor: 'color'
      }
      const ret = Object.keys(styleMap).reduce((ret, key) => {
        if (props[key]) {
          ret[styleMap[key]] = props[key]
        }
        return ret
      }, {})
      // 偏移量
      if (ctx.slots.default && props.offsetXY) {
        const [x, y]: Array<number> = props.offsetXY as Array<number>
        const [yName, xName] = (props.badgePos as string).split('-')
        ret[yName] = y + 'px'
        ret[xName] = x + 'px'
      }

      return ret
    })

    const text = computed(() => {
      if (props.showDot) {
        return
      }
      if (typeof props.count === 'number' && typeof props.maxCount === 'number') {
        return props.count > props.maxCount ? `${props.maxCount}+` : props.count
      }
      return props.count
    })

    return () => {
      return (
        <div class="devui-badge">
          {ctx.slots.default?.()}
          <div class={className.value} style={style.value}>
            {text.value}
          </div>
        </div>
      )
    }
  }
})
