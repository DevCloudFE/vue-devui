import { defineComponent, reactive, onMounted, ref } from 'vue';

import './index.scss';

const VerticalSlider = defineComponent({
  props: {
    size: { type: Number, default: 26 },
    items: { type: Array },
    selectedIndex: { type: Number },
    className: { type: String },
    itemClassNormal: { type: String },
    itemClassSelected: { type: String },
    onChange: { type: Function }
  },
  setup(props) {

    const {
      items = [0,1,2,3,4,5,6,7,8,9],
      selectedIndex = 0,
      size = 26,
      className = '',
      itemClassNormal = '',
      itemClassSelected = 'selected',
      onChange,
    } = props || {};

    let max_y = 0, min_y = 0;
    const container = ref<Element>();
    const movbar = ref<Element>();

    let pos_start: [number, number] | null = null;
    let pos_cache: [number, number] | null = null;

    const state = reactive<{
      selectedIndex: number;
      barOpacity: number;
      x: number;
      y: number;
      transition: string;
    }>({
      selectedIndex,
      barOpacity: 0,
      x: 0, y: 0,
      transition: 'none',
    });

    const handleMouseDown = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      pos_start = [e.clientX, e.clientY];
      state.transition = 'none';
    };

    const handleMouseMove = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if(!pos_start || !pos_cache) {
        return;
      }
      state.x = pos_cache[0] + e.clientX - pos_start[0];
      state.y = Math.min(max_y, Math.max(min_y, pos_cache[1] + e.clientY - pos_start[1]));
      state.selectedIndex = (max_y - state.y + size / 2) / size >> 0;
    };
    const handleMouseUp = (e: MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
      pos_start = null;
      state.y = max_y - state.selectedIndex * size;
      state.transition = 'transform 0.1s';
      pos_cache[0] = state.x;
      pos_cache[1] = state.y;
      if(typeof onChange === 'function') {
        const idx = state.selectedIndex;
        const val = items[idx];
        onChange(val, idx);
      }
    };

    onMounted(() => {
      const { height: ch } = container.value.getBoundingClientRect();
      const { height: mh } = movbar.value.getBoundingClientRect();
      max_y = (ch - size) / 2;
      min_y = (ch + size) / 2 - mh;
      pos_cache = [0, max_y - state.selectedIndex * size];
      state.x = pos_cache[0];
      state.y = pos_cache[1];
      state.barOpacity = 1;
      state.transition = 'transform 0.1s';
    });

    return () => {
      return (
        <div ref={container} class={`devui-vertical-slider ${className}`}>
          <div ref={movbar} class="movable-bar" style={{
            opacity: state.barOpacity,
            transform: `translateY(${state.y}px)`,
            transition: state.transition,
          }}>
            {
              items.map((c, i) => {
                const className = i === state.selectedIndex ? itemClassSelected : itemClassNormal;
                return <span class={`slider-item ${className}`} style={{ height: `${size}px`, lineHeight: `${size}px` }}>{c}</span>;
              })
            }
          </div>
          <div
            class="slider-mask"
            onMousedown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            onMouseout={handleMouseUp}
          ></div>
        </div>
      );
    };
  }
});

export default VerticalSlider;
