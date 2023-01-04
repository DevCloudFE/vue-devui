import { mount } from '@vue/test-utils';
import { nextTick, ref } from 'vue';
import { Dropdown, DropdownMenu } from '../';
import { useNamespace } from '../../shared/hooks/use-namespace';

const buttonClass = useNamespace('button', true).b();
const flexibleOverlayClass = useNamespace('flexible-overlay', true).b();
const dropdownNs = useNamespace('dropdown', true);

describe('d-dropdown', () => {
  beforeEach(() => {
    const dropdownMenus = document.querySelectorAll(flexibleOverlayClass);
    [...dropdownMenus].forEach(dropdownMenu => {
      dropdownMenu && dropdownMenu.parentNode?.removeChild(dropdownMenu);
    });
  });

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

    const btn = wrapper.find(buttonClass);
    expect(btn.exists()).toBeTruthy();

    await nextTick();
    await btn.trigger('click');
    const dropdownMenu = document.querySelector(flexibleOverlayClass);
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
    const btn = wrapper.find(buttonClass);
    await btn.trigger('mouseenter');
    const dropdownMenu = document.querySelector(flexibleOverlayClass);
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
    const dropdownMenu = document.querySelector(flexibleOverlayClass);
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
    const btn = wrapper.find(buttonClass);
    await btn.trigger('click');
    const dropdownMenu = document.querySelector(flexibleOverlayClass);
    expect(dropdownMenu).toBeTruthy();

    const listMenu = document.querySelector('.list-menu');
    await listMenu?.dispatchEvent(new Event('click'));
    expect(document.querySelector(flexibleOverlayClass)).toBeTruthy();

    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    await document.dispatchEvent(new Event('click'));
    await new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
    expect(document.querySelector(flexibleOverlayClass)).toBeFalsy();
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
    const btn = wrapper.find(buttonClass);
    await btn.trigger('click');
    expect(onToggle).toBeCalled();
    wrapper.unmount();
  });

  it('multi dropdown should work well.', async () => {
    const wrapper = mount({
      setup() {
        return () => (
          <Dropdown>
            {{
              default: () => <d-button>Click Me</d-button>,
              menu: () => (
                <ul class="list-menu">
                  <li class="menu-item">Item 1</li>
                  <Dropdown>
                    {{
                      default: () => <li class="menu-item">Item 2</li>,
                      menu: () => (
                        <ul class="sub-list-menu">
                          <li class="sub-menu-item">Item 2-1</li>
                          <li class="sub-menu-item">Item 2-2</li>
                          <li class="sub-menu-item">Item 2-3</li>
                        </ul>
                      ),
                    }}
                  </Dropdown>
                </ul>
              ),
            }}
          </Dropdown>
        );
      },
    });
    await nextTick();
    const btn = wrapper.find(buttonClass);
    await btn.trigger('click');
    expect(document.querySelectorAll(dropdownNs.e('menu-wrap')).length).toBe(1);
    await document.querySelector(dropdownNs.e('menu-wrap'))?.querySelectorAll('.menu-item')[1]?.click();
    expect(document.querySelectorAll(dropdownNs.e('menu-wrap')).length).toBe(2);
    wrapper.unmount();
  });

  it('d-dropdown-item should work well.', async () => {
    const isOpen = ref(false);
    const wrapper = mount({
      setup () {
        return () => (
          <DropdownMenu v-model={isOpen.value}>
            <ul class="list-menu">
              <li class="menu-item">Item 1</li>
              <li class="menu-item">Item 2</li>
              <li class="menu-item">Item 3</li>
              <li class="menu-item">Item 4</li>
            </ul>
          </DropdownMenu>
        );
      },
    });
    expect(document.querySelector(dropdownNs.e('menu-wrap'))).toBeFalsy();
    isOpen.value = true;
    await nextTick();
    expect(document.querySelector(dropdownNs.e('menu-wrap'))).toBeTruthy();
    wrapper.unmount();
  });
});
