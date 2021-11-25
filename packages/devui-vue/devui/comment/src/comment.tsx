import { defineComponent } from 'vue'
import { commentProps, CommentProps } from './comment-types'
import './comment.scss'

export default defineComponent({
  name: 'DComment',
  props: commentProps,
  emits: [],
  slots: ['actions', 'author', 'avatar', 'content', 'datetime'],
  setup(props, { slots }) {
    return () => {
      const getSlots = function (className: string) {
        return (
          <div class={`devui-comment-${className}-nested`}>
            {slots[className]?.()}
          </div>
        )
      }
      const setSlot = function (vnode: any) {
        let vnodeEnum = Object.keys(vnode)
        vnodeEnum.forEach((item: any) => {
          getSlots(item)
        })
      }
      const actions = props.actions ?? slots.actions?.();
      const author = props.author ?? slots.author?.();
      const avatar = props.avatar ?? slots.avatar?.();
      const content = props.content ?? slots.content?.();
      const datetime = props.datetime ?? slots.datetime?.();

      return (
        <div class="devui-comment">
          <div class="devui-comment-avatar">
            {avatar}
          </div>
          <div class="devui-comment-right">
            <div class="devui-comment-head">
              <div class="devui-comment-author">
                {author}
              </div>
              <div class="devui-comment-datetime">
                {datetime}
              </div>
            </div>
            <div class="devui-comment-content">
              {content}
            </div>
            <div class="devui-comment-actions">
              {actions}
            </div>
          </div>
        </div>
      )
    }
  }
})
