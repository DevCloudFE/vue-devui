import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import { TagProps } from '../tag-types';

export default function (props: TagProps): ComputedRef<string> {
  return computed(() => {
    const { type, color, deletable } = props;
    return `devui-tag-item devui-tag-${type || (color ? 'colorful' : '') || 'default'}${deletable ? ' devui-tag-deletable' : ''}`;
  });
}
