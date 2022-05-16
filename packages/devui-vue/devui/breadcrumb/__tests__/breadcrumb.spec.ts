import { mount } from '@vue/test-utils';
import DBreadcrumb from '../src/breadcrumb';
import DBreadcrumbItem from '../src/breadcrumb-item';
import { useNamespace } from '../../shared/hooks/use-namespace';

const ns = useNamespace('breadcrumb', true);

const itemClass = ns.e('item');
const separatorClass = ns.e('separator');
const isLinkClass = '.is-link';

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
    const items = wrapper.findAll(itemClass);
    const separators = wrapper.findAll(separatorClass);
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
    expect(wrapper.find(separatorClass).text()).toBe('?');
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
    expect(wrapper.find(isLinkClass)).toBeTruthy();
  });
});
