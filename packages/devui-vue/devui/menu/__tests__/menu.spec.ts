import { mount, shallowMount } from '@vue/test-utils';
import { reactive, ref } from 'vue';
import { Menu,SubMenu,MenuItem } from '../index';

const factory_Menu = (value: Record<string,unknown>) => shallowMount(Menu, value);

describe('menu test', () => {
  it('menu - defaultMode test', async ()=>{
    //
    const menu = factory_Menu({});
    expect(menu.classes().indexOf('vertical')).toBe(1);
  });
  it('menu - dynamic - mode', async ()=>{
    const menu = factory_Menu({
      props: {
        'mode': 'horizontal'
      }
    });
    expect(menu.classes().indexOf('horizontal')).not.toBe(-1);
  });

  // 参数动态测试 - defaultSelectKeys
  it('menu - dynamic attr - defaultSelectKeys ', async ()=>{
    //
    const wrapper = mount({
      components: {
        Menu,
        SubMenu,
        MenuItem
      },
      template: `
        <Menu :default-select-keys="selectKeys">
          <MenuItem key='test'>
            Test
          </MenuItem>
        </Menu>
        <button @click="clickHandle">Change key</button>
      `,
      setup(){
        const selectKeys = ref(['test']);
        const clickHandle = () => {
          selectKeys.value.pop();
        };
        return {
          selectKeys,
          clickHandle
        };
      }
    });
    expect(wrapper.find('li').classes().indexOf('devui-menu-item-select')).not.toBe(-1);
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('li').classes().indexOf('devui-menu-item-select')).toBe(-1);
  });
  // 参数动态测试 - openKeys
  it('menu - dynamic attr - openKeys', async () => {
    //
    const wrapper = mount({
      components: {Menu,SubMenu,MenuItem},
      template: `
        <Menu :open-keys="defaultOpenKey">
          <SubMenu key="1">
            <MenuItem>
              SubMenu > Item 1
            </MenuItem>
            <MenuItem>
              SubMenu > Item 2
            </MenuItem>
          </SubMenu>
          <SubMenu key="2">
            <MenuItem>
              SubMenu2 > Item 1
            </MenuItem>
            <MenuItem>
              SubMenu2 > Item 2
            </MenuItem>
          </SubMenu>
        </Menu>
        <button @click=change>Click to Change openKeys</button>
      `,
      setup(){
        const defaultOpenKey = ref(['1']);
        const change = ()=>{
          if (defaultOpenKey.value.length < 2){
            defaultOpenKey.value.push('2');
          } else {
            defaultOpenKey.value.pop();
          }
        };
        return {
          defaultOpenKey,
          change
        };
      }
    });
    console.log(wrapper.findAll('ul')[2].classes());
    await wrapper.find('button').trigger('click');
    console.log(wrapper.findAll('ul')[2].classes());
    await wrapper.find('button').trigger('click');
    console.log(wrapper.findAll('ul')[2].classes());
  });
});
