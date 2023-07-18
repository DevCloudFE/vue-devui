import { defineComponent } from 'vue';
import type { SetupContext } from 'vue';
import { actionTimelineProps } from './action-timeline-types';
import type { ActionTimelineProps } from './action-timeline-types';
import './action-timeline.scss';

export default defineComponent({
  name: 'DActionTimeline',
  props: actionTimelineProps,
  setup(props: ActionTimelineProps, ctx: SetupContext) {
    return () => <div></div>;
  },
});
