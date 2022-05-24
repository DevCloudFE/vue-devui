import { computed, toRefs } from 'vue';
import { TabsProps, UseTabsRender } from './tabs-types';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('tabs');

export function useTabsRender(props: TabsProps): UseTabsRender {
  const { cssClass, vertical } = toRefs(props);

  const ulClasses = computed(() => ({
    [ns.e('nav')]: true,
    [ns.em('nav', props.type)]: true,
    [cssClass.value]: Boolean(cssClass.value),
    [ns.e('stacked')]: vertical.value,
  }));

  return { ulClasses };
}
