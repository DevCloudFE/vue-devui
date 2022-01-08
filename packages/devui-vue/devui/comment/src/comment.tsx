import { defineComponent } from 'vue'
import { commentProps, CommentProps } from './comment-types'
import './comment.scss'
/* 
  * date:2021-12-18 
  * author:njl
  * 
  * actions 底部操作栏
  * author 作者区域
  * avatar 头像区域
  * content 内容操作区域
  * datetime 时间区域
  * avatarDom 头像可只传入地址
  * actionDom 操作区域根据传入的组件数量来生成相应的li标签
  * 
  * 目前可成为参数的为 avatar，actions 其他均为具名插槽的形式，后期可继续根据需要改造
**/
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
        const actionList = actions.map((action:any, index:number) => <li key={`devui-comment-action-${index}`}  class={`devui-comment-action-${index}`}>{action}</li>);
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
