import './skeleton.scss'

import { defineComponent } from 'vue'
import { skeletonProps, SkeletonProps } from './skeleton-types'

export default defineComponent({
  name: 'DSkeleton',
  props: skeletonProps,
  setup(props: SkeletonProps, ctx) {
    const { slots } = ctx;

    function renderAnimate(isAnimated) {
      return isAnimated ? 'devui-skeleton__animated' : ''
    }
    function renderBorderRadius(isRound) {
      return isRound ? 'border-radius: 1em;' : ''
    }
    function renderParagraph(isShown, rowNum, rowWidth, round) {
      const arr = []

      function pushIntoArray(type) {
        for (let index = 0; index < rowNum; index++) {
          arr.push({ width: type })
        }
      }
      (function handleRowWidth() {
        if (rowWidth instanceof Array) {
          for (let index = 0; index < rowNum; index++) {
            if (rowWidth[index]) {
              switch (typeof rowWidth[index]) {
                case 'string':
                  arr.push({ width: rowWidth[index] })
                  break
                case 'number':
                  arr.push({ width: `${rowWidth[index]}px` })
              }
            } else {
              arr.push({ width: 1 })
            }
          }
        } else {
          switch (typeof rowWidth) {
            case 'string':
              pushIntoArray(rowWidth)
              break
            case 'number':
              pushIntoArray(`${rowWidth}px`)
              break
          }
        }
      })()

      return <div class="devui-skeleton__paragraph" v-show={isShown}>{
        arr.map(item => {
          return <div class="devui-skeleton__item" style={round ? 'border-radius: 1em;' : '' + `width: ${item.width}`} />
        })
      }</div>
    }

    function renderShapeParagraph(rowNum, rowWidth, round) {
      const arr = []

      function pushIntoArray(type) {
        for (let index = 0; index < rowNum; index++) {
          arr.push({ width: type })
        }
      }
      (function handleRowWidth() {
        if (rowWidth instanceof Array) {
          for (let index = 0; index < rowNum; index++) {
            if (rowWidth[index]) {
              switch (typeof rowWidth[index]) {
                case 'string':
                  arr.push({ width: rowWidth[index] })
                  break
                case 'number':
                  arr.push({ width: `${rowWidth[index]}px` })
              }
            } else {
              arr.push({ width: 1 })
            }
          }
        } else {
          switch (typeof rowWidth) {
            case 'string':
              pushIntoArray(rowWidth)
              break
            case 'number':
              pushIntoArray(`${rowWidth}px`)
              break
          }
        }
      })()

      return <div class={`devui-skeleton__shape__paragraph ${renderAnimate(props.animate)}`}>{
        arr.map(item => {
          return <div class="devui-skeleton__shape__paragraph__item" style={round ? 'border-radius: 1em;' : '' + `width: ${item.width}`} />
        })
      }</div>
    }

    function renderAvatarStyle(avatarSize, avatarShape) {
      function renderAvatarShape(avatarShape) {
        return avatarShape === 'square' ? '' : 'border-radius:50%;'
      }
      function renderAvatarSize(avatarSize) {
        switch (typeof avatarSize) {
          case 'string':
            return `width:${avatarSize};height:${avatarSize};`
          case 'number':
            return `width:${avatarSize}px;height:${avatarSize}px;`
        }
      }

      return (renderAvatarSize(avatarSize) + renderAvatarShape(avatarShape))
    }
    function renderTitle(isVisible, titleWidth, isRound) {
      function renderTitleWidth(titleWidth) {
        switch (typeof titleWidth) {
          case 'string':
            return `width: ${titleWidth};`
          case 'number':
            return `width: ${titleWidth}px;`
        }
      }
      function renderTitleVisibility(isVisible) {
        return isVisible ? null : 'visibility: hidden;'
      }

      return (renderTitleWidth(titleWidth) + renderBorderRadius(isRound) + renderTitleVisibility(isVisible))
    }
    function renderDefaultSkeleton() {
      return <>
        <div class="devui-skeleton__avatar" v-show={props.avatar}>
          <div class="avatar" style={renderAvatarStyle(props.avatarSize, props.avatarShape)} />
        </div>
        <div class="devui-skeleton__group">
          <div class="devui-skeleton__title" style={renderTitle(props.title, props.titleWidth, props.round)} />
          {renderParagraph(props.paragraph, props.row, props.rowWidth, props.round)}
        </div>
      </>
    }

    return () => {
      if (props.loading) {
        if (props.shape) {
          switch (props.shape) {
            case 'avatar':
              return <>
                <div class={`devui-skeleton__shape__avatar ${renderAnimate(props.animate)}`} style={renderAvatarStyle(props.avatarSize, props.avatarShape) + props.style} />
              </>
            case 'paragraph':
              return <>
                {renderShapeParagraph(props.row, props.rowWidth, props.round)}
              </>
            default:
              return <>
                <div class={`devui-skeleton__shape__${props.shape} ${renderAnimate(props.animate)}`} style={`${props.style}`} />
              </>
          }
        } else {
          return <div class={`devui-skeleton ${renderAnimate(props.animate)}`}>
            {renderDefaultSkeleton()}
          </div>
        }
      }
      return <>{slots.default?.()}</>
    }
  }
})
