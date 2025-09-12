import { mount } from '@vue/test-utils';
import { Icon, IconGroup } from '../';
import { useNamespace } from '../../shared/hooks/use-namespace';

const iconNs = useNamespace('icon');
const dotIconNs = useNamespace('icon', true);

describe('d-icon', () => {
  it('name', () => {
    const wrapper = mount(Icon, {
      props: { name: 'add' },
    });
    expect(wrapper.find('.icon-add').exists()).toBeTruthy();
  });

  it('classPrefix', () => {
    const wrapper = mount(Icon, {
      props: { name: 'add', classPrefix: 'dev' },
    });
    expect(wrapper.find('.dev-add').exists()).toBeTruthy();
  });

  it('size', () => {
    const wrapper = mount(Icon, {
      props: { name: 'add', size: '80px' },
    });
    expect(wrapper.find('.icon-add').attributes('style').includes('font-size: 80px')).toBeTruthy();
  });

  it('color', () => {
    const wrapper = mount(Icon, {
      props: { name: 'add', color: 'red' },
    });
    expect(wrapper.find('.icon-add').attributes('style').includes('color: red')).toBeTruthy();
  });

  it('props operable should work well.', async () => {
    const wrapper = mount(Icon, {
      props: { name: 'add', operable: true },
    });
    expect(wrapper.classes()).toContain(iconNs.m('operable'));
  });

  it('props rotate should work well.', async () => {
    const wrapper = mount(Icon, {
      props: { name: 'add', rotate: 180 },
    });
    expect(wrapper.find('.icon').attributes('style')).toContain('transform: rotate(180deg)');
  });

  it('props disabled should work well.', async () => {
    const wrapper = mount(Icon, {
      props: { name: 'add', disabled: true },
    });
    expect(wrapper.classes()).toContain(iconNs.m('disabled'));
  });

  it('slot(prefix/suffix) should work well.', async () => {
    const wrapper = mount({
      setup () {
        return () => (
          <Icon
            name="add"
            v-slots={{
              prefix: () => {
                return <span>前置</span>;
              },
              suffix: () => {
                return <span>后置</span>;
              },
            }}
          >
          </Icon>
        );
      }
    });
    const html = wrapper.html();
    const prefixIndex = html.indexOf('前置');
    const iconIndex = html.indexOf('class="icon');
    const suffixIndex = html.indexOf('后置');
    expect(prefixIndex < iconIndex && iconIndex < suffixIndex).toBeTruthy();
  });

  it('icon group should work well.', async () => {
    const wrapper = mount({
      setup () {
        return () => (
          <IconGroup>
            <Icon name="add"></Icon>
            <Icon name="edit"></Icon>
          </IconGroup>
        );
      }
    });
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find(dotIconNs.e('container')).exists()).toBeTruthy();
  });
});
