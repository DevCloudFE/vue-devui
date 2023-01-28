import { defineComponent, toRefs, watch, onUnmounted, computed } from 'vue';
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

    // 计算内容的颜色
    const contentColor = computed(() => {
      return isDefaultTag() ? '' : checked.value ? '#fff' : themeColor.value;
    });

    // 关闭icon
    const closeIconEl = () => {
      const iconName = isDefaultTag() ? 'error-o' : 'close';

      return deletable.value ? (
        <a class="remove-button" onClick={handleDelete}>
          <d-icon size="12px" name={iconName} color={contentColor.value} />
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
            color: contentColor.value,
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
