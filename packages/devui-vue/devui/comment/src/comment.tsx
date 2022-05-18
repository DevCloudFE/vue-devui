import { defineComponent, toRefs } from 'vue';
import { commentProps, CommentProps } from './comment-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { isUrl } from '../../shared/utils/url';
import { Avatar } from '../../avatar';
import './comment.scss';

export default defineComponent({
  name: 'DComment',
  components: {
    Avatar
  },
  props: commentProps,
  setup(props: CommentProps, { slots }) {
    const ns = useNamespace('comment');
    const { avatar, author, datetime, actions } = toRefs(props);

    const getAction = (actions: []) => {
      if (!actions || !actions.length) {
        return null;
      }
      const actionList = actions.map((action: [], index: number) => (
        <li key={`devui-comment-action-${index}`} class={`devui-comment-action-${index}`}>
          {action}
        </li>
      ));
      return actionList;
    };

    const actionsList = Array.isArray(actions.value) ? actions.value : [actions.value];
    const actionDom = actions.value ? <ul class={`devui-comment-actions`}>{getAction(actionsList)}</ul> : null;

    return () => {
      return (
        <div class={ns.b()}>
          {
            slots.avatar
              ? slots.avatar?.()
              : <div class={ns.e('avatar')}>
                <Avatar imgSrc={isUrl(avatar.value) ? avatar.value : ''} name={avatar.value}></Avatar>
              </div>
          }
          <div class={ns.e('main')}>
            {
              slots.head
                ? slots.head?.()
                : <div class={ns.e('head')}>
                  {
                    slots.author
                      ? slots.author?.()
                      : <div class={ns.e('author')}>{ author.value }</div>
                  }
                  {
                    slots.datetime
                      ? slots.datetime?.()
                      : <div class={ns.e('datetime')}>{ datetime.value }</div>
                  }
                </div>
            }
            <div class={ns.e('content')}>{ slots.default?.() }</div>
            {
              slots.actions
                ? slots.actions?.()
                : actionDom
            }
          </div>
        </div>
      );
    };
  },
});
