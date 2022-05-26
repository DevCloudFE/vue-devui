import { defineComponent, toRefs, watch, onUnmounted } from 'vue';
import { tagProps, TagProps } from './tag-types';
import { useClass, useColor } from './composables';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './tag.scss';

export default defineComponent({
  name: 'DTag',
  props: tagProps,
  emits: ['click', 'tagDelete', 'checkedChange'],
  setup(props: TagProps, { slots, emit }) {
    const ns = useNamespace('tag');
    const { type, color, checked, titleContent, deletable } = toRefs(props);
    const tagClass = useClass(props);
    const themeColor = useColor(props);
    const tagTitle = titleContent.value || '';
    const isDefaultTag = () => !type.value && !color.value;

    const handleClick = (e: MouseEvent) => {
      emit('click', e);
    };
    const handleDelete = (e: MouseEvent) => {
      e.stopPropagation();
      emit('tagDelete', e);
    };
    const closeIconEl = () => {
      return deletable.value ? (
        <a class="remove-button" onClick={handleDelete}>
          {isDefaultTag() ? (
            <d-icon size="12px" name="error-o" color="#adb0b8" />
          ) : (
            <d-icon size="12px" name="close" color={themeColor.value} />
          )}
        </a>
      ) : null;
    };
    const unWatch = watch(checked, (newVal) => {
      emit('checkedChange', newVal);
    });
    onUnmounted(() => unWatch());

    return () => (
      <div class={ns.b()} onClick={handleClick}>
        <span
          class={tagClass.value}
          style={{
            display: 'block',
            color: checked.value ? '#fff' : themeColor.value,
            backgroundColor: checked.value ? themeColor.value : !color.value ? '' : 'var(--devui-base-bg, #ffffff)',
          }}
          title={tagTitle}>
          {slots.default?.()}
          {closeIconEl()}
        </span>
      </div>
    );
  },
});
