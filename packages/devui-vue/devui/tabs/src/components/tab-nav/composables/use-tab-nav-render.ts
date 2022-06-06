import { computed, StyleValue, toRefs } from 'vue';
import { TabsProps } from '../../../tabs-types';
import { OffSetData, UseTabNavRender } from '../tab-nav-types';
import { useNamespace } from '../../../../../shared/hooks/use-namespace';

const ns = useNamespace('tabs');

export function useTabNavRender(props: TabsProps, data: OffSetData): UseTabNavRender {
  const { cssClass, tabPosition, customWidth } = toRefs(props);

  const ulClasses = computed(() => ({
    [ns.e('nav')]: true,
    [ns.em('nav', props.type)]: true,
    [cssClass.value]: Boolean(cssClass.value),
    [ns.em('nav', 'top')]: tabPosition.value === 'top',
    [ns.em('nav', 'right')]: tabPosition.value === 'right',
    [ns.em('nav', 'bottom')]: tabPosition.value === 'bottom',
    [ns.em('nav', 'left')]: tabPosition.value === 'left',
  }));

  const aClasses = computed(() => ({
    ['custom-width']: Boolean(customWidth.value),
  }));

  const customStyle: StyleValue = {
    width: props.customWidth ? props.customWidth : '',
  };

  const sliderAnimationStyle = computed(() => {
    if (['top', 'bottom'].includes(props.tabPosition)) {
      return {
        left: data.offsetLeft + 'px',
        width: data.offsetWidth + 'px',
      };
    } else {
      return {
        top: data.offsetTop + 'px',
        height: data.offsetHeight + 'px',
        width: data.offsetWidth + 'px',
      };
    }
  });

  return { ulClasses, aClasses, customStyle, sliderAnimationStyle };
}
