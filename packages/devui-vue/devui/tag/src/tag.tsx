import { defineComponent, toRefs, ref, watch, onUnmounted } from 'vue';
import { tagProps, TagProps } from './tag-types';
import { useClass, useColor } from './hooks';
import './tag.scss';
// 类型声明

export default defineComponent({
  name: 'DTag',
  props: tagProps,
  emits: ['click', 'tagDelete', 'checkedChange'],
  setup(props: TagProps, { slots, emit }) {
    const { type, color, checked, titleContent, deletable } = toRefs(props);
    const tagClass = useClass(props);
    const themeColor = useColor(props);
    const tagTitle = titleContent.value || '';
    const isDefaultTag = () => !type.value && !color.value;
    const isShow = ref(true);
    // 子组件的点击事件
    const handleClick = () => {
      emit('click');
    };
    const handleDelete = () => {
      isShow.value = false;
      emit('tagDelete');
    };
    const closeIconEl = () => {
      return deletable.value ? (
        <a class='remove-button' onClick={handleDelete}>
          {isDefaultTag() ? (
            <d-icon size='12px' name='error-o' color='#adb0b8' />
          ) : (
            <d-icon size='12px' name='close' color={themeColor.value} />
          )}
        </a>
      ) : null;
    };
    // tag 的 check 状态改变时触发的事件checkedChange
    const unWatch = watch(checked, (newVal) => {
      console.log('checkedChange');

      emit('checkedChange', newVal);
    });
    onUnmounted(() => unWatch());
    return () =>
      isShow.value && (
        <div class='devui-tag' onClick={handleClick} v-show={isShow.value}>
          <span
            class={tagClass.value}
            style={{
              display: 'block',
              color: checked.value ? '#fff' : themeColor.value,
              backgroundColor: checked.value ? themeColor.value : !color.value ? '' : '#fff'
            }}
            title={tagTitle}
          >
            {slots.default?.()}
            {closeIconEl()}
          </span>
        </div>
      );
  }
});
