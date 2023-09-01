import { defineComponent, provide, reactive, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import { optionGroupProps, OptionGroupProps, OptionGroupContext } from '../select-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';
import { OPTION_GROUP_TOKEN } from '../const';

export default defineComponent({
  name: 'DOptionGroup',
  props: optionGroupProps,
  setup(props: OptionGroupProps, ctx: SetupContext) {
    const ns = useNamespace('select');
    provide(
      OPTION_GROUP_TOKEN,
      reactive({
        ...toRefs(props),
      }) as OptionGroupContext
    );

    return () => {
      return (
        <ul class={ns.e('group')}>
          <li class={ns.e('group-title')}>{props.label || ''}</li>
          <li>
            <ul class={ns.e('group-content')}>{ctx.slots?.default && ctx.slots.default()}</ul>
          </li>
        </ul>
      );
    };
  },
});
