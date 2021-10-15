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
    function renderAvatarShape(avatarShape) {
      return avatarShape === 'square' ? '' : 'border-radius:50%;'
    }
    function renderAvatarSize(avatarSize) {
      if (typeof avatarSize === 'string') {
        return `width:${avatarSize};height:${avatarSize};`
      } else if (typeof avatarSize === 'number') {
        return `width:${avatarSize}px;height:${avatarSize}px;`
      }
    }
    function renderAvatarStyle(avatarSize, avatarShape) {
      return (renderAvatarSize(avatarSize) + renderAvatarShape(avatarShape))
    }
    function renderTitleVisibility(isVisible) {
      return isVisible ? null : 'visibility: hidden;'
    }
    function renderTitleWidth(titleWidth) {
      if (typeof titleWidth === 'string') {
        return `width: ${titleWidth};`
      }else if (typeof titleWidth === 'number') {
        return `width: ${titleWidth}px;`
      }
    }
    function renderTitle(isVisible, titleWidth) {
      return (renderTitleWidth(titleWidth) + renderTitleVisibility(isVisible))
    }

    return () => {
      if (props.loading) {
        return <div class={`devui-skeleton ${renderAnimate(props.animate)}`}>
          <div class="devui-skeleton__avatar" v-show={props.avatar}>
            <div class="avatar" style={renderAvatarStyle(props.avatarSize, props.avatarShape)} />
          </div>
          <div class="devui-skeleton__item__group">
            <div class="devui-skeleton__title" style={renderTitle(props.title, props.titleWidth)} />
            {renderParagraph(props.row)}
          </div>
        </div>
      }
      return <div class={`devui-skeleton ${renderAnimate(props.animate)}`}>{slots.default?.()}
      </div>
    }
  }
})
