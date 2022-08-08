import { defineComponent, inject, onMounted, onBeforeUnmount, ref, getCurrentInstance } from 'vue';
import { breadcrumbItemProps, BreadcrumbItemProps } from './breadcrumb-item-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
import './breadcrumb-item.scss';
import DDropdownMenu from '../../dropdown/src/dropdown-menu';
import DList from '../../list/src/list';
import DListItem from '../../list/src/list-item';

export default defineComponent({
  name: 'DBreadcrumbItem',
  components: {
    DDropdownMenu,
    DList,
    DListItem
  },
  props: breadcrumbItemProps,
  setup(props: BreadcrumbItemProps, { slots }) {
    const separatorIcon = inject('separatorIcon');
    const ns = useNamespace('breadcrumb');
    const linkClass = props.to ? 'is-link' : '';
    const link = ref<HTMLElement | null>(null);
    const instance = getCurrentInstance();
    const router = instance?.appContext.config.globalProperties.$router;

    // const showMenu = props.showMenu
    // const menuList = props.menuList

    const handleClickLink = () => {
      if (!props.to || !router) {
        return;
      }
      props.replace ? router.replace(props.to) : router.push(props.to);
    };
    onMounted(() => {
      link.value?.addEventListener('click', handleClickLink);
    });

    onBeforeUnmount(() => {
      link.value?.removeEventListener('click', handleClickLink);
    });
    /**
     * 传入有overlay形式
     * 需要DropDown下拉菜单
     */
    // const renderBreadcrumbNode = (breadcrumbItem: JSX.Element, prefixCls: string) => {
    //   // const dropdown = getPropsSlot(slots, props, 'overlay');  // 获取slot的方法，不知道有没有通用的，要查看一下
    //   if (dropdown) {
    //     return (
    //       <DDropdownMenu overlay={overlay} placement="bottom">
    //         <DList style="width: 100px;">
    //           {

    //           }
    //         </DList>
    //         {/* <span class={`${prefixCls}-overlay-link`}>
    //           {breadcrumbItem}
    //         </span> */}
    //       </DDropdownMenu>
    //     );
    //   }
    //   return breadcrumbItem;
    // };
    return () => {
      const renderBreadcrumbSperator = () => {
        return <span class={ns.e('separator')}>{separatorIcon}</span>;
      };
      return (
        <div class={ns.e('item')}>
          <span ref={link} class={linkClass}>
            {slots?.default?.()}
          </span>
          {renderBreadcrumbSperator()}
        </div>
      );
    };
  },
});
