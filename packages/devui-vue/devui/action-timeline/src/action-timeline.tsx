import { defineComponent, computed, toRefs } from 'vue';
import type { SetupContext } from 'vue';
import { actionTimelineProps } from './action-timeline-types';
import type { ActionTimelineProps, ActionData, ActionItem } from './action-timeline-types';
import './action-timeline.scss';

export default defineComponent({
  name: 'DActionTimeline',
  props: actionTimelineProps,
  emits: ['actionLoadMore'],
  setup(props: ActionTimelineProps, ctx: SetupContext) {
    const { layout, data, showTailLine, showStatusBgColor, showStatusLineColor, loadMoreConfig } = toRefs(props);
    const isVertical = computed(() => layout.value === 'vertical');
    const containerClass = computed(() => ({
      'dp-action-timeline': true,
      'dp-action-timeline-status-bg': showStatusBgColor.value,
      'dp-action-timeline-status-line': showStatusLineColor.value,
    }));
    const timelineItemClass = (childIndex: number, parentIndex: number, actionData: ActionData, item: ActionItem) => ({
      'dp-action-timeline-item': true,
      'dp-action-timeline-item-info': showStatusLineColor.value && item.status === 'color-info',
      'dp-action-timeline-item-danger': showStatusLineColor.value && item.status === 'color-danger',
      'dp-action-timeline-item-success': showStatusLineColor.value && item.status === 'color-info',
      'vertical-list-item': isVertical.value,
      'list-last-item':
        actionData.actions &&
        data?.value &&
        childIndex === actionData.actions.length - 1 &&
        parentIndex === data.value.length - 1 &&
        showTailLine.value,
    });
    const itemIconClass = (item: ActionItem, flag = false) => {
      if (flag) {
        return {
          'dp-action-timeline-list-icon': true,
          'item-empty-icon': !item.icon,
          [item.status ?? '']: true,
        };
      } else {
        return {
          icon: true,
          [item.icon ?? '']: true,
        };
      }
    };
    const renderVerticalBody = (actionData: ActionData, parentIndex: number) =>
      actionData.actions?.map((item, index) => (
        <div class={timelineItemClass(index, parentIndex, actionData, item)}>
          <div class="vertical-list-item-top">
            <div class="vertical-list-item-top-left">
              {ctx.slots.iconContent?.({ option: item }) || <div class={itemIconClass(item, true)}>
                {!item.icon && <div class="list-empty-icon-dot"></div>}
                <em class={itemIconClass(item)}></em>
              </div>}
              <div class="vertical-list-item-top-left-title">{ctx.slots.title?.({ option: item })}</div>
            </div>
            <div class="dp-action-timeline-item-data">{item.createdAt}</div>
          </div>
          <div class="vertical-list-item-bottom">{ctx.slots.content?.({ option: item })}</div>
        </div>
      ));
    const renderHorizontalBody = (actionData: ActionData, parentIndex: number) =>
      actionData.actions?.map((item, index) => (
        <div class={timelineItemClass(index, parentIndex, actionData, item)}>
          {ctx.slots.iconContent?.({ option: item }) || <div class={itemIconClass(item, true)}>
            {!item.icon && <div class="list-empty-icon-dot"></div>}
            <em class={itemIconClass(item)}></em>
          </div>}
          <div class="dp-action-timeline-list-data">{ctx.slots.content?.({ option: item })}</div>
          <div class="dp-action-timeline-item-date">{item.createdAt}</div>
          {!(actionData.actions && data?.value && index === actionData.actions.length - 1 && parentIndex === data?.value?.length - 1) && (
            <div class="border-bottom"></div>
          )}
        </div>
      ));
    const handleLoadMoreClicked = () => {
      ctx.emit('actionLoadMore');
    };
    const handleBackTopClicked = () => {
      window.scrollTo(0, 0);
    };
    const renderLoadMore = () => (
      <div class="dp-action-timeline-operation-container">
        {loadMoreConfig?.value?.loadMore && (
          <div class="dp-action-timeline-operation" onClick={handleLoadMoreClicked}>
            {loadMoreConfig.value.loadMoreText}
          </div>
        )}
        {loadMoreConfig?.value?.isToTop && (
          <div class="dp-action-timeline-operation" onClick={handleBackTopClicked}>
            {loadMoreConfig.value.toTopText}
          </div>
        )}
      </div>
    );

    return () => (
      <>
        {data?.value?.map((item, parentIndex) => (
          <div class={containerClass.value}>
            <div class="dp-action-timeline-title">
              <p>{item.time}</p>
            </div>
            <div class="dp-action-timeline-body">
              {isVertical.value ? renderVerticalBody(item, parentIndex) : renderHorizontalBody(item, parentIndex)}
            </div>
            <div class="border-left"></div>
          </div>
        ))}
        {Boolean(data?.value?.length) && renderLoadMore()}
      </>
    );
  },
});
