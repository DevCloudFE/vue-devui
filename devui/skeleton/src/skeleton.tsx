import './skeleton.scss'

import { defineComponent } from 'vue'
import { skeletonProps, SkeletonProps } from './skeleton-types'

export default defineComponent({
  name: 'DSkeleton',
  props: skeletonProps,
  emits: [],
  setup(props: SkeletonProps, ctx) {
    const { slots } = ctx;
    let arr = []
    for (let index = 0; index < props.row; index++) {
      arr.push(1)
    }
    return () => {
      if (props.loading) {
        return <div class={`d-skeleton ${props.animate ? 'd-skeleton-animated' : ''}`}>
          <div class={`d-skeleton__avatar ${props.avatar ? 'is-shown' : ''}`}>
            <div class="avatar is-animated"></div>
          </div>
          <div class="d-skeleton__item__group">{
            arr.map(() => {
              return <div class="d-skeleton__item is-animated" />
            })
          }</div>
        </div>
      } else {
        return <div class={`d-skeleton ${props.animate ? 'd-skeleton-animated' : ''}`}>{slots.content?.()}
        </div>
      }
    }
  }
})
