import { defineComponent, inject, onMounted, onBeforeUnmount, ref, getCurrentInstance } from 'vue';
import { breadcrumbItemProps, BreadcrumbItemProps } from './breadcrumb-item-types';
import { useNamespace } from '../../shared/hooks/use-namespace';
// import { getPropsSlot } from './utils'
import './breadcrumb-item.scss';
import DDropdown from '../../dropdown/src/dropdown';

export default defineComponent({
  name: 'DBreadcrumbItem',
  components: {
    DDropdown
  },
  props: breadcrumbItemProps,
  setup(props: BreadcrumbItemProps, { slots }) {
    const separatorIcon = inject('separatorIcon');
    const ns = useNamespace('breadcrumb');
    const linkClass = props.to ? 'is-link' : '';
    const link = ref<HTMLElement | null>(null);
    const instance = getCurrentInstance();
    const router = instance?.appContext.config.globalProperties.$router;

    const showMenu = ref(props.showMenu);
    const menuList = ref(props.menuList || []);

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
      // 显示下拉框
      if (showMenu.value) {
        return (
          <div class={ns.e('item')}>
            <d-dropdown trigger="hover" close-scope="blank"
              v-slots={{
                menu: () => (
                  <ul class={ns.e('item-dropdown')}>
                    {
                      menuList.value.map(item => {
                        return (
                          item.link
                            ? (<a href={item.link} target={item.target ? item.target : '_self'}>
                              <li class={ns.e('item-dropdown-item')}>{item.title}</li>
                            </a>)
                            : <li class={ns.e('item-dropdown-item')}><span class={linkClass}>{item.title}</span></li>
                        );
                      })
                    }
                  </ul>
                )
              }}>
              <span class={linkClass}>{slots?.default?.()}<span class="icon icon-chevron-down"></span></span>
            </d-dropdown>
          </div>
        );
      }
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
