import { mount, VueWrapper } from '@vue/test-utils';
import { ComponentPublicInstance, nextTick, ref } from 'vue';
import { Menu, SubMenu, MenuItem } from '../index';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('menu');
const SubNs = useNamespace('submenu');
const dotNs = useNamespace('menu', true);
const dotSubNs = useNamespace('submenu', true);

const menuVertical = ns.b() + '-vertical';
const menuHorizontal = ns.b() + '-horizontal';
const dotMenuItem = dotNs.b() + '-item';
const dotMenuItemVerticalWrapper = dotNs.b() + '-item-vertical-wrapper';
const dotSubMenu = dotSubNs.b();
const submenuDisabled = SubNs.b() + '-disabled';
const menuitemDisabled = ns.b() + '-item-disabled';

// fix: TypeError: Array.from(...).at is not a function
!Array.prototype.at && (Array.prototype.at = function at (n) {
  // Convert the argument to an integer
  n = Math.trunc(n) || 0; // 去掉小数点
  // Allow negative indexing from the end
  if (n < 0) { n += this.length; }
  // Out-of-bounds access returns undefined
  if (n < 0 || n >= this.length) { return undefined; }
  // Otherwise, this is just normal property access
  return this[n];
});

describe('menu test', () => {
  let wrapper: VueWrapper<ComponentPublicInstance>;

  it('menu - basic render test', async () => {
    wrapper = mount({
      components: {
        'd-menu': Menu,
        'd-sub-menu': SubMenu,
        'd-menu-item': MenuItem,
      },
      template: `
      <d-menu>
        <d-menu-item key="home">首页</d-menu-item>
        <d-sub-menu title="课程" key="course">
          <d-menu-item key="c"> C </d-menu-item>
          <d-sub-menu title="Python" key="python">
            <d-menu-item key="basic"> 基础 </d-menu-item>
            <d-menu-item key="advanced"> 进阶 </d-menu-item>
          </d-sub-menu>
        </d-sub-menu>
        <d-menu-item key="person">个人</d-menu-item>
        <d-menu-item key="custom" href="https://www.baidu.com"> Link To Baidu </d-menu-item>
      </d-menu>
      `,
    });

    await nextTick();

    expect(wrapper.classes().includes(menuVertical)).toBe(true);
    expect(wrapper.find(dotSubMenu).exists()).toBe(true);
    expect(wrapper.find(dotMenuItem).exists()).toBe(true);
    expect(wrapper.find(dotMenuItemVerticalWrapper).exists()).toBe(true);
    await wrapper.setProps({
      mode: 'horizontal',
    });
    expect(wrapper.classes().includes(menuHorizontal)).toBe(true);
  });

  // 参数动态测试 - defaultSelectKeys
  it('menu defaultSelectKeys work', async () => {
    //
    wrapper = mount({
      components: {
        'd-menu': Menu,
        'd-sub-menu': SubMenu,
        'd-menu-item': MenuItem,
      },
      template: `
        <d-menu :default-select-keys="selectKeys">
          <d-menu-item key='test'>
            Test
          </d-menu-item>
          <d-menu-item key='test2'>
            Test2
          </d-menu-item>
        </d-menu>
        <button @click="clickHandle">Change key</button>
      `,
      setup() {
        const selectKeys = ref(['test']);
        const clickHandle = () => {
          selectKeys.value[0] = 'test2';
          console.log(selectKeys.value);
        };
        return {
          selectKeys,
          clickHandle,
        };
      },
    });
    await nextTick();
    expect(wrapper.findAll('li')[0].classes().includes('devui-menu-item-select')).toBe(true);
    expect(wrapper.findAll('li')[1].classes().includes('devui-menu-item-select')).toBe(false);
  });

  // 参数动态测试 - openKeys
  it('menu - dynamic attr - openKeys', async () => {
    //
    wrapper = mount({
      components: {
        'd-menu': Menu,
        'd-sub-menu': SubMenu,
        'd-menu-item': MenuItem,
      },
      template: `
        <d-menu :open-keys="defaultOpenKey">
          <d-sub-menu key="1">
            <d-menu-item key="SubMenu>Item1">
              SubMenu > Item 1
            </d-menu-item>
            <d-menu-item key="SubMenu>Item2">
              SubMenu > Item 2
            </d-menu-item>
          </d-sub-menu>
          <d-sub-menu key="2" >
            <d-menu-item key="SubMenu2>Item1">
              SubMenu2 > Item 1
            </d-menu-item>
            <d-menu-item key="SubMenu2>Item2">
              SubMenu2 > Item 2
            </d-menu-item>
          </d-sub-menu>
        </d-menu>
        <button @click=change>Click to Change openKeys</button>
      `,
      setup() {
        const defaultOpenKey = ref(['1']);
        const change = () => {
          if (defaultOpenKey.value.length < 2) {
            defaultOpenKey.value.push('2');
          } else {
            defaultOpenKey.value.pop();
          }
        };
        return {
          defaultOpenKey,
          change,
        };
      },
    });
    expect(wrapper.findAll('i')[0].classes().includes('is-opened')).toBe(true);
    expect(wrapper.findAll('i')[1].classes().includes('is-opened')).toBe(false);
  });
  it.todo('props mode(vertical/horizontal) work well.');

  it.todo('props multiple work well.');

  it.todo('props collapsed-indent work well.');

  it.todo('props disabled work well.');

  it.todo('props router work well.');

  it.todo('slot icon work well.');
  it('menu - disabled', async ()=>{
    wrapper = wrapper = mount({
      components: {
        'd-menu': Menu,
        'd-sub-menu': SubMenu,
        'd-menu-item': MenuItem,
      },
      template: `
      <d-menu>
        <d-menu-item key="home">首页</d-menu-item>
        <d-sub-menu title="课程" key="course" class="course" disabled>
          <d-menu-item key="c"> C </d-menu-item>
          <d-sub-menu title="Python" key="python">
            <d-menu-item key="basic"> 基础 </d-menu-item>
            <d-menu-item key="advanced"> 进阶 </d-menu-item>
          </d-sub-menu>
        </d-sub-menu>
        <d-menu-item key="person">个人</d-menu-item>
        <d-menu-item key="custom" href="https://www.baidu.com" disabled> Link To Baidu </d-menu-item>
      </d-menu>
      `,
    });
    await nextTick();
    expect(wrapper.findAll(dotMenuItem).at(-1)?.classes().includes(menuitemDisabled)).toBe(true);
    expect(wrapper.find('.course').classes().includes(submenuDisabled)).toBe(true);
  });
});
