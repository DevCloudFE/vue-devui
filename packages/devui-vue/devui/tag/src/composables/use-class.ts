import { computed } from 'vue';
import type { ComputedRef } from 'vue';
import { TagProps } from '../tag-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export default function (props: TagProps): ComputedRef<string> {
  const ns = useNamespace('tag');
  return computed(() => {
    const { type, color, deletable } = props;
    return `${ns.e('item')} ${ns.m(type || (color ? 'colorful' : '') || 'default')} ${deletable ? ns.m('deletable') : ''} ${ns.m(
      props.size
    )}`;
  });
}
