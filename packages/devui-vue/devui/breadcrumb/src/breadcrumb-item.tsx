import { defineComponent, inject, onMounted, onBeforeUnmount, ref, getCurrentInstance } from 'vue';
import { breadcrumbItemProps, BreadcrumbItemProps } from './breadcrumb-item-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
// import { getPropsSlot } from './utils'
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
    // const menuList = props.menuList || []
    const originRef = ref<HTMLElement | null>(null);
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
    const renderBreadcrumbSperator = () => {
      return <span class={ns.e('separator')}>{separatorIcon}</span>;
    };
    /**
     *
     * 需要DropDown下拉菜单
     */
    const renderBreadcrumbNode = (breadcrumbItem: JSX.Element, prefixCls: string) => {
      // const dropdown = getPropsSlot(slots, props, 'dropdown');  // 获取slot的方法，不知道有没有通用的，要查看一下

      const isOpen = true;
      // 显示下拉框
      // if (showMenu) {
      //   console.log(originRef, originRef.value, 'origin=======');
      //   return (
      //     <div class={ns.e('item')}>
      //       <span ref="originRef" class={linkClass}>{slots?.default?.()}</span>
      //       <d-dropdown-menu origin={originRef} v-model={isOpen}>
      //         <d-list style="width: 100px;">
      //           {
      //             menuList.map(item => {
      //               return <d-list-item>{item.title}</d-list-item>
      //             })
      //           }
      //         </d-list>
      //       </d-dropdown-menu>
      //     </div>
      //   );
      // }
      // normal
      return (
        <div class={ns.e('item')}>
          <span ref={link} class={linkClass}>
            {slots?.default?.()}
          </span>
          {renderBreadcrumbSperator()}
        </div>
      );
    };
    return () => {

      return (
      // <div class={ns.e('item')}>
      //   <span ref={link} class={linkClass}>
      //     {slots?.default?.()}
      //   </span>
      //   {renderBreadcrumbSperator()}
      // </div>

        renderBreadcrumbNode(link, linkClass)
      );
    };
  },
});
