import { defineComponent, PropType } from 'vue';
import { SortDirection } from '../../table.type';
import './sort.scss';


export const Sort = defineComponent({
  props: {
    modelValue: {
      type: String as PropType<SortDirection>,
      default: ''
    },
    'onUpdate:modelValue': {
      type: Function as PropType<(v: SortDirection) => void>
    }
  },
  emits: ['update:modelValue'],
  setup(props, ctx) {
    const changeDirection = () => {
      let direction = '';
      if (props.modelValue === 'ASC') {
        direction = 'DESC';
      } else if (props.modelValue === 'DESC') {
        direction = '';
      } else {
        direction = 'ASC';
      }
      ctx.emit('update:modelValue', direction);
    }

    return () => (
      <span onClick={changeDirection} class="sort-clickable">
        <i
          class={['datatable-svg', {
            'sort-icon-default': !props.modelValue,
            'sort-icon-asc': props.modelValue === 'ASC',
            'sort-icon-desc': props.modelValue === 'DESC'
          }]}
        >
          <svg
            width="16px"
            height="16px"
            viewBox="0 0 16 16"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <defs>
              <circle id="sort-svg-path-1" cx="8" cy="8" r="8"></circle>
              <filter x="-34.4%" y="-21.9%" width="168.8%" height="168.8%" filterUnits="objectBoundingBox" id="filter-2">
                <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                <feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                <feColorMatrix
                  values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.085309222 0"
                  type="matrix"
                  in="shadowBlurOuter1"
                ></feColorMatrix>
              </filter>
            </defs>
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <use fill-rule="evenodd" xlink:href="#sort-svg-path-1"></use>
              <polygon points="8 4 11 7 5 7"></polygon>
              <polygon points="8 12 5 9 11 9"></polygon>
            </g>
          </svg>
        </i>
      </span>
    );
  }
})