import { mount } from '@vue/test-utils';
import { Layout, Content, Header, Footer, Aside } from '..';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('layout', true);
describe('Layout test', () => {
  it('header-content-footer layout', async () => {
    const wrapper = mount({
      components: {
        'd-layout': Layout,
        'd-header': Header,
        'd-content': Content,
        'd-footer': Footer,
      },
      template: `
      <d-layout>
        <d-header>Header</d-header>
        <d-content>Content</d-content>
        <d-footer>Footer</d-footer>
      </d-layout>
      `
    });
    const layout = wrapper.find(ns.b());
    expect(layout.exists()).toBeTruthy();
    const header = layout.find(ns.e('header'));
    expect(header.text()).toBe('Header');
    const content = header.element.nextElementSibling;
    expect(content?.innerHTML).toBe('Content');
    const footer = layout.find(ns.e('content')).element.nextElementSibling;
    expect(footer?.innerHTML).toBe('Footer');
  });

  it('header-aside-content-footer layout', async () => {
    const wrapper = mount({
      components: {
        'd-layout': Layout,
        'd-header': Header,
        'd-content': Content,
        'd-footer': Footer,
        'd-aside': Aside,
      },
      template: `
      <d-layout id="outerLayout">
        <d-header>Header</d-header>
        <d-layout id="innerLayout">
          <d-aside>Aside</d-aside>
          <d-content>Content</d-content>
        </d-layout>
        <d-footer>Footer</d-footer>
      </d-layout>
      `
    });
    const outerLayout = wrapper.find('#outerLayout');
    expect(outerLayout.exists()).toBeTruthy();
    const header = outerLayout.find(ns.e('header'));
    expect(header.text()).toBe('Header');
    const innerLayout = outerLayout.find('#innerLayout');
    const aside = innerLayout.find(ns.em('aside', 'inner'));
    const content = innerLayout.find(ns.e('content'));
    expect(content.text()).toBe('Content');
    expect(aside.text()).toBe('Aside');
    expect(outerLayout.find(ns.e('footer')).text()).toBe('Footer');
  });

  it('aside-header-content-footer layout', async () => {
    const wrapper = mount({
      components: {
        'd-layout': Layout,
        'd-header': Header,
        'd-content': Content,
        'd-footer': Footer,
        'd-aside': Aside,
      },
      template: `
      <d-layout id="outerLayout">
        <d-aside>Aside</d-aside>
        <d-layout id="innerLayout">
          <d-header>Header</d-header>
          <d-content>Content</d-content>
          <d-footer>Footer</d-footer>
        </d-layout>
      </d-layout>
      `
    });
    const outerLayout = wrapper.find('#outerLayout');
    expect(outerLayout.element.firstElementChild?.innerHTML).toBe('Aside');
    expect(outerLayout.element.children[1].getAttribute('id')).toBe('innerLayout');
    const innerLayout = outerLayout.find('#innerLayout');
    expect(innerLayout.element.children[0]?.innerHTML).toBe('Header');
    expect(innerLayout.element.children[1]?.innerHTML).toBe('Content');
    expect(innerLayout.element.children[2]?.innerHTML).toBe('Footer');
  });
});
