import './skeleton.scss'

import { defineComponent } from 'vue'
import { skeletonProps, SkeletonProps } from './skeleton-types'

export default defineComponent({
  name: 'DSkeleton',
  props: skeletonProps,
  setup(props: SkeletonProps, ctx) {
    const { slots } = ctx;

    function renderAnimate(bool) {
      return bool ? 'devui-skeleton-animated' : ''
    }
    function renderAvatar(bool) {
      return bool ? <div class="devui-skeleton__avatar"><div class="avatar" /></div> : ''
    }
    function renderParagraph(num) {
      const arr = []
      for (let index = 0; index < num; index++) {
        arr.push(1)
      }
      return <div class="devui-skeleton__item__group">{
        arr.map(() => {
          return <div class="devui-skeleton__item" />
        })
      }</div>
    }

    return () => {
      if (props.loading) {
        return <div class={`devui-skeleton ${renderAnimate(props.animate)}`}>
          {renderAvatar(props.avatar)}
          {renderParagraph(props.row)}
        </div>
      }
      return <div class={`devui-skeleton ${renderAnimate(props.animate)}`}>{slots.default?.()}
      </div>
    }
  }
})
