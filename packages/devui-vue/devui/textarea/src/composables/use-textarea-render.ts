import { computed, toRefs, ref } from 'vue';
import { TextareaProps, UseTextareaRender } from '../textarea-types';
import { useNamespace } from '../../../shared/hooks/use-namespace';

export function useTextareaRender(props: TextareaProps): UseTextareaRender {
  const ns = useNamespace('textarea');
  const isFocus = ref(false);
  const { error, disabled } = toRefs(props);

  const wrapClasses = computed(() => ({
    [ns.b()]: true,
    [ns.m('focus')]: isFocus.value,
    [ns.m('disabled')]: disabled.value,
    [ns.m('error')]: error.value
  }));

  return { isFocus, wrapClasses };
}
