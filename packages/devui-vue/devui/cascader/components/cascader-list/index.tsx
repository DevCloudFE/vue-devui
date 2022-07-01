import { defineComponent, getCurrentInstance } from 'vue';
import { createI18nTranslate } from '../../../locale/create';
import { useUlClassName } from '../../hooks/use-cascader-class';
import { useDropdownStyle } from '../../hooks/use-cascader-style';
import { cascaderulProps, CascaderulProps } from '../../src/cascader-types';
import { DCascaderItem } from '../cascader-item';
import './index.scss';

export default defineComponent({
  name: 'DCascaderList',
  props: cascaderulProps,
  setup(props: CascaderulProps) {
    const app = getCurrentInstance();
    const t = createI18nTranslate('DCascaderList', app);

    const ulClass = useUlClassName(props);
    const ulStyle = useDropdownStyle(props);

    return () => (
      <ul class={ulClass.value} style={ulStyle.dropdownWidth}>
        {props?.cascaderItems?.length > 0 ? (
          props.cascaderItems.map((item, index) => {
            return <DCascaderItem cascaderItem={item} liIndex={index} {...props}></DCascaderItem>;
          })
        ) : (
          <span>{t('noData')}</span>
        )}
      </ul>
    );
  },
});
