import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import Dropdown from '../src/dropdown';

describe('d-dropdown', () => {
  it('should render correctly', async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <Dropdown>
            {{
              default: () => <d-button>Click Me</d-button>,
              menu: () => (
                <ul class="list-menu">
                  <li class="menu-item">Item 1</li>
                  <li class="menu-item">Item 2</li>
                  <li class="menu-item">Item 3</li>
                  <li class="menu-item">Item 4</li>
                </ul>
              ),
            }}
          </Dropdown>
        );
      },
    });

    const toggleElement = wrapper.find('.devui-dropdown-toggle');
    expect(toggleElement.exists()).toBeTruthy();

    const btn = wrapper.find('.devui-button');
    expect(btn.exists()).toBeTruthy();

    await nextTick();
    await toggleElement.trigger('click');
    const dropdownMenu = document.querySelector('.devui-flexible-overlay');
    expect(dropdownMenu).toBeTruthy();

    const listMenu = document.querySelector('.list-menu');
    expect(listMenu?.childElementCount).toBe(4);
    dropdownMenu && dropdownMenu.parentNode?.removeChild(dropdownMenu);
    wrapper.unmount();
  });

  it('trigger hover', async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <Dropdown trigger="hover">
            {{
              default: () => <d-button>Click Me</d-button>,
              menu: () => (
                <ul class="list-menu">
                  <li class="menu-item">Item 1</li>
                  <li class="menu-item">Item 2</li>
                  <li class="menu-item">Item 3</li>
                  <li class="menu-item">Item 4</li>
                </ul>
              ),
            }}
          </Dropdown>
        );
      },
    });

    await nextTick();
    const toggleElement = wrapper.find('.devui-dropdown-toggle');
    await toggleElement.trigger('mouseenter');
    const dropdownMenu = document.querySelector('.devui-flexible-overlay');
    expect(dropdownMenu).toBeTruthy();

    const listMenu = document.querySelector('.list-menu');
    expect(listMenu?.childElementCount).toBe(4);
    dropdownMenu && dropdownMenu.parentNode?.removeChild(dropdownMenu);
    wrapper.unmount();
  });

  it('trigger manually', async () => {
    const isOpen = ref(false);
    const wrapper = mount({
      setup() {
        return () => (
          <Dropdown visible={isOpen.value} trigger="manually">
            {{
              default: () => <d-button>Click Me</d-button>,
              menu: () => (
                <ul class="list-menu">
                  <li class="menu-item">Item 1</li>
                  <li class="menu-item">Item 2</li>
                  <li class="menu-item">Item 3</li>
                  <li class="menu-item">Item 4</li>
                </ul>
              ),
            }}
          </Dropdown>
        );
      },
    });

    isOpen.value = true;
    await nextTick();
    const dropdownMenu = document.querySelector('.devui-flexible-overlay');
    expect(dropdownMenu).toBeTruthy();

    const listMenu = document.querySelector('.list-menu');
    expect(listMenu?.childElementCount).toBe(4);
    dropdownMenu && dropdownMenu.parentNode?.removeChild(dropdownMenu);
    wrapper.unmount();
  });

  it('close scope blank', async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <Dropdown close-scope="blank">
            {{
              default: () => <d-button>Click Me</d-button>,
              menu: () => (
                <ul class="list-menu">
                  <li class="menu-item">Item 1</li>
                  <li class="menu-item">Item 2</li>
                  <li class="menu-item">Item 3</li>
                  <li class="menu-item">Item 4</li>
                </ul>
              ),
            }}
          </Dropdown>
        );
      },
    });

    await nextTick();
    const toggleElement = wrapper.find('.devui-dropdown-toggle');
    await toggleElement.trigger('click');
    const dropdownMenu = document.querySelector('.devui-flexible-overlay');
    expect(dropdownMenu).toBeTruthy();

    const listMenu = document.querySelector('.list-menu');
    await listMenu?.dispatchEvent(new Event('click'));
    expect(document.querySelector('.devui-flexible-overlay')).toBeTruthy();

    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    await document.dispatchEvent(new Event('click'));
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    expect(document.querySelector('.devui-flexible-overlay')).toBeFalsy();
    dropdownMenu && dropdownMenu.parentNode?.removeChild(dropdownMenu);
    wrapper.unmount();
  });

  it('toggle event', async () => {
    const onToggle = jest.fn();
    const wrapper = mount({
      setup() {
        return () => (
          <Dropdown onToggle={onToggle}>
            {{
              default: () => <d-button>Click Me</d-button>,
              menu: () => (
                <ul class="list-menu">
                  <li class="menu-item">Item 1</li>
                  <li class="menu-item">Item 2</li>
                  <li class="menu-item">Item 3</li>
                  <li class="menu-item">Item 4</li>
                </ul>
              ),
            }}
          </Dropdown>
        );
      },
    });

    await nextTick();
    const toggleElement = wrapper.find('.devui-dropdown-toggle');
    await toggleElement.trigger('click');
    expect(onToggle).toBeCalled();
    wrapper.unmount();
  });
});
