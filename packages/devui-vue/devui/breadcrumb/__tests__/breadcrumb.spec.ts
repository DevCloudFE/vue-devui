import { mount } from '@vue/test-utils';
import DBreadcrumb from '../src/breadcrumb';
import DBreadcrumbItem from '../src/breadcrumb-item';
import { useNamespace } from '../../shared/hooks/use-namespace';
import { nextTick } from 'vue';

const ns = useNamespace('breadcrumb', true);
const getEl = (selector: string) => document.body.querySelector(selector);

const itemClass = ns.e('item');
const separatorClass = ns.e('separator');
const isLinkClass = '.is-link';
const getDropdownTitle = () => getEl(ns.e('dropdown-title'));

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

  it('should `source` work correct', async() => {
    const wrapper = mount({
      props: {
        source: {
          type: Array,
          default: () => []
        }
      },
      components: {
        DBreadcrumb
      },
      template: `
        <d-breadcrumb :source="[
          { title: 'Homepage', link: '/', linkType: 'routerLink', replace: true },
          { title: 'DevUI', link: '/', noNavigation: true },
          { title: 'breadcrumb', showMenu: true, link: '/components/breadcrumb/', target: '_blank', children: [
            {
              title: '基础面包屑',
              link: '/components/breadcrumb/#基础面包屑'
            },
            {
              title: '传入source'
            },
            {
              title: '带下拉菜单的面包屑'
            }
          ]}
        ]"></d-breadcrumb>
      `
    });
    await nextTick();
    const items = wrapper.findAll(itemClass);
    expect(items.length).toBe(3);

    // hover on dropdowntitle
    const dropdowntitle = getDropdownTitle();
    dropdowntitle?.dispatchEvent(new Event('hover'));

    wrapper.unmount();
  });
});
