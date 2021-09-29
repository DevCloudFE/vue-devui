import './skeleton.scss'

import { defineComponent } from 'vue'
import { skeletonProps, SkeletonProps } from './skeleton-types'

export default defineComponent({
  name: 'DSkeleton',
  props: skeletonProps,
  emits: [],
  setup(props: SkeletonProps, ctx) {
    let arr = []
    for (let index = 0; index < props.row; index++) {
      arr.push(1)
    }
    return () => {
      return <div class={`d-skeleton ${props.animate?'d-skeleton-animated':''}`}>{
        arr.map(() => {
          return <div class="d-skeleton__item" />
        })
      }
      </div>
    }
  }
})
