import { defineComponent, toRefs } from 'vue';
import { commentProps, CommentProps } from './comment-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { isUrl, isBase64 } from '../../shared/utils/url';
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
    const { avatar, author, datetime } = toRefs(props);

    return () => {
      return (
        <div class={ns.b()}>
          {
            slots.avatar
              ? slots.avatar?.()
              : <div class={ns.e('avatar')}>
                <Avatar
                  name={avatar.value}
                  imgSrc={(isUrl(avatar.value) || isBase64(avatar.value)) ? avatar.value : ''}
                ></Avatar>
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
              slots.actions?.()
            }
          </div>
        </div>
      );
    };
  },
});
