import { defineComponent } from 'vue';
import { sortProps, SortProps } from './sort-types';
import { useNamespace } from '../../../../shared/hooks/use-namespace';
import './sort.scss';

export default defineComponent({
  props: sortProps,
  emits: ['sort'],
  setup(props: SortProps, ctx) {
    const directionMap = {
      ASC: 'DESC',
      DESC: '',
      default: 'ASC',
    };
    const changeDirection = () => {
      ctx.emit('sort', directionMap[props.sortDirection || 'default']);
    };
    const ns = useNamespace('table');

    return () => (
      <span onClick={changeDirection} class={ns.e('sort-clickable')}>
        <i
          class={[
            {
              [ns.e('sort-default')]: !props.sortDirection,
              [ns.e('sort-asc')]: props.sortDirection === 'ASC',
              [ns.e('sort-desc')]: props.sortDirection === 'DESC',
            },
          ]}>
          <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <circle id="sort-svg-path-1" cx="8" cy="8" r="8"></circle>
              <filter x="-34.4%" y="-21.9%" width="168.8%" height="168.8%" filterUnits="objectBoundingBox" id="filter-2">
                <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"></feOffset>
                <feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1"></feGaussianBlur>
                <feColorMatrix
                  values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.085309222 0"
                  type="matrix"
                  in="shadowBlurOuter1"></feColorMatrix>
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
  },
});
