import './skeleton.scss'

import { defineComponent } from 'vue'
import { skeletonProps, SkeletonProps } from './skeleton-types'

export default defineComponent({
  name: 'DSkeleton',
  props: skeletonProps,
  setup(props: SkeletonProps, ctx) {
    const { slots } = ctx;

    function renderAnimate(isAnimated) {
      return isAnimated ? 'devui-skeleton-animated' : ''
    }
    function renderParagraph(paragraphRowNum) {
      const arr = []
      for (let index = 0; index < paragraphRowNum; index++) {
        arr.push(1)
      }
      return <div class="devui-skeleton__paragraph" v-show={props.paragraph}>{
        arr.map(() => {
          return <div class="devui-skeleton__item" />
        })
      }</div>
    }
    function renderTitle(isTitleVisble) {
      return !isTitleVisble ? 'visibility: hidden;' : null
    }

    return () => {
      if (props.loading) {
        return <div class={`devui-skeleton ${renderAnimate(props.animate)}`}>
          <div class="devui-skeleton__avatar" v-show={props.avatar}>
            <div class="avatar" />
          </div>
          <div class="devui-skeleton__item__group">
            <div class="devui-skeleton__title" style={renderTitle(props.title)} />
            {renderParagraph(props.row)}
          </div>
        </div>
      }
      return <div class={`devui-skeleton ${renderAnimate(props.animate)}`}>{slots.default?.()}
      </div>
    }
  }
})
