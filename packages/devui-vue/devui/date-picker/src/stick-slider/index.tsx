import { defineComponent, reactive } from 'vue';

import './index.scss';

const StickSlider = defineComponent({
  name: 'DStickSlider',
  props: {},
  setup() {

    const state = reactive({
      showButtons: false,
      selectedIndex: 0,
    });

    const reset = () => {
      state.showButtons = false;
    };

    const handleMainButtonMouseDown = (e: MouseEvent) => {
      e.stopPropagation();
      state.showButtons = true;
    };
    const handleMainButtonMouseUp = (e: MouseEvent) => {
      e.stopPropagation();
      reset();
    };

    return () => {
      return (
        <div
          class="devui-stick-slider"
          onMousedown={handleMainButtonMouseDown}
          onMouseup={handleMainButtonMouseUp}
          onMouseleave={handleMainButtonMouseUp}
        >
          <div
            class="sub-buttons"
            style={{ display: state.showButtons ? '' : 'none' }}
          >
            {
              Array(16).fill(null).map((_, i) => {
                return (<div
                  class={`button ${i === state.selectedIndex ? 'selected' : ''}`}
                  onMouseenter={() => state.selectedIndex = i}
                >{i}</div>);
              })
            }
          </div>
          <div class="main-button"></div>
        </div>
      );
    };
  }
});


export default StickSlider;
