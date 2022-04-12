import { defineComponent, onMounted, reactive, ref } from 'vue';
import { RateProps, rateProps } from './rate-types';
import './rate.scss';

export default defineComponent({
  name: 'DRate',
  props: rateProps,
  emits: ['change', 'update:modelValue'],
  setup(props: RateProps, ctx) {
    const totalLevelArray = reactive<{
      width: string;
    }[]>([]);
    const chooseValue = ref(0);

    // 根据mouseMove，mouseLeave,select等操作，改变颜色与是否选中
    const setChange = (start: number, end: number, width: string) => {
      for (let i = start; i < end; i++) {
        totalLevelArray[i]['width'] = width;
      }
    };

    // 初始化设置
    const initRating = () => {
      chooseValue.value = props.modelValue;
      const halfStar = chooseValue.value % 1;
      const intCurrentLevel = Math.floor(chooseValue.value);
      setChange(0, intCurrentLevel, '100%');

      if (halfStar > 0) {
        totalLevelArray[intCurrentLevel]['width'] = halfStar * 100 + '%';
        setChange(intCurrentLevel + 1, props.count, '0');
      } else {
        setChange(intCurrentLevel, props.count, '0');
      }
    };

    onMounted(() => {
      for (let i = 0; i < props.count; i++) {
        totalLevelArray.push({ width: '0' });
      }
      initRating();
    });

    // 当前元素是否是半选
    const checkIsCurrentElementIsSemiSelected = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      return props.allowHalf && e.offsetX * 2 <= target.clientWidth;
    };

    const hoverToggle = (e: MouseEvent, index: number) => {
      if (props.read) {
        return;
      }
      setChange(0, index + 1, '100%');
      const width = checkIsCurrentElementIsSemiSelected(e) ? '50%' : '100%';
      setChange(index, index + 1, width);
      setChange(index + 1, props.count, '0');
    };

    // 鼠标离开组件重置选择状态
    const onMouseleave = () => {
      initRating();
    };

    const selectValue = (e: MouseEvent, index: number) => {
      if (props.read) {
        return;
      }

      setChange(0, index, '100%');
      // 判断是否是半选模式
      if (checkIsCurrentElementIsSemiSelected(e)) {
        setChange(index, index + 1, '50%');
        chooseValue.value = index - 0.5;
      } else {
        setChange(index, index + 1, '100%');
        chooseValue.value = index;
      }
      setChange(index + 1, props.count, '0');

      props.onChange && props.onChange(chooseValue.value + 1);
      props.onTouched && props.onTouched();
      ctx.emit('update:modelValue', chooseValue.value + 1);
    };
    return {
      totalLevelArray,
      chooseValue,
      hoverToggle,
      selectValue,
      onMouseleave,
    };
  },
  render() {
    const {
      totalLevelArray,
      icon,
      character,
      read,
      type,
      color,
      hoverToggle,
      selectValue,
      onMouseleave,
    } = this;

    return (
      <div class='devui-star-container' onMouseleave={onMouseleave}>
        {totalLevelArray.map((item, index) => (
          <div
            class={`devui-star-align devui-pointer ${read ? 'devui-only-read' : ''}`}
            key={index}
            onMouseover={(e) => hoverToggle(e, index)}
            onClick={(e) => selectValue(e, index)}>
            {icon && !character && (
              <span class='devui-star-color'>
                <d-icon name={icon} />
              </span>
            )}
            {character && !icon && <span class='devui-star-color'>{character}</span>}
            {!icon && !character && (
              <span class='devui-star-color'>
                <svg
                  width='16px'
                  height='16px'
                  viewBox='0 0 16 16'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  xmlns-xlink='http://www.w3.org/1999/xlink'>
                  <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                    <g fill='#E3E5E9' id='Mask'>
                      <polygon points='8 12.7603585 3.67376208 14.3147912 3.81523437 9.71994835 \
                      1 6.0857977 5.41367261 4.80046131 8 1 10.5863274 4.80046131 15 6.0857977 \
                      12.1847656 9.71994835 12.3262379 14.3147912'></polygon>
                    </g>
                  </g>
                </svg>
              </span>
            )}
            {icon && !character && (
              <span class={`devui-star-color-active devui-active-star devui-star-color-${type}`}
                style={{ width: item.width }}>
                <d-icon name={icon} color={color} />
              </span>
            )}
            {character && !icon && (
              <span
                class={`devui-star-color-active devui-active-star devui-star-color-${type}`}
                style={{ color: color, width: item.width }}>
                {character}
              </span>
            )}
            {!character && !icon && (
              <span
                class={`devui-star-color-active devui-active-star devui-star-color-${type}`}
                style={{ color: color, width: item.width }}>
                <svg
                  width='16px'
                  height='16px'
                  viewBox='0 0 16 16'
                  version='1.1'
                  xmlns='http://www.w3.org/2000/svg'
                  xmlns-xlink='http://www.w3.org/1999/xlink'>
                  <g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'>
                    <g id='Mask'>
                      <polygon points='8 12.7603585 3.67376208 14.3147912 3.81523437 9.71994835 1 \
                      6.0857977 5.41367261 4.80046131 8 1 10.5863274 4.80046131 15 6.0857977 \
                      12.1847656 9.71994835 12.3262379 14.3147912'></polygon>
                    </g>
                  </g>
                </svg>
              </span>
            )}
          </div>
        ))}
      </div>
    );
  },
});
