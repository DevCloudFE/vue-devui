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
      const getAction = (actions:any) => {
        if (!actions || !actions.length) {
          return null;
        }
        const actionList = actions.map((action:any, index:number) => <li key={`devui-comment-action-${index}`}>{action}</li>);
        return actionList;
      };
      const actions = props.actions ?? slots.actions?.();
      
      const author = props.author ?? slots.author?.();
      const avatar = props.avatar ?? slots.avatar?.();
      const content = props.content ?? slots.content?.();
      const datetime = props.datetime ?? slots.datetime?.();
      const avatarDom = (
        <div class={`devui-comment-avatar`}>
          {typeof avatar === 'string' ? <img src={avatar} alt="comment-avatar" /> : avatar}
        </div>
      );
      const actionDom = actions ? (
        <ul class={`devui-comment-actions`}>{getAction(Array.isArray(actions) ? actions : [actions])}</ul>
      ) : null;
      return (
        <div class="devui-comment">
          {avatarDom}
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
            {actionDom}
          </div>
        </div>
      )
    }
  }
})
