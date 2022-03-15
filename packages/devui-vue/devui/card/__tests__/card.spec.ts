import { mount } from '@vue/test-utils';
import DCard from '../src/card';
import DAvatar from '../../avatar/src/avatar';

describe('card', () => {
  it('should render correctly', async () => {
    const wrapper = mount(DCard);
    expect(wrapper.element).toMatchSnapshot();
  });
  it('should render correctly avatar', async () => {
    const wrapper = mount({
      components: {
        DCard,
        DAvatar
      },
      template: `
        <d-card class="d-card">
          <template #cardAvatar>
            <d-avatar name="DevUI"></d-avatar>
          </template>
        </d-card>
      `,
    });
    const avatar = wrapper.findAllComponents({ name: 'dAvatar' })[0];
    expect(avatar.classes()).toContain('devui-avatar');
  });
  it('in v-slot mode should render correctly avatar', async () => {
    const wrapper = mount({
      components: {
        DCard,
        DAvatar
      },
      template: `
        <d-card class="d-card">
          <template v-slot:cardAvatar>
            <d-avatar name="DevUI"></d-avatar>
          </template>
        </d-card>
      `,
    });
    const avatar = wrapper.findAllComponents({ name: 'dAvatar' })[0];
    expect(avatar.classes()).toContain('devui-avatar');
  });
  it('should render correctly title', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card">
          <template #cardTitle>
            DevUI
          </template>
        </d-card>
      `,
    });
    expect(wrapper.find('.devui-card-title').text()).toBe('DevUI');
  });
  it('in v-slot mode should render title', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card">
          <template v-slot:cardTitle>
            DEVUI Course
          </template>
        </d-card>
      `,
    });
    expect(wrapper.find('.devui-card-title').text()).toBe('DEVUI Course');
  });
  it('should render correctly subtitle', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card">
          <template #cardSubtitle>
            DevUI
          </template>
        </d-card>
      `,
    });
    expect(wrapper.find('.devui-card-subtitle').text()).toBe('DevUI');
  });
  it('in v-slot mode should render subtitle', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card">
          <template v-slot:cardSubtitle>
            DevUI
          </template>
        </d-card>
      `,
    });
    expect(wrapper.find('.devui-card-subtitle').text()).toBe('DevUI');
  });
  it('should render correctly content', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card">
          <template #cardContent>
            DevUI
          </template>
        </d-card>
      `,
    });
    expect(wrapper.find('.devui-card-content').text()).toBe('DevUI');
  });
  it('in v-slot mode should render content', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card">
          <template v-slot:cardContent>
            DevUI
          </template>
        </d-card>
      `,
    });
    expect(wrapper.find('.devui-card-content').text()).toBe('DevUI');
  });
  it('should render correctly actions', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card">
          <template #cardActions>
            <div class="card-block">
              btn
            </div>
          </template>
        </d-card>
      `,
    });
    expect(wrapper.find('.devui-card-actions').exists()).toBeTruthy();
    expect(wrapper.find('.card-block').text()).toBe('btn');
  });
  it('in v-slot mode should render actions', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card">
          <template #cardActions>
            <div class="card-block">
              btn
            </div>
          </template>
        </d-card>
      `,
    });
    expect(wrapper.find('.devui-card-actions').exists()).toBeTruthy();
    expect(wrapper.find('.card-block').text()).toBe('btn');
  });
  it('should render correctly image', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card" :src="'https://devui.design/components/assets/image1.png'">
        </d-card>
      `,
    });
    expect(wrapper.find('.devui-card-meta').attributes('src').includes('https://devui.design/components/assets/image1.png')).toBeTruthy();
  });
  it('should render correctly align', async () => {
    const wrapper = mount({
      components: {
        DCard,
      },
      template: `
        <d-card class="d-card" :align="'spaceBetween'">
        </d-card>
      `,
    });
    expect(wrapper.find('.devui-card-actions-align-spaceBetween').exists()).toBeTruthy();
  });
});
