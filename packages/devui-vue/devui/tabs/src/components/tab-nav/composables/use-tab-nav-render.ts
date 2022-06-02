import { computed, StyleValue, toRefs } from 'vue';
import { TabsProps } from '../../../tabs-types';
import { UseTabNavRender } from '../tab-nav-types';
import { useNamespace } from '../../../../../shared/hooks/use-namespace';

const ns = useNamespace('tabs');

export function useTabNavRender(props: TabsProps): UseTabNavRender {
  const { cssClass, vertical, customWidth } = toRefs(props);

  const ulClasses = computed(() => ({
    [ns.e('nav')]: true,
    [ns.em('nav', props.type)]: true,
    [cssClass.value]: Boolean(cssClass.value),
    [ns.e('stacked')]: vertical.value,
  }));

  const aClasses = computed(() => ({
    ['custom-width']: Boolean(customWidth.value),
  }));

  const customStyle: StyleValue = {
    width: props.customWidth ? props.customWidth : '',
  };

  return { ulClasses, aClasses, customStyle };
}
