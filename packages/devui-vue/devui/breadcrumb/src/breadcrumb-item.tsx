import { defineComponent, inject, onMounted, onBeforeUnmount, ref, getCurrentInstance } from 'vue';
import { breadcrumbItemProps, BreadcrumbItemProps } from './breadcrumb-item-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './breadcrumb-item.scss';

export default defineComponent({
  name: 'DBreadcrumbItem',
  props: breadcrumbItemProps,
  setup(props: BreadcrumbItemProps, { slots }) {
    const separatorIcon = inject('separatorIcon');
    const ns = useNamespace('breadcrumb');
    const linkClass = props.to ? 'is-link' : '';
    const link = ref(null);
    const instance = getCurrentInstance();
    const router = instance.appContext.config.globalProperties.$router;
    const handleClickLink = () => {
      if (!props.to || !router) {
        return;
      }
      props.replace ? router.replace(props.to) : router.push(props.to);
    };
    onMounted(() => {
      link.value.addEventListener('click', handleClickLink);
    });

    onBeforeUnmount(() => {
      link.value.removeEventListener('click', handleClickLink);
    });

    return () => {
      const renderBreadcrumbSperator = () => {
        return <span class={ns.e('separator')}>{separatorIcon}</span>;
      };
      return (
        <div class={ns.e('item')}>
          <span ref={link} class={linkClass}>
            {slots?.default()}
          </span>
          {renderBreadcrumbSperator()}
        </div>
      );
    };
  },
});
