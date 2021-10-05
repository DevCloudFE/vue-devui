import './skeleton.scss'

import { defineComponent } from 'vue'
import { skeletonProps, SkeletonProps } from './skeleton-types'

export default defineComponent({
  name: 'DSkeleton',
  props: skeletonProps,
  setup(props: SkeletonProps, ctx) {
    const { slots } = ctx;
    const arr = []
    for (let index = 0; index < props.row; index++) {
      arr.push(1)
    }
    return () => {
      if (props.loading) {
        return <div class={`devui-skeleton ${props.animate ? 'devui-skeleton-animated' : ''}`}>
          <div class={`devui-skeleton__avatar ${props.avatar ? 'is-shown' : ''}`}>
            <div class="avatar"/>
          </div>
          <div class="devui-skeleton__item__group">{
            arr.map(() => {
              return <div class="devui-skeleton__item" />
            })
          }</div>
        </div>
      }
      return <div class={`devui-skeleton ${props.animate ? 'devui-skeleton-animated' : ''}`}>{slots.default?.()}
      </div>
    }
  }
})
