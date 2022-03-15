import { mount } from '@vue/test-utils';
import DBreadcrumb from '../src/breadcrumb';
import DBreadcrumbItem from '../src/breadcrumb-item';

describe('breadcrumb', () => {
  it('should breadcrumb display correctly', () => {
    const wrapper = mount({
      components: {
        DBreadcrumb,
        DBreadcrumbItem
      },
      template: `<d-breadcrumb>
            <d-breadcrumb-item>
              <a href="/">DevUI</a>
            </d-breadcrumb-item>
            <d-breadcrumb-item>
              <span>Breadcrumb</span>
            </d-breadcrumb-item>
          </d-breadcrumb>`
    });
    const items = wrapper.findAll('.devui-breadcrumb-item');
    const separators = wrapper.findAll('.devui-breadcrumb-separator');
    expect(items.length).toBe(2);
    expect(separators.length).toBe(2);
  });
  it('should separator support custom', () => {
    const wrapper = mount({
      components: {
        DBreadcrumb,
        DBreadcrumbItem
      },
      template: `
      <d-breadcrumb separatorIcon="?">
        <d-breadcrumb-item>A</d-breadcrumb-item>
      </d-breadcrumb>
    `
    });
    expect(wrapper.find('.devui-breadcrumb-separator').text()).toBe('?');
  });

  it('should `to` work correctly', () => {
    const wrapper = mount({
      components: {
        DBreadcrumb,
        DBreadcrumbItem
      },
      template: `
      <d-breadcrumb separatorIcon="?">
        <d-breadcrumb-item to="/index">A</d-breadcrumb-item>
      </d-breadcrumb>
    `
    });
    expect(wrapper.find('.is-link')).toBeTruthy();
  });
});
