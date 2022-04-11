import { defineComponent, inject } from 'vue';
import type { TimelineRootType } from '../timeline-types';
import DIcon from '../../../icon/src/icon';
import { timeAxisItemProps, TimelineItemProps, Type } from './timeline-item-types';

export default defineComponent({
  name: 'DTimelineItem',
  components: { DIcon },
  props: timeAxisItemProps,
  emits: [],
  setup(props: TimelineItemProps, ctx) {
    const timeAxis: TimelineRootType = inject('timeAxis');
    const itemClass = 'devui-timeline-item';
    const renderTime = () => {
      return <div class={`${itemClass}-time`}>{ctx.slots.time ? ctx.slots.time?.() : props.time}</div>;
    };
    const renderContent = () => {
      return <div class={`${itemClass}-content`}>{ctx.slots.default?.(props)}</div>;
    };
    const renderPosition = (types: string[]) => {
      // 如果有设置position的话，就直接用position的内容
      if (types.includes(props.position)) {
        return renderContent();
      } else {
        // 如果是horizontal直接返回时间
        if (timeAxis.props.direction === 'horizontal') {
          return renderTime();
        } else {
          // 如果有设定time-position,则left显示在这
          return props.timePosition === 'left' ? renderTime() : '';
        }
      }
    };
    const setTypeIcon = (type: Type) => {
      if (type === 'primary') {
        return '';
      }
      return <i class={`icon-${type === 'success' ? 'right' : type}-o`} />;
    };
    const renderDot = () => {
      if (ctx.slots.dot) {
        return (
          <div style={{ color: props.dotColor }} class={`${itemClass}-dot`}>
            {' '}
            {ctx.slots.dot?.()}
          </div>
        );
      } else {
        return (
          <div class={`${itemClass}-dot ${itemClass}-type-${props.type}`} style={{ borderColor: props.dotColor }}>
            {setTypeIcon(props.type)}
          </div>
        );
      }
    };

    return () => {
      return (
        <div class={itemClass}>
          <div class={`${itemClass}-data-left ${itemClass}-data-top`}>{renderPosition(['top', 'left'])}</div>
          <div class={`${itemClass}-axis`}>
            {renderDot()}
            {timeAxis.props.direction === 'vertical' && props.timePosition === 'bottom' ? renderTime() : ''}
            <div class={`${itemClass}-line ${itemClass}-line-style-${props.lineStyle}`} style={{ borderColor: props.lineColor }}>
              {ctx.slots.extra ? <div class={`${itemClass}-line-extra`}>{ctx.slots.extra()}</div> : ''}
            </div>
          </div>
          <div class={`${itemClass}-data-right ${itemClass}-data-bottom`}>{renderPosition(['right', 'bottom'])}</div>
        </div>
      );
    };
  },
});
